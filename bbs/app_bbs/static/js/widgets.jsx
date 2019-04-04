import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {topbarLink, threadLink, createButtonLink} from "./linkStyles.jsx";
import {avatarLink, usernameLink} from "./linkStyles.jsx";

import {topBarStyle, topBGStyle, threadLineStyle} from "./widgetStyles.jsx"
import {forumsStyle, threadThemeStyle} from "./widgetStyles.jsx"

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
                <style jsx>{topBarStyle}</style>
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
                <style jsx>{topBGStyle}</style>
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
                <style jsx>{threadLineStyle}</style>
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
                <style jsx>{threadThemeStyle}</style>
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