import React, { Component } from 'react';
import { alt } from './game_config';
import { setHighScore } from './logic.js'; 

export default class RecommendedPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = { name: this.props.name, photo: this.props.photo, size: this.props.size };
    }

    render() {
        return (
            <div style={{ display: 'inline-block', margin: '0 5px' }} onClick={() => {
                if (this.props.id !== -1) {
                    window.FBInstant.context.createAsync(this.props.id)
                        .then(() => {
                            this.props.changeScreen('Play');
                        }).catch((err) => {

                        })
                } else {
                    window.FBInstant.context
                        .chooseAsync()
                        .then(function () {
                            window.FBInstant
                                .getLeaderboardAsync('BaseGame.' + window.FBInstant.context.getID())
                                .then(leaderboard => { return leaderboard.setScoreAsync(0); })
                                .then(() => {
                                    window.FBInstant
                                        .getLeaderboardAsync('BaseGame.' + window.FBInstant.context.getID())
                                        .then(leaderboard => leaderboard.getPlayerEntryAsync())
                                        .then(entry => {
                                            setHighScore(entry.getScore());
                                            this.props.changeScreen('Play');
                                        }).catch(error => {
                                            console.error(error);
                                        });
                                })
                                .catch(error => console.error(error));
                        })
                        .catch(error => console.error(error));
                }
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