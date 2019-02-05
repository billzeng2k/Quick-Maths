import React, { Component } from 'react';
import { calcWidth, calcHeight, setHighScore } from './logic.js';
import { playAnimation, resetAnimation } from './animation.js';
import { highScore } from './logic.js';
import { crown } from './images';
import { playSound, menu } from './sounds';
import { ButtonContainer } from './buttons.js';
import ScoreEntry from './score_entry.js';
import { alt } from './game_config.js';

const fontSize = calcWidth(2500 / 98, 0);

const StylesSS = {
	container: {
		textAlign: 'center'
	},
	score: {
		fontSize: fontSize + 'px'
	},
	bar: {
		backgroundColor: 'black',
		width: calcWidth(40, 0),
		margin: 'auto',
		height: calcHeight(0.3, 0) + 'px'
	},
	highScore: {
		display: 'inline-block',
		fontSize: fontSize / 2 + 'px'
	},
	highScoreCrown: {
		display: 'inline-block',
		paddingLeft: calcWidth(1, 0) + 'px',
		paddingRight: calcWidth(1, 0) + 'px',
		paddingBottom: fontSize / 18 + 'px',
		width: fontSize / 2.8 + 'px'
	},
}

export default class LoseScreen extends Component {
	constructor(props) {
		super(props);
		this.newBest = false;
		this.state = { score: 0 };
	}

	transitionOut() {
		playAnimation(this.scoreContainer, 'slide_up_out_animation');
		playAnimation(this.text, 'fade_out_animation');
		this.buttons.start();
	}

	reset(score, solvedEq) {
		this.once = false;
		this.solvedEq = solvedEq;
		if (highScore < score) {
			setHighScore(score);
			this.newBest = true;
			if (window.FBInstant.context !== null) {
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
		this.buttons.reset();
		resetAnimation(this.scoreContainer, 'slide_up_out_animation');
		resetAnimation(this.text, 'fade_out_animation');
	}

	renderScoreEntries() {
		if (this.solvedEq == null)
			return <div> </div>;
		var container = [];
		container.push(<ScoreEntry key={this.solvedEq.length - 1} values={this.solvedEq[this.solvedEq.length - 1].values} operators={this.solvedEq[this.solvedEq.length - 1].operators} result={this.solvedEq[this.solvedEq.length - 1].result} time={this.solvedEq[this.solvedEq.length - 1].time} special={true} emoji={this.solvedEq[this.solvedEq.length - 1].emoji} />);
		for (var i = this.solvedEq.length - 2; i >= 0; i--)
			container.push(<ScoreEntry key={i} values={this.solvedEq[i].values} operators={this.solvedEq[i].operators} result={this.solvedEq[i].result} time={this.solvedEq[i].time} emoji={this.solvedEq[i].emoji} />);
		return container;
	}

	render() {
		return (
			<div style={StylesSS.container}>
				<div className='slide_down_pop_animation' style={{ marginTop: calcHeight(2, 0) + 'px' }} ref={ref => { this.scoreContainer = ref }}>
					<img className='bob' style={this.newBest ? { width: calcWidth(20, 0) + 'px' } : { display: 'none' }} src={crown} alt={alt} />
					<div style={StylesSS.score}> {this.state.score} </div>
					<div className='tilt' style={this.newBest ? { fontSize: fontSize / 2 + 'px' } : { display: 'none' }}> New Best! </div>
					<div className='tilt' style={this.newBest ? { display: 'none' } : {}}>
						<div style={StylesSS.bar}> </div>
						<img style={StylesSS.highScoreCrown} src={crown} alt={alt} />
						<div style={StylesSS.highScore}> {highScore} </div>
						<img style={StylesSS.highScoreCrown} src={crown} alt={alt} />
						<div style={StylesSS.bar}> </div>
					</div>
				</div>
				<div className='pulse' style={{
					WebkitTransition: this.once ? 'all 1s ease-out' : 'none',
					msTransition: this.once ? 'all 1s ease-out' : 'none',
					textAlign: 'center',
					fontSize: fontSize + 'px',
					marginTop: this.newBest ? calcHeight(50, -fontSize * 1.5 - calcWidth(40 / 1.5, 0)) : calcHeight(50, -fontSize * 2.25)
				}} onClick={() => { this.props.changeScreen('Play'); playSound(menu) }}> <div ref={ref => { this.text = ref }}> Play Again </div> </div>
				<ButtonContainer changeScreen={this.props.changeScreen} ref={ref => { this.buttons = ref }} button1='leaderboard' button2='challenge' button3='sound' />
				<div style={{
					WebkitTransition: this.once ? 'all 1s ease-out' : 'none',
					msTransition: this.once ? 'all 1s ease-out' : 'none',
					pointerEvents: 'none',
					position: 'absolute',
					height: calcHeight(100, -fontSize * (this.newBest ? 4.5 : 4)),
					bottom: '-100%',
					width: '100%',
					zIndex: 1,
					backgroundImage: 'linear-gradient(rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 5%)'
				}}> </div>
			</div>
		);
	}
}