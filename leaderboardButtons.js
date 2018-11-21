class LeaderboardButtons extends React.Component {
	constructor(props) {
		super(props);
		this.mb = [];
	}

	reset() {
		resetAnimation(this.mb[0], 'pop_down_animation');
		resetAnimation(this.mb[1], 'pop_down_animation');
		resetAnimation(this.mb[2], 'pop_down_animation');
	}

	slideOut() {
		playAnimation(this.mb[0], 'pop_down_animation');
		playAnimation(this.mb[1], 'pop_down_animation');
		playAnimation(this.mb[2], 'pop_down_animation');
	}

	playGame() {
		if(FBInstant.context.getID() == null)
			this.props.quickMaths.selectContext(this.props.quickMaths);
		else 
			this.props.quickMaths.startGame();
	}

	render() {
		return (
			<div style = { StylesMB.container }> 
				<div id = 'button' className = 'menu_button_animation1' onClick = { () => this.props.quickMaths.goHome() } style = { StylesMB.menu_button }>
					<div ref = { ref => { this.mb[0] = ref }} >
						<img style = { StylesMB.menu_icon } src = { home } />
						<div style = { StylesMB.menu_text }> Home </div>
					</div>
				</div>
				<div id = 'button' className = 'menu_button_animation2' style = { StylesMB.menu_button } onClick = { () => this.playGame() }>
					<div ref = { ref => { this.mb[1] = ref }} >
						<img style = { StylesMB.menu_icon } src = { play } />
						<div style = { StylesMB.menu_text }> Play </div>
					</div>
				</div>
				<div id = 'button' className = 'menu_button_animation3' onClick = { () => toggleSound() } style = { StylesMB.menu_button } >
					<div ref = { ref => { this.mb[2] = ref }} >
						<img style = { StylesMB.menu_icon } src = { muted ? mute : sound } />
						<div style = { StylesMB.menu_text }> { muted ? 'Unmute' : 'Mute' } </div>
					</div>
				</div>
			</div>
		);
	}
}