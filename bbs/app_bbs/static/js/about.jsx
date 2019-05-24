import React, {Component} from 'react';

class About extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <div>
                    <h1 className="error">
                        Kyr1os: frontend-development
                    </h1>
                    <h1 className="error">
                        blacsheep: backend-development
                    </h1>
                    <h1 className="error">
                        EliAyase: database support&testing
                    </h1>
                    <h1 className="error">
                        TGWarWolf: testing&document
                    </h1>
                </div>     
                <style jsx>{`
                    .error {
                        color: #fff;
                        text-align: center;
                    }
                `}</style>
            </div>
        )
    }
};

module.exports = {
    About: About,
}