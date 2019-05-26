from flask_restful import Resource, Api
from app_bbs.models.models import *
from flask import session, request, jsonify, make_response, abort
from common import *


class AgreeApi(Resource):
    def get(self, tid, rid = None, rrid = None):
        dbsession = DBSession()
        cid = rrid if rrid else rid
        if rrid or rid:
            comment = dbsession.query(Comment).filter(Comment.cid == cid).first()
            if comment is None:
                abort(404)
            count = dbsession.query(CommentAgree).filter(CommentAgree.cid == cid).count()
        else:
            topic = dbsession.query(Topic).filter(Topic.tid == tid).first()
            if topic is None:
                abort(404)
            count = dbsession.query(TopicAgree).filter(TopicAgree.tid == tid).count()

        return_dict = {
            'agree_count': count
        }
        dbsession.close()
        return jsonify(return_dict)

    @login_required
    def post(self, tid, rid = None, rrid = None):
        dbsession = DBSession()
        cid = rrid if rrid else rid
        if rrid or rid:
            comment = dbsession.query(Comment).filter(Comment.cid == cid).first()
            if comment is None:
                abort(404)
            isagree = dbsession.query(CommentAgree).filter(CommentAgree.cid == cid,
                                                           CommentAgree.uid == session.get('uid')).count()
            agree = CommentAgree(uid = session.get('uid'),
                                 cid = cid)
        else:
            topic = dbsession.query(Topic).filter(Topic.tid == tid).first()
            if topic is None:
                abort(404)
            isagree = dbsession.query(TopicAgree).filter(TopicAgree.tid == tid,
                                                         TopicAgree.uid == session.get('uid')).count()
            agree = TopicAgree(uid = session.get('uid'),
                               tid = tid)
        if isagree:
            return_dict = {
                'message': "Failed"
            }
            status = 403

        else:
            try:
                dbsession.add(agree)
                dbsession.commit()
                status = 200
                return_dict = {
                    'message': "Success!"
                }

            except IntegrityError:
                return_dict = {
                    'message': "Failed"
                }
                status = 403
                dbsession.rollback()

        response = make_response(jsonify(return_dict), status)
        dbsession.close()
        return response


    @login_required
    def delete(self, tid, rid = None, rrid = None):
        dbsession = DBSession()
        cid = rrid if rrid else rid
        if rrid or rid:
            comment = dbsession.query(Comment).filter(Comment.cid == cid).first()
            if comment is None:
                abort(404)
            isagree = dbsession.query(CommentAgree).filter(CommentAgree.cid == cid,
                                                           CommentAgree.uid == session.get('uid')).count()
            agree = dbsession.query(CommentAgree).filter(CommentAgree.cid == cid,
                                                         CommentAgree.uid == session.get('uid')).first()
        else:
            topic = dbsession.query(Topic).filter(Topic.tid == tid).first()
            if topic is None:
                abort(404)
            isagree = dbsession.query(TopicAgree).filter(TopicAgree.tid == tid,
                                                         TopicAgree.uid == session.get('uid')).count()
            agree = dbsession.query(TopicAgree).filter(TopicAgree.tid == tid,
                                                       TopicAgree.uid == session.get('uid')).first()

        if isagree == 0:
            return_dict = {
                'message': "Failed"
            }
            status = 403
            dbsession.close()
            response = make_response(jsonify(return_dict), status)
            return response

        else:
            try:
                dbsession.delete(agree)
                dbsession.commit()
                return_dict = {
                    'message': "Success!"
                }
                status = 200

            except IntegrityError:
                return_dict = {
                    'message': "Failed"
                }
                status = 403
                dbsession.rollback()

        response = make_response(jsonify(return_dict), status)
        dbsession.close()
        return response

