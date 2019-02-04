import React, { Component } from 'react';
import { calcWidth, calcHeight } from './logic.js';
import { equal } from './images';
import { alt } from './game_config.js';

const fontSize = calcWidth(2500/98, 0);

const Styles = {
	term: {
		display: 'inline-block',
		fontSize: fontSize
	},
	timeContainer: {
		display: 'block',
		position: 'relative',
		left: calcWidth(5, 0),
		textAlign: 'left',
		width: '100%'
	},
	timeContainerT: {
		display: 'block',
		position: 'relative',
		left: calcWidth(5, 0),
		textAlign: 'left',
		width: '100%',
		paddingTop: calcHeight(1.5, 0) + 'px'
	},
	time: {
		display: 'inline-block',
		lineHeight: fontSize / 4 + 'px',
		fontSize: fontSize / 2
	},
	emoji: {
		display: 'inline-block',
		width: fontSize / 3,
		paddingLeft: calcWidth(1, 0) + 'px'
	},
	symbol: {
		position: 'relative',
		display: 'inline-block',
		width: calcWidth(10, 0),
		bottom: (fontSize - calcWidth(10, 0)) / 5
	}
}

export default class ScoreEntry extends Component {
	renderEquation() {
		var container = [];
		if(this.props.values == null)
			return;
		if(this.props.special)
			container.push(
				<div style = { Styles.timeContainerT }>
					<div style = { Styles.time }> { this.props.time } </div>
					<img src = { this.props.emoji } style = { Styles.emoji } alt = { alt }/>
				</div>
			);
		else
			container.push(
				<div style = { Styles.timeContainer }>
					<div style = { Styles.time }> { this.props.time + 's' } </div>
					<img src = { this.props.emoji } style = { Styles.emoji } alt = { alt }/>
				</div>
			);
		for(var i = 0; i < this.props.operators.length; i++) {
			container.push(<div style = { Styles.term }> { this.props.values[i] } </div>);
			container.push(<img className = { this.props.special ? 'tilt_more' : ' ' } style = { Styles.symbol } src = { this.props.operators[i] } alt = { alt }/>);
		}
		container.push(<div style = { Styles.term }> { this.props.values[this.props.values.length - 1] } </div>);
		container.push(<img style = { Styles.symbol } src = { equal } alt = { alt }/>);
		container.push(<div style = { Styles.term }> { this.props.result } </div>);
		return container;
	}

	render() {
		return (
			<div style = {{ margin: 'auto' }}>
				{ this.renderEquation() }
			</div>
		);
	}
}