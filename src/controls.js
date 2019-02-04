import React, { Component } from 'react';
import { calcWidth } from './logic.js';
import { gameRunning, tutCnt, tutAns, alt } from './game_config.js';
import { playAnimation, resetAnimation } from './animation.js';
import { plus, minus, multiply, divide } from './images';
import { playSound, remove_symbol } from './sounds';

const buttonMargin = 3;
const borderSize = calcWidth(100/98, 0);
const fontSize = calcWidth(1500/98, 0) + 'px';

const StylesC = {
	container: {
		width: '100%',
		margin: 0,
		position: 'absolute', 
		bottom: 0
	},
	clear: {
		margin: buttonMargin + '%',
		width: calcWidth(100 - buttonMargin * 2, - 2 * borderSize),
		border: borderSize + 'px solid black',
		borderRadius: (2 * borderSize) + 'px',
		fontSize: fontSize,
		textAlign: 'center',
	},
	symbol: {
		marginLeft: buttonMargin + '%',
		display: 'inline-block',
		width: calcWidth(25 - buttonMargin * 1.25, - 2 * borderSize),
		height: calcWidth(25 - buttonMargin * 1.25, - 2 * borderSize),
		border: borderSize + 'px solid black',
		borderRadius: (2 * borderSize) + 'px',
	},
	symbolImg: {
		position: 'relative', 
		top: '10%', 
		left: '10%', 
		width: '80%', 
		height: '80%'
	}
}

export default class Controls extends Component {
	constructor(props) {
		super(props);
		this.tut = -1;
		this.answer = [];
		this.buttons = {};
	}

	activateSymbol(symbol) {
		if(gameRunning)
			this.props.callbackRef.symbolPress(symbol);
	}

	removeAllSymbols() {
		resetAnimation(this.clear, 'colorG');
		if(gameRunning)
			this.props.callbackRef.removeAllSymbols();
	}

	transitionOut() {
		playAnimation(this.container, 'slide_down_animation');
	}

	resetAnimation() {
		resetAnimation(this.container, 'slide_down_animation');
		resetAnimation(this.clear, 'unclickable');
		this.resetTutorial();
	}

	resetTutorial() {
		resetAnimation(this.buttons['+'], 'unclickable');
		resetAnimation(this.buttons['-'], 'unclickable');
		resetAnimation(this.buttons['*'], 'unclickable');
		resetAnimation(this.buttons['/'], 'unclickable');
		resetAnimation(this.buttons['+'], 'colorG');
		resetAnimation(this.buttons['-'], 'colorG');
		resetAnimation(this.buttons['*'], 'colorG');
		resetAnimation(this.buttons['/'], 'colorG');
		resetAnimation(this.clear, 'colorY');
	}

	setTutorial() {
		if(tutCnt >= tutAns.length)
			return;
		if(tutCnt > 0)
			playAnimation(this.clear, 'colorY');
		else 
			resetAnimation(this.clear, 'colorY');
		playAnimation(this.buttons['+'], 'unclickable');
		playAnimation(this.buttons['-'], 'unclickable');
		playAnimation(this.buttons['*'], 'unclickable');
		playAnimation(this.buttons['/'], 'unclickable');
		resetAnimation(this.buttons['+'], 'colorG');
		resetAnimation(this.buttons['-'], 'colorG');
		resetAnimation(this.buttons['*'], 'colorG');
		resetAnimation(this.buttons['/'], 'colorG');
		resetAnimation(this.buttons[tutAns[tutCnt]], 'unclickable');
		playAnimation(this.buttons[tutAns[tutCnt]], 'colorG');
	}

	render () {
		return (
			<div className = 'slide_up_pop_animation' style = { StylesC.container } ref = { ref => { this.container = ref }} >
				<div style = {{ width: '100%' }}>
					<div id = 'button' style = { StylesC.symbol } onClick = { () => this.activateSymbol(plus) } ref = { ref => { this.buttons['+'] = ref }}>
						<img style = { StylesC.symbolImg } src = { plus } alt = { alt }/>
					</div>
					<div id = 'button' style = { StylesC.symbol } onClick = { () => this.activateSymbol(minus) } ref = { ref => { this.buttons['-'] = ref }}> 
						<img style = { StylesC.symbolImg } src = { minus } alt = { alt }/>
					</div>
					<div id = 'button' style = { StylesC.symbol } onClick = { () => this.activateSymbol(multiply) } ref = { ref => { this.buttons['*'] = ref }}>
						<img style = { StylesC.symbolImg } src = { multiply } alt = { alt }/>
					</div>
					<div id = 'button' style = { StylesC.symbol } onClick = { () => this.activateSymbol(divide) } ref = { ref => { this.buttons['/'] = ref }}> 
						<img style = { StylesC.symbolImg } src = { divide } alt = { alt }/>
					</div>
				</div>
				<div id = 'button' style = { StylesC.clear } onClick = { () => { this.removeAllSymbols(); playSound(remove_symbol); }} ref = { ref => { this.clear = ref }}> CLEAR </div>
			</div>
		);
	}
}