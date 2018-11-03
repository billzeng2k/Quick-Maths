const borderSize = calcWidth(50/98, 0);
const buttonSize = calcWidth(12, -borderSize);
const height = calcWidth(2500/98, 0);
const fontSize = calcWidth(2575/98, 0);
const numberRatios = [34.699, 31.68, 32.499, 33.4, 34.099, 33.199, 34.399, 28.6, 33.699, 34.399];
const timerSize = calcWidth(25, 0);
const ratio = 86/8599.75;

var equationWidth = 0;

const StylesE = {
	equals: {
		position: 'relative',
		width: buttonSize * 0.7,
		top: -(fontSize / 5) + 'px'
	}
}

class Equation extends React.Component {
	constructor(props) {
		super(props);
		this.mounted = false;
		this.equationWidth = 0;
	}

	componentDidMount() {
		this.setEquation();
	}

	setEquation() {
		var values = [9, 9, 9, 9];
		var result = 99;
		equationWidth = 0;
		this.setState({ values: values, result: result });
		for(var i = 0; i < values.length; i++) 
			equationWidth += fontSize * numberRatios[values[i]] * ratio;
		var resultToString = result.toString();
		for(var i = 0, digit = ''; digit = resultToString.charAt(i); i++)
			equationWidth += fontSize * numberRatios[digit - '0'] * ratio;
		equationWidth += borderSize * 4 + buttonSize * 4;
		this.mounted = true;
	}

	render () {
		if(this.mounted)
			return (
				<div style = {{
					opacity: this.props.opacity,
					position: 'absolute',
					marginTop: this.props.offset + 'px',
					marginLeft: (calcWidth(100, 0) - equationWidth) / 2 + 'px'
				}}>
					<Term value = { this.state.values[0] } />
					<Button symbol = { plus } />
					<Term value = { this.state.values[1] } />
					<Button symbol = { minus } />
					<Term value = { this.state.values[2] } />
					<Button symbol = { multiply } />
					<Term value = { this.state.values[3] } />
					<img style = { StylesE.equals } src = { equal } />
					<Term value = { this.state.result } />
				</div>
			);
		else
			return <div> </div>;
	}
}
