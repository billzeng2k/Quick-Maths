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
		lineHeight: entrySize + 'px',
		width: calcWidth(100, 0),
	},
	loading: {
		fontSize: fontSize + 'px',
		borderStyle: 'solid',
		borderWidth: '0px 0px ' + calcHeight(0.3, 0) + 'px',
		lineHeight: entrySize + 'px',
		width: calcWidth(100, 0),
		textAlign: 'center'
	},
	score: {
		display: 'inline-block',
		verticalAlign: 'top',
		float: 'right'
	},
	name: {
		display: 'inline-block',
		verticalAlign: 'top',
	},
	componentImage: {
		display: 'inline-block',
		margin: margin + 'px',
		height: entrySize - margin * 2 + 'px',
		width: entrySize - margin * 2 + 'px',
		borderRadius: entrySize + 'px'
	}
}

export default class Entry extends Component {
	constructor(props) {
		super(props);
		this.rank = this.props.rank;
		this.name = this.props.name;
		this.photo = this.props.photo;
		this.score = this.props.score;
	}

	setEntry(rank, name, photo, score) {
		this.rank = rank;
		this.name = name;
		this.photo = photo;
		this.score = score;
	}

	render() {
		if(this.rank == null) 
			return <div style = { Styles.loading }> Loading </div>;
		return (
			<div style = { Styles.entry }>
				<img style = { Styles.componentImage } src = { this.photo }  alt = { alt }/>
				<div style = { Styles.name }> { this.name } </div>
				<Rank rank = { this.rank } />
				<div style = { Styles.score }> { this.score } </div>
			</div>
		);
	}
}