# -*- coding: utf-8 -*-
from flask import Flask
import logging
from logging.handlers import RotatingFileHandler
from flask_cors import CORS

# 创建Flask实例
app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

# 设置路由
@app.route("/")
def hello_world():
    return "Hello Python World"


@app.route("/search/<query>", methods=['POST', 'GET'])
def search(query):
    # 记录日志
    app.logger.info("query: *" + query + "*")
    print(query)
    return {'b': 'b'}


    # 记录结果
    # app.logger.info("result: \n")
    # app.logger.info(result)



def setup_log():
    # 创建日志记录器，指明日志保存的路径、每个日志文件的最大大小、保存的日志文件个数上限
    file_log_handler = RotatingFileHandler("logs/log", maxBytes=1024 * 1024 * 100, backupCount=10)
    # 创建日志记录的格式 日志等级 输入日志信息的文件名 行数 日志信息
    formatter = logging.Formatter('%(levelname)s %(filename)s:%(lineno)d %(message)s')
    # 为刚创建的日志记录器设置日志记录格式
    file_log_handler.setFormatter(formatter)
    # 为全局的日志工具对象（flask app使用的）添加日志记录器
    logging.getLogger().addHandler(file_log_handler)


if __name__ == "__main__":
    setup_log()
    # host默认127.0.0.1 端口默认5000
    app.run(
        port = 5001,
        debug=True
    )