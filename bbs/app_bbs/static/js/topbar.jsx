import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {bindURL, isLogin} from "./basic.jsx"

import {NormalButton} from "./widgets.jsx"
import {topBarStyle, panelStyle, panelBoxStyle} from "./topbarStyles.jsx"
import {topbarLink, userMenuLink, } from "./linkStyles.jsx";

class TopBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            panel: false,
            focusText: 'Login',
            uid: -1,
            user: null,
        };
        this.initTopbar = this.initTopbar.bind(this);
        this.showPanel = this.showPanel.bind(this);
        if (isLogin()) {
            fetch(bindURL + '/api/users', {
                credentials: 'include',
            })
            .then(function(response) {
                return response.json();
            })
            .then(this.initTopbar)
            .catch(function(ex) {
                console.log('Init topbar failed', ex)
            })
        }
    }
    initTopbar(json) {
        var nickname = json['nickname'];
        if (json['is_admin']) {
            nickname = '[Admin] ' + nickname;
        }
        this.setState({
            uid: json['uid'],
            focusText: nickname,
            user: json
        })
    }
    showPanel() {
        this.setState({panel: this.state.panel ^ 1})
    }
    render() {
        return (
            <div>
                <div id="mainmenu">
                    <div className="nav">
                        <div className="left">
                            <div className="ul">
                                <div className="li">
                                    <Link to="/" className={`link ${topbarLink.className}`}>
                                        <img style={{height: 50+'px'}} src="/static/img/auto-bbs.png"/>
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
                            <div className="li">
                                <div
                                    className="active link"
                                    onClick={this.showPanel}>
                                    { this.state.focusText }
                                </div>
                            </div>
                            <div>
                                {
                                    isLogin()
                                    ?
                                        this.state.user
                                        ?
                                            <UserMenuPanel visible={this.state.panel} user={this.state.user}/>
                                        :
                                            <div></div>
                                    :
                                        <LoginRegisterPanel visible={this.state.panel}/>
                                }
                            </div>
                        </div>
                    </div>
                    {topbarLink.styles}
                    <style jsx>{topBarStyle}</style>
                </div>
                
            </div>
        )
    }
};

class UserMenuPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: this.props.user['uid']
        };
        this.logout = this.logout.bind(this);
    }
    logout() {
        fetch(bindURL + '/api/login', {
            method: "DELETE",
            credentials: 'include',
        })
        .then(function(response) {
            if(response.status == 200) {
                console.log("Logout success.");
                document.cookie = 'isLogin=false;path=/;';
                location.replace(location.href);

            } else {
                console.log("Logout failed.");
            }
        }).catch(function(ex) {
            console.log('Logout error.', ex)
        })
    }
    render() {
        return (
            <div className="um-panel-wrapper">
                { 
                    this.props.visible
                    ?
                        <div className="lr-panel">
                            <div className="um-panel-content">
                                <Link to={'/users/'+this.state.uid} className={`menu ${userMenuLink.className}`}>
                                    Info
                                </Link>
                                <Link to={'/account'} className={`menu ${userMenuLink.className}`}>
                                    Setting
                                </Link>
                                <div className='um-panel-menu' onClick={this.logout}>
                                    Logout
                                </div>
                            </div>
                        </div>
                    :   
                        <div></div>
                }
                {userMenuLink.styles}
                <style jsx>{panelStyle}</style>
            </div>
        );
    }
};

class LoginRegisterPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginActive: true,
        };
        this.showLoginBox = this.showLoginBox.bind(this)
        this.showRegisterBox = this.showRegisterBox.bind(this)
    }
    showLoginBox() {
        this.setState({loginActive: true})
    }
    showRegisterBox() {
        this.setState({loginActive: false})
    }
    render() {
        return (
            <div className="lr-panel-wrapper">
                { 
                    this.props.visible
                    ?
                        <div className="lr-panel">
                            <div className="lr-panel-content">
                                <div className="box-controller">
                                    <div 
                                        className={"controller " + (this.state.loginActive
                                            ? "selected" : "")} 
                                        onClick={this.showLoginBox}>
                                        Login
                                    </div>
                                    <div
                                        className={"controller " + (this.state.loginActive 
                                            ? "" : "selected")}
                                        onClick={this.showRegisterBox}>
                                        Register
                                    </div>
                                </div>
                                <div>
                                    {this.state.loginActive ? <LoginBox/> : <RegisterBox/>}
                                </div>
                            </div>
                        </div>
                    :   
                        <div></div>
                }
                <style jsx>{panelStyle}</style>
            </div>
        );
    }
};

class LoginBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };
        this.validateForm = this.validateForm.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.login = this.login.bind(this)
    }
    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    login(e) {
        e.preventDefault();
        {/* WARNING!!: Delete DEBUG line after development plz. */}
        console.log("[l]: username: %s, password: %s", this.state.username, this.state.password)
        if(this.validateForm()){
            fetch(bindURL + "/api/login", {
                method: 'POST',
                headers: new Headers({
                    'content-type': 'application/json',
                }),
                credentials: 'include',
                mode: 'cors',
                body: JSON.stringify({
                    'username': this.state.username,
                    'password': this.state.password
                })
            })
            .then(function(response) {
                if (response.status == 200) {
                    console.log("Login Success.")
                    document.cookie = 'isLogin=true;path=/;';
                    location.replace(location.href);
                } else {
                    console.log('Login Failed.')
                }
            }).catch(function(ex) {
                console.log('Login error.', ex)
            })
        }
    }
    render() {
        return (
            <div className="panel-box">
                <input 
                    name="username"
                    placeholder="Username" 
                    onChange={this.handleChange}/>
                <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={this.handleChange}/>
                <div className="panel-box-buttom">
                    <NormalButton onClick={this.login} name="Login" />
                </div>
                <style jsx>{panelBoxStyle}</style>
            </div>
        )
    }
};

class RegisterBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };
        this.validateForm = this.validateForm.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.register = this.register.bind(this)
    }
    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    register(e) {
        e.preventDefault();
        {/* WARNING!!: Delete DEBUG line after development plz. */}
        console.log("[r]: username: %s, password: %s", this.state.username, this.state.password)
        if(this.validateForm()){
            fetch(bindURL + "/api/users", {
                method: 'POST',
                headers: new Headers({
                    'content-type': 'application/json',
                }),
                mode: 'cors',
                body: JSON.stringify({
                    'username': this.state.username,
                    'password': this.state.password
                })
            })
            .then(function(response) {
                if (response.status == 200) {
                    console.log("Register Success.")
                } else {
                    console.log('Register Failed.')
                }
            })
        }
    }
    render() {
        return (
            <div className="panel-box">
                <input 
                    name="username"
                    placeholder="Username" 
                    onChange={this.handleChange}/>
                <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={this.handleChange}/>
                <div className="panel-box-buttom">
                    <NormalButton onClick={this.register} name="Register" />
                </div>
                <style jsx>{panelBoxStyle}</style>
            </div>
        )
    }
};

module.exports = {
    TopBar: TopBar,
}