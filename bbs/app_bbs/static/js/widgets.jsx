import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {threadLink, createButtonLink} from "./linkStyles.jsx";
import {avatarLink, usernameLink} from "./linkStyles.jsx";
import {postReplyLink, } from "./linkStyles.jsx";

import {normalButtonStyle, topBGStyle, threadEntryStyle} from "./widgetStyles.jsx"
import {forumsStyle, threadThemeStyle, likeButtonStyle} from "./widgetStyles.jsx"
import {posterInfoStyle, postBodyStyle, threadPostStyle} from "./widgetStyles.jsx"
import {createTopicStyle, postReplyStyle} from "./widgetStyles.jsx"

import {bindURL, isLogin, isAdmin, canDelete} from "./basic.jsx"

class NormalButton extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={"normal kb " + this.props.c} onClick={this.props.onClick}>
                {this.props.name}
                <style jsx> {normalButtonStyle} </style>
            </div>
            
        )
    }
};

class SmallButton extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="small kb" onClick={this.props.onClick}>
                {this.props.name}
                <style jsx> {normalButtonStyle} </style>
            </div>
            
        )
    }
};

class TopBG extends Component {
    render() {
        return (
            <div className="head_bg">
                <div className="title_wrapper">
                    <div className={this.props.title?"title-text":"title-image"}>
                        {this.props.title}
                    </div>
                </div>
                <style jsx>{topBGStyle}</style>
            </div>
        )
    }
};

class ThreadEntry extends Component {
    render() {
        return (
            <div className="topic_entry_bg">
                <div className="topic_entry">
                    <div className="row">
                        <div className="topic_entry_content c1">
                            <div className="topic_entry_col">
                                
                            </div>
                        </div>
                        <div className="topic_entry_content c2">
                            <Link to={"/thread/"+this.props.topic['tid']} className={`link topic ${threadLink.className}`}> 
                                { this.props.topic['topic_name'] } 
                            </Link>
                        </div>
                        <div className="topic_entry_content c3">
                            poster: 
                            <Link to={"/user/"+this.props.topic['uid']} className={`link author ${threadLink.className}`}> 
                                { ' '+this.props.topic['username'] } 
                            </Link>
                            <span className="postdate"> { this.props.topic['post_time'] } </span>
                        </div>
                        <div className="topic_entry_content c4">
                            <Link to={"/thread/"+this.props.topic['tid']+"#latest"} className={`link replydate ${threadLink.className}`}> 
                                last reply: 
                            </Link>
                            <Link to={"/user/"+this.props.topic['reply_uid']} className={`link author ${threadLink.className}`}> 
                                { ' '+this.props.topic['reply_username'] } 
                            </Link>
                            <span className="postdate"> { this.props.topic['reply_time'] } </span>
                        </div>
                    </div>
                </div>
                {threadLink.styles}
                <style jsx>{threadEntryStyle}</style>
            </div>
        )
    }
};

class Forums extends Component {
    constructor() {
        super();
        this.state = {
            topics: [], 
            category: "Latest",
        };
        this.initTopic = this.initTopic.bind(this);
        fetch(bindURL + '/api/topic', {
            credentials: 'include',
        })
        .then(function(response) {
            
            return response.json()
        })
        .then(this.initTopic)
        .catch(function(ex) {
            console.log('Init topic failed', ex)
        })
    }
    initTopic(json) {
        this.setState({topics: json});
    }
    refreshTopic(event, category) {
        var path = '/api/topic';
        console.log(category);
        if(category != '') {
            path = path +  '/' + category;
            category = category[0].toUpperCase() + category.slice(1);
        } else {
            category = "Latest"
        }
        this.setState({category: category})
        fetch(bindURL + path, {
            credentials: 'include',
        })
        .then(function(response) {
            return response.json()
        })
        .then(this.initTopic)
        .catch(function(ex) {
            console.log('Refresh topic failed', ex)
        })
    }
    render() {
        var topicList = [];
        for (var i = 0; i < this.state.topics.length; i++){
            topicList.push(
                <ThreadEntry topic={this.state.topics[i]} key={"topic"+i} id={i}/>
            );
        }
        return (
            <div className="mod_wrap">
                <TopBG title=""/>
                <div className="forumbox">
                    <div className="forum_spacer">
                        {
                            isLogin()
                            ?
                                <div>
                                    <Link to={"/topic/create"} className={`link ${createButtonLink.className}`}>
                                        <span className="btn_content">Post New</span>
                                    </Link>
                                </div>
                            :
                                <div></div>
                        }
                        <div className="thread-order">
                            <NormalButton name="Order: Latest" onClick={ (e) => this.refreshTopic(e, '')} c="margin-10"/>
                            <NormalButton name="Order: Hot" onClick={ (e) => this.refreshTopic(e, 'hot')} c="margin-10"/>
                        </div>
                    </div>
                    <h2 className="forum-topics-title">
                        {this.state.category + ' Topic'}
                    </h2>
                    { topicList }
                </div>
                {createButtonLink.styles}
                <style jsx>{forumsStyle}</style>
            </div>
        )
    }
};

