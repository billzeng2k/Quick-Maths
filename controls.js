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

	render () {
		return (
			<div style = { StylesC.container }>
				<div style = {{ width: '100%' }}>
					<div style = { StylesC.symbol }>
						<img style = { StylesC.symbolImg } src = { plus } />
					</div>
					<div style = { StylesC.symbol }> 
						<img style = { StylesC.symbolImg } src = { minus } />
					</div>
					<div style = { StylesC.symbol }>
						<img style = { StylesC.symbolImg } src = { multiply } />
					</div>
					<div style = { StylesC.symbol }> 
						<img style = { StylesC.symbolImg } src = { divide } />
					</div>
				</div>
				<div style = { StylesC.clear }> CLEAR </div>
			</div>
		);
	}
}