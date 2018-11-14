const borderSize = calcWidth(50/98, 0);
const buttonSize = calcWidth(10, borderSize);
const margin = calcWidth(1, 0);

const StylesP = {
	buttonMiddle: {
		position: 'absolute',
		width: buttonSize + 'px',
		height: buttonSize + 'px',
		top: margin + 'px',
		left: margin + 'px'
	},
	buttonRight: {
		position: 'absolute',
		width: buttonSize + 'px',
		height: buttonSize + 'px',
		top: (margin * 2 + buttonSize) + 'px',
		left: margin + 'px'
	},
	buttonBottom: {
		position: 'absolute',
		width: buttonSize + 'px',
		height: buttonSize + 'px',
		top: margin + 'px',
		left: (margin * 2 + buttonSize) + 'px'
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
		gameRunning = false;
		this.props.quickMaths.goHome();
	}

	render() {
		return (
			<div style = {{ position: 'absolute' }}>
				<div id = 'button' style = { StylesP.buttonRight }>
					<img style = { StylesP.image } src = { mute } />
				</div>
				<div id = 'button' style = { StylesP.buttonMiddle } onClick = { () => this.homeButton() }>
					<img style = { StylesP.image } src = { home } />
				</div>
				<div id = 'button' style = { StylesP.buttonBottom } onClick = { () => this.resetGame() }>
					<img style = { StylesP.image } src = { restart } />
				</div>
			</div>
		);
	}
}