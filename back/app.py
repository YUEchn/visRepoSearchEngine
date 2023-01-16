# -*- coding: utf-8 -*-
import os
import re
from flask import Flask
from flask_cors import CORS
import logging
from logging.handlers import RotatingFileHandler
import hashlib
from elasticsearch import Elasticsearch
from elasticsearch import helpers
from functools import partial
import nltk
import json
import threading
from nltk.stem.porter import PorterStemmer
import preprocessing
import clustering

# 创建Flask实例
app = Flask(__name__)
app.jinja_env.auto_reload = True
app.config['TEMPLATES_AUTO_RELOAD'] = True
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
porter_stemmer = PorterStemmer()


class SearchEngine:
    def __init__(self):
        self.index = "vis_repo_engine"
        self.ip = "http://localhost:9200"
        self.es = Elasticsearch(self.ip).options(ignore_status=400)

    def execute_search(self, query):
        print('开始查询')
        queryPattern = {
            "query": {
                "multi_match": {
                    "query": query,
                    "fields": [
                        "repoName",
                        "topics",
                        "description"
                    ]
                }
            },
            "highlight": {
                "pre_tags": "<em>",
                "post_tags": "</em>",
                "fields": {
                    "repoName": {},
                    "topics": {},
                    "description": {}
                }
            },
            "explain": True
        }
        resp_repos = helpers.scan(self.es, queryPattern, index=self.index, scroll="10m")  # 执行大规模查询

        print('查询结束')
        return resp_repos


# 重写多线程，获取返回值
class MyThread(threading.Thread):
    def __init__(self, func, args=()):
        super(MyThread, self).__init__()
        self.func = func
        self.args = args

    def run(self):
        self.result = self.func(*self.args)

    def get_result(self):
        try:
            return self.result
        except Exception:
            return None


# 设置路由
@app.route("/")
def hello_world():
    return "Hello Python World"


'''
通过kmeans方法对单个子数据集合进行划分
:params group_data 根据匹配模式划分后的子数据集
:return 分类后的组别，在原始的数据集上添加了组别信息: [{'id': 'c_gid_cid', 'children': []}, {'id': 'c_gid_cid, 'children': []}]
'''
def kmeans(group_data, macth_pattern, group_index, match_arr):
    print('聚类：' + macth_pattern + ' ' + str(len(group_data)))
    kmeansObj = clustering.KmeansClustering()
    n = len(group_data)
    if n < 10:  # 数量小于10 则不进行聚类
        res = []
        for r in group_data:
            r.update({'id': 'c_' + str(group_index) + '_0'})
            res.append(r)
        return res
    elif n < 1000:
        n_clusters = 2
    elif n < 10000:
        n_clusters = 10
    else:
        n_clusters = 20
    result = kmeansObj.kmeans(group_data, group_index, match_arr, n_clusters=n_clusters)
    return result


'''
对每一组查询模式下面的数据进行聚类/直接对原始数据进行聚类
:params resp_data: 执行查询之后按照匹配模式进行划分后的所有查询结果 {'gid': [], 'gid2': [] }
:params maxLength: 最长的匹配模式：number
:return：res {cluster: 'gid', children: [cluster: 'cId', children: [{}, {}, {}]]} 
'''
def clusteringGroup(resp_data, maxLength):
    print('开始聚类')
    threads = []  # 执行聚类的多线程擦做列表
    res = {"id": 'root_0', "maxLength": maxLength, 'maxConnection': 0, 'children': []}
    group_index = 0
    group_content = []
    for key, value in resp_data.items():
        match_arr = [int(k) for k in key.split('_')]
        group_content.append(match_arr)  # 保留每一种匹配模式的类型
        t = MyThread(kmeans, args=(value, key, group_index, match_arr))
        threads.append(t)
        t.start()
        group_index += 1
    for i, t in enumerate(threads):
        t.join()  # 等待至线程中止。
        cur_group_res = t.get_result()  # {cluster_id1:[{text_id1}, {text_id2}]}
        temp = {'id': 'g_' + str(i), 'content': group_content[i], "children": cur_group_res}
        res['children'].append(temp)

    print('聚类结束')
    return res


# 计算字符串的匹配模式，es只会匹配原始的和大小写
def calMatchOrder(single_match, query_arr):
    search_results = re.finditer(r'\<em>.*?\</em>', single_match)
    match_index = []
    for item in search_results:
        # # 词干化
        # curItem = porter_stemmer.stem(item.group(0).replace('<em>', '').replace('</em>', '').strip().lower())
        # 不进行词干化
        curItem = item.group(0).replace('<em>', '').replace('</em>', '').strip().lower()
        try:
            curIndex = query_arr.index(curItem)
            match_index.append(curIndex)
        except Exception as e:
            print(str(e), query_arr)
    if len(list(set(match_index))) == 1:  # 1. [2, 2, 2] ---> [2]
        return [match_index[0]]
    return match_index


