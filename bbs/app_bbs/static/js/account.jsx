import React, {Component} from 'react';
import {isLogin} from "./basic.jsx"

class Account extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        return (
            <div>
                {
                    isLogin()
                    ?
                        <div>
                            <h1 className="error">
                                Under Construction.
                            </h1>
                        </div>
                    :
                        <div>
                            <h1 className="error">
                                Please Login First.
                            </h1>
                        </div>
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

module.exports = {
    Account: Account,
}