const fontSize = calcWidth(3000/98, 0);

const StylesM = {
	title: {
		textAlign: 'center',
		fontSize: fontSize + 'px'
	}
};

class Menu extends React.Component {
	constructor(props) {
		super(props);
	}

	playGame() {
		this.props.quickMaths.startGame();
	}

	render () {
		return (
			<div onClick = { () => this.playGame() }>
				<div style = { StylesM.title }> Quick Maths </div>
			</div>
		);
	}
}
