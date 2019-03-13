import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
/*import {TopBar, TopBG, Forums} from "./widgets"*/

import css from 'styled-jsx/css'

var bindURL = "http://localhost:5000";

var createReactClass = require('create-react-class');

var destination = document.querySelector("#container");

var {TopBG} = require('./widgets.jsx');
var {TopBar} = require('./widgets.jsx');
var {Forums} = require('./widgets.jsx');

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
    <Router>
        <div>
        <Switch>
            <Route exact path="/" component={BBS} />
            <Route path="/about" component={BBS} />
        </Switch>
        </div>
    </Router>,
    destination
);

