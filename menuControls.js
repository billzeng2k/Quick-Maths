const borderSize = calcWidth(50/98, 0);
const buttonSize = calcWidth(12, borderSize);
const margin = calcWidth(0.5, 0);

const StylesP = {
	buttonMiddle: {
		display: 'inline-block',
		width: buttonSize + 'px',
		height: buttonSize + 'px',
		margin: margin + 'px'
	},
	buttonRight: {
		display: 'inline-block',
		width: buttonSize + 'px',
		height: buttonSize + 'px',
		margin: margin + 'px'
	},
	buttonBottom: {
		width: buttonSize + 'px',
		height: buttonSize + 'px',
		margin: margin + 'px'
	},
	image: {
		position: 'relative', 
		top: '10%', 
		left: '10%', 
		width: '80%', 
		height: '80%'
	}

}

class MenuControls extends React.Component {
	constructor(props) {
		super(props);
	}

	resetGame() {
		this.props.game.resetGame();
	}

	homeButton() {
		if(homeButton) {
			gameRunning = false;
			this.props.quickMaths.goHome();
		}
	}

	transitionOut() {
		playAnimation(this.container, 'slide_right_out');
	}

	resetAnimation() {
		resetAnimation(this.container, 'slide_right_out');
	}

	render() {
		return (
			<div className = 'slide_right' style = {{ position: 'absolute' }} ref = { ref => { this.container = ref }} >
				<div id = 'button' style = { StylesP.buttonMiddle } onClick = { () => { this.homeButton(); menuSound() }}>
					<img style = { StylesP.image } src = { home } />
				</div>
				<div id = 'button' style = { StylesP.buttonRight } onClick = { () => { this.resetGame(); menuSound() }}>
					<img style = { StylesP.image } src = { restart } />
				</div>
				<div id = 'button' style = { StylesP.buttonBottom } onClick = { () => { toggleSound(); menuSound() }}>
					<img style = { StylesP.image } src = { muted ? mute : sound } />
				</div>	
			</div>
		);
	}
}