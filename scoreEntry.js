const fontSizeSE = calcWidth(2500/98, 0);

const StylesSE = {
	term: {
		display: 'inline-block',
		fontSize: fontSizeSE
	},
	timeContainer: {
		display: 'block',
		position: 'relative',
		left: calcWidth(5, 0),
		textAlign: 'left',
		width: '100%'
	},
	timeContainerT: {
		display: 'block',
		position: 'relative',
		left: calcWidth(5, 0),
		textAlign: 'left',
		width: '100%',
		paddingTop: calcHeight(1.5, 0) + 'px'
	},
	time: {
		display: 'inline-block',
		lineHeight: fontSizeSE / 4 + 'px',
		fontSize: fontSizeSE / 2
	},
	emoji: {
		display: 'inline-block',
		width: fontSizeSE / 3,
		paddingLeft: calcWidth(1, 0) + 'px'
	},
	symbol: {
		position: 'relative',
		display: 'inline-block',
		width: calcWidth(10, 0),
		bottom: (fontSizeSE - calcWidth(10, 0)) / 5
	}
}

class ScoreEntry extends React.Component {
	constructor(props) {
		super(props);
	}

	renderEquation() {
		var container = [];
		if(this.props.values == null)
			return;
		if(this.props.special)
			container.push(
				<div style = { StylesSE.timeContainerT }>
					<div style = { StylesSE.time }> { this.props.time } </div>
					<img src = { this.props.emoji } style = { StylesSE.emoji } />
				</div>
			);
		else
			container.push(
				<div style = { StylesSE.timeContainer }>
					<div style = { StylesSE.time }> { this.props.time + 's' } </div>
					<img src = { this.props.emoji } style = { StylesSE.emoji } />
				</div>
			);
		for(var i = 0; i < this.props.operators.length; i++) {
			container.push(<div style = { StylesSE.term }> { this.props.values[i] } </div>);
			container.push(<img className = { this.props.special ? 'tilt_more' : ' ' } style = { StylesSE.symbol } src = { this.props.operators[i] }/>);
		}
		container.push(<div style = { StylesSE.term }> { this.props.values[this.props.values.length - 1] } </div>);
		container.push(<img style = { StylesSE.symbol } src = { equal }/>);
		container.push(<div style = { StylesSE.term }> { this.props.result } </div>);
		return container;
	}

	render() {
		return (
			<div style = {{ margin: 'auto' }}>
				{ this.renderEquation() }
			</div>
		);
	}
}