from app_bbs import app
from flask import Flask, request, render_template
from flask_restful import Resource, Api

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