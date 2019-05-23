import React, {Component} from 'react';

import {isLogin} from "./basic.jsx"
import {topBGv2Style} from "./userStyles.jsx"

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
                        <div>
                            'Please Login First.'
                        </div>
                }
            </div>
        )
    }
};

class TopBGv2 extends Component {
    constructor() {
        super();
        this.state = {
            image: 'https://osu.ppy.sh/images/headers/profile-covers/c4.jpg',

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
            avatar: "https://blog.kyrios.cn/wp-content/uploads/2017/04/Blood.png",
            nickname: "",
        };
    }

    render() {
        return (
            <div className="profile-top">
                <div className="profile-info">
                    <div className="profile-info-avatar" style={{backgroundImage: 'url('+this.state.avatar+')'}}>

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