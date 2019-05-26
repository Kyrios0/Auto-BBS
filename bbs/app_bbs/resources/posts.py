from flask_restful import Resource, Api
from app_bbs.models.models import *
from flask import session, request, jsonify, abort
from common import *


def delete_tree(tree):
    dbsession = DBSession()
    try:
        son_comment = dbsession.query(Comment).filter(Comment.replyid == tree.cid).all()
        son_agree = dbsession.query(CommentAgree).filter(CommentAgree.cid == tree.cid).all()
        for one_agree in son_agree:
            dbsession.delete(one_agree)
        for comment in son_comment:
            delete_tree(comment)
        dbsession.delete(tree)
        dbsession.commit()
        dbsession.close()
    except IntegrityError:
        return 0
    return 1

class PostsApi(Resource):
    def get(self, tid):
        '''
        topic_comment: comment reply to topic directly
        comment_comment: comment reply to comment
        tc_username: username of the comment replied to topic
        cc_username: username of the comment replied to comment
        '''
        dbsession = DBSession()
        topic_comment = dbsession.query(Comment).filter(Comment.tid == tid,
                                                        Comment.replyid == -1).order_by(Comment.time).all()
        tc_list = []
        for top_comment in topic_comment:
            cc_list = []
            comment_comment = dbsession.query(Comment).filter(Comment.replyid == top_comment.cid).order_by(Comment.time).all()
            tc_user = dbsession.query(User).filter(User.uid == top_comment.uid).first()
            tc_username = tc_user.nickname
            tc_regtime = tc_user.reg_time.strftime("%Y{y} %m{m}%d{d} %H:%M").format(y='年',
                                                                                          m='月',
                                                                                          d='日')
            tc_post_time = top_comment.time.strftime("%Y{y} %m{m}%d{d} %H:%M").format(y='年',
                                                                                            m='月',
                                                                                            d='日')
            tc_content = top_comment.content
            tc_like_count = dbsession.query(CommentAgree).filter(CommentAgree.cid == top_comment.cid).count()
            if session.get('uid') is None:
                tc_is_liked = 0
            else:
                tc_is_liked = dbsession.query(CommentAgree).filter(CommentAgree.uid == session.get('uid'),
                                                                 CommentAgree.cid == top_comment.cid).count()

            for one_comment in comment_comment:
                cc_user = dbsession.query(User).filter(User.uid == one_comment.uid).first()
                cc_username = cc_user.nickname
                cc_regtime = cc_user.reg_time.strftime("%Y{y} %m{m}%d{d} %H:%M").format(y='年',
                                                                                              m='月',
                                                                                              d='日')
                cc_post_time = one_comment.time.strftime("%Y{y} %m{m}%d{d} %H:%M").format(y='年',
                                                                                                m='月',
                                                                                                d='日')
                cc_content = one_comment.content
                cc_like_count = dbsession.query(CommentAgree).filter(CommentAgree.cid == one_comment.cid).count()
                if session.get('uid') is None:
                    cc_is_liked = 0
                else:
                    cc_is_liked = dbsession.query(CommentAgree).filter(CommentAgree.uid == session.get('uid'),
                                                                       CommentAgree.cid == one_comment.cid).count()

                reply_dict = {
                    "rrid": one_comment.cid,
                    "uid": one_comment.uid,
                    "is_admin": cc_user.is_admin,
                    "username": cc_username,
                    "post_time": cc_post_time,
                    "reg_time": cc_regtime,
                    "content": cc_content,
                    "like_count": cc_like_count,
                    "is_liked": cc_is_liked
                }
                cc_list.append(reply_dict)

            tc_dict = {
                "rid": top_comment.cid,
                "uid": top_comment.uid,
                "is_admin": tc_user.is_admin,
                "username": tc_username,
                "post_time": tc_post_time,
                "reg_time": tc_regtime,
                "content": tc_content,
                "like_count": tc_like_count,
                "is_liked": tc_is_liked,
                "reply": cc_list
            }
            tc_list.append(tc_dict)
        dbsession.close()
        if tc_list:
            return jsonify(tc_list)
        else:
            abort(404)

    @login_required
    def post(self, tid, rid = None):
        dbsession = DBSession()
        try:
            content = request.json.get('content')
            comment = Comment(uid=session.get('uid'),
                              time=datetime.datetime.now(),
                              replyid=rid if rid else -1,
                              content=content,
                              tid=tid)
            dbsession.add(comment)
            topic = dbsession.query(Topic).filter(Topic.tid == tid).first()
            topic.latest_update_time = datetime.datetime.now()
            dbsession.commit()
        except IntegrityError:
            return_json = {
                "message": "Comment Failed!"
            }
            dbsession.rollback()
            status = 403
            response = make_response(jsonify(return_json), status)
            return response

        return_json = {
            'message': "Comment Success!"
        }
        dbsession.close()
        return jsonify(return_json)

    @login_required
    def put(self, tid, rid, rrid = None):
        dbsession = DBSession()
        cid = rrid if rrid else rid
        comment = dbsession.query(Comment).filter(Comment.tid == tid,
                                                  Comment.cid == cid).first()
        # If Message Not exist
        if comment is None:
            dbsession.close()
            abort(404)

        # If this user is creator or admin
        if comment.uid == session.get('uid') or session.get('is_admin') == 1:
            content = request.json.get('content')
            comment.content = content
            try:
                dbsession.commit()
                return_json = {
                    'message': "Update Success!"
                }
                status = 200
            except IntegrityError:
                dbsession.rollback()
                dbsession.close()
                return_json = {
                    'message': "Update Failed!"
                }
                status = 403
                response = make_response(jsonify(return_json), status)
                return response
        else:
            return_json = {
                'message': "Update Failed!"
            }
            status = 403

        dbsession.close()
        response = make_response(jsonify(return_json), status)
        return response

    @login_required
    def delete(self, tid, rid, rrid = None):
        dbsession = DBSession()
        cid = rrid if rrid else rid
        comment = dbsession.query(Comment).filter(Comment.tid == tid,
                                                  Comment.cid == cid).first()
        # If Message Not exist
        if comment is None:
            dbsession.close()
            abort(404)

        # If this user is creator or admin
        if comment.uid == session.get('uid') or session.get('is_admin') == 1:
            if delete_tree(comment):
                return_json = {
                    'message': "Delete Success!"
                }
                status = 200
            else:
                dbsession.rollback()
                return_json = {
                    'message': "Delete Failed!"
                }
                status = 403
        else:
            return_json = {
                'message': "Delete Failed!"
            }
            status = 403

        dbsession.close()
        response = make_response(jsonify(return_json), status)
        return response
