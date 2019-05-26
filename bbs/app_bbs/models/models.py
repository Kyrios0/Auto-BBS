# coding: utf-8
from sqlalchemy import Column, DateTime, ForeignKey, String, text, create_engine
from sqlalchemy.dialects.mysql import BIT, INTEGER, MEDIUMTEXT
from sqlalchemy.orm import relationship
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import scoped_session
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.exc import IntegrityError

import config

Base = declarative_base()
metadata = Base.metadata
engine = create_engine(config.MYSQLALCHEMY_DATABSE_URI, pool_size = 0)
session_factory = sessionmaker(bind = engine)
DBSession = scoped_session(session_factory)


def set_hot_list(data):
    global hot_list_cache
    hot_list_cache = data

class HotListCache:
    def __init__(self, data):
        self.hot_list_cache = data

    def set_hot(self, data):
        self.hot_list_cache = data

    def get_hot(self):
        return self.hot_list_cache

hot_list_cache = HotListCache(123)

class User(Base):
    __tablename__ = 'user'

    uid = Column(INTEGER(11), primary_key=True)
    nickname = Column(String(255), nullable=False, server_default=text("''"))
    avatar = Column(String(255), nullable=False, server_default=text("''"))
    email = Column(String(255), nullable=False, server_default=text("''"))
    tel = Column(String(255))
    is_admin = Column(BIT(1))
    username = Column(String(255), nullable=False)
    password = Column(String(255), nullable=False)
    reg_time = Column(DateTime, nullable=False)
    selfinfo = Column(String(255))

class Topic(Base):
    __tablename__ = 'topic'

    tid = Column(INTEGER(11), primary_key=True)
    topic_name = Column(String(255), nullable=False, server_default=text("''"))
    topic_type = Column(String(255))
    content = Column(MEDIUMTEXT)
    uid = Column(ForeignKey('user.uid'), nullable=False, index=True)
    time = Column(DateTime, nullable=False)
    latest_update_time = Column(DateTime, nullable=False)
    user = relationship('User')


class Comment(Base):
    __tablename__ = 'comment'

    cid = Column(INTEGER(11), primary_key=True)
    uid = Column(ForeignKey('user.uid'), nullable=False, index=True, server_default=text("'0'"))
    time = Column(DateTime, nullable=False)
    replyid = Column(INTEGER(11))
    content = Column(MEDIUMTEXT)
    tid = Column(ForeignKey('topic.tid'), index=True)

    topic = relationship('Topic')
    user = relationship('User')


class TopicAgree(Base):
    __tablename__ = 'topic_agree'

    id = Column(INTEGER(11), primary_key=True)
    tid = Column(ForeignKey('topic.tid'), index=True)
    uid = Column(ForeignKey('user.uid'), index=True)

    topic = relationship('Topic')
    user = relationship('User')


class CommentAgree(Base):
    __tablename__ = 'comment_agree'

    id = Column(INTEGER(11), primary_key=True)
    uid = Column(ForeignKey('user.uid'), index=True)
    cid = Column(ForeignKey('comment.cid'), index=True)

    comment = relationship('Comment')
    user = relationship('User')


