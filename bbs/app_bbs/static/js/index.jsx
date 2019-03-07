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
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
                <li style={{float:"right"}}><a class="active" href="#login">Login</a></li>
                </ul>
                <style jsx>{`
                    a {
                        color: red;
                    }
                `}</style>
            </div>
        )
    }
})

var Topic = createReactClass({
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
                <Topic/>
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