class About extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        return (
            <div>
            </div>
        )
    }
};

class Account extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        return (
            <div>
            </div>
        )
    }
};

class Thread extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tid: this.props.match.params.id, 
        };
    }
    render() {
        return (
            <div>
                <ThreadTheme id={this.state.tid}/>
                <ThreadPosts id={this.state.tid}/>
                <ThreadReply id={this.state.tid}/>
            </div>
        )
    }
};

class ThreadTheme extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tid: this.props.id, 
            topic_name: "",
            avatar: "https://blog.kyrios.cn/wp-content/uploads/2017/04/Blood.png", 
            uid: "",
            username: "",
            content: "",
            post_time: "",
            reg_time: "",
            like_count: 0,
            is_liked: false,
            is_admin: 0,
        };
        this.initTheme = this.initTheme.bind(this);
        this.likeTheme = this.likeTheme.bind(this);
        this.deleteTheme = this.deleteTheme.bind(this);
        fetch(bindURL + '/api/topic/' + this.state.tid)
        .then(function(response) {
            return response.json()
        })
        .then(this.initTheme).catch(function(ex) {
            console.log('Init theme failed', ex)
        })
    }
    initTheme(json) {
        this.setState({
            uid: json['uid'],
            topic_name: json['topic_name'],
            username: json['username'],
            content: json['content'],
            post_time: json['post_time'],
            reg_time: json['reg_time'], 
            like_count: json['like_count'], 
            is_liked: json['is_liked']
        })
    }
    likeTheme() {
        var like_count = this.state.is_liked ? this.state.like_count-1 : this.state.like_count+1;
        var method = '';
        if (isLogin()) {
            if(this.state.is_liked) {
                method = 'DELETE';
            } else {
                method = 'POST';
            }
            fetch(bindURL + '/api/agree/' + this.state.tid, {
                method: method,
                credentials: 'include',
            })
            .then(function(response) {
                if(response.status == 200) {
                    console.log('Like: ' +method+' success.');
                } else {
                    console.log('Like: ' +method+' failed.');
                }
            }).catch(function(ex) {
                console.log('Like error.', ex)
            })
            this.setState({
                is_liked: this.state.is_liked ^ 1, 
                like_count: like_count
            })
        } else {
            console.log('Please login to Continue. [Like]');
        }  
    }
    deleteTheme() {
        console.log('Delete tid '+this.state.tid);
        fetch(bindURL + '/api/topic/' + this.state.tid, {
            method: 'DELETE',
            credentials: 'include',
        })
        .then(function(response) {
            if(response.status == 200) {
                console.log('Delete success.');
                location.replace(location.origin);
            } else {
                console.log('Delete failed.');
            }
        })
    }
    render() {
        return (
            <div>
                <TopBG title={this.state.topic_name} />
                <div className="thread-theme">
                    <div className="forum-post">
                        <PosterInfo uid={this.state.uid} username={this.state.username} reg_time={this.state.reg_time} avatar={this.state.avatar} lvl={this.state.is_admin?"lvl2":"lvl1"}/>
                        <div className="forum-post-body">
                            <PostBody uid={this.state.uid} is_liked={this.state.is_liked} like_count={this.state.like_count} post_time={this.state.post_time} content={this.state.content} likeAction={this.likeTheme} deleteAction={this.deleteTheme}/>
                        </div>
                    </div>
                    <style jsx>{threadThemeStyle}</style>
                </div>
            </div>
        )
    }
};

class ThreadPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tid: this.props.id, 
            posts: []
        };
        this.initTheme = this.initTheme.bind(this);
        fetch(bindURL + '/api/posts/' + this.state.tid)
        .then(function(response) {
            return response.json()
        })
        .then(this.initTheme).catch(function(ex) {
            console.log('Init posts failed', ex)
        })
    }
    initTheme(json) {
        this.setState({posts: json})
    }
    render() {
        var postList = [];
        for (var i = 0; i < this.state.posts.length; i++){
            postList.push(
                <ThreadPost post={this.state.posts[i]} tid={this.state.tid} key={'post'+i}/>
            );
        }
        return (
            <div>
                {postList}
            </div>
        )
    }
};

class ThreadPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tid: this.props.tid,
            rid: this.props.post['rid'], 
            uid: this.props.post['uid'],
            username: this.props.post['username'],
            reg_time: this.props.post['reg_time'],
            post_time: this.props.post['post_time'],
            content: this.props.post['content'],
            like_count: this.props.post['like_count'],
            is_liked: this.props.post['is_liked'],
            reply: this.props.post['reply'],
            avatar: "https://blog.kyrios.cn/wp-content/uploads/2017/04/Blood.png", 
            is_admin: 0,
        };
        this.likePost = this.likePost.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }
    likePost() {
        var like_count = this.state.is_liked ? this.state.like_count-1 : this.state.like_count+1;
        var method = '';
        if (isLogin()) {
            if(this.state.is_liked) {
                method = 'DELETE';
            } else {
                method = 'POST';
            }
            fetch(bindURL+'/api/agree/'+this.state.tid+'/'+this.state.rid, {
                method: method,
                credentials: 'include',
            })
            .then(function(response) {
                if(response.status == 200) {
                    console.log('Like: ' +method+' success.');
                } else {
                    console.log('Like: ' +method+' failed.');
                }
            }).catch(function(ex) {
                console.log('Like error.', ex)
            })
            this.setState({
                is_liked: this.state.is_liked ^ 1, 
                like_count: like_count
            })
        } else {
            console.log('Please login to Continue. [Like]');
        }  
    }
    deletePost() {
        console.log('Delete tid '+this.state.tid+' rid '+this.state.rid);
        fetch(bindURL + '/api/posts/' + this.state.tid + '/' + this.state.rid, {
            method: 'DELETE',
            credentials: 'include',
        })
        .then(function(response) {
            if(response.status == 200) {
                console.log('Delete success.');
                location.replace(location.href);
            } else {
                console.log('Delete failed.');
            }
        })
    }
    render() {
        return (
            <div className="thread-post">
                <div className="forum-post">
                    <PosterInfo uid={this.state.uid} username={this.state.username} reg_time={this.state.reg_time} avatar={this.state.avatar} lvl={this.state.is_admin?"lvl2":"lvl1"}/>
                    <div className="forum-post-body">
                        <PostBody uid={this.state.uid} is_liked={this.state.is_liked} like_count={this.state.like_count} post_time={this.state.post_time} content={this.state.content} likeAction={this.likePost} deleteAction={this.deletePost}/>
                        <PostReplies tid={this.state.tid} rid={this.state.rid} reply={this.state.reply} />
                    </div>
                </div>
                <style jsx>{threadPostStyle}</style>
            </div>
        )
    }
};

