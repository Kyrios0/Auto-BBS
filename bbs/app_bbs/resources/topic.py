from flask_restful import Resource, Api
from app_bbs.models.models import *
from flask import session, request, abort, jsonify, make_response
from common import *


def delete_comment(tree):
    dbsession = DBSession()
    try:
        son_comment = dbsession.query(Comment).filter(Comment.replyid == tree.cid).all()
        son_agree = dbsession.query(CommentAgree).filter(CommentAgree.cid == tree.cid).all()
        for one_agree in son_agree:
            dbsession.delete(one_agree)
        for comment in son_comment:
            delete_comment(comment)
        dbsession.delete(tree)
        dbsession.commit()
        dbsession.close()
    except IntegrityError:
        return 0
    return 1


def delete_topic(tree):
    dbsession = DBSession()
    try:
        son_comment = dbsession.query(Comment).filter(Comment.replyid == -1, Comment.tid == tree.tid).all()
        son_agree = dbsession.query(TopicAgree).filter(TopicAgree.tid == tree.tid).all()
        for comment in son_comment:
            delete_comment(comment)
        for agree in son_agree:
            dbsession.delete(agree)
        dbsession.delete(tree)
        dbsession.commit()
        dbsession.close()
        return 1
    except IntegrityError:
        return 0


class TopicApi(Resource):
    """
    API for /api/topic
    """

    def get(self, tid=None, page_num=1):
        dbsession = DBSession()
        if tid:
            '''
                GET /api/topic/<tid>
            '''
            topic = dbsession.query(Topic).filter(Topic.tid == tid).first()
            if topic is None:
                dbsession.close()
                abort(404)
            like_count = dbsession.query(TopicAgree).filter(TopicAgree.tid == tid).count()
            user = dbsession.query(User).filter(User.uid == topic.uid).first()
            username = user.username
            reg_time = user.reg_time
            if session.get('uid'):
                is_liked = dbsession.query(TopicAgree).filter(TopicAgree.tid == tid,
                                                              TopicAgree.uid == session['uid']).count()
            else:
                is_liked = 0


            topic_dict = {
                "tid": topic.tid,
                "topic_name": topic.topic_name,
                "uid": topic.uid,
                "is_admin": user.is_admin,
                "username": username,
                "post_time": topic.time.strftime("%Y{y} %m{m}%d{d} %H:%M").format(y='年',
                                                                                  m='月',
                                                                                  d='日'),
                "reg_time": reg_time.strftime("%Y{y} %m{m}%d{d} %H:%M").format(y='年',
                                                                               m='月',
                                                                               d='日'),
                "content": topic.content,
                "like_count": like_count,
                "is_liked": is_liked,
                "hot": 1 if topic.tid in [ each.tid for each in hot_list_cache.get_hot()] else 0
            }
            dbsession.close()
            return jsonify(topic_dict)

        else:
            '''
                GET /api/topic
                GET /api/topic/page/<page_number>
            '''
            if page_num <= 0:
                dbsession.close()
                abort(404)

            hot_topic = dbsession.query(Topic).order_by(Topic.latest_update_time.desc()).offset(
                (page_num - 1) * 10).limit(1000).all()
            if hot_topic == []:
                dbsession.close()
                abort(404)
            return_list = []
            for topic in hot_topic:
                user = dbsession.query(User).filter(User.uid == topic.uid).first()
                last_reply = dbsession.query(Comment).filter(Comment.tid == topic.tid,
                                                             Comment.replyid == -1).order_by(
                    Comment.time.desc()).first()
                if last_reply:
                    last_reply_uid = last_reply.uid
                else:
                    last_reply_uid = topic.uid
                last_reply_username = dbsession.query(User).filter(User.uid == last_reply_uid).first().username
                username = user.username
                reg_time = user.reg_time
                reply_counts = dbsession.query(Comment).filter(Comment.tid == topic.tid).count()
                topic_dict = {
                    "tid": topic.tid,
                    "topic_name": topic.topic_name,
                    "uid": topic.uid,
                    "is_admin": user.is_admin,
                    "username": username,
                    "post_time": topic.time.strftime("%Y{y} %m{m}%d{d} %H:%M").format(y='年',
                                                                                      m='月',
                                                                                      d='日'),
                    "reply_uid": last_reply_uid,
                    "reply_username": last_reply_username,
                    "reply_time": topic.latest_update_time.strftime("%Y{y} %m{m}%d{d} %H:%M").format(y='年',
                                                                                                     m='月',
                                                                                                     d='日'),
                    "replys": reply_counts,
                    "hot": 1 if topic.tid in [ each.tid for each in hot_list_cache.get_hot()] else 0
                }
                return_list.append(topic_dict)
            dbsession.close()
            return jsonify(return_list)

    @login_required
    def post(self):
        dbsession = DBSession()
        topic_name = request.json.get('topic_name')
        topic_type = request.json.get('topic_type')
        content = request.json.get('content')
        if topic_name and content:
            try:
                topic = Topic(topic_name=topic_name,
                              topic_type=topic_type,
                              content=content,
                              time=datetime.datetime.now(),
                              uid=session.get('uid'),
                              latest_update_time=datetime.datetime.now()
                              )
                dbsession.add(topic)
                dbsession.commit()
                status = 200
                return_json = {
                    'message': "Create Success!"
                }

            except IntegrityError:
                dbsession.rollback()
                return_json = {
                    "message": "Create Failed!"
                }
                status = 403
        else:
            return_json = {
                "message": "Can't Empty!"
            }
            status = 403
        response = make_response(jsonify(return_json), status)
        dbsession.close()
        return response

    @login_required
    def put(self, tid = None):
        if tid is None:
            abort(404)

        dbsession = DBSession()
        topic = dbsession.query(Topic).filter(Topic.tid == tid).first()

        # If Message Not exist
        if topic is None:
            dbsession.close()
            abort(404)

        # If this user is creator or admin
        if topic.uid == session.get('uid') or session.get('is_admin') == 1:
            try:
                topic_name = request.json.get('topic_name')
                topic_name = topic_name if topic_name else topic.topic_name

                topic_type = request.json.get('topic_type')
                topic_type = topic_type if topic_type else topic.topic_type

                content = request.json.get('content')
                content = content if content else topic.content

                topic.topic_name = topic_name
                topic.topic_type = topic_type
                topic.content = content
                dbsession.commit()
                return_json = {
                    'message': "Update Success!"
                }
                status = 200

            except IntegrityError:
                dbsession.rollback()
                return_json = {
                    "message": "Update Failed!"
                }
                status = 403
        else:
            status = 403
            return_json = {
                'message': "Update Failed!"
            }
        response = make_response(jsonify(return_json), status)
        dbsession.close()
        return response

    @login_required
    def delete(self, tid):
        dbsession = DBSession()
        topic = dbsession.query(Topic).filter(Topic.tid == tid).first()

        # If Message Not exist
        if topic is None:
            return_json = {
                'message': "Delete Failed!"
            }
            status = 404
            response = make_response(jsonify(return_json), status)
            dbsession.close()
            return response

        # If this user is creator or admin
        if topic.uid == session.get('uid') or session.get('is_admin') == 1:
            if delete_topic(topic):
                status = 200
                return_json = {
                    'message': "Delete Success!"
                }
            else:
                dbsession.rollback()
                return_json = {
                    "message": "Delete Failed!"
                }
                status = 403
        else:
            status = 403
            return_json = {
                'message': "Delete Failed!"
            }

        response = make_response(jsonify(return_json), status)
        dbsession.close()
        return response

