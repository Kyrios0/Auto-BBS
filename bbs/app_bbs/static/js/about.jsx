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
                        Under Construction.
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