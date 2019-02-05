import React, { Component } from 'react';
import Menu from './menu.js';
import Leaderboard from './leaderboard.js';
import LoseScreen from './lose_screen.js';
import GameScreen from './game_screen.js';

class App extends Component {
	constructor(props) {
		super(props);
		this.screen = [];
		this.state = { screenName: '' };
	}

	componentDidMount() {
		this.wait = false;
		window.FBInstant.initializeAsync()
			.then(function () {
				window.FBInstant.setLoadingProgress(100);

				window.FBInstant.startGameAsync()
					.then(function () {
						console.log('game started');

					});
			});
		setTimeout(() => { this.setState({ screenName: 'Home' }) }, 200);
	}

	changeScreen(screenName, score, solvedEquation) {
		if (this.wait)
			return;
		this.wait = true;
		this.screen[this.state.screenName].transitionOut();
		if (screenName === 'Play') {
			this.screen['Play'].joinGame();
		}
		setTimeout(() => {
			this.setState({ screenName });
			if (screenName === 'Play')
				this.screen[screenName].startGame();
			else if (screenName === 'Score')
				this.screen[screenName].reset(score, solvedEquation);
			else
				this.screen[screenName].reset();
			this.wait = false;
		}, 700);
	}

	render() {
		return (
			<div>
				<div style={
					this.state.screenName !== 'Home' ? { display: 'none' } : { display: 'initial' }
				}>
					<Menu changeScreen={this.changeScreen.bind(this)} ref={ref => { this.screen['Home'] = ref }} />
				</div>
				<div style={
					this.state.screenName !== 'Score' ? { display: 'none' } : { display: 'initial' }
				}>
					<LoseScreen changeScreen={this.changeScreen.bind(this)} ref={ref => { this.screen['Score'] = ref }} />
				</div>
				<div style={
					this.state.screenName !== 'Leaderboard' ? { display: 'none' } : { display: 'initial' }
				}>
					<Leaderboard changeScreen={this.changeScreen.bind(this)} ref={ref => { this.screen['Leaderboard'] = ref }} />
				</div>
				<div style={
					this.state.screenName !== 'Play' ? { display: 'none' } : { display: 'initial' }
				}>
					<GameScreen changeScreen={this.changeScreen.bind(this)} ref={ref => { this.screen['Play'] = ref }} />
				</div>
			</div>
		);
	}
}

export default App;
