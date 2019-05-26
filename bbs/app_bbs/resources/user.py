from flask_restful import Resource, Api
from app_bbs.models.models import *
from flask import session, request, abort,jsonify, make_response
from common import *


class UserApi(Resource):
    '''
    Api for /api/user/
    '''
    def get(self, uid = None):
        dbsession = DBSession()
        if not uid:
            if session.get('uid') is None:
                dbsession.close()
                status = 403
                return_json = {"message": "Login Required!"}
                response = make_response(jsonify(return_json), status)
                dbsession.close()
                return response
            else:
                return_json = {
                    "uid": session.get('uid'),
                    "nickname": session.get('nickname'),
                    "avatar": session.get('avatar'),
                    "email": session.get('email'),
                    "tel": session.get('tel'),
                    "is_admin": session.get('is_admin'),
                    "reg_time": session.get('reg_time').strftime("%Y{y} %m{m}%d{d} %H:%M").format(y='年',
                                                                                                  m='月',
                                                                                                  d='日'),
                    "selfinfo": session.get('selfinfo')
                }
                status = 200
                response = make_response(jsonify(return_json), status)
                dbsession.close()
                return response

        user = dbsession.query(User).filter(User.uid == uid).first()
        if user is None:
            abort(404)
        else:
            if session.get('is_admin') == 1 or session.get('uid') == uid:
                return_json = {
                            "uid": user.uid,
                            "nickname": user.nickname,
                            "avatar": user.avatar,
                            "email": user.email,
                            "tel": user.tel,
                            "is_admin": user.is_admin,
                            "reg_time": user.reg_time.strftime("%Y{y} %m{m}%d{d} %H:%M").format(y='年',
                                                                                                m='月',
                                                                                                d='日'),
                            "selfinfo": user.selfinfo
                        }
                status = 200
            else:
                return_json = {
                    "uid": user.uid,
                    "nickname": user.nickname,
                    "avatar": user.avatar,
                    "reg_time": user.reg_time.strftime("%Y{y} %m{m}%d{d} %H:%M").format(y='年',
                                                                                        m='月',
                                                                                        d='日'),
                    "selfinfo": user.selfinfo
                }
                status = 200

        response = make_response(jsonify(return_json), status)
        dbsession.close()
        return response


    def post(self):
        dbsession = DBSession()
        username = request.json.get('username')
        nickname = username
        password = request.json.get('password')
        password = md5(password)
        avatar = '/uploads/default.jpg'
        email = request.json.get('email')
        tel = request.json.get('tel')
        exist_user = dbsession.query(User).filter(User.username == username).first()
        if exist_user:
            return_json = {'message': "User Exist!"}
            status = 403
        else:
            if username and password:
                new_user = User(nickname = nickname,
                                username = username,
                                password = password,
                                email = email,
                                avatar = avatar,
                                tel = tel,
                                is_admin = 0,
                                reg_time = datetime.datetime.now(),
                                selfinfo = 'This guy is too lazy! There is nothing here!')
                try:
                    dbsession.add(new_user)
                    dbsession.commit()
                    return_json = {'message': 'Register Success!'}
                    status = 200
                except IntegrityError:
                    dbsession.rollback()
                    return_json = {'message': "Register Failed!"}
                    status = 403
            else:
                return_json = {'message': "Username and password can't be Empty!"}
                status = 403

        response = make_response(jsonify(return_json), status)
        dbsession.close()
        return response

    @login_required
    def put(self, uid):
        '''
        Need to finish:
            upload avartar and update path:
        '''
        dbsession = DBSession()
        user = dbsession.query(User).filter(User.uid == uid).first()
        if not user:
            abort(404)
        nickname = request.json.get('nickname')
        password = request.json.get('password')
        password = md5(password)
        email = request.json.get('email')
        selfinfo = request.json.get('selfinfo')
        tel = request.json.get('tel')
        if session.get('uid') == uid or session['is_admin'] == 1:
            user.nickname = nickname if nickname else user.nickname
            user.password = password if password else user.nickname
            user.email = email if email else user.email
            user.tel = tel if tel else user.email
            user.selfinfo = selfinfo if selfinfo else user.selfinfo
            try:
                dbsession.commit()
                return_json = {"message": "Update Success!"}
                status = 200
            except IntegrityError:
                dbsession.rollback()
                return_json = {"message": "Update Failed!"}
                status = 403
        else:
            return_json = {"message": "Update Failed!"}
            status = 403

        response = make_response(jsonify(return_json), status)
        dbsession.close()
        return response

    @login_required
    def delete(self, uid):
        dbsession = DBSession()
        user = dbsession.query(User).filter(User.uid == uid).first()
        if not user:
            abort(404)
        if session.get('uid') == uid or session['is_admin'] == 1:
            try:
                dbsession.delete(user)
                dbsession.commit()
                return_json = {"message": "Delete Success!"}
                status = 200
            except IntegrityError:
                dbsession.rollback()
                return_json = {"message": "Delete Failed!"}
                status = 403
        else:
            return_json = {"message": "Delete Failed!"}
            status = 403

        response = make_response(jsonify(return_json), status)
        dbsession.close()
        return response


