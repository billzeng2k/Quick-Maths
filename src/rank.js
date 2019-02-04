import React, { Component } from 'react';
import { calcHeight, calcWidth } from './logic.js';
import { crown, crownS, crownC, award } from './images';
import { alt } from './game_config.js';

const fontSize = calcWidth(800/98, 0);
const fontSizeEn = calcWidth(1250/98, 0);
const entrySize = calcHeight(100, - fontSizeEn * 2 - calcWidth(35, 0)) / 6;
const margin = calcHeight(1, 0);

const Styles = {
	rank: {
		display: 'inline-block',
		margin: 2 * margin + 'px',
		height: entrySize - margin * 4 + 'px',
		float: 'right'
	},
	award: {
		position: 'relative',
		display: 'inline-block',
		margin: margin + 'px',
		width: entrySize - margin * 2 + 'px',
		textAlign: 'center',
		float: 'right',
	},
	awardImg: {
		height: entrySize - margin * 2 + 'px',
		right: 0
	},
	awardText: {
		width: entrySize - margin * 2 + 'px',
		position: 'absolute',
		fontSize: fontSize + 'px',
		top: - fontSize / 3.5 + 'px'
	}
}

export default class Rank extends Component {
	render() {
		if(this.props.rank === 1)
			return <img style = { Styles.rank } src = { crown } alt = { alt }/>;
		if(this.props.rank === 2)
			return <img style = { Styles.rank } src = { crownS } alt = { alt }/>;
		if(this.props.rank === 3)
			return <img style = { Styles.rank } src = { crownC } alt = { alt }/>;
		return (
			<div style = { Styles.award }>
				<img style = { Styles.awardImg } src = { award } alt = { alt }/>
				<div style = { Styles.awardText }> { this.props.rank } </div>
			</div>
		);
	}
}