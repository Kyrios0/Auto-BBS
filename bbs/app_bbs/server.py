from flask import *
from app_bbs.resources.topic import *
from app_bbs.resources.login import *
from app_bbs.resources.user import *
from app_bbs.resources.posts import *
from app_bbs.resources.agree import *
from app_bbs.resources.hot import *
import config


def after_request(response):
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Origin'] = 'http://127.0.0.1:5000'
    response.headers['Access-Control-Allow-Methods'] = 'PUT,GET,POST,DELETE'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization,Origin,Accept,Access-Control-Allow-Headers'
    return response


app = Flask(__name__)
app.after_request(after_request)
api = Api(app)
app.config.from_object(config)

api.add_resource(TopicApi, '/api/topic', '/api/topic/<int:tid>', '/api/topic/page/<int:page_num>')
api.add_resource(LoginApi, '/api/login')
api.add_resource(UserApi, '/api/users', '/api/users/<int:uid>')
api.add_resource(PostsApi, '/api/posts/<int:tid>',
                 '/api/posts/<int:tid>/<int:rid>',
                 '/api/posts/<int:tid>/<int:rid>/<int:rrid>')

api.add_resource(AgreeApi, '/api/agree/<int:tid>',
                 '/api/agree/<int:tid>/<int:rid>',
                 '/api/agree/<int:tid>/<int:rid>/<int:rrid>')

api.add_resource(HotApi, '/api/topic/hot')

@app.route('/')
def index():
    return render_template('dev.html')

@app.route('/<path:path>')
def all(path):
    return render_template('dev.html')

if __name__ == '__main__':
    app.run()
