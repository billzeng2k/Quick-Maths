const fontSize = calcWidth(2750/98, 0);

const StylesN = {
	container: {
		height: 0,
		display: 'inline-block',
		textAlign: 'center',
	},
	number: {
		margin: 0,
		fontSize: fontSize + 'px'
	}
}

class Term extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {
		return (
			<div style = { StylesN.container }>
				<p style = { StylesN.number }> { this.props.value } </p>
			</div>
		);
	}
}