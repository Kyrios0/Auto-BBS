from flask_restful import Resource, Api
from app_bbs.models.models import *
from flask import session, request, abort,jsonify
from common import *

class Topic_api(Resource):
    """
    API for /api/topic
    """
    def get(self, tid = None, page_num = 1):
        if tid:
            '''
                GET /api/topic/<tid>
            '''
            topic = dbsession.query(Topic).filter(Topic.tid == tid).first()
            like_count = dbsession.query(TopicAgree).filter(TopicAgree.tid == tid).count()
            username = dbsession.query(User).filter(User.uid == topic.uid).first().username
            if session.get('uid'):
                is_liked = dbsession.query(TopicAgree).filter(TopicAgree.tid == tid, User.uid == session['uid']).count()
            else:
                is_liked = 0
            topic_dict = {
                "tid": topic.tid,
                "topic_name": topic.topic_name,
                "topic_type": topic.topic_type,
                "uid": topic.uid,
                "username": username,
                "time": topic.time.strftime("%a %b %d %H:%M:%S %Y"),
                "content": topic.content,
                "like_count": like_count,
                "is_liked": is_liked
            }
            return jsonify(topic_dict)

        else:
            '''
                GET /api/topic
                GET /api/topic/page/<page_number>
            '''
            if page_num <= 0:
                abort(404)

            hot_topic = dbsession.query(Topic).order_by(Topic.latest_update_time.desc()).offset((page_num - 1) * 10).limit(10)
            return_list = []
            for topic in hot_topic:
                username = dbsession.query(User).filter(User.uid == topic.uid).first().username
                reply_counts = dbsession.query(Comment).filter(Comment.tid == topic.tid).count()
                topic_dict = {
                    "tid": topic.tid,
                    "topic_name": topic.topic_name,
                    "topic_type": topic.topic_type,
                    "uid": topic.uid,
                    "username": username,
                    "post_time": topic.time.strftime("%a %b %d %H:%M:%S %Y"),
                    "reply_time": topic.latest_update_time.strftime("%a %b %d %H:%M:%S %Y"),
                    "replys": reply_counts
                                }
                return_list.append(topic_dict)
            return jsonify(return_list)

    @login_required
    def post(self):
        topic_name = request.json.get('topic_name')
        topic_type = request.json.get('topic_type')
        content = request.json.get('content')
        topic = Topic(topic_name=topic_name,
                      topic_type=topic_type,
                      content=content,
                      time=datetime.datetime.now(),
                      uid=session.get('uid'),
                      latest_update_time=datetime.datetime.now()
                      )
        dbsession.add(topic)
        dbsession.commit()

        if topic.tid is None:
            return_json = {
                "message": "Create Failed!"
            }
        else:
            return_json = {
                'message': "Create Success!"
            }
        return jsonify(return_json)

    @login_required
    def put(self, tid):
        topic = dbsession.query(Topic).filter(Topic.tid == tid).first()

        # If Message Not exist
        if topic is None:
            return_json = {
                'message': "Update Failed!"
            }
            return jsonify(return_json)

        # If this user is creator or admin
        if topic.uid == session.get('uid') or session.get('is_admin') == 1:
            topic_name = request.json.get('topic_name')
            topic_type = request.json.get('topic_type')
            content = request.json.get('content')
            topic.topic_name = topic_name
            topic.topic_type = topic_type
            topic.content = content
            dbsession.commit()
            return_json = {
                'message': "Update Success!"
            }
        else:
            return_json = {
                'message': "Update Failed!"
            }
        return jsonify(return_json)

    @login_required
    def delete(self, tid):
        topic = dbsession.query(Topic).filter(Topic.tid == tid).first()

        # If Message Not exist
        if topic is None:
            return_json = {
                'message': "Delete Failed!"
            }
            return jsonify(return_json)

        # If this user is creator or admin
        if topic.uid == session.get('uid') or session.get('is_admin') == 1:
            dbsession.delete(topic)
            dbsession.commit()
            return_json = {
                'message': "Delete Success!"
            }
        else:
            return_json = {
                'message': "Delete Failed!"
            }
        return jsonify(return_json)

