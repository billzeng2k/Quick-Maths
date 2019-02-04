import React, { Component } from 'react';
import { calcWidth } from './logic.js';

const fontSize = calcWidth(2750/98, 0);

const Styles = {
	container: {
		height: 0,
		display: 'inline-block',
		textAlign: 'center',
	},
	number: {
		margin: 0,
		fontSize: fontSize + 'px'
	}
}

export default class Term extends Component {
	render () {
		return (
			<div style = { Styles.container }>
				<p style = { Styles.number }> { this.props.value } </p>
			</div>
		);
	}
}