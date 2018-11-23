const borderSize = calcWidth(50/98, 0);
const buttonSize = calcWidth(11, -borderSize);
const fontSize = calcWidth(2500/98, 0);

class Button extends React.Component {
	constructor(props) {
		super(props);
		this.active = false;
		this.buttonRatio = 0.2;
	}

	open(symbol) {
		this.setState({ symbol: symbol })
		this.buttonRatio = 1;
		this.active = true;
	}

	close() {
		this.props.disabled();
		this.buttonRatio = 0.2;
		this.active = false;
	}

	render () {
		return (
			<div style = {{ 
					width: buttonSize + 'px',
					position: 'relative',
					display: 'inline-block',
					top: (- fontSize / 5 - (1 - this.buttonRatio) * buttonSize / 3) + 'px',
					right: buttonSize * 0.025 + 'px',
					WebkitTransition: 'all 0.2s linear',
					msTransition: 'all 0.2s linear'
				}}>
				<div style = {{
					boxSizing: 'border-box',
					border: borderSize + 'px solid black',
					borderRadius: '10000px',
					backgroundColor: tut ?'rgba(241, 196, 15, 0.25)' : 'transparent',
					margin: 'auto',
					width: buttonSize * this.buttonRatio + 'px',
					height: buttonSize * this.buttonRatio + 'px',
					WebkitTransition: 'all 0.2s linear',
					msTransition: 'all 0.2s linear'
				}} onClick = { () => { this.close(); removeSymbolSound(); }} id = 'button' ref = { ref => { this.btn = ref }}> 
					<img style = {{ 
						opacity: this.active ? 1 : 0,
						width: '60%',
						marginTop: '20%',
						marginLeft: '20%'
		 			}} src = { this.active ? this.state.symbol : plus }/>
				</div>
			</div>
		);
	}
}
