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
    
class BBSAPI(Resource):
    """
    API for BBS
    """
    def get(self):
        pass
    
    def post(self):
        pass

api.add_resource(BBSAPI, '/api')

if __name__ == '__main__':
    app.run()