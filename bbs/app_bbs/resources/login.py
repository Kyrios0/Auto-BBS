from flask_restful import Resource, Api
from app_bbs.models.models import *
from flask import session, request, jsonify, make_response
from common import *


class LoginApi(Resource):
    def get(self):
        if session.get('uid') and session.get('is_login'):
            message = "true"
            return_json = {"message": message}
            status_code = 200

        else:
            message = "false"
            return_json = {"message": message}
            status_code = 503

        response = make_response(jsonify(return_json), status_code)
        return response

    def post(self):
        username = request.json.get('username')
        password = request.json.get('password')
        password = md5(password)
        result = dbsession.query(User).filter(User.username == username, User.password == password).first()
        if result:
            message = "Login Success!"
            session['uid'] = result.uid
            session['username'] = result.username
            session['nickname'] = result.nickname
            session['avatar'] = result.avatar
            session['email'] = result.email
            session['tel'] = result.tel
            session['selfinfo'] = result.selfinfo
            session['is_admin'] = result.is_admin
            session['is_login'] = 1
            session['reg_time'] = result.reg_time
            session.permanent = True
        else:
            message = "Login Fail!"

        return_json = {"message": message}
        return jsonify(return_json)

    def delete(self):
        session['is_login'] = 0
        message = "Logout Success!"
        return_json = {"message": message}
        return jsonify(return_json)
