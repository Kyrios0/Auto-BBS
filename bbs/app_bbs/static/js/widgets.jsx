import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {topbarLink, threadLink, createButtonLink} from "./linkStyles.jsx";
import {avatarLink, usernameLink} from "./linkStyles.jsx";

class TopBar extends Component {
    render() {
        return (
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
                        <div className="li"><Link className={`active link ${topbarLink.className}`} to="/login">Login</Link></div>
                    </div>
                </div>
                {topbarLink.styles}
                <style jsx>{`
                    #mainmenu {
                        overflow: hidden;
                        margin: 0 0 198px 0;
                        background-color: rgb(34, 34, 34);
                    }
                    .nav {
                        max-width: 1000px;
                        margin: 0 auto;
                    }
                    .left {
                        display: flex;
                    }
                    .right {
                        display: flex;
                        justify-content: flex-end;
                        flex: 1 1;
                        align-items: center;
                    }
                    .ul {
                        background-color: rgb(34, 34, 34);
                    }
                    .li {
                        float: left;
                        font-size: 1.085em;
                    }
                `}</style>
            </div>
        )
    }
};

class TopBG extends Component {
    render() {
        return (
            <div className="head_bg">
                <div className="title_wrapper">
                    <div className="title">
                        
                    </div>
                </div>
                <div className="head_shadow">
                </div>
                <style jsx>{`
                    .head_bg {
                        height: 190px;
                        margin: 65px auto -255px auto;
                        max-width: 1000px;
                        overflow: hidden;
                        background: rgba(0, 0, 0, 0) url("https://blog.kyrios.cn/wp-content/uploads/2019/04/bbs_head2.jpg") repeat scroll left bottom;
                    }
                    .title_wrapper {
                        margin-bottom: -147px;
                        padding-top: 100px;
                        text-align: left;
                    }
                    .title {
                        margin: -54px 70px;
                        width: 237px;
                        height: 100px;
                        background: rgba(0, 0, 0, 0) url("https://blog.kyrios.cn/wp-content/uploads/2019/03/logow_100px.png") repeat scroll 0% 0%;
                    }
                    .head_shadow {
                        height: 191px;
                        box-shadow: black 0px 0px 1.5em 0px inset;
                        background: rgba(0, 0, 0, 0) url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAC/CAMAAAAIC0a+AAADAFBMVEUAAAD//O7//O4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC02DAuAAABAHRSTlMAADIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGgA3PAAAAYlJREFUeNoBfgGB/gABAAIAAQACAAEAAgABAAIAAQACAAEAAgABAAIAAQACAAEAAgABAAIAAQACAAEAAgABAAIAAQACAAEAAgABAAIAAQACAAEAAgABAAIAAQACAAEAAgABAAIAAQACAAEAAgABAAIAAQACAAEAAgABAAIAAQACAAEAAgABAAIAAQACAAEAAgABAAIAAQACAAEAAgABAAIAAQACAAEAAgABAAIAAQACAAEAAgABAAIAAQACAAEAAgABAAIAAQACAAEAAgABAAIAAQACAAEAAgABAAIAAQACAAEAAgABAAIAAQACAAEAAgABAAIAAQACAAEAAgABAAIAAQACAAEAAgABAAIAAQACAAEAAgABAAIAAQACAAEAAgABAAIAAQACAAEAAgABAAIAAQACAAEAAgABAAIAAQACAAEAAgABAAIAAQACAAEAAgABAAIAAQACAAEAAgABAAIAAQACAAEAAgABAAIAAQACAAEAAgABAAIAAQACAAEAAgABAAIAAQACAAHW4AEf3zHuuwAAAABJRU5ErkJggg==") repeat scroll 0% 0%;
                    }
                `}</style>
            </div>
        )
    }
};

class ThreadLine extends Component {
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
                <style jsx>{`
                    .topic_entry {
                        margin: 0 40px;
                    }
                    .topic_entry_bg:hover {
                        background-color: rgb(238, 238, 238);
                    }
                    .row {
                        border-bottom: 1px solid #ccc;
                        margin: 0 5px;
                        align-items: center;
                    }
                    a {
                        text-decoration: none;
                        color: #1a3959;
                    }
                    a:hover {
                        text-decoration: underline;
                        color: #2c5787;     
                    }
                    .replies {
                        font-size: 1.667em;
                        color: rgb(238, 209, 175);
                    }
                    .postdate {
                        display: block;
                        overflow: hidden;
                    }
                    .topic_entry_content {
                        padding: 6px;
                        line-height: 1.83em;
                        flex: none;
                    }
                    .c1 {
                        width: 50px;
                        text-align: center;
                        padding-left: 1px;
                        padding-right: 1px;
                        white-space: nowrap;
                    }
                    .c2 {
                        flex: 1;
                        text-align: left;
                    }
                    .c3, .c4 {
                        width: 140px;
                        text-align: right;
                        color: #58697b;
                        font-size: 0.923em;
                    }
                `}</style>
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
        fetch('/api/topic')
        .then(function(response) {
            return response.json()
        })
        .then(this.initTopic).catch(function(ex) {
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
                <ThreadLine topic={this.state.topics[i]} id={i}/>
            );
        }
        return (
            <div className="mod_wrap">
                <div className="forumbox">
                    <div className="forum_spacer">
                        <Link to={"/topic/create"} className={`link ${createButtonLink.className}`}>
                            <span className="btn_content">Post New</span>
                        </Link>
                    </div>
                    { topicList }
                </div>
                {createButtonLink.styles}
                <style jsx>{`
                    .mod_wrap {
                        text-align: center;
                        margin: 0px 10px 8px 10px;
                    }
                    .forumbox {
                        width: 100%;
                        border-spacing: 1px;
                        border: 1px solid #cacaca;
                        box-shadow: 0 0 5px -3px #000;
                        border-radius: 2.5px;
                        margin: 4px auto;
                        max-width: 1000px;
                        background-color: white;
                    }
                    .forum_spacer {
                        display: flex;
                        align-items: center;
                        margin: 30px 40px;
                    }
                    .btn_content {
                        margin: 0 5px;
                    }
                `}</style>
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
                <UserInfo/>
                <RelateActive/>
                <HighLights/>
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
                <ThreadComments id={this.state.tid}/>
            </div>
        )
    }
};

