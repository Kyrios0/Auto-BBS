from flask_restful import Resource, Api
from app_bbs.models.models import *
from flask import session, request, jsonify
from common import *

class Agree_api(Resource):
    def get(self, tid, rid = None, rrid = None):
        cid = rrid if rrid else rid
        if rrid or rid:
            count = dbsession.query(CommentAgree).filter(CommentAgree.cid == cid).count()
        else:
            count = dbsession.query(TopicAgree).filter(TopicAgree.tid == tid).count()

        return_dict = {
            'agree_count': count
        }
        return jsonify(return_dict)

    @login_required
    def post(self, tid, rid = None, rrid = None):
        cid = rrid if rrid else rid
        if rrid or rid:
            isagree = dbsession.query(CommentAgree).filter(CommentAgree.cid == cid,
                                                           CommentAgree.uid == session.get('uid')).count()
            agree = CommentAgree(uid = session.get('uid'),
                                 cid = cid)
        else:
            isagree = dbsession.query(TopicAgree).filter(TopicAgree.tid == tid,
                                                         TopicAgree.uid == session.get('uid')).count()
            agree = TopicAgree(uid = session.get('uid'),
                               tid = tid)
        if isagree:
            return_dict = {
                'message': "Failed"
            }
            return jsonify(return_dict)

        else:
            try:
                dbsession.add(agree)
                dbsession.commit()
                return_dict = {
                    'message': "Success!"
                }

            except IntegrityError:
                return_dict = {
                    'message': "Failed"
                }
                dbsession.rollback()

        return jsonify(return_dict)


    @login_required
    def delete(self, tid, rid = None, rrid = None):
        cid = rrid if rrid else rid
        if rrid or rid:
            isagree = dbsession.query(CommentAgree).filter(CommentAgree.cid == cid,
                                                           CommentAgree.uid == session.get('uid')).count()
            agree = dbsession.query(CommentAgree).filter(CommentAgree.cid == cid,
                                                         CommentAgree.uid == session.get('uid')).first()
        else:
            isagree = dbsession.query(TopicAgree).filter(TopicAgree.tid == tid,
                                                         TopicAgree.uid == session.get('uid')).count()
            agree = dbsession.query(TopicAgree).filter(TopicAgree.tid == tid,
                                                       TopicAgree.uid == session.get('uid')).first()

        if isagree == 0:
            return_dict = {
                'message': "Failed"
            }
            return jsonify(return_dict)

        else:
            try:
                dbsession.delete(agree)
                dbsession.commit()
                return_dict = {
                    'message': "Success!"
                }

            except IntegrityError:
                return_dict = {
                    'message': "Failed"
                }
                dbsession.rollback()

        return jsonify(return_dict)
