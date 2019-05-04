from flask_restful import Resource, Api
from app_bbs.models.models import *
from flask import session, request, jsonify
from common import *


class PostsApi(Resource):
    def get(self, tid):
        '''
        topic_comment: comment reply to topic directly
        comment_comment: comment reply to comment
        tc_username: username of the comment replied to topic
        cc_username: username of the comment replied to comment
        '''
        topic_comment = dbsession.query(Comment).filter(Comment.tid == tid,
                                                        Comment.replyid == -1).order_by(Comment.time).all()
        tc_list = []
        for top_comment in topic_comment:
            cc_list = []
            comment_comment = dbsession.query(Comment).filter(Comment.replyid == top_comment.cid).order_by(Comment.time).all()
            tc_username = dbsession.query(User).filter(User.uid == top_comment.uid).first().nickname
            tc_post_time = top_comment.time.strftime("%a %b %d %H:%M:%S %Y")
            tc_content = top_comment.content
            tc_like_count = dbsession.query(CommentAgree).filter(CommentAgree.cid == top_comment.cid).count()
            if session.get('uid') is None:
                tc_is_liked = 0
            else:
                tc_is_liked = dbsession.query(TopicAgree).filter(TopicAgree.uid == top_comment.uid,
                                                                 TopicAgree.tid == top_comment.tid).count()

            for one_comment in comment_comment:
                cc_username = dbsession.query(User).filter(User.uid == one_comment.uid).first().nickname
                cc_post_time = one_comment.time.strftime("%a %b %d %H:%M:%S %Y")
                cc_content = one_comment.content
                cc_like_count = dbsession.query(CommentAgree).filter(CommentAgree.cid == one_comment.cid).count()
                if session.get('uid') is None:
                    cc_is_liked = 0
                else:
                    cc_is_liked = dbsession.query(CommentAgree).filter(CommentAgree.uid == one_comment.uid,
                                                                       CommentAgree.cid == one_comment.cid).count()

                reply_dict = {
                    "rrid": one_comment.cid,
                    "uid": one_comment.uid,
                    "username": cc_username,
                    "post_time": cc_post_time,
                    "content": cc_content,
                    "like_count": cc_like_count,
                    "is_liked": cc_is_liked
                }
                cc_list.append(reply_dict)

            tc_dict = {
                "rid": top_comment.cid,
                "uid": top_comment.uid,
                "username": tc_username,
                "post_time": tc_post_time,
                "content": tc_content,
                "like_count": tc_like_count,
                "is_liked": tc_is_liked,
                "reply": cc_list
            }
            tc_list.append(tc_dict)
        return jsonify(tc_list)

    @login_required
    def post(self, tid, rid = None):
        try:
            content = request.json.get('content')
            comment = Comment(uid=session.get('uid'),
                              time=datetime.datetime.now(),
                              replyid=rid if rid else -1,
                              content=content,
                              tid=tid)
            dbsession.add(comment)
            dbsession.commit()
        except IntegrityError:
            return_json = {
                "message": "Comment Failed!"
            }
            dbsession.rollback()
            return jsonify(return_json)

        return_json = {
            'message': "Comment Success!"
        }
        return jsonify(return_json)

    @login_required
    def put(self, tid, rid, rrid = None):
        cid = rrid if rrid else rid
        comment = dbsession.query(Comment).filter(Comment.tid == tid,
                                                  Comment.cid == cid).first()
        # If Message Not exist
        if comment is None:
            return_json = {
                'message': "Update Failed!"
            }
            return jsonify(return_json)

        # If this user is creator or admin
        if comment.uid == session.get('uid') or session.get('is_admin') == 1:
            content = request.json.get('content')
            comment.content = content
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
    def delete(self, tid, rid, rrid = None):
        cid = rrid if rrid else rid
        comment = dbsession.query(Comment).filter(Comment.tid == tid,
                                                  Comment.cid == cid).first()
        # If Message Not exist
        if comment is None:
            return_json = {
                'message': "Delete Failed!"
            }
            return jsonify(return_json)

        # If this user is creator or admin
        if comment.uid == session.get('uid') or session.get('is_admin') == 1:
            dbsession.delete(comment)
            dbsession.commit()
            return_json = {
                'message': "Delete Success!"
            }
        else:
            return_json = {
                'message': "Delete Failed!"
            }
        return jsonify(return_json)