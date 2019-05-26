from flask_restful import Resource, Api
from app_bbs.models.models import *
from flask import session, request, abort, jsonify, make_response
from common import *


def sort_topic(topic_list):
    return_list = []
    dbsession = DBSession()
    max_weight = -1
    hottest_topic = 0
    for times in range(len(topic_list)):
        for topic in topic_list:
            reply_num = dbsession.query(Comment).filter(Comment.tid == topic.tid).count()
            agree_num = dbsession.query(TopicAgree).filter(TopicAgree.tid == topic.tid).count()
            weight = reply_num * 10 + agree_num
            if weight > max_weight:
                max_weight = weight
                hottest_topic = topic
        return_list.append(hottest_topic)
        max_weight = -1
        topic_list.remove(hottest_topic)
    dbsession.close()
    return return_list


class HotApi(Resource):
    def get(self):
        return_list = []
        dbsession = DBSession()
        hot_topic = dbsession.query(Topic).order_by(Topic.latest_update_time.desc()).offset(0).limit(100).all()
        hot_topic = sort_topic(hot_topic)
        hot_list_cache.set_hot(hot_topic[:5])
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
