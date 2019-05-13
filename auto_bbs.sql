# Host: localhost  (Version: 5.5.53)
# Date: 2019-05-13 12:34:00
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "user"
#

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) NOT NULL DEFAULT '',
  `avatar` varchar(255) NOT NULL DEFAULT '',
  `email` varchar(255) NOT NULL DEFAULT '',
  `tel` varchar(255) DEFAULT NULL,
  `is_admin` bit(1) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

#
# Data for table "user"
#

INSERT INTO `user` VALUES (1,'blacsheep','/etc/passwd','110@qq.com','110',b'0','blacsheep','38bc96c0154510d6e79be5f559ae7b66'),(2,'kyr1os','/etc/passwd','120@qq.com','120',b'1','kyr1os','38bc96c0154510d6e79be5f559ae7b66'),(3,'TGWarwolf','/etc/passwd','119@qq.com','119',b'1','TGWarwolf','38bc96c0154510d6e79be5f559ae7b66'),(4,'EliAyase','/etc/passwd','520@qq.com','520',b'1','EliAyase','38bc96c0154510d6e79be5f559ae7b66'),(5,'dujianguai','/uploads/default.jpg','13333@qq.com','123456',b'0','suibianquyige','38bc96c0154510d6e79be5f559ae7b66');

#
# Structure for table "topic"
#

DROP TABLE IF EXISTS `topic`;
CREATE TABLE `topic` (
  `tid` int(11) NOT NULL AUTO_INCREMENT,
  `topic_name` varchar(255) NOT NULL DEFAULT '',
  `topic_type` varchar(255) DEFAULT NULL COMMENT 'Maybe used later',
  `content` mediumtext,
  `uid` int(11) NOT NULL,
  `time` datetime NOT NULL,
  `latest_update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`tid`),
  KEY `fk_user_uid_uid1` (`uid`),
  CONSTRAINT `fk_user_uid_uid1` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

#
# Data for table "topic"
#

INSERT INTO `topic` VALUES (1,'topic1','游戏','AutoChess天下第一',1,'2019-03-14 21:45:14','2019-03-15 21:52:10'),(2,'topic2','讨论','赌狗天下第一!',1,'2019-03-23 21:48:14','2019-03-13 21:52:54');

#
# Structure for table "topic_agree"
#

DROP TABLE IF EXISTS `topic_agree`;
CREATE TABLE `topic_agree` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tid` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_topic_tid_tid_ta` (`tid`),
  KEY `fk_user_uid_uid_ta` (`uid`),
  CONSTRAINT `fk_topic_tid_tid_ta` FOREIGN KEY (`tid`) REFERENCES `topic` (`tid`),
  CONSTRAINT `fk_user_uid_uid_ta` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

#
# Data for table "topic_agree"
#

INSERT INTO `topic_agree` VALUES (1,1,1);

#
# Structure for table "comment"
#

DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL DEFAULT '0' COMMENT '评价者id',
  `time` datetime NOT NULL,
  `replyid` int(11) DEFAULT NULL COMMENT '回复的评论的id',
  `content` mediumtext,
  `tid` int(11) DEFAULT NULL,
  PRIMARY KEY (`cid`),
  KEY `fk_user_uid_uid` (`uid`),
  KEY `fk_topic_tid_tid_c` (`tid`),
  CONSTRAINT `fk_topic_tid_tid_c` FOREIGN KEY (`tid`) REFERENCES `topic` (`tid`),
  CONSTRAINT `fk_user_uid_uid` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

#
# Data for table "comment"
#

INSERT INTO `comment` VALUES (1,2,'2019-03-14 21:51:05',-1,'tid = 1 and cid = 1 and replyid = -1',1),(2,3,'2019-03-15 21:52:10',1,'tid = 1 and cid = 2 and replyid = 1',1),(3,4,'2019-03-13 21:52:54',-1,'tid = 2 and cid = 3 and replyid = -1',2),(4,2,'2019-04-17 21:52:10',-1,'tid = 1 and cid = 4 and replyid = -1',1);

#
# Structure for table "comment_agree"
#

DROP TABLE IF EXISTS `comment_agree`;
CREATE TABLE `comment_agree` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `cid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_uid_uid_ca` (`uid`),
  KEY `fk_comment_cid_cid_ca` (`cid`),
  CONSTRAINT `fk_comment_cid_cid_ca` FOREIGN KEY (`cid`) REFERENCES `comment` (`cid`),
  CONSTRAINT `fk_user_uid_uid_ca` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

#
# Data for table "comment_agree"
#

INSERT INTO `comment_agree` VALUES (1,1,1);
