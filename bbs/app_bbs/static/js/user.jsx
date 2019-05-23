import React, {Component} from 'react';

import {bindURL, isLogin} from "./basic.jsx"
import {topBGv2Style, profileStyle} from "./userStyles.jsx"

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
                {
                    isLogin()
                    ?
                        <div>
                            <TopBGv2/>
                            <Profile/>
                            <RelateActive/>
                        </div>
                    :
                        <h1 className="error">
                            Please Login First.
                        </h1>
                }
                <style jsx>{`
                    .error {
                        color: #fff;
                        text-align: center;
                    }
                `}</style>
                <style jsx global>{`
                    body:before {
                        background-color: #111 !important;
                        background-image: none;
                    }
                `}</style>
            </div>
        )
    }
};

class TopBGv2 extends Component {
    constructor() {
        super();
        this.state = {
            image: '/static/img/c4.jpg',

        };
    }

    render() {
        return (
            <div className="user">
                <div className='header-bg' style={{ backgroundImage: 'url('+this.state.image+')' }}>
                </div>
                <div className="header-overlay">
                </div>
                <div className="header-wrapper">
                    <div className="header-line">
                        <h1 className="header-title">
                            User Info
                        </h1>
                    </div>
                </div>
                <style jsx>{topBGv2Style}</style>
            </div>
        )
    }
};

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            avatar: "/static/img/Blood.png",
            nickname: "",
            reg_time: "",
            self_intro: "",
        };

        this.initProfile = this.initProfile.bind(this);
        fetch(bindURL + '/api/users', {
            credentials: 'include',
        })
        .then(function(response) {
            return response.json();
        })
        .then(this.initProfile)
        .catch(function(ex) {
            console.log('Init profile failed', ex)
        })
    }
    initProfile(json) {
        this.setState({
            nickname: json['nickname'],
            reg_time: json['reg_time'],
            self_intro: json['selfinfo'],
        })
    }
    render() {
        return (
            <div className="mod-wrapper">
                <div className="profile-header">
                    <div className="profile-top">
                        <div className="profile-info">
                            <div className="avatar-wrapper">
                                <img className="profile-info-avatar" src={this.state.avatar}/>
                            </div>
                            <div className="profile-info-details">
                                <h1 className="profile-info-name">
                                    {this.state.nickname}
                                </h1>
                            </div>
                        </div>
                        <div className="profile-stat">

                        </div>
                    </div>
                </div>
                <style jsx>{profileStyle}</style>
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

module.exports = {
    User: User,
}