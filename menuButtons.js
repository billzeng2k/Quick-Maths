const fontSize = calcWidth(1000/98, 0);

const StylesMB = {
	container: {
		position: 'absolute', 
		bottom: 0
	},
	menu_button: {
		display: 'inline-block',
		width: calcWidth(33, 0),
		textAlign: 'center',
	},
	menu_icon: {
		width: '60%'
	},
	menu_icon_big: {
		width: '70%'
	},
	menu_text: {
		fontSize: fontSize + 'px',
		bottom: calcWidth(2, 0)
	}
}

class MenuButtons extends React.Component {
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

	render() {
		return (
			<div style = { StylesMB.container }> 
				<div id = 'button' className = 'menu_button_animation1' style = { StylesMB.menu_button } onClick = { () => this.props.quickMaths.displayLeaderboard() }>
					<div ref = { ref => { this.mb[0] = ref }} >
						<img style = { StylesMB.menu_icon } src = { tutorial } />
						<div style = { StylesMB.menu_text }> Tutorial </div>
					</div>
				</div>
				<div id = 'button' className = 'menu_button_animation2' style = { StylesMB.menu_button } onClick = { () => this.props.quickMaths.selectContext(this.props.quickMaths) }>
					<div ref = { ref => { this.mb[1] = ref }} >
						<img style = { StylesMB.menu_icon_big } src = { challenge } />
						<div style = { StylesMB.menu_text }> Challenge </div>
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