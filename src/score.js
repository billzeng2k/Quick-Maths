import React, { Component } from 'react';
import { calcWidth } from './logic.js';
import { playAnimation, resetAnimation } from './animation.js';
import { winEmojis, alt } from './game_config.js';
import { grin } from './images';

const fontSize = calcWidth(1750/98, 0);
const margin = calcWidth(1, 0);

const Styles = {
	emoji: {
		paddingBottom: fontSize * 0.1 + 'px',
		width: fontSize * 0.5 + 'px',
		height: fontSize * 0.5 + 'px',
		paddingRight: margin + 'px',
		opacity: 0
	},
	container: {
		position: 'absolute',
		fontSize: fontSize + 'px',
		top: margin + 'px',
		right: 0,
		paddingRight: margin * 2 + 'px'
	}
};

export default class Score extends Component {
	constructor(props) {
		super(props);
		this.state = { mounted: false, score: 0};
		this.mounted = false;
		this.emoji = grin;
		this.state = { score: 0 };
	}

	componentDidMount() {
		this.setState({ mounted: true });
	}

	resetScore () {
		this.setState({ score: 0 });
	}

	scorePoint() {
		this.setState({ score: this.state.score + 1 });
		this.emoji = winEmojis[Math.floor(Math.random() * winEmojis.length)];
		playAnimation(this.emojiContainer, 'emoji_animation');
	}

	getScore() {
		return this.state.score;
	}

	setScore(score) {
		this.setState({ score });
	}

	transitionOut() {
		playAnimation(this.container, 'slide_left_out');
	}

	resetAnimation() {
		resetAnimation(this.container, 'slide_left_out');
		resetAnimation(this.emojiContainer, 'emoji_animation');
	}

	render () {
		return (
			<div className = 'slide_left' style = { Styles.container } ref = { ref => { this.container = ref }} >
				<img ref = { ref => { this.emojiContainer = ref }} style = { Styles.emoji } src = { this.emoji } alt = { alt }/>
				{ this.state.mounted ? this.state.score : 0 }
			</div>
		);
	}
}