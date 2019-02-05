import React, { Component } from 'react';
import { calcWidth, setMaxR, setTerms } from './logic.js';
import { playAnimation, resetAnimation } from './animation.js';
import { infinite } from './images';
import { gameRunning, timerSize, alt } from './game_config.js';

const borderSize = calcWidth(100/98, 0);
const fontSize = calcWidth(2500/98, 0);

const circumference = timerSize * 2 * Math.PI;
const sequence = ['inf', 0, 14, 13, 12, 12, 11, 11, 10, 10, 10, 9, 9, 9, 8, 8, 8, 8, 7, 7, 7, 7, 7, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 'change', 20, 15, 14, 13, 12, 12, 11, 11, 10, 10, 10, 9, 9, 9, 8, 8, 8, 8, 7, 7, 7, 7, 7, 6, 6, 6, 6, 6, 5];
let gameTime = sequence[0];

const StylesT = {
	container: {
		top: '1%',
		right: ((document.body.clientWidth - (timerSize * 2 + borderSize * 2)) / 2) + 'px',
		position: 'absolute',
		textAlign: 'center',
		width: (timerSize * 2 + borderSize * 2) + 'px',
  		height: (timerSize * 2 + borderSize * 2) + 'px'
	},
	time: {
		fontSize: fontSize  + 'px',
		position: 'absolute',
		top: (-fontSize / 2.25) + 'px',
		bottom: 0,
		left: 0, 
		right: 0
	},
	inf: {
		position: 'absolute',
		width: fontSize * 1.25  + 'px',
		top: fontSize / 2.3 + 'px',
		bottom: 0,
		left: fontSize / 2.4 + 'px', 
	},
	svg: {	
  		width: (timerSize * 2 + borderSize * 2) + 'px',
  		height: (timerSize * 2 + borderSize * 2) + 'px',
  		transform: 'rotateY(-180deg) rotateZ(-90deg)'
	},
	circle: {
 		strokeDasharray: circumference + 'px',
  		strokeLinecap: 'round',
		strokeWidth: borderSize + 'px',
		stroke: 'black',
		fill: 'none',
		WebkitTransition: 'stroke-dashoffset 1s linear',
  		msTransition: 'stroke-dashoffset 1s linear'
	}
}

export default class Timer extends Component {
	constructor(props) {
		super(props);
		this.state = { mounted: false, time: gameTime + 1 };
	}

	initialize() {
		gameTime = sequence[0];
		this.score = 0;
	}

	equationSolved() {
		var timeElapsed = new Date().getTime() - this.startTime;
		this.score++;
		if(this.score < sequence.length) {
			if(sequence[this.score] === 'change') {
				setMaxR(49);
				setTerms(4);
			} else
				gameTime = sequence[this.score];
		}
		this.resetTime();
		this.startCountdown();
		return timeElapsed / 1000;
	}

	done() {
		clearInterval(this.counter);
		this.setState({ time: 0 });
		this.props.game.gameFinished(this.score);
	}

	resetTime() {
		clearInterval(this.counter);
		this.setState({ time: gameTime + 1 });
	}

	startCountdown() {
		clearInterval(this.counter);
		this.setState({ time: gameTime + 1 });
		this.startTime = new Date().getTime();
		this.counter = setInterval(() => {
			this.setState({ time: this.state.time - 1 });
		}, 1000);
	}

	componentDidMount() {
		this.countdown = document.getElementById('timer');
		this.setState({ mounted: true });
	}

	transitionOut() {
		playAnimation(this.container, 'pop_down_animation')
	}

	resetAnimation() {
		resetAnimation(this.container, 'pop_down_animation')
	}

	render () {
		if(this.state.time <= 0 && gameRunning) 
			this.done();
		if(this.state.mounted)
			this.countdown.style.setProperty('stroke-dashoffset', gameTime === 'inf' ? 0 : circumference * (gameTime - Math.max(this.state.time - 1, 0)) / gameTime);
		return (
			<div ref = { ref => { this.container = ref }} className = 'pop_up_animation' style = { StylesT.container }>
				{ 
					gameTime === 'inf' ? 
					<img style = { StylesT.inf } src = { infinite } alt = { alt }/> :
					<p style = { StylesT.time }> { Math.min(this.state.time, gameTime) } </p>
				}
				<svg style = { StylesT.svg }>
					<circle id = "timer" style = { StylesT.circle } r = { timerSize + 'px' } cx = { (borderSize + timerSize) + 'px' } cy = { (borderSize + timerSize) + 'px' } />
				</svg>
			</div>
		);
	}
}