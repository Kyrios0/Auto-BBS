import React, {Component} from 'react';
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {TopBar, TopBG, } from "./widgets.jsx"
import {Forums, About, User, Thread} from "./widgets.jsx"

var destination = document.querySelector("#container");

class AutoBBS extends Component {
    constructor() {
        super();
        this.state = {
            isLogin: -1,
        };
        
    }
    render() {
        return (
            <Router>
                <div>
                    <TopBG/>
                    <TopBar/>
                    <Switch>
                        <Route exact path="/" component={Forums} />
                        <Route path="/about" component={About} />
                        <Route path="/user/:id" component={User} />
                        <Route path="/thread/:id" component={Thread} />
                    </Switch>
                </div>
            </Router>
        ) 
    }
}

ReactDOM.render(
    <div>
        <AutoBBS/>
    </div>
    , destination
);

