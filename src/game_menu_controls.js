import React, { Component } from 'react';
import { calcWidth } from './logic.js';
import { playSound, toggleSound, menu, muted } from './sounds';
import { setGameRunning, alt } from './game_config.js';
import { playAnimation, resetAnimation } from './animation.js';
import { home, restart, mute, sound } from './images'; 
const borderSize = calcWidth(50/98, 0);
const buttonSize = calcWidth(12, borderSize);
const margin = calcWidth(0.5, 0);

const Styles = {
	buttonMiddle: {
		display: 'inline-block',
		width: buttonSize + 'px',
		height: buttonSize + 'px',
		margin: margin + 'px'
	},
	buttonRight: {
		display: 'inline-block',
		width: buttonSize + 'px',
		height: buttonSize + 'px',
		margin: margin + 'px'
	},
	buttonBottom: {
		width: buttonSize + 'px',
		height: buttonSize + 'px',
		margin: margin + 'px'
	},
	image: {
		position: 'relative', 
		top: '10%', 
		left: '10%', 
		width: '80%', 
		height: '80%'
	}

}

export default class GameMenuControls extends Component {
	resetGame() {
		this.props.game.resetGame();
	}

	homeButton() {
		setGameRunning(false);
		this.props.changeScreen('Home');
	}

	transitionOut() {
		playAnimation(this.container, 'slide_right_out');
	}

	resetAnimation() {
		resetAnimation(this.container, 'slide_right_out');
	}

	render() {
		return (
			<div className = 'slide_right' style = {{ position: 'absolute' }} ref = { ref => { this.container = ref }} >
				<div id = 'button' style = { Styles.buttonMiddle } onClick = { () => { this.homeButton(); playSound(menu) }}>
					<img style = { Styles.image } src = { home } alt = { alt }/>
				</div>
				<div id = 'button' style = { Styles.buttonRight } onClick = { () => { this.resetGame(); playSound(menu) }}>
					<img style = { Styles.image } src = { restart } alt = { alt }/>
				</div>
				<div id = 'button' style = { Styles.buttonBottom } onClick = { () => { toggleSound(); playSound(menu); this.forceUpdate() }}>
					<img style = { Styles.image } src = { muted ? mute : sound } alt = { alt }/>
				</div>	
			</div>
		);
	}
}