const fontSizeSB = calcWidth(1000/98, 0);

class ScoreScreenButtons extends React.Component {
	constructor(props) {
		super(props);
		this.mb = [];
		this.once = false;
		this.history = false;
	}

	reset() {
		this.once = false;
		this.history = false;
		resetAnimation(this.mb[0], 'pop_down_animation');
		resetAnimation(this.mb[1], 'pop_down_animation');
		resetAnimation(this.mb[2], 'pop_down_animation');
	}

	slideOut() {
		playAnimation(this.mb[0], 'pop_down_animation');
		playAnimation(this.mb[1], 'pop_down_animation');
		playAnimation(this.mb[2], 'pop_down_animation');
	}

	toggleHistory(newBest) {
		this.once = true;
		this.history = !this.history;
		this.newBest = newBest;
	}

	render() {
		return (
			<div style = { this.history ? 
				{ position: 'absolute', bottom: calcHeight(100, - fontSizeSB * (this.newBest ? 11.25 : 10)), WebkitTransition: this.once ? 'all 1s ease-out' : 'none', msTransition: this.once ? 'all 1s ease-out' : 'none' }
				: { position: 'absolute', bottom: 0, WebkitTransition: this.once ? 'all 1s ease-out' : 'none', msTransition: this.once ? 'all 1s ease-out' : 'none' }}> 
				<div id = 'button' className = 'menu_button_animation1' onClick = { () => { this.props.quickMaths.goHome(); menuSound() }} style = { StylesMB.menu_button }>
					<div ref = { ref => { this.mb[0] = ref }} >
						<img style = { StylesMB.menu_icon } src = { home } />
						<div style = { StylesMB.menu_text }> Home </div>
					</div>
				</div>
				<div id = 'button' className = 'menu_button_animation2' style = { StylesMB.menu_button } onClick = { () => { this.props.quickMaths.displayLeaderboard(); menuSound() }}>
					<div ref = { ref => { this.mb[1] = ref }} >
						<img style = { StylesMB.menu_icon } src = { trophy } />
						<div style = { StylesMB.menu_text }> Leaderboards </div>
					</div>
				</div>
				<div id = 'button' className = 'menu_button_animation3' onClick = { () => { toggleSound();  menuSound() }} style = { StylesMB.menu_button } >
					<div ref = { ref => { this.mb[2] = ref }} >
						<img style = { StylesMB.menu_icon } src = { muted ? mute : sound } />
						<div style = { StylesMB.menu_text }> { muted ? 'Unmute' : 'Mute' } </div>
					</div>
				</div>
			</div>
		);
	}
}