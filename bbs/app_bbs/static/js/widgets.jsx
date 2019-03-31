import React, {Component} from 'react';
import {Link} from 'react-router-dom'

function resolveScopeStyles(scope) {
    return {
        className: scope.props.className,
        styles: scope.props.children
    }
}

const topbarLink = resolveScopeStyles(
    <div>
        <style jsx>{`
            .link {
                display: block;
                color: white;
                text-align: center;
                padding: 5px 16px;
                text-decoration: none;
                line-height: 55px;
            } 
            .link:hover:not(.active) {
                background-color: rgb(40, 40, 40);
            }
            .link.active {
                background-color: #591804;
                color: #fff;
            }
            .link.active:hover {
                background-color: #b87563;
                color: #fff;
            }
        `}</style>
    </div>
)

const threadLink = resolveScopeStyles(
    <div>
        <style jsx>{`
            .link {
                text-decoration: none;
                color: #1a3959;
            }
            .link:hover {
                text-decoration: underline;
                color: #2c5787;     
            }
            .topic {
                font-size: 1.085em;
                line-height: 1.9em;
            }
            .author {
                color: #1a3959;
            }
        `}</style>
    </div>
)

class TopBar extends Component {
    render() {
        return (
            <div id="mainmenu">
                <div className="nav">
                    <div className="left">
                        <div className="ul">
                            <div className="li"><Link to="/" className={`link ${topbarLink.className}`}><img src="https://blog.kyrios.cn/wp-content/uploads/2019/03/logo_50px.png"/></Link></div>
                            <div className="li"><Link to="/" className={`link ${topbarLink.className}`}>Home</Link></div>
                            <div className="li"><Link to="/about" className={`link ${topbarLink.className}`}>About</Link></div>
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
                        background: rgba(0, 0, 0, 0) url("https://blog.kyrios.cn/wp-content/uploads/2019/03/bbs_head.jpg") repeat scroll left bottom;
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
            <div>
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
                            <Link to={"/user/"+this.props.topic['uid']} className={`link author ${threadLink.className}`}> 
                                { this.props.topic['username'] } 
                            </Link>
                            <span className="postdate"> { this.props.topic['post_time'] } </span>
                        </div>
                        <div className="topic_entry_content c4">
                            <Link to={"/thread/"+this.props.topic['tid']+"#latest"} className={`link replydate ${threadLink.className}`}> 
                                { this.props.topic['reply_time'] } 
                            </Link>
                        </div>
                    </div>
                </div>
                {threadLink.styles}
                <style jsx>{`
                    .topic_entry {
                        margin: 0 40px;
                    }
                    .topic_entry:hover {
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
                    { topicList }
                </div>
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

    }
    render() {
        return (
            <div>
                <div className="forum-post">
                    <div className="forum-post-info">

                    </div>
                    <div className="forum-post-body">

                    </div>
                </div>
                <style jsx>{`
                    .forum-post {
                        box-shadow: 0 1px 3px rgba(0,0,0,.25);
                        background-color: #fff;
                        margin-bottom: 5px;
                        display: flex;
                        flex-direction: column;
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