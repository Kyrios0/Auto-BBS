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
            <div>
                <ul>
                <li><a href="#home"><img src="https://blog.kyrios.cn/wp-content/uploads/2019/03/logo_50px.png"/></a></li>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a className="active" href="#login">Login</a></li>
                </ul>
                <style jsx>{`
                    ul {
                        list-style-type: none;
                        margin: 0;
                        padding: 0;
                        overflow: hidden;
                        background-color: #fff0cd;
                    }
                      
                    li {
                        float: left;
                        border-right:1px solid #bbb;
                    }
                      
                    li:last-child {
                        float: right;
                        border-right: none;
                    }
                      
                    li a {
                        display: block;
                        color: black;
                        text-align: center;
                        padding: 5px 16px;
                        text-decoration: none;
                        line-height: 55px;
                    }
                      
                    li a:hover:not(.active) {
                        background-color: #fff8e7;
                    }
                      
                    li a.active {
                        background-color: #591804;
                        color: #fff;
                    }
                    li a.active:hover {
                        background-color: #b87563;
                        color: #fff;
                    }
                `}</style>
            </div>
        )
    }
})

var TopicBG = createReactClass({
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
                        margin: 0px 0px -190px;
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
})

var Forums = createReactClass({
    getInitialState: function() {
        return {

        };
    },

    render: function() {
        return (
            <div>

            </div>
        )
    }
})

var BBS = createReactClass({
    getInitialState: function() {
        return {
            isLogin: -1,
        };
    },

    render: function() {
        return (
            <div>
                <TopBar/>
                <TopicBG/>
                <Forums/>
            </div>
        )
    }
})

ReactDOM.render(
    <div>
        <BBS/>
    </div>,
    destination
);

