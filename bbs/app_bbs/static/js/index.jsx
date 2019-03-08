import React from "react";
import ReactDOM from "react-dom";

var createReactClass = require('create-react-class');

var destination = document.querySelector("#container");

var TopBar = createReactClass({
    getInitialState: function() {
        return {
            
        };
    },

    render: function() {
        return (
            <div id="mainmenu">
                <div className="right">
                    <div className="li"><a className="active" href="#login">Login</a></div>
                </div>
                <div>
                    <div className="ul">
                        <div className="li"><a href="#home"><img src="https://blog.kyrios.cn/wp-content/uploads/2019/03/logo_50px.png"/></a></div>
                        <div className="li"><a href="#home">Home</a></div>
                        <div className="li"><a href="#about">About</a></div>
                        <div className="li"><a href="#contact">Contact</a></div>
                    </div>
                </div>
                
                <style jsx>{`
                    #mainmenu {
                        overflow: hidden;
                        margin: 0 0 198px 0;
                    }
                    .ul {
                        list-style-type: none;
                        margin: 0;
                        padding: 0;
                        overflow: hidden;
                        background-color: #fff0cd;
                    }
                    .li {
                        float: left;
                        border-right:1px solid #bbb;
                    }
                    .right {
                        float: right;
                        border-right: none;
                    }
                    .li a {
                        display: block;
                        color: black;
                        text-align: center;
                        padding: 5px 16px;
                        text-decoration: none;
                        line-height: 55px;
                    } 
                    .li a:hover:not(.active) {
                        background-color: #fff8e7;
                    }
                    .li a.active {
                        background-color: #591804;
                        color: #fff;
                    }
                    .li a.active:hover {
                        background-color: #b87563;
                        color: #fff;
                    }
                `}</style>
            </div>
        )
    }
});

var TopBG = createReactClass({
    getInitialState: function() {
        return {
            
        };
    },

    render: function() {
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
                        margin: 65px 0px -255px 0px;
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
});

var Thread = createReactClass({
    getInitialState: function() {
        return {

        };
    },

    render: function() {
        return (
            <React.Fragment>
                <tbody>
                    <tr className={"row"+(this.props.id%2+1)}>
                        <td className="c1">
                            <a className="replies"> { this.props.topic['replies'] } </a>
                        </td>
                        <td className="c2">
                            <a className="topic"> { this.props.topic['topic_name'] } </a>
                        </td>
                        <td className="c3">
                            <a className="author"> { this.props.topic['username'] } </a>
                            <span className="postdate"> { this.props.topic['post_time'] } </span>
                        </td>
                        <td className="c4">
                            <a className="replydate"> { this.props.topic['reply_time'] } </a>
                        </td>
                    </tr>
                </tbody>
                <style jsx>{`
                    .replies {
                        font-size: 1.667em;
                        color: rgb(238, 209, 175);
                    }
                    .topic {
                        font-size: 1.085em;
                    }
                    .author {
                        color: #1a3959;
                    }
                    .postdate {
                        display: block;
                        overflow: hidden;
                    }
                    td {
                        padding: 6px;
                        line-height: 1.83em;
                        word-wrap: break-word;
                        word-break: break-all;
                        text-align: left;
                    }
                    .c1 {
                        width: 5%;
                        text-align: center;
                        padding-left: 1px;
                        padding-right: 1px;
                        white-space: nowrap;
                    }
                    .c2 {
                        width: auto;
                        word-wrap: break-word;
                        word-break: break-all;
                    }
                    .c3, .c4 {
                        width: 14%;
                        text-align: center;
                        color: #58697b;
                        font-size: 0.923em;
                    }
                    .row1 .c1 {
                        background-color: #fff6df;
                    }
                    .row1 .c2 {
                        background-color: #fff8e7;
                    }
                    .row1 .c3 {
                        background-color: #fff6df;
                    }
                    .row1 .c4 {
                        background-color: #fff8e7;
                    }
                    .row2 .c1 {
                        background-color: #ffedc3;
                    }
                    .row2 .c2 {
                        background-color: #fff0cd;
                    }
                    .row2 .c3 {
                        background-color: #ffedc3;
                    }
                    .row2 .c4 {
                        background-color: #fff0cd;
                    }
                `}</style>
            </React.Fragment>
        )
    }
});

var Forums = createReactClass({
    getInitialState: function() {
        return {
            topics: [], 
        };
    },
    initTopic: function(json) {
		this.setState({topics: json});
	},
    componentWillMount: function(){
        fetch('http://localhost:5000/api/topic')
        .then(function(response) {
            return response.json()
        })
        .then(this.initTopic).catch(function(ex) {
            console.log('Init topic failed', ex)
        })
	},
    render: function() {
        var topicList = [];
        for (var i = 0; i < this.state.topics.length; i++){
            topicList.push(
                <Thread topic={this.state.topics[i]} id={i}/>
            );
        }
        return (
            <div className="mod_wrap">
                <table className="forumbox">
                    { topicList }
                </table>
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
                        margin: 0 0 8px 0;
                        background-color: #fffcee;
                    }
                    
                `}</style>
            </div>
        )
    }
});

var BBS = createReactClass({
    getInitialState: function() {
        return {
            isLogin: -1,
        };
    },

    render: function() {
        return (
            <div>
                <TopBG/>
                <TopBar/>
                <Forums/>
            </div>
        )
    }
});

ReactDOM.render(
    <div>
        <BBS/>
    </div>,
    destination
);

