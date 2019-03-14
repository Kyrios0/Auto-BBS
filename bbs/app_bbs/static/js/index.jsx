import React, {Component} from 'react';
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import {TopBar, TopBG, Forums} from "./widgets.jsx"

import css from 'styled-jsx/css'

var destination = document.querySelector("#container");

class BBS extends Component {
    constructor() {
        super();
        this.state = {
            isLogin: -1, 
        };
    }

    render() {
        return (
            <div>
                <TopBG/>
                <TopBar/>
                <Forums/>
            </div>
        )
    }
};

class About extends Component {
    constructor() {
        super();
        this.state = {
            isLogin: -1, 
        };
    }

    render() {
        return (
            <div>
                <TopBar/>
                <Forums/>
            </div>
        )
    }
};

ReactDOM.render(
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={BBS} />
                <Route path="/about" component={About} />
            </Switch>
        </div>
    </Router>,
    destination
);

