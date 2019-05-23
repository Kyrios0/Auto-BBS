import React, {Component} from 'react';
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {Forums, CreateTopic, Thread} from "./widgets.jsx"
import {About} from "./about.jsx"
import {Account} from "./account.jsx"
import {TopBar} from "./topbar.jsx"
import {User} from "./user.jsx"
import {bindURL} from "./basic.jsx"

var destination = document.querySelector("#container");

class AutoBBS extends Component {
    constructor() {
        super();
        this.state = {
        };
        fetch(bindURL + '/api/login', {
            credentials: 'include',
        })
        .then(function(response) {
            if (response.status == 200) {
                document.cookie = 'isLogin=true;path=/;';
                fetch(bindURL + '/api/users', {
                    credentials: 'include',
                })
                .then(function(response) {
                    return response.json();
                    
                })
                .then(function(json) {
                    if (response.status == 200) {
                        document.cookie = 'uid=' + json['uid'] + ';path=/;';
                        document.cookie = 'isAdmin=' + json['is_admin'] + ';path=/;';
                    } else {
                        console.log('Init user error.');
                        document.cookie = 'uid=-1;path=/;';
                        document.cookie = 'isAdmin=0;path=/;';
                    }
                })
            } else {
                document.cookie = 'isLogin=false;path=/;';
                document.cookie = 'uid=-1;path=/;';
                document.cookie = 'isAdmin=0;path=/;';
            }
        })
        .catch(function(ex) {
            console.log('Init State Failed', ex)
        })
    }
    render() {
        return (
            <Router>
                <div>
                    <TopBar/>
                    <Switch>
                        <Route exact path="/" component={Forums} />
                        <Route path="/about" component={About} />
                        <Route path="/users/:id" component={User} />
                        <Route path="/thread/:id" component={Thread} />
                        <Route path="/account" component={Account} />
                        <Route path="/topic/create" component={CreateTopic} />
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

