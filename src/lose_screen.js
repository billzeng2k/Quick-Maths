import React, { Component } from 'react';
import { calcWidth, calcHeight, setHighScore } from './logic.js';
import { playAnimation, resetAnimation } from './animation.js';
import { highScore } from './logic.js';
import { mute, sound, plus } from './images';
import { muted, playSound, menu, toggleSound } from './sounds';
import Entry from './entry.js';
import Recommended from './recommended_player.js';
import { alt } from './game_config.js';

const buttonMargin = 3;
const borderSize = calcWidth(75 / 98, 0);
const fontSizePA = calcWidth(1500 / 98, 0);
const fontSize = calcWidth(2500 / 98, 0);
const entrySize = calcHeight(100, - fontSize * 2 - calcWidth(35, 0)) / 6;

const Styles = {
	score: {
		textAlign: 'center',
		fontSize: fontSize + 'px'
	},
	bar: {
		backgroundColor: 'black',
		width: calcWidth(40, 0),
		margin: 'auto',
		height: calcHeight(0.3, 0) + 'px'
	},
	sound_button: {
		position: 'fixed',
		top: 7,
		left: 10,
		width: calcWidth(10, 0),
		height: calcWidth(10, 0)
	},
	play_again: {
		margin: buttonMargin + '%',
		width: calcWidth(100 - buttonMargin * 2, - 2 * borderSize),
		border: borderSize + 'px solid black',
		borderRadius: (2 * borderSize) + 'px',
		fontSize: fontSizePA,
		textAlign: 'center',
	},
	entryContainer: {
		position: 'relative',
		height: entrySize * 4.25 + 'px',
		width: calcWidth(100, 0) + 'px',
		paddingRight: '17px',
		overflowX: 'hidden',
		overflowY: 'auto',
	},
	challenge_text: {
		fontSize: fontSizePA / 2
	},
	foreground: {
		pointerEvents: 'none',
		position: 'fixed',
		top: fontSize * 0.175 + entrySize + 'px',
		height: entrySize * 6 + 'px',
		width: '100%',
		zIndex: 1,
		backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0) 90%, rgba(255, 255, 255, 1) 97%)'
	},
}

export default class LoseScreen extends Component {
	constructor(props) {
		super(props);
		this.newBest = false;
		this.state = { score: 0, entries: -1, recommended: -1 };

	}

	transitionOut() {
		playAnimation(this.scoreContainer, 'slide_up_out_animation');
		playAnimation(this.play_again, 'slide_down_animation');
		playAnimation(this.sound, 'slide_right_out');
		playAnimation(this.entryContainer, 'fade_out_animation');
		playAnimation(this.recommended, 'fade_out_animation');
	}

	share() {
		window.FBInstant.shareAsync({
			intent: 'REQUEST',
			image: plus,
			text: window.FBInstant.player.getName() + ' just got ' + this.score + ' points in Quick Maths! Can you beat him?',
			data: {}
		}).catch((err) => {
			console.log(err);
		});
	}

