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
	}

	activateSymbol(symbol) {
		this.props.callbackRef.symbolPress(symbol);
	}

	removeAllSymbols() {
		this.props.callbackRef.removeAllSymbols();
	}

	render () {
		return (
			<div style = { StylesC.container }>
				<div style = {{ width: '100%' }}>
					<div id = 'button' style = { StylesC.symbol } onClick = { () => this.activateSymbol(plus) }>
						<img style = { StylesC.symbolImg } src = { plus } />
					</div>
					<div id = 'button' style = { StylesC.symbol } onClick = { () => this.activateSymbol(minus) }> 
						<img style = { StylesC.symbolImg } src = { minus } />
					</div>
					<div id = 'button' style = { StylesC.symbol } onClick = { () => this.activateSymbol(multiply) }>
						<img style = { StylesC.symbolImg } src = { multiply } />
					</div>
					<div id = 'button' style = { StylesC.symbol } onClick = { () => this.activateSymbol(divide) }> 
						<img style = { StylesC.symbolImg } src = { divide } />
					</div>
				</div>
				<div id = 'button' style = { StylesC.clear } onClick = { () => this.removeAllSymbols() }> CLEAR </div>
			</div>
		);
	}
}