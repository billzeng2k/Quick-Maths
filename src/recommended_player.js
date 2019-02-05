import React, { Component } from 'react';
import { alt } from './game_config';

export default class RecommendedPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = { name: this.props.name, photo: this.props.photo, size: this.props.size };
    }

    render() {
        return (
            <div style={{ display: 'inline-block', margin: '0 5px' }} onClick={() => {
                window.FBInstant.context.createAsync(this.props.id)
                    .then(() => {
                        this.props.changeScreen('Play');
                    }).catch(() => {
                        this.props.changeScreen('Play');
                    })
            }}>
                <img src={this.state.photo} style={{
                    width: this.state.size,
                    height: this.state.size,
                    borderRadius: this.state.size
                }} alt={alt} />
                <div style={{
                    fontSize: this.state.size / 4
                }}> {this.props.name} </div>
            </div>
        );
    }
}