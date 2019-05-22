import React, {Component} from 'react';
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {TopBar, Account, About} from "./widgets.jsx"
import {Forums, User, Thread} from "./widgets.jsx"
import {CreateTopic} from "./widgets.jsx"
import {bindURL} from "./widgets.jsx"

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
            } else {
                document.cookie = 'isLogin=false;path=/;';
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
                        <Route path="/user/:id" component={User} />
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

