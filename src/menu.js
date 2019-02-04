import React, { Component } from 'react';
import { calcWidth, calcHeight } from './logic.js';
import { playAnimation, resetAnimation } from './animation.js';
import { playSound, menu } from './sounds';
import { ButtonContainer } from './buttons.js';

const fontSize = calcWidth(2500 / 98, 0);

const Styles = {
	title: {
		textAlign: 'center',
		fontSize: fontSize + 'px'
	},
	text: {
		textAlign: 'center',
		fontSize: fontSize + 'px',
		marginTop: calcHeight(50, -fontSize * 1.5)
	}
};

export default class Menu extends Component {
	playGame() {
		this.props.changeScreen('Play');
	}

	transitionOut() {
		playAnimation(this.text, 'fade_out_animation');
		playAnimation(this.title, 'slide_up_out_animation');
		this.buttons.start();
	}

	reset() {
		this.buttons.reset();
		resetAnimation(this.text, 'fade_out_animation');
		resetAnimation(this.title, 'slide_up_out_animation');
	}

	render() {
		return (
			<div>
				<div className='slide_down_pop_animation' style={Styles.title} ref={ref => { this.title = ref }} > Quick Maths </div>
				<div className='pulse' onClick={() => { this.playGame(); playSound(menu) }} style={Styles.text} > <div ref={ref => { this.text = ref }}> Start Game </div> </div>
				<ButtonContainer changeScreen = { this.props.changeScreen } ref={ref => { this.buttons = ref }} button1 = { 'leaderboard' } button2 = { 'challenge' } button3 = { 'sound' } />
			</div>
		);
	}
}
