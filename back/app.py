# -*- coding: utf-8 -*-
from flask import Flask
from flask_cors import CORS
import logging
from logging.handlers import RotatingFileHandler
import hashlib
from elasticsearch import Elasticsearch
from elasticsearch import helpers
import preprocessing
import clustering


# 创建Flask实例
app = Flask(__name__)
app.jinja_env.auto_reload = True
app.config['TEMPLATES_AUTO_RELOAD'] = True
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

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


# 计算字符串的匹配模式
def calMatchPattern():

    pass

# 执行查询过程
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
    query_arr = query.strip().split(',')  # 将输入的文本转为数组
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
            for hl in hit['highlihgt']:
                
    
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
