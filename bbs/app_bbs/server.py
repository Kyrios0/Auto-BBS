from flask import Flask
from app_bbs.resources.topic import *
from app_bbs.resources.login import *
from app_bbs.resources.user import *
from app_bbs.resources.posts import *
from app_bbs.resources.agree import *
import config

app = Flask(__name__)
api = Api(app)
app.config.from_object(config)

api.add_resource(Topic_api, '/api/topic', '/api/topic/<int:tid>', '/api/topic/page/<int:page_num>')
api.add_resource(Login_api, '/api/login')
api.add_resource(User_api, '/api/users', '/api/users/<int:uid>')
api.add_resource(Posts_api, '/api/posts/<int:tid>',
                 '/api/posts/<int:tid>/<int:rid>',
                 '/api/posts/<int:tid>/<int:rid>/<int:rrid>')

api.add_resource(Agree_api, '/api/agree/<int:tid>',
                 '/api/agree/<int:tid>/<int:rid>',
                 '/api/agree/<int:tid>/<int:rid>/<int:rrid>')


if __name__ == '__main__':
    app.run()
