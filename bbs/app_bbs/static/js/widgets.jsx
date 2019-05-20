import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {topbarLink, threadLink, createButtonLink} from "./linkStyles.jsx";
import {avatarLink, usernameLink, userMenuLink} from "./linkStyles.jsx";

import {topBarStyle, topBGStyle, ThreadEntryStyle} from "./widgetStyles.jsx"
import {forumsStyle, threadThemeStyle, likeButtonStyle} from "./widgetStyles.jsx"
import {posterInfoStyle, postBodyStyle, threadPostStyle} from "./widgetStyles.jsx"
import {panelStyle, panelBoxStyle, normalButtonStyle} from "./widgetStyles.jsx"

var bindURL = "http://119.28.22.85:6712";

function getCookieItem(sKey) {
    return document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + sKey.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1");
}

function isLogin() {
    return getCookieItem('isLogin') == 'true';
}

class TopBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            panel: false,
            focusText: 'Login',
            uid: -1,
            user: null,
        };
        this.initTopbar = this.initTopbar.bind(this);
        this.showPanel = this.showPanel.bind(this);
        if (isLogin()) {
            fetch(bindURL + '/api/users', {
                credentials: 'include',
            })
            .then(function(response) {
                return response.json();
            })
            .then(this.initTopbar)
            .catch(function(ex) {
                console.log('Init topbar failed', ex)
            })
        }
    }
    initTopbar(json) {
        this.setState({
            uid: json['uid'],
            focusText: json['nickname'],
            user: json
        })
    }
    showPanel() {
        this.setState({panel: this.state.panel ^ 1})
    }
    render() {
        return (
            <div>
                <div id="mainmenu">
                    <div className="nav">
                        <div className="left">
                            <div className="ul">
                                <div className="li">
                                    <Link to="/" className={`link ${topbarLink.className}`}>
                                        <img style={{height: 50+'px'}} src="https://blog.kyrios.cn/wp-content/uploads/2019/04/auto-bbs.png"/>
                                    </Link>
                                </div>
                                <div className="li">
                                    <Link to="/" className={`link ${topbarLink.className}`}>Home</Link>
                                </div>
                                <div className="li">
                                    <Link to="/about" className={`link ${topbarLink.className}`}>About</Link>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <div className="li">
                                <div
                                    className="active link"
                                    onClick={this.showPanel}>
                                    { this.state.focusText }
                                </div>
                            </div>
                            <div>
                                {
                                    isLogin()
                                    ?
                                        this.state.user
                                        ?
                                            <UserMenuPanel visible={this.state.panel} user={this.state.user}/>
                                        :
                                            <div></div>
                                    :
                                        <LoginRegisterPanel visible={this.state.panel}/>
                                }
                            </div>
                        </div>
                    </div>
                    {topbarLink.styles}
                    <style jsx>{topBarStyle}</style>
                </div>
                
            </div>
        )
    }
};

class UserMenuPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: this.props.user['uid']
        };
    }
    render() {
        return (
            <div className="um-panel-wrapper">
                { 
                    this.props.visible
                    ?
                        <div className="lr-panel">
                            <div className="um-panel-content">
                                <Link to={'/users/'+this.state.uid} className={`menu ${userMenuLink.className}`}>
                                    Info
                                </Link>
                                <Link to={'/account'} className={`menu ${userMenuLink.className}`}>
                                    Setting
                                </Link>
                                <div className='um-panel-menu' onClick={this.logout}>
                                    Logout
                                </div>
                            </div>
                        </div>
                    :   
                        <div></div>
                }
                {usernameLink.styles}
                <style jsx>{panelStyle}</style>
            </div>
        );
    }
};

class LoginRegisterPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginActive: true,
        };
        this.showLoginBox = this.showLoginBox.bind(this)
        this.showRegisterBox = this.showRegisterBox.bind(this)
    }
    showLoginBox() {
        this.setState({loginActive: true})
    }
    showRegisterBox() {
        this.setState({loginActive: false})
    }
    render() {
        return (
            <div className="lr-panel-wrapper">
                { 
                    this.props.visible
                    ?
                        <div className="lr-panel">
                            <div className="lr-panel-content">
                                <div className="box-controller">
                                    <div 
                                        className={"controller " + (this.state.loginActive
                                            ? "selected" : "")} 
                                        onClick={this.showLoginBox}>
                                        Login
                                    </div>
                                    <div
                                        className={"controller " + (this.state.loginActive 
                                            ? "" : "selected")}
                                        onClick={this.showRegisterBox}>
                                        Register
                                    </div>
                                </div>
                                <div>
                                    {this.state.loginActive ? <LoginBox/> : <RegisterBox/>}
                                </div>
                            </div>
                        </div>
                    :   
                        <div></div>
                }
                <style jsx>{panelStyle}</style>
            </div>
        );
    }
};

class NormalButton extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="nb" onClick={this.props.onClick}>
                {this.props.name}
                <style jsx> {normalButtonStyle} </style>
            </div>
            
        )
    }
};

class LoginBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };
        this.validateForm = this.validateForm.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.login = this.login.bind(this)
    }
    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    login(e) {
        e.preventDefault();
        {/* WARNING!!: Delete DEBUG line after development plz. */}
        console.log("[l]: username: %s, password: %s", this.state.username, this.state.password)
        if(this.validateForm()){
            fetch(bindURL + "/api/login", {
                method: 'POST',
                headers: new Headers({
                    'content-type': 'application/json',
                }),
                credentials: 'include',
                mode: 'cors',
                body: JSON.stringify({
                    'username': this.state.username,
                    'password': this.state.password
                })
            })
            .then(function(response) {
                if (response.status == 200) {
                    console.log("Login Success.")
                    location.replace(location.href);
                } else {
                    console.log('Login Failed.')
                }
            })
        }
    }
    render() {
        return (
            <div className="panel-box">
                <input 
                    name="username"
                    placeholder="Username" 
                    onChange={this.handleChange}/>
                <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={this.handleChange}/>
                <div className="panel-box-buttom">
                    <NormalButton onClick={this.login} name="Login" />
                </div>
                <style jsx>{panelBoxStyle}</style>
            </div>
        )
    }
};

class RegisterBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };
        this.validateForm = this.validateForm.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.register = this.register.bind(this)
    }
    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    register(e) {
        e.preventDefault();
        {/* WARNING!!: Delete DEBUG line after development plz. */}
        console.log("[r]: username: %s, password: %s", this.state.username, this.state.password)
        if(this.validateForm()){
            fetch(bindURL + "/api/users", {
                method: 'POST',
                headers: new Headers({
                    'content-type': 'application/json',
                }),
                mode: 'cors',
                body: JSON.stringify({
                    'username': this.state.username,
                    'password': this.state.password
                })
            })
            .then(function(response) {
                if (response.status == 200) {
                    console.log("Register Success.")
                } else {
                    console.log('Register Failed.')
                }
            })
        }
    }
    render() {
        return (
            <div className="panel-box">
                <input 
                    name="username"
                    placeholder="username" 
                    onChange={this.handleChange}/>
                <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={this.handleChange}/>
                <div className="panel-box-buttom">
                    <NormalButton onClick={this.register} name="Register" />
                </div>
                <style jsx>{panelBoxStyle}</style>
            </div>
        )
    }
};

class TopBG extends Component {
    render() {
        return (
            <div className="head_bg">
                <div className="title_wrapper">
                    <div className={this.props.title.length?"title-text":"title-image"}>
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
                            <a className="replies"> { this.props.topic['replies'] } </a>
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
                <style jsx>{ThreadEntryStyle}</style>
            </div>
        )
    }
};

class Forums extends Component {
    constructor() {
        super();
        this.state = {
            topics: [], 
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
                        <Link to={"/topic/create"} className={`link ${createButtonLink.className}`}>
                            <span className="btn_content">Post New</span>
                        </Link>
                    </div>
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

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: this.props.match.params.id, 
        };
    }
    render() {
        return (
            <div>
                {
                    isLogin()
                    ?
                        <div>
                            <UserInfo/>
                            <RelateActive/>
                            <HighLights/>
                        </div>
                    :
                        <div>
                            'Please Login First.'
                        </div>
                }
            </div>
        )
    }
};

class UserInfo extends Component {
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

class RelateActive extends Component {
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

class HighLights extends Component {
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
                        {"Register time: "+this.props.reg_time.split('月')[0]+"月"}
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

        };
        this.initTheme = this.initTheme.bind(this);
        this.likeAction = this.likeAction.bind(this);
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
    likeAction(event) {
        var like_count = this.state.is_liked ? this.state.like_count-1 : this.state.like_count+1;
        this.setState({
            is_liked: this.state.is_liked ^ 1, 
            like_count: like_count
        })
    }
    render() {
        return (
            <div>
                <TopBG title={this.state.topic_name} />
                <div className="thread-theme">
                    <div className="forum-post">
                        <PosterInfo uid={this.state.uid} username={this.state.username} reg_time={this.state.reg_time} avatar={this.state.avatar} lvl="lvl1"/>
                        <div className="forum-post-body">
                            <PostBody is_liked={this.state.is_liked} like_count={this.state.like_count} post_time={this.state.post_time} content={this.state.content} likeAction={this.likeAction}/>
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
                <ThreadPost post={this.state.posts[i]} id={i} key={'post'+i}/>
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
        };
        this.likeAction = this.likeAction.bind(this);
    }
    likeAction(event) {
        var like_count = this.state.is_liked ? this.state.like_count-1 : this.state.like_count+1;
        if (isLogin()) {
            this.setState({
                is_liked: this.state.is_liked ^ 1, 
                like_count: like_count
            })
        } else {
            console.log('Please login to Continue. [Like]');
        }
        
    }
    render() {
        return (
            <div className="thread-post">
                <div className="forum-post">
                    <PosterInfo uid={this.state.uid} username={this.state.username} reg_time={this.state.reg_time} avatar={this.state.avatar} lvl="lvl1"/>
                    <div className="forum-post-body">
                        <PostBody is_liked={this.state.is_liked} like_count={this.state.like_count} post_time={this.state.post_time} content={this.state.content} likeAction={this.likeAction}/>
                        <PostReplies reply={this.state.reply} />
                    </div>
                </div>
                <style jsx>{threadPostStyle}</style>
            </div>
        )
    }
};

class PostReplies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            replies: this.props.reply
        };
    }

    render() {
        var replyList = [];
        for (var i = 0; i < this.state.replies.length; i++){
            replyList.push(
                <PostReply reply={this.state.replies[i]} id={i} key={'rep'+i}/>
            );
        }
        return (
            <div>
                {replyList}
            </div>
        )
    }
};

class PostReply extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: this.props.reply['uid'], 
            username: this.props.reply['username'], 
            post_time: this.props.reply['post_time'], 
            content: this.props.reply['content'], 
            like_count: this.props.reply['like_count'], 
            is_liked: this.props.reply['is_liked'], 
        };
    }

    render() {
        
        return (
            <div>
                {/* To-Do */}
            </div>
        )
    }
};

class ThreadReply extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tid: this.props.id
        };
    }

    render() {
        return (
            <div>
            </div>
        )
    }
};

module.exports = {
    bindURL: bindURL,
    TopBar: TopBar,
    TopBG: TopBG,
    Forums: Forums, 
    About: About,
    User: User,
    Thread: Thread,
    Account: Account,
}