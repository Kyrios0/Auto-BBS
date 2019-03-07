from app_bbs import app
from flask import Flask, request, render_template
from flask_restful import Resource, Api

api = Api(app)

@app.route('/')
def index():
    return render_template('dev.html')
    
class TopicAPI(Resource):
    def get(self):
        return {
            {
                "tid" : 1, 
                "topic_name": "自走棋真好玩", 
                "topic_type" : "杂谈", 
                "uid" : 233, 
                "username" : "blacsheep", 
                "time" : "Thu Mar 7 18:30:58 2019"
            },
            {
                "tid" : 2, 
                "topic_name": "自走棋真好玩", 
                "topic_type" : "杂谈", 
                "uid" : 235, 
                "username" : "EliAyase", 
                "time" : "Thu Mar 7 18:31:58 2019"
            },
        }
    
    def post(self):
        pass

api.add_resource(TopicAPI, '/api/topic')

if __name__ == '__main__':
    app.run()