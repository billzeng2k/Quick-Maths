import React, { Component } from 'react';
import { calcWidth, calcHeight } from './logic.js';
import { playAnimation, resetAnimation } from './animation.js';
import { ButtonContainer } from './buttons.js';
import { fight } from './images';
import Entry from './entry.js';

const fontSize = calcWidth(2500/98, 0);
const entrySize = calcHeight(100, - fontSize * 2 - calcWidth(35, 0)) / 6;

const Styles = {
	title: {
		textAlign: 'center',
		fontSize: fontSize + 'px'
	},
	noContext: {
		textAlign: 'center',
		fontSize: fontSize / 2 + 'px',
		marginTop: calcHeight(50, -fontSize * 1.5 - calcWidth(18, 0)) + 'px'
	},
	noContextImage: {
		width: calcWidth(40, 0) + 'px'
	},
	entryContainer: {
		position: 'relative',
		height: entrySize * 6 + 'px',
		width: calcWidth(100, 0) + 'px',
		paddingRight: '17px',
		overflowX: 'hidden',
		overflowY: 'auto',
	},
	foreground: {
		pointerEvents: 'none',
		position: 'fixed',
		top: fontSize * 1.2 + entrySize + 'px',
		height: entrySize * 6 + 'px',
		width: '100%',
		zIndex: 1,
		backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0) 90%, rgba(255, 255, 255, 1) 97%)'
	},
};

export default class Leaderboard extends Component {
	constructor(props) {
		super(props);
		this.state = { entries: -1 };
	}

	transitionOut() {
		playAnimation(this.noContext, 'fade_out_animation');
		playAnimation(this.entryContainer, 'fade_out_animation');
		playAnimation(this.title, 'slide_up_out_animation');
		this.buttons.start();
	}

	reset() {
		window.FBInstant.getLeaderboardAsync('BaseGame.' + window.FBInstant.context.getID())
		  .then((leaderboard) => leaderboard.getPlayerEntryAsync())
		  .then((entry) => this.currentPlayer.setEntry(entry.getRank(), entry.getPlayer().getName(), entry.getPlayer().getPhoto(), entry.getScore()));
		window.FBInstant.getLeaderboardAsync('BaseGame.' + window.FBInstant.context.getID())
		  .then((leaderboard) => leaderboard.getEntriesAsync())
		  .then((entries) => this.setState({ entries }))
		this.buttons.reset();
		resetAnimation(this.noContext, 'fade_out_animation');
		resetAnimation(this.entryContainer, 'fade_out_animation');
		resetAnimation(this.title, 'slide_up_out_animation');
	}

	renderEntries() {
		if(this.state.entries === -1)
			return;
		var elements = [];
		for(var i = 0; i < this.state.entries.length; i++) {
			if(window.FBInstant.player.getID() === this.state.entries[i].getPlayer().getID())
				continue;
			var entry = <Entry key = { i } rank = { this.state.entries[i].getRank() } name = { this.state.entries[i].getPlayer().getName() } photo = { this.state.entries[i].getPlayer().getPhoto() } score = { this.state.entries[i].getScore() }/>;
			elements.push(entry);
		}
		return elements;
	}

	render() {
		return (
			<div>
				<div style = { Styles.title } className = 'slide_down_pop_animation' ref = { ref => { this.title = ref }}> Leaderboard </div>
				<div className = 'fade_in_animation' style = { window.FBInstant.context.getID() === null ? { display:  'none' } : { }} ref = { ref => { this.entryContainer = ref }}>
					<Entry ref = { ref => { this.currentPlayer = ref }}/>
					<div style = { Styles.entryContainer }>
						{ this.renderEntries() }
						<div style = { Styles.foreground }> </div>
					</div>
				</div>
				<div style = { window.FBInstant.context.getID() === null ? Styles.noContext : { display:  'none' }} ref = { ref => { this.noContext = ref }}>
					<div className = 'pulse'>
						<img style = { Styles.noContextImage } src = { fight } alt = 'failed to load :('/>
						<div> Challenge a friend first! </div>
					</div>
				</div>
				<ButtonContainer changeScreen = { this.props.changeScreen } ref = { ref => { this.buttons = ref }} button1 = 'home' button2 = 'challenge' button3 = 'sound'/>
			</div>
		);
	}
}