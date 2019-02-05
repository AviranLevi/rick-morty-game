import React, { Component } from 'react';

class Enemy extends Component {

    render() {
        const { x, y } = this.props
        return (
            <div className="enemy" id={this.props.id}
                style={{
                    right: `${x}px`, bottom: `${y}px`
                }}
            >
                <img alt="enemy" src={this.props.myImage} />
            </div>
        );
    }
}

export default Enemy;