class ThreadReply extends Component {
    /* To-Do: rebuild with CreateTopic */
    constructor(props) {
        super(props);
        this.state = {
            tid: this.props.id,
            content: "",
            avatar: "https://blog.kyrios.cn/wp-content/uploads/2017/04/Blood.png", 
            uid: "",
            nickname: "",
            reg_time: "",
        };
        this.initUserInfo = this.initUserInfo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.postReply = this.postReply.bind(this);
        {/* To-Do: Optimize */}
        fetch(bindURL + '/api/users', {
            credentials: 'include',
        })
        .then(function(response) {
            return response.json()
        })
        .then(this.initUserInfo).catch(function(ex) {
            console.log('Init user info failed', ex)
        })
    }
    initUserInfo(json) {
        this.setState({
            uid: json['uid'],
            nickname: json['nickname'],
            reg_time: json['reg_time'], 
        })
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    postReply() {
        if (this.state.content.length != 0) {
            fetch(bindURL + '/api/posts/' + this.state.tid, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({
                    'content': this.state.content,
                })
            })
            .then(function(response) {
                if(response.status == 200) {
                    console.log("Post success.");
                    {/*location.replace(location.href);*/}
                } else {
                    console.log("Post failed.");
                }
            }).catch(function(ex) {
                console.log('Thread reply error.', ex)
            })
        } else {
            console.log("Empty content.")
        }
    }
    render() {
        var contentInput = (
            <React.Fragment>
                <textarea 
                    name="content"
                    placeholder="Type post content here"
                    className='content-input'
                    onChange={this.handleChange}/>
                <style jsx>{createTopicStyle}</style>
            </React.Fragment>
        );
        return (
            <div className="reply-wrapper">
                <div className="thread-post">
                    <div className="forum-post">
                        <PosterInfo uid={this.state.uid} username={this.state.nickname} reg_time={this.state.reg_time} avatar={this.state.avatar} lvl={isAdmin()?"lvl2":"lvl1"}/>
                        <div className="forum-post-body">
                            <div className="content-wrapper">
                                <div className="content">
                                    {contentInput}
                                </div>
                            </div>
                            <div className="edit-bar">
                                <div className="editor-footer">
                                    <NormalButton name="Post" onClick={this.postReply}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <style jsx>{createTopicStyle}</style>
                <style jsx>{threadPostStyle}</style>
                <style jsx>{postBodyStyle}</style>
                <style jsx>{threadThemeStyle}</style>
            </div>
        )
    }
};

class PosterInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className={"info "+this.props.lvl}>
                <div className="info-main">
                    <div className="avatar_wrapper">
                        <Link to={"/users/"+this.props.uid} className={`link ${avatarLink.className}`}>
                            <img className="avatar" src={this.props.avatar}/>
                        </Link>
                    </div>   
                    <Link to={"/users/"+this.props.uid} className={`link ${usernameLink.className}`}>
                        {this.props.username}
                    </Link>
                </div>
                <div className="info-extra">
                    <div className="info-extra-buttom">
                        {"Joined from: "+this.props.reg_time.split('月')[0]+"月"}
                    </div> 
                </div>
                {avatarLink.styles}
                {usernameLink.styles}
                <style jsx>{posterInfoStyle}</style>
            </div>
        )
    }
};

class PostBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <div>
                <div className="header-wrapper">
                    <LikeButton is_liked={this.props.is_liked} like_count={this.props.like_count} likeAction={this.props.likeAction}/>
                    <div className="header">
                        {
                            canDelete(this.props.uid)
                            ?
                                <div className='header-warning' onClick={this.props.deleteAction}>
                                    <span className='svg-wrapper'>
                                        <svg className="warning-svg" fill="currentColor" viewBox="0 0 24 24" width="16" height="16">
                                            <path d="M16.464 4s.051-2-1.479-2H9C7.194 2 7.465 4 7.465 4H4.752c-2.57 0-2.09 3.5 0 3.5l1.213 13.027S5.965 22 7.475 22h8.987c1.502 0 1.502-1.473 1.502-1.473l1.2-13.027c2.34 0 2.563-3.5 0-3.5h-2.7zM8.936 18.5l-.581-9h1.802v9H8.936zm4.824 0v-9h1.801l-.61 9H13.76z" fillRule="evenodd">
                                            </path>
                                        </svg>
                                    </span>
                                    Delete
                                </div>
                            :
                                <div></div>
                        }
                        {this.props.post_time}
                    </div>
                </div>
                <div className="content-wrapper">
                    <div className="content">
                        {this.props.content}
                    </div>
                </div>
                <style jsx>{postBodyStyle}</style>
            </div>
        )
    }
};