class ThreadTheme extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tid: this.props.id, 
            avatar: "https://blog.kyrios.cn/wp-content/uploads/2017/04/Blood.png", 
            uid: "",
            username: "",
            content: "",
            post_time: "",
            reg_time: ""
        };
        this.initTheme = this.initTheme.bind(this);
        fetch('/api/topic/'+this.state.tid)
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
            username: json['username'],
            content: json['content'],
            post_time: json['post_time'],
            reg_time: json['reg_time']
        })
    }
    render() {
        return (
            <div className="thread">
                <div className="forum-post">
                    <div className="forum-post-info lvl1">
                        <div className="forum-post-info-main">
                            <div className="avatar_wrapper">
                                <Link to={"/users/"+this.state.uid} className={`link ${avatarLink.className}`}>
                                    <img className="avatar" src={this.state.avatar}/>
                                </Link>
                            </div>   
                            <Link to={"/users/"+this.state.uid} className={`link ${usernameLink.className}`}>
                                {this.state.username}
                            </Link>
                        </div>
                        <div className="forum-post-info-extra">
                            <div className="forum-post-info-extra-buttom">
                                {"Register time: "+this.state.reg_time.split('月')[0]+"月"}
                            </div> 
                        </div>
                    </div>
                    <div className="forum-post-body">
                        <div className="forum-post-header-wrapper">
                            <div className="forum-post-header">
                                {this.state.post_time}
                            </div>
                        </div>
                        <div className="forum-post-content-wrapper">
                            <div className="forum-post-content">
                                {this.state.content}
                            </div>
                        </div>
                        
                    </div>
                </div>
                {avatarLink.styles}
                {usernameLink.styles}
                <style jsx>{`
                    .thread {
                        align-self: center;
                        margin-left: auto;
                        margin-right: auto;
                        max-width: 1000px;
                    }
                    .forum-post {
                        box-shadow: 0 1px 3px rgba(0,0,0,.25);
                        background-color: #fff;
                        margin-bottom: 5px;
                        display: flex;
                        flex-direction: row;
                    }
                    .forum-post-info {
                        flex: none;
                        display: flex;
                        flex-direction: column;
                        width: 180px;
                    }
                    .forum-post-body {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                    }
                    .forum-post-info-main::before {
                        position: absolute;
                        content: " ";
                        top: 0;
                        left: 0;
                        height: 100%;
                        width: 100%;
                        background-image: url(https://osu.ppy.sh/images/backgrounds/button.svg);
                        background-size: 300px;
                        opacity: .5;
                    }
                    .forum-post-info-main {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        padding-top: 20px;
                        background-image: linear-gradient(180deg,transparent,rgba(0,0,0,.2));
                        position: relative;
                    }
                    .lvl1 {
                        background-color: #29b;
                    }
                    .avatar_wrapper {
                        background-size: 153px 83px;
                        padding: 0 30px;
                    }
                    .avatar {
                        width: 100%;
                        border: 5px solid #fff;
                    }
                    .forum-post-info-extra {
                        background-color: hsla(0,0%,100%,.9);
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        flex: 1 0 auto;
                        padding: 10px;
                        text-align: center;
                    }
                    .forum-post-info-extra-buttom {
                        font-size: 11px;
                        font-weight: 600;
                        font-style: italic;
                        color: #555;
                        margin-bottom: 5px;
                    }
                    .forum-post-header-wrapper {
                        font-size: 12px;
                        padding: 20px 30px 0 30px;
                    }
                    .forum-post-header {
                        color: #999;
                    }
                    .forum-post-content-wrapper {
                        padding: 20px 30px;
                    }
                    .forum-post-content {
                        font-family: Open Sans,sans-serif;
                        line-height: 1.35;
                        color: #444;
                        font-size: 13px;
                        line-height: 1.5;
                    }
                `}</style>
            </div>
            
        )
    }
};

class ThreadComments extends Component {
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

class ThreadComment extends Component {
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

module.exports = {
    TopBar: TopBar,
    TopBG: TopBG,
    Forums: Forums, 
    About: About,
    User: User,
    Thread: Thread
}