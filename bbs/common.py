import hashlib
import datetime
import os
import config
import time
from flask import session, jsonify, make_response


def md5(src):
    return hashlib.md5((config.SECRET_KEY + str(src)).encode()).hexdigest()


def login_required(func):
    def wrapper(*args, **kwargs):
        if session.get('uid') is None or session.get('is_login') == 0:
            response = make_response(jsonify({"message": "Login Required!"}), 403)
            return response
        else:
            return func(*args, **kwargs)
    return wrapper


def admin_required(func):
    def wrapper(*args, **kwargs):
        if session.get('is_admin') is None:
            return jsonify({"message": "Admin Required!"}), 403
        else:
            return func(*args, **kwargs)
    return wrapper

