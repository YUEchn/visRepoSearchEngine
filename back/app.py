# -*- coding: utf-8 -*-
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
        resp_repos = helpers.scan(self.es, queryPattern, index=self.index, scroll="10m")    # 执行大规模查询
        return resp_repos


# 设置路由
@app.route("/")
def hello_world():
    return "Hello Python World"


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
    if len(list(set(match_index))) == 1:   # [2, 2, 2] ---> [2]
        return [match_index[0]]
    return match_index


def calMatchPattern(explains, highlight, query_arr):
    # 第一步：找最大score对应的field
    # match_field = ''
    explains_sorted = sorted(explains['details'], key=lambda x: (-x['value'], re.findall(r"weight[(](.+?):", x['details'][0]['description'])[0]))  # 对explains根据score进行排序
    if len(explains_sorted) == 1:
        if re.findall(r"weight[(](.+?):", explains_sorted[0]['details'][0]['description'])[0] != 'topics':   # 最大score对应的field不是topics
            match_field = re.findall(r"weight[(](.+?):", explains_sorted[0]['details'][0]['description'])[0]
        else:
            return [[]], 'topics'
    elif re.findall(r"weight[(](.+?):", explains_sorted[0]['details'][0]['description'])[0] == 'topics':   # 最大score对应的field不是topics
            match_field = re.findall(r"weight[(](.+?):", explains_sorted[1]['details'][0]['description'])[0]
    else:
        match_field = re.findall(r"weight[(](.+?):", explains_sorted[0]['details'][0]['description'])[0]




    # 第二步：找到最大评分对应的field并计算匹配模式
    match_pattern = []
    match_pattern += list(map(partial(calMatchOrder, query_arr=query_arr), highlight[match_field]))
    
    if len(list(set([tuple(t) for t in match_pattern]))) == 1:    
        return [match_pattern[0]], match_field      # [[2, 1], [2, 1]] ---> [2, 1]
    return match_pattern, match_field



# 执行查询过程
'''
match_pattern: [[0], [0, 3, 3], [0, 1, 3], [0, 4], [0]]

'''
@app.route("/search/<query>", methods=['POST', 'GET'])
def search(query):
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

    for hit in hits:
        content = hit['_source']
        repo_id = hit['_source']['repoName']
        score = hit['_explanation']['value']
        content['score'] = score
        content['highlight'] = hit['highlight']
        hash_val = hashlib.md5(repo_id.encode('utf-8')).digest()
        if hash_val not in exist_hash:
            exist_hash.append(hash_val)
            respond.append(content)
            match_pattern = calMatchPattern(hit['_explanation'], hit['highlight'], query_arr)

    # 根据score对数据进行排序，优先级：得分降序、名称升序
    respond_sorted = sorted(
        respond, key=lambda x: (-x['score'], x['repoName']))
    # app.logger.info(respond)
    return {"data": respond_sorted}


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


def test_search():
    query = 'data visualization for graph'
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
    # # 对输入的语句进行词干化
    # query_arr = list(map(lambda x: porter_stemmer.stem(
    #     x), query.strip().lower().split(' ')))  # 将输入的文本转为数组
    # 不进行词干化
    query_arr = list(map(lambda x: x, query.strip().lower().split(' ')))  # 将输入的文本转为数组

    count = 0
    res = {}
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
            respond.append(content)
            temp_match_pattern, match_field = calMatchPattern(hit['_explanation'], hit['highlight'], query_arr)
            match_pattern.append(tuple(sum(temp_match_pattern, [])))
            res[str(count) + '_' + match_field] = tuple(temp_match_pattern)
    print(count)
    print(len(set(match_pattern)))

    # f = open('./data/match4.json', 'w', encoding='utf8')
    # f.write(json.dumps(res))
    # f.close()
    f1 = open('./data/match_pattern.txt', 'w', encoding='utf8')
    f1.write(str(match_pattern))
    f1.close()
    


if __name__ == "__main__":
    # setup_log()
    # app.run(
    #     port=5001,   # host默认127.0.0.1 端口默认5001
    #     debug=True
    # )

    # 测试es连接
    test_search()
