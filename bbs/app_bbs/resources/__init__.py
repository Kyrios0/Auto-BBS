from flask import Flask, request, render_template, session
from flask_restful import Resource, Api


class Config(object):
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:root@127.0.0.1:3306/auto_bbs"

app = Flask(__name__)
api = Api(app)

app.config.from_object(Config)
