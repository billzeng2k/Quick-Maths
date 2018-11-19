const fontSize = calcWidth(2500/98, 0);

const StylesM = {
	title: {
		textAlign: 'center',
		fontSize: fontSize + 'px'
	},
	text: {
		textAlign: 'center',
		fontSize: fontSize + 'px',
		marginTop: calcHeight(50, -fontSize * 1.5)
	}
};

class Menu extends React.Component {
	constructor(props) {
		super(props);
	}

	playGame() {
		this.props.quickMaths.startGame();
	}

	transitionOut() {
		playAnimation(this.text, 'fade_out_animation');
		playAnimation(this.title, 'slide_up_out_animation');
		this.menuButtons.slideOut();
	}

	reset() {
		this.menuButtons.reset();
		resetAnimation(this.text, 'fade_out_animation');
		resetAnimation(this.title, 'slide_up_out_animation');
	}

	render () {
		return (
			<div>
				<div className = 'slide_down_pop_animation' style = { StylesM.title } ref = { ref => { this.title = ref }} > Quick Maths </div>
				<div className = 'pulse' onClick = { () => this.playGame() } style = { StylesM.text } > <div ref = { ref => { this.text = ref }}> Start Game </div> </div>
				<MenuButtons ref = { ref => { this.menuButtons = ref }} />
			</div>
		);
	}
}
