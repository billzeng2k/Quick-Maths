import React, { Component } from 'react';
import { calcWidth } from './logic.js';
import { tut, alt } from './game_config';
import { playSound, remove_symbol } from './sounds';
import { plus } from './images';

const borderSize = calcWidth(50/98, 0);
const buttonSize = calcWidth(11, -borderSize);
const fontSize = calcWidth(2500/98, 0);

export default class Button extends Component {
	constructor(props) {
		super(props);
		this.state = { active: false, buttonRatio: 0.2 };
	}

	open(symbol) {
		this.setState({ symbol, buttonRatio: 1, active: true });
	}

	close() {
		this.props.disabled();
		this.setState({ buttonRatio: 0.2, active: false })
	}

	render () {
		return (
			<div style = {{ 
					width: buttonSize + 'px',
					position: 'relative',
					display: 'inline-block',
					top: this.state.active ? -fontSize / 7 + 'px' : -fontSize / 3.4 + 'px',
					right: buttonSize * 0.025 + 'px',
					transition: 'all 0.2s linear',
				}}>
				<div style = {{
					position: 'relative',
					boxSizing: 'border-box',
					border: borderSize + 'px solid black',
					borderRadius: '10000px',
					backgroundColor: tut ?'rgba(241, 196, 15, 1.0)' : 'rgba(241, 196, 15, 0.25)',
					margin: 'auto',
					width: buttonSize * this.state.buttonRatio + 'px',
					height: buttonSize * this.state.buttonRatio + 'px',
					transition: 'all 0.2s linear',
				}} onClick = { () => { this.close(); playSound(remove_symbol); }} id = 'button' ref = { ref => { this.btn = ref }}> 
					<img style = {{ 
						position: 'absolute',
						opacity: this.state.active ? 1 : 0,
						width: '60%',
						marginTop: '20%',
						marginLeft: '20%'
		 			}} src = { this.state.active ? this.state.symbol : plus } alt = { alt }/>
				</div>
			</div>
		);
	}
}
