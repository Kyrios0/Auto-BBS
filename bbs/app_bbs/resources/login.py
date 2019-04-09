from flask_restful import Resource, Api
from app_bbs.models.models import *
from flask import session, request, jsonify
from common import *

class Login_api(Resource):
    def post(self):
        username = request.json.get('username')
        password = request.json.get('password')
        password = md5(password)
        result = dbsession.query(User).filter(User.username == username, User.password == password).first()
        if result:
            message = "Login Success!"
            session['uid'] = result.uid
            session['nickname'] = result.nickname
            session['avatar'] = result.avatar
            session['email'] = result.email
            session['tel'] = result.tel
            session['is_admin'] = result.is_admin
            session.permanent = True
        else:
            message = "Login Fail!"

        return_json = {"message": message}
        return jsonify(return_json)