class PostReplies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tid: this.props.tid,
            rid: this.props.rid,
            replies: this.props.reply,
            panel: false,
            rcontent: '',
        };
        this.showReplyPanel = this.showReplyPanel.bind(this);
        this.postReplyReply = this.postReplyReply.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    showReplyPanel() {
        this.setState({panel: this.state.panel ^ 1})
    }
    postReplyReply() {
        if(this.state.rcontent.length != 0) {
            fetch(bindURL+'/api/posts/'+this.state.tid+'/'+this.state.rid, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({
                    'content': this.state.rcontent,
                })
            })
            .then(function(response) {
                if(response.status == 200) {
                    console.log("Post success.");
                    location.replace(location.href);
                } else {
                    console.log("Post failed.");
                }
            }).catch(function(ex) {
                console.log('Thread reply error.', ex)
            })
        } else {
            console.log("Empty reply content.");
        }
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        var replyList = [];
        for (var i = 0; i < this.state.replies.length; i++){
            replyList.push(
                <PostReply reply={this.state.replies[i]} tid={this.state.tid} rid={this.state.rid} key={'rep'+i}/>
            );
        }
        return (
            <div className='reply-wrapper'>
                <div className='reply-menu'>
                    {replyList}
                    <div className='reply-footer'>
                        <SmallButton name='Reply' onClick={this.showReplyPanel}/>
                    </div>
                    {
                        this.state.panel
                        ?
                            <div className='reply-reply'>
                                <textarea 
                                    name="rcontent"
                                    placeholder="Type post content here"
                                    className='rcontent-input'
                                    onChange={this.handleChange}/>
                                <div className='reply-footer'>
                                    <SmallButton name='Post' onClick={this.postReplyReply}/>
                                </div>
                            </div>
                        :
                            <div></div>
                    }
                </div>
                <style jsx>{postReplyStyle}</style>
            </div>
        )
    }
};

class PostReply extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tid: this.props.tid,
            rid: this.props.rid,
            rrid: this.props.reply['rrid'],
            uid: this.props.reply['uid'], 
            username: this.props.reply['username'], 
            post_time: this.props.reply['post_time'], 
            content: this.props.reply['content'], 
            like_count: this.props.reply['like_count'], 
            is_liked: this.props.reply['is_liked'], 
        };
        this.deleteReply = this.deleteReply.bind(this);
    }
    deleteReply() {
        console.log('Delete tid '+this.state.tid+' rid '+this.state.rid+' rrid '+this.state.rrid);
        fetch(bindURL+'/api/posts/'+this.state.tid+'/'+this.state.rid+'/'+this.state.rrid, {
            method: 'DELETE',
            credentials: 'include',
        })
        .then(function(response) {
            if(response.status == 200) {
                console.log('Delete success.');
                location.replace(location.href);
            } else {
                console.log('Delete failed.');
            }
        })
    }
    render() {
        return (
            <div className='reply-singleline'>
                <div className='reply-linebody'>
                    <Link to={"/users/" + this.state.uid} className={`responder ${postReplyLink.className}`}>
                        {this.state.username + ': '}
                    </Link>
                    <div className='reply-content'>
                        {this.state.content}
                    </div>
                </div>
                <div className='time-wrapper'>
                    <div className="header">
                        {/* To-Do: rebuild with postBody */}
                        {
                            canDelete(this.state.uid)
                            ?
                                <div className='header-warning' onClick={this.deleteReply}>
                                    <span className='svg-wrapper'>
                                        <svg className="warning-svg" fill="currentColor" viewBox="0 0 24 24" width="16" height="16">
                                            <path d="M16.464 4s.051-2-1.479-2H9C7.194 2 7.465 4 7.465 4H4.752c-2.57 0-2.09 3.5 0 3.5l1.213 13.027S5.965 22 7.475 22h8.987c1.502 0 1.502-1.473 1.502-1.473l1.2-13.027c2.34 0 2.563-3.5 0-3.5h-2.7zM8.936 18.5l-.581-9h1.802v9H8.936zm4.824 0v-9h1.801l-.61 9H13.76z" fillRule="evenodd">
                                            </path>
                                        </svg>
                                    </span>
                                    Delete
                                </div>
                            :
                                <div></div>
                        }
                        <div className='reply-time'>
                            {this.state.post_time}
                        </div>
                    </div>
                </div>
                {postReplyLink.styles}
                <style jsx>{postBodyStyle}</style>
                <style jsx>{postReplyStyle}</style>
            </div>
        )
    }
};

class LikeButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <div>
                <a className={(this.props.is_liked?"is-liked":"like")+' '+"like-button"} onClick={this.props.likeAction}>
                    <span className="svg-wrapper">
                        <svg className="like-svg" fill="currentColor" width="16" height="16" viewBox="0 0 24 24">
                            <path d="M14.445 9h5.387s2.997.154 1.95 3.669c-.168.51-2.346 6.911-2.346 6.911s-.763 1.416-2.86 1.416H8.989c-1.498 0-2.005-.896-1.989-2v-7.998c0-.987.336-2.032 1.114-2.639 4.45-3.773 3.436-4.597 4.45-5.83.985-1.13 3.2-.5 3.037 2.362C15.201 7.397 14.445 9 14.445 9zM3 9h2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1z"></path>
                        </svg>
                    </span>
                    {this.props.like_count}
                </a>
                <style jsx>{likeButtonStyle}</style>
            </div>
        )
    }
};

class CreateTopic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topic_name: "",
            content: "",
            avatar: "https://blog.kyrios.cn/wp-content/uploads/2017/04/Blood.png", 
            uid: "",
            nickname: "",
            reg_time: "",
        };
        this.initUserInfo = this.initUserInfo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.postTopic = this.postTopic.bind(this);
        fetch(bindURL + '/api/users', {
            credentials: 'include',
        })
        .then(function(response) {
            return response.json()
        })
        .then(this.initUserInfo).catch(function(ex) {
            console.log('Init user info failed', ex)
        })
    }
    initUserInfo(json) {
        this.setState({
            uid: json['uid'],
            nickname: json['nickname'],
            reg_time: json['reg_time'], 
        })
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    postTopic() {
        fetch(bindURL + '/api/topic', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                'topic_name': this.state.topic_name,
                'content': this.state.content,
            })
        })
        .then(function(response) {
            if(response.status == 200) {
                console.log('Create topic success.');
            } else {
                console.log('Create topic failed.');
            }
        }).catch(function(ex) {
            console.log('Create topic error.', ex)
        })
    }
    render() {
        var titleInput = (
            <React.Fragment>
                <input 
                    name="topic_name"
                    placeholder="Click here to set title"
                    maxLength="100"
                    className='title-input'
                    onChange={this.handleChange}/>
                <style jsx>{createTopicStyle}</style>
            </React.Fragment>
            
        );
        var contentInput = (
            <React.Fragment>
                <textarea 
                    name="content"
                    placeholder="Type post content here"
                    className='content-input'
                    onChange={this.handleChange}/>
                <style jsx>{createTopicStyle}</style>
            </React.Fragment>
        );
        return (
            <div>
                <TopBG title={titleInput} />
                <div className="thread-theme">
                    <div className="forum-post">
                        <PosterInfo uid={this.state.uid} username={this.state.nickname} reg_time={this.state.reg_time} avatar={this.state.avatar} lvl="lvl1"/>
                        <div className="forum-post-body">
                            <div className="content-wrapper">
                                <div className="content">
                                    {contentInput}
                                </div>
                            </div>
                            <div className="edit-bar">
                                <div className="editor-footer">
                                    <NormalButton name="Post" onClick={this.postTopic}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <style jsx>{createTopicStyle}</style>
                    <style jsx>{postBodyStyle}</style>
                    <style jsx>{threadThemeStyle}</style>
                </div>
            </div>
        )
    }
};

module.exports = {
    bindURL: bindURL,
    TopBG: TopBG,
    Forums: Forums, 
    About: About,
    Thread: Thread,
    Account: Account,
    CreateTopic: CreateTopic,
}