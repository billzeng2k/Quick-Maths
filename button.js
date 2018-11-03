const borderSize = calcWidth(50/98, 0);
const buttonSize = calcWidth(11, -borderSize);
const fontSize = calcWidth(2500/98, 0);
const buttonRatio = 1;

const StylesB = {
	container: {
		width: buttonSize + 'px',
		position: 'relative',
		display: 'inline-block',
		top: (- fontSize / 5 - (1 - buttonRatio) * buttonSize / 3) + 'px'
	},
	circle: {
		border: borderSize + 'px solid black',
		borderRadius: '100px',
		backgroundColor: 'transparent',
		margin: 'auto',
		width: buttonSize * buttonRatio + 'px',
		height: buttonSize * buttonRatio + 'px'
	},
	symbol: {
		width: '60%',
		marginTop: '20%',
		marginLeft: '20%',
	}
}

class Button extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {
		return (
			<div style = { StylesB.container }>
				<div style = { StylesB.circle }> 
					<img style = { StylesB.symbol } src = { this.props.symbol }/>
				</div>
			</div>
		);
	}
}