	reset(score) {
		this.once = false;
		window.FBInstant.player.getConnectedPlayersAsync().then((players) => {
			this.setState({ recommended: players });
		});
		if (window.FBInstant.context.getID() !== null) {
			window.FBInstant.getLeaderboardAsync('BaseGame.' + window.FBInstant.context.getID())
				.then((leaderboard) => leaderboard.getPlayerEntryAsync())
				.then((entry) => this.currentPlayer.setEntry(entry.getRank(), entry.getPlayer().getName(), entry.getPlayer().getPhoto(), entry.getScore()));
			window.FBInstant.getLeaderboardAsync('BaseGame.' + window.FBInstant.context.getID())
				.then((leaderboard) => leaderboard.getEntriesAsync())
				.then((entries) => this.setState({ entries }))
		} else {
			this.currentPlayer.setEntry(1, window.FBInstant.player.getName(), window.FBInstant.player.getPhoto(), highScore);
		}
		if (highScore < score) {
			setHighScore(score);
			this.newBest = true;
			if (window.FBInstant.context.getID() !== null) {
				window.FBInstant
					.getLeaderboardAsync('BaseGame.' + window.FBInstant.context.getID())
					.then(leaderboard => { return leaderboard.setScoreAsync(score); })
					.then(console.log('Score Updated'))
					.catch(error => console.error(error));
				window.FBInstant.updateAsync({
					action: 'LEADERBOARD',
					name: 'BaseGame.' + window.FBInstant.context.getID()
				})
					.then(() => console.log('Update Posted'))
					.catch(error => console.error(error));
			}
		}
		else
			this.newBest = false;
		this.setState({ score });
		resetAnimation(this.play_again, 'slide_down_animation');
		resetAnimation(this.scoreContainer, 'slide_up_out_animation');
		resetAnimation(this.sound, 'slide_right_out');
		resetAnimation(this.entryContainer, 'fade_out_animation');
		resetAnimation(this.recommended, 'fade_out_animation');
	}

	renderEntries() {
		if (this.state.entries === -1)
			return;
		let elements = [];
		for (let i = 0; i < this.state.entries.length; i++) {
			if (window.FBInstant.player.getID() === this.state.entries[i].getPlayer().getID())
				continue;
			let entry = <Entry key={i} rank={this.state.entries[i].getRank()} name={this.state.entries[i].getPlayer().getName()} photo={this.state.entries[i].getPlayer().getPhoto()} score={this.state.entries[i].getScore()} />;
			elements.push(entry);
		}
		return elements;
	}

	renderRecommendedFriends() {
		if (this.state.recommended === -1)
			return;
		let elements = [];
		for (let i = 0; i < this.state.recommended.length; i++) {
			let entry = <Recommended key={'h' + i} name={this.state.recommended[i].getName()} photo={this.state.recommended[i].getPhoto()} size={fontSizePA} id={this.state.recommended[i].getID()} changeScreen={this.props.changeScreen} />;
			elements.push(entry);
		}
		return elements;
	}

	render() {
		return (
			<div>
				<img id='button' className='slide_right' src={muted ? mute : sound} style={Styles.sound_button} ref={ref => { this.sound = ref }} onClick={() => { toggleSound(); playSound(menu); this.forceUpdate() }} alt={alt} />
				<div className='slide_down_pop_animation' style={Styles.score} ref={ref => { this.scoreContainer = ref }}>
					{this.state.score}
					<div style={Styles.bar}></div>
				</div>
				<div className='fade_in_animation' ref={ref => { this.entryContainer = ref }}>
					<Entry ref={ref => { this.currentPlayer = ref }} />
					<div style={Styles.entryContainer}>
						{this.renderEntries()}
						<div style={Styles.foreground}> </div>
					</div>
				</div>
				<div className='fade_in_animation' style={{ position: 'fixed', bottom: fontSizePA * 2.25, textAlign: 'center', width: calcWidth(100, 0), zIndex: 2 }} ref={ref => { this.recommended = ref }}>
					<div style={Styles.challenge_text}> Challenge Friends! </div>
					<div style={{ overflowY: 'hidden', overflowX: 'auto', height: fontSizePA * 1.75, whiteSpace: 'nowrap' }}>
						{this.renderRecommendedFriends()}
					</div>
				</div>
				<div className='slide_up_pop_animation' ref={ref => { this.play_again = ref }} style={{ position: 'fixed', bottom: 0 }}>
					<div className='pulse_big' id='button' style={Styles.play_again} onClick={() => { this.share(); playSound(menu) }}> Share Score! </div>
					<div id='button' style={Styles.play_again} onClick={() => { this.props.changeScreen('Play'); playSound(menu) }}> Play Again! </div>
				</div>
			</div>
		);
	}
}