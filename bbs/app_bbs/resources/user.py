from flask_restful import Resource, Api
from app_bbs.models.models import *
from flask import session, request, abort,jsonify
from common import *

class User_api(Resource):
    '''
    Api for /api/user/
    '''
    @login_required
    def get(self, uid):
        if session['is_admin'] == 1 or session['uid'] == uid:
            user = dbsession.query(User).filter(User.uid == uid).first()
            return_json = {
                        "uid": user.uid,
                        "nickname": user.nickname,
                        "avatar": user.avatar,
                        "email": user.email,
                        "tel": user.tel,
                        "is_admin": user.is_admin
                    }

        else:
            return_json = {
                "message" : "No Access!"
            }
        return jsonify(return_json)


    def post(self):
        nickname = request.json.get('nickname')
        username = request.json.get('username')
        password = request.json.get('password')
        password = md5(password)
        avatar = '/uploads/default.jpg'
        email = request.json.get('email')
        tel = request.json.get('tel')
        exist_user = dbsession.query(User).filter(User.username == username).first()
        if exist_user:
            return_json = {'message': "Register Failed!"}
        else:
            new_user = User(nickname = nickname,
                            username = username,
                            password = password,
                            email = email,
                            avatar = avatar,
                            tel = tel,
                            is_admin = 0)
            dbsession.add(new_user)
            dbsession.commit()
            if new_user.uid is None:
                return_json = {'message': "Register Failed!"}
            else:
                return_json = {'message': 'Register Success!'}
        return jsonify(return_json)

    @login_required
    def put(self, uid):
        '''
        Need to finish:
            upload avartar and update path:
        '''
        nickname = request.json.get('nickname')
        password = request.json.get('password')
        password = md5(password)
        email = request.json.get('email')
        tel = request.get('tel')
        if session.get('uid') == uid or session['is_admin'] == 1:
            user = dbsession.query(User).filter(User.uid == uid).first()
            user.nickname = nickname
            user.password = password
            user.email = email
            user.tel = tel
            dbsession.commit()
            return_json = {"message": "Update Success!"}
        else:
            return_json = {"message": "Update Failed!"}

        return return_json

    @login_required
    def delete(self, uid):
        if session.get('uid') == uid or session['is_admin'] == 1:
            user = dbsession.query(User).filter(User.uid == uid).first()
            dbsession.delete(user)
            dbsession.commit()
            return_json = {"message": "Delete Success!"}
        else:
            return_json = {"message": "Delete Failed!"}

        return return_json

