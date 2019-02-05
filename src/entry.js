import React, { Component } from 'react';
import { calcWidth, calcHeight } from './logic.js';
import Rank from './rank.js';
import { alt } from './game_config.js';

const fontSize = calcWidth(1250/98, 0);
const entrySize = calcHeight(100, - fontSize * 2 - calcWidth(35, 0)) / 6;
const margin = calcHeight(1, 0);

const Styles = {
	entry: {
		fontSize: fontSize + 'px',
		borderStyle: 'solid',
		borderWidth: '0px 0px ' + calcHeight(0.3, 0) + 'px',
		width: calcWidth(100, 0),
		lineHeight: 0
	},
	loading: {
		fontSize: fontSize + 'px',
		borderStyle: 'solid',
		borderWidth: '0px 0px ' + calcHeight(0.3, 0) + 'px',
		width: calcWidth(100, 0),
		textAlign: 'center',
		lineHeight: 0
	},
	score: {
		display: 'inline-block',
		lineHeight: entrySize + 'px',
		verticalAlign: 'bottom',
		float: 'right'
	},
	name: {
		display: 'inline-block',
		verticalAlign: 'top',
		lineHeight: entrySize + 'px',
	},
	componentImage: {
		display: 'inline-block',
		margin: margin + 'px',
		height: entrySize - margin * 2 + 'px',
		width: entrySize - margin * 2 + 'px',
		borderRadius: entrySize + 'px',
	}
}

export default class Entry extends Component {
	constructor(props) {
		super(props);
		this.state = { rank: this.props.rank, name: this.props.name, photo: this.props.photo, score: this.props.score };
	}

	setEntry(rank, name, photo, score) {
		this.setState({ rank, name, photo, score });
	}

	render() {
		if(this.state.photo === null) 
			return <div style = { Styles.loading }> Loading </div>;
		return (
			<div style = { Styles.entry }>
				<img style = { Styles.componentImage } src = { this.state.photo }  alt = { alt }/>
				<div style = { Styles.name }> { this.state.name } </div>
				<Rank rank = { this.state.rank } />
				<div style = { Styles.score }> { this.state.score } </div>
			</div>
		);
	}
}