# 找到匹配模式序列中的重复子序列作为最终的匹配序列
def repeatedSubstringPattern(s):
    def kmp(query, pattern):
        n, m = len(query), len(pattern)
        fail = [-1] * m

        for i in range(1, m):
            j = fail[i - 1]
            while j != -1 and pattern[j + 1] != pattern[i]:
                j = fail[j]
            if pattern[j + 1] == pattern[i]:
                fail[i] = j + 1
        match = -1
        for i in range(1, n - 1):
            while match != -1 and pattern[match + 1] != query[i]:
                match = fail[match]
            if pattern[match + 1] == query[i]:
                match += 1
                if match == m - 1:
                    return [int(x) for x in pattern[fail[-1] + 1:].split('_')[1:]]
        return [int(x) for x in pattern.split('_')[1:]]

    return kmp(s + s, s)


'''
:params explains:得分的详细情况
:params highlight:命中搜索词的选项
:params query_arr:查询拆分后的数组
:return match_pattern_last: 最终的匹配模式[index1, index2, indexn]
:return match_field: 用于计算匹配模式的项
'''


def calMatchPattern(explains, highlight, query_arr):
    # 第一步：找最大score对应的field
    # match_field = ''
    explains_sorted = sorted(explains['details'], key=lambda x: (
        -x['value'], re.findall(r"weight[(](.+?):", x['details'][0]['description'])[0]))  # 对explains根据score进行排序
    if len(explains_sorted) == 1:
        if re.findall(r"weight[(](.+?):", explains_sorted[0]['details'][0]['description'])[
            0] != 'topics':  # 最大score对应的field不是topics
            match_field = re.findall(r"weight[(](.+?):", explains_sorted[0]['details'][0]['description'])[0]
        else:
            return [], 'topics'
    elif re.findall(r"weight[(](.+?):", explains_sorted[0]['details'][0]['description'])[
        0] == 'topics':  # 最大score对应的field不是topics
        match_field = re.findall(r"weight[(](.+?):", explains_sorted[1]['details'][0]['description'])[0]
    else:
        match_field = re.findall(r"weight[(](.+?):", explains_sorted[0]['details'][0]['description'])[0]

    # 第二步：找到最大评分对应的field并计算匹配模式
    match_pattern = []  # 多维数组
    match_pattern_one_dim = []  # 一维数组
    match_pattern += list(map(partial(calMatchOrder, query_arr=query_arr),
                              highlight[match_field]))  # [[...], [...], [...]]：[[0], [0, 3, 3], [0, 1, 3], [0, 4], [0]]

    # if len(list(set([tuple(t) for t in match_pattern]))) == 1:  # 2. [[2, 1], [2, 1]] ---> [2, 1]
    #     match_pattern_one_dim = match_pattern[0]
    # else:
    #     match_pattern_one_dim = sum(match_pattern, [])  

    match_pattern_one_dim = sum(match_pattern, [])  # 2. [[2, 1], [2, 1]] ---> [2, 1, 2, 1]
    match_pattern_last = repeatedSubstringPattern(
        '_' + '_'.join(str(i) for i in match_pattern_one_dim))  # [2,1,0,2,1,0] ---> [2,1,0]

    return match_pattern_last, match_field


# 执行查询过程
'''
:params query查询语句
：return 查询的返回结果

'''


@app.route("/search/<query>", methods=['POST', 'GET'])
def search(query, mode='match'):
    # 记录日志
    app.logger.info("query: *" + query + "*")
    # 记录结果hit['_source']
    app.logger.info("result: \n")
    es = SearchEngine()
    hits = es.execute_search(query)
    respond = []
    exist_hash = []
    # # 对输入的语句进行词干化
    # query_arr = list(map(lambda x: porter_stemmer.stem(
    #     x), query.strip().lower().split(' ')))  # 将输入的文本转为数组
    # 不进行词干化
    query_arr = list(map(lambda x: x, query.strip().lower().split(' ')))  # 将输入的文本转为数组

    # 根据匹配模式的分组
    match_group = {}
    maxLength = 0  # 匹配模式的最大长度
    maxConnection = 0  # 关联关系最多的数目
    for hit in hits:
        content = hit['_source']
        repo_id = hit['_source']['repoName']
        score = hit['_explanation']['value']
        content['score'] = score
        content['highlight'] = hit['highlight']
        hash_val = hashlib.md5(repo_id.encode('utf-8')).digest()
        if hash_val not in exist_hash:
            exist_hash.append(hash_val)
            temp_match_pattern, match_field = calMatchPattern(hit['_explanation'], hit['highlight'], query_arr)
            if len(temp_match_pattern) == 0:
                temp_match_pattern = [-1]
            maxLength = max(maxLength, len(temp_match_pattern))  # 更新最长的匹配模式
            content['content'] = temp_match_pattern
            respond.append(content)

            # 根据匹配模式对结果进行划分
            if mode == 'match':
                match_pattern_str = '_'.join((str(i) for i in temp_match_pattern))
                if match_pattern_str not in match_group.keys():
                    match_group[match_pattern_str] = []
                match_group[match_pattern_str].append(content)

            # 对匹配结果进行聚类
    final_res = clusteringGroup(match_group, maxLength)

    # 根据score对数据进行排序，优先级：得分降序、名称字母升序
    respond_sorted = sorted(respond, key=lambda x: (-x['score'], x['repoName']))  # 列表的数据
    # app.logger.info(respond)
    return {"listData": respond_sorted, 'clusterData': res}


def setup_log():
    # 创建日志记录器，指明日志保存的路径、每个日志文件的最大大小、保存的日志文件个数上限
    file_log_handler = RotatingFileHandler(
        "logs/log", maxBytes=1024 * 1024 * 100, backupCount=10)
    # 创建日志记录的格式 日志等级 输入日志信息的文件名 行数 日志信息
    formatter = logging.Formatter(
        '%(levelname)s %(filename)s:%(lineno)d %(message)s')
    # 为刚创建的日志记录器设置日志记录格式
    file_log_handler.setFormatter(formatter)
    # 为全局的日志工具对象（flask app使用的）添加日志记录器
    logging.getLogger().addHandler(file_log_handler)


def test_search(mode="match"):
    query = 'large data visualization for graph'
    queryPattern = {
        "query": {
            "multi_match": {
                "query": query,
                "fields": [
                    "repoName",
                    "topics",
                    "description"
                ]
            }
        },
        "highlight": {
            "pre_tags": "<em>",
            "post_tags": "</em>",
            "fields": {
                "repoName": {},
                "topics": {},
                "description": {}
            }
        },
        "explain": True
    }

    es = SearchEngine()
    hits = es.execute_search(query)

    # clustering.kmeans(resp_repos)
    # clustering.fastclustring(resp_repos)
    respond = []
    exist_hash = []
    match_pattern = []
    match_pattern_obj = {}
    # # 对输入的语句进行词干化
    # query_arr = list(map(lambda x: porter_stemmer.stem(
    #     x), query.strip().lower().split(' ')))  # 将输入的文本转为数组
    # 不进行词干化
    query_arr = list(map(lambda x: x, query.strip().lower().split(' ')))  # 将输入的文本转为数组

    match_group = {}
    maxLength = 0  # 匹配模式的最大长度
    maxConnection = 0  # 关联关系最多的数目
    count = 0
    res = {}

    # 循环查询得到的每一条结果并计算每一条结果的匹配结果
    for hit in hits:
        count += 1
        content = hit['_source']
        repo_id = hit['_source']['repoName']
        score = hit['_explanation']['value']
        content['score'] = score
        content['highlight'] = hit['highlight']
        hash_val = hashlib.md5(repo_id.encode('utf-8')).digest()
        if hash_val not in exist_hash:
            exist_hash.append(hash_val)
            temp_match_pattern, match_field = calMatchPattern(hit['_explanation'], hit['highlight'], query_arr)
            if len(temp_match_pattern) == 0:
                temp_match_pattern = [-1]
            maxLength = max(maxLength, len(temp_match_pattern))  # 更新最长的匹配模式
            content['content'] = temp_match_pattern
            respond.append(content)

            # 根据匹配模式对结果进行划分
            if mode == 'match':
                match_pattern_str = '_'.join((str(i) for i in temp_match_pattern))
                if match_pattern_str not in match_group.keys():
                    match_group[match_pattern_str] = []
                match_group[match_pattern_str].append(content)

    # 对匹配结果进行聚类
    final_res = clusteringGroup(match_group, maxLength)

    # 不进行聚类，直接返回结果

    # 根据score对数据进行排序，优先级：得分降序、名称字母升序
    # respond_sorted = sorted(respond, key=lambda x: (-x['score'], x['repoName']))  # 列表的数据

    f1 = open('D:/Project/github/vis_repo/back/data/final_res.json', 'w', encoding='utf8')
    f1.write(json.dumps(final_res))
    f1.close()

    # f = open('./data/respond_sorted.json', 'w', encoding='utf8')
    # f.write(json.dumps(respond_sorted))
    # f.close()


if __name__ == "__main__":
    # setup_log()
    # app.run(
    #     port=5001,   # host默认127.0.0.1 端口默认5001
    #     debug=True
    # )

    # 测试es连接
    test_search()
