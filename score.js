const fontSize = calcWidth(1750/98, 0) + 'px';
const margin = calcWidth(1, 0);

const StylesS = {
	container: {
		position: 'absolute',
		fontSize: fontSize,
		top: margin + 'px',
		right: margin * 2 + 'px'
	}
};

class Score extends React.Component {
	constructor(props) {
		super(props);
		this.mounted = false;
	}

	componentDidMount() {
		this.mounted = true;
		this.resetScore();
	}

	resetScore () {
		this.setState({ score: 0 });
	}

	scorePoint() {
		this.setState({ score: this.state.score + 1 })
	}

	render () {
		if(this.mounted)
			return (
				<div style = { StylesS.container }>
					{ this.state.score }
				</div>
			);
		else 
			return <div> </div>
	}
}