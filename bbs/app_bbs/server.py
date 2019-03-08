from app_bbs import app
from flask import Flask, request, render_template
from flask_restful import Resource, Api

def after_request(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'PUT,GET,POST,DELETE'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    return response

app.after_request(after_request)
api = Api(app)

@app.route('/')
def index():
    return render_template('dev.html')
    
class TopicAPI(Resource):
    def get(self):
        return [
                {
                    "tid" : 1, 
                    "topic_name": "皇后局都是这样打游戏的？那这个游戏怕是不适合我", 
                    "topic_type" : "", 
                    "uid" : 233, 
                    "username" : "blacsheep", 
                    "post_time" : "Thu Mar 7 18:30:58 2019",
                    "reply_time": "Thu Mar 7 18:31:58 2019", 
                    "replies": 1
                }, {
                    "tid" : 2, 
                    "topic_name": "被6战支配的我终于舒服了，4亡灵巨魔骑艰难吃下精英战", 
                    "topic_type" : "讨论一波", 
                    "uid" : 234, 
                    "username" : "TGWarWolf", 
                    "post_time" : "Thu Mar 7 18:35:58 2019",
                    "reply_time": "Thu Mar 7 18:37:58 2019",
                    "replies": 10
                },
            ]
    
    def post(self):
        pass

api.add_resource(TopicAPI, '/api/topic')

if __name__ == '__main__':
    app.run()