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

topic_list = [
    {
        "tid" : 1, 
        "topic_name": "路人局竟恐怖如斯？弟弟皇后的朝圣之旅", 
        "topic_type" : "", 
        "uid" : 233, 
        "username" : "blacsheep", 
        "post_time" : "2019-03-24 17:15",
        "reply_time": "2019-03-24 17:16", 
        "replies": 1
    }, {
        "tid" : 2, 
        "topic_name": "三星修补匠加上马尔斯能让对面感觉什么是残忍", 
        "topic_type" : "讨论一波", 
        "uid" : 234, 
        "username" : "TGWarWolf", 
        "post_time" : "2019-03-31 13:57",
        "reply_time": "2019-03-31 13:58",
        "replies": 10
    },
]

topic_detail = [
    {
        "tid" : 1, 
        "topic_name": "路人局竟恐怖如斯？弟弟皇后的朝圣之旅", 
        "topic_type" : "", 
        "uid" : 233, 
        "username" : "blacsheep", 
        "reg_time": "2018年 1月7日 21:51 UTC+8",
        "post_time" : "2019-03-24 17:15",
        "edit_time": "2019-03-24 17:16",
        "content": (
            """近日，我时常在泥潭看到以下几种言论："""

            """1、如今的路人局强度堪比堡垒皇后局；"""
            """2、上分纯靠运气和时间，无所谓运营；"""
            """3、士兵哥吊打皇后，皇后都不敢打路人局；"""
            """4、上不了分是因为运气不好或者只是单纯不想上分，皇后都是分奴；"""
            """5、小黑盒匹配只是为了保分，只是分奴们的内部狂欢；"""
            """6、齐大仙只有路人士兵骑士水平。"""

            """作为一名弟弟皇后，我本想与掩耳盗铃的杠精们据理力争一番。"""
            """但我转念一想，杠精们连基本的逻辑自洽都无法做到，与他们争辩只会陷入毫无意义的口舌之争。"""
            """于是，本着事实胜于雄辩的原则，我决定遵循毛主席的教诲，身体力行，实事求是，到路人局中回炉重造，以期百尺竿头更进一步。"""
        ),
        "like_count": 193,
        "is_liked": False,
    }, {
        "tid" : 2, 
        "topic_name": "三星修补匠加上马尔斯能让对面感觉什么是残忍", 
        "topic_type" : "", 
        "uid" : 233, 
        "username" : "TGWarWolf", 
        "reg_time": "2018年 1月8日 21:51 UTC+8",
        "post_time" : "2019-03-31 13:57",
        "edit_time": "2019-03-32 13:57",
        "content": """刚刚合成了一个三星修补匠，配合被动CD减半，加上一些回蓝装备，简直是加特林，对面如果不是骑士的话，基本上他俩就能屠了全队""",
        "like_count": 1,
        "is_liked": True,
    },
]

user_list = [
        {
        "uid": 233,
        "username": "blacsheep",
        "reg_time": "2018年 1月7日 21:51 UTC+8",
        "avatar": "",
        "selfintro": "Wizard of Legend"
    }, {
        "uid": 234,
        "username": "TGWarWolf",
        "reg_time": "2018年 1月8日 21:51 UTC+8",
        "avatar": "",
        "selfintro": "OSU!mania"
    }
]

comment_list = [
    [
        {
            "rid": 1,
            "uid": 234,
            "username": "TGWarWolf",
            "time" : "2019-03-24 17:20",
            "reg_time": "2018年 1月8日 21:51 UTC+8",
            "content": """光楼主这个态度就比那些只会口嗨的强一万倍""", 
            "like_count": 84,
            "is_liked": False,
            "reply": [
            ]
        }, {
            "rid": 2,
            "uid": 234,
            "username": "TGWarWolf",
            "reg_time": "2018年 1月8日 21:51 UTC+8",
            "time" : "2019-03-24 17:25",
            "content": """在网络上，承认别人比自己强大概是一件很困难的事""", 
            "like_count": 18,
            "is_liked": False,
            "reply": [
            ]
        }, {
            "rid": 3,
            "uid": 234,
            "username": "TGWarWolf",
            "reg_time": "2018年 1月8日 21:51 UTC+8",
            "time" : "2019-03-24 17:26",
            "content": """实力差不多的情况下，的确看运气""", 
            "like_count": 0,
            "is_liked": False,
            "reply": [
            ]
        }
    ], [
        {
            "rid": 1,
            "uid": 233,
            "username": "blacsheep",
            "reg_time": "2018年 1月7日 21:51 UTC+8",
            "time" : "Thu Mar 7 18:32:58 2019",
            "content": """是的 神体系下的地精都很猛 修补和伐木机 发条比不过那两个两星就很猛 但是如果能三星也是血强""", 
            "like_count": 51,
            "is_liked": False,
            "reply": [
                {
                    "rrid": 1, 
                    "uid": 233,
                    "username": "blacsheep",
                    "time" : "Thu Mar 7 18:35:58 2019",
                    "content": """就算是1星小马 我也要强行玩神族！""", 
                    "like_count": 21,
                    "is_liked": False,
                }
            ]
        }
    ]
]

class TopicListAPI(Resource):
    def get(self):
        return topic_list
    
    def post(self):
        pass

class TopicAPI(Resource):
    def get(self, id):
        if id in [1, 2]:
            return topic_detail[id-1]
        else:
            return "invalid topic id"

class UserAPI(Resource):
    def get(self, id):
        if id in [233, 234]:
            return user_list[id-233]
        else:
            return "invalid user id"
        
class CommentAPI(Resource):
    def get(self, id):
        if id in [1, 2]:
            return comment_list[id-1]
        else:
            return "invalid topic id"

api.add_resource(TopicListAPI, '/api/topic', endpoint='topics')
api.add_resource(TopicAPI, '/api/topic/<int:id>', endpoint='topic')
api.add_resource(UserAPI, '/api/users/<int:id>', endpoint='user')
api.add_resource(CommentAPI, '/api/comment/<int:id>', endpoint='comment')

if __name__ == '__main__':
    app.run()