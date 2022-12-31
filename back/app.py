# -*- coding: utf-8 -*-
import re
from flask import Flask
from flask_cors import CORS
import logging
from logging.handlers import RotatingFileHandler
import hashlib
# from elasticsearch import Elasticsearch
from elasticsearch import helpers
from functools import partial
import nltk
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
        resp_repos = helpers.scan(
            self.es, queryPattern, index=self.index, scroll="10m")
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
        curItem = porter_stemmer.stem(item.group(0).replace('<em>', '').replace('</em>', '').strip().lower())
        try:
            curIndex = query_arr.indexOf(curItem)
            match_index.append(curIndex)
        except Exception as e:
            print(str(e)) 

    return match_index

def calMatchPattern(explains, highlight, query_arr):
    # 第一步：找到评分最大的一组所对应的索引
    max_score = explains['value']
    for index, item in enumerate(explains):
        if item['vallue'] == max_score:
            max_score_index = index   
            break
    # 第二步：找到最大评分对应的field并计算匹配模式
    match_pattern = []
    for index, item in enumerate(highlight):
        if index == max_score_index:
            match_pattern += list(map(partial(calMatchOrder, query_arr = query_arr), highlight[item]))
    



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
    # 对输入的语句进行词干化
    query_arr = list(map(lambda x: porter_stemmer.stem(x), query.strip().lower().split(' '))) # 将输入的文本转为数组
    for hit in hits:
        # print('hit------------------------------', hit)
        content = hit['_source']
        repo_id = hit['_source']['repoName']
        score = hit['_explanation']['value']
        content['score'] = score
        content['highlight'] = hit['highlight']
        hash_val = hashlib.md5(repo_id.encode('utf-8')).digest()
        if hash_val not in exist_hash:
            exist_hash.append(hash_val)
            respond.append(content)
            calMatchPattern(hit['_explanation'].details, hit['highlight'], query_arr)
            match_pattern = []

            # 单独计算所有的匹配方式，不选择最靠近的
            # for key, value in hit['highlihgt'].items():
            #     match_pattern += list(map(partial(calMatchOrder, query_arr = query_arr), value))
    
    # 根据score对数据进行排序，优先级：得分降序、名称升序
    respond_sorted = sorted(respond, key=lambda x: (-x['score'], x['repoName']))
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
    query = {
        "query": {
            "bool": {
                "should": [
                    {
                        "match": {
                            "repoName": "vis"
                        }
                    },
                    {
                        "match": {
                            "description": "vis"
                        }
                    },
                    {
                        "match": {
                            "topics": "vis"
                        }
                    }
                ]
            }
        }
    }

    es = SearchEngine()
    resp_repos = es.execute_search(query)
    # clustering.kmeans(resp_repos)
    clustering.fastclustring(resp_repos)


if __name__ == "__main__":
    setup_log()
    app.run(
        port=5001,   # host默认127.0.0.1 端口默认5001
        debug=True
    )
    # 测试es连接
#     test_search()
