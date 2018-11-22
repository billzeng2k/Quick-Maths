const buttonMargin = 3;
const borderSize = calcWidth(100/98, 0);
const fontSize = calcWidth(1500/98, 0) + 'px';

const StylesC = {
	container: {
		width: '100%',
		margin: 0,
		position: 'absolute', 
		bottom: 0
	},
	clear: {
		margin: buttonMargin + '%',
		width: calcWidth(100 - buttonMargin * 2, - 2 * borderSize),
		border: borderSize + 'px solid black',
		borderRadius: (2 * borderSize) + 'px',
		fontSize: fontSize,
		textAlign: 'center',
	},
	symbol: {
		marginLeft: buttonMargin + '%',
		display: 'inline-block',
		width: calcWidth(25 - buttonMargin * 1.25, - 2 * borderSize),
		height: calcWidth(25 - buttonMargin * 1.25, - 2 * borderSize),
		border: borderSize + 'px solid black',
		borderRadius: (2 * borderSize) + 'px',
	},
	symbolImg: {
		position: 'relative', 
		top: '10%', 
		left: '10%', 
		width: '80%', 
		height: '80%'
	}
}

class Controls extends React.Component {
	constructor(props) {
		super(props);
		this.buttons = {};
	}

	activateSymbol(symbol) {
		if(gameRunning)
			this.props.callbackRef.symbolPress(symbol);
	}

	removeAllSymbols() {
		resetAnimation(this.clear, 'pulse_tut_s');
		if(gameRunning)
			this.props.callbackRef.removeAllSymbols();
	}

	transitionOut() {
		playAnimation(this.container, 'slide_down_animation');
	}

	resetAnimation() {
		resetAnimation(this.container, 'slide_down_animation');
		resetAnimation(this.buttons['+'], 'pulse_tut');
		resetAnimation(this.buttons['-'], 'pulse_tut');
		resetAnimation(this.buttons['*'], 'pulse_tut');
		resetAnimation(this.buttons['/'], 'pulse_tut');
		resetAnimation(this.clear, 'pulse_tut_s');
	}

	setTutorial(answer) {
		if(answer == null)
			playAnimation(this.clear, 'pulse_tut_s');
		else {
			for(var i = 0; i < answer.length; i++) 
				playAnimation(this.buttons[answer[i]], 'pulse_tut');
		}
	}

	render () {
		return (
			<div className = 'slide_up_pop_animation' style = { StylesC.container } ref = { ref => { this.container = ref }} >
				<div style = {{ width: '100%' }}>
					<div id = 'button' style = { StylesC.symbol } onClick = { () => this.activateSymbol(plus) } ref = { ref => { this.buttons['+'] = ref }}>
						<img style = { StylesC.symbolImg } src = { plus } />
					</div>
					<div id = 'button' style = { StylesC.symbol } onClick = { () => this.activateSymbol(minus) } ref = { ref => { this.buttons['-'] = ref }}> 
						<img style = { StylesC.symbolImg } src = { minus } />
					</div>
					<div id = 'button' style = { StylesC.symbol } onClick = { () => this.activateSymbol(multiply) } ref = { ref => { this.buttons['*'] = ref }}>
						<img style = { StylesC.symbolImg } src = { multiply } />
					</div>
					<div id = 'button' style = { StylesC.symbol } onClick = { () => this.activateSymbol(divide) } ref = { ref => { this.buttons['/'] = ref }}> 
						<img style = { StylesC.symbolImg } src = { divide } />
					</div>
				</div>
				<div id = 'button' style = { StylesC.clear } onClick = { () => this.removeAllSymbols() } ref = { ref => { this.clear = ref }}> CLEAR </div>
			</div>
		);
	}
}