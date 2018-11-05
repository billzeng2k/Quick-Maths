const borderSize = calcWidth(50/98, 0);
const buttonSize = calcWidth(11, -borderSize);
const height = calcWidth(2500/98, 0);
const fontSize = calcWidth(2575/98, 0);
const numberRatios = [34.699, 17.957, 32.499, 33.4, 34.099, 33.199, 34.399, 28.6, 33.699, 34.399, 35.906];
const timerSize = calcWidth(25, 0);
const ratio = 86/8599.75;
const symbols = ['+', '-', '*', '/'];
const slideTime = 0.3;

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
		this.btn = [];
	}

	componentDidMount() {
		this.setState({ offset: this.props.offset, opacity: this.props.opacity })
		this.setEquation();
	}

	slideTo(endPos, endOp, reset, resetPos) {
		if(reset) {
			this.container.style.setProperty('-webkit-transition', 'none');
			this.container.style.setProperty('-ms-transition', 'none');
			this.container.style.marginTop = resetPos;
			void this.container.offsetWidth;
			this.removeAllSymbols();
			this.setEquation();
		}
		this.container.style.setProperty('-webkit-transition', 'all 0.3s linear');
		this.container.style.setProperty('-ms-transition', 'all 0.3s linear');
		this.state.offset = endPos;
		this.state.opacity = endOp;
	}

	shake() {
		this.container.classList.remove('shake-animation');
		void this.container.offsetWidth;
		this.container.classList.add('shake-animation');
	}

	setEquation() {
		var values = [Math.floor(Math.random() * 9) + 1, Math.floor(Math.random() * 9) + 1, Math.floor(Math.random() * 9) + 1, Math.floor(Math.random() * 9) + 1];
		var result = generateAnswer(values);
		this.setState({ values: values, result: result, active: [false, false, false], symbol: [] });
		this.calcEquationWidth(values, result);
		this.mounted = true;
	}

	calcEquationWidth(values, result) {
		this.equationWidth = 0;
		for(var i = 0; i < values.length; i++) 
			this.equationWidth += fontSize * numberRatios[values[i]] * ratio;
		var resultToString = result.toString();
		for(var i = 0, digit = ''; digit = resultToString.charAt(i); i++) {
			if(digit != '-')
				this.equationWidth += fontSize * numberRatios[digit - '0'] * ratio;
		}
		if(result < 0)
			this.equationWidth += fontSize * numberRatios[10] * ratio;
		this.equationWidth += borderSize * 4 + buttonSize * 4;
	}

	activate(symbol) {
		var operators = [];
		for(var i = 0; i < 3; i++) {
			if(!this.state.active[i]) {
				this.btn[i].open(symbol);
				this.state.active[i] = true;
				this.state.symbol[i] = symbol;
				break;
			}
		}
		for(var i = 0; i < 3; i++) {
			if(!this.state.active[i])
				return;
			switch(this.state.symbol[i]) {
				case plus:
					operators[i] = '+';
					break;
				case minus:
					operators[i] = '-';
					break;
				case multiply:
					operators[i] = '*';
					break;
				case divide:
					operators[i] = '/';
					break;
			}
		}
		if(solveEquation(this.state.values.slice(0), operators) == this.state.result)
			this.props.game.correctAnswer();
		else 
			this.shake();
	}

	disable(button) {
		this.state.active[button] = false;
	}

	removeAllSymbols() {
		for(var i = 0; i < 3; i++) {
			this.state.active[i] = false;
			this.btn[i].close();
		}
	}

	render () {
		if(this.container != null)
			this.container.style.marginTop = this.state.offset;
		if(this.mounted)
			return (
				<div ref = { ref => { this.container = ref }} style = {{
					opacity: this.state.opacity,
					position: 'absolute',
					marginLeft: (calcWidth(100, 0) - this.equationWidth) / 2 + 'px'
				}} id = 'test'>
					<Term value = { this.state.values[0] } />
					<Button ref = { ref => { this.btn[0] = ref }} disabled = { () => this.disable(0) } />
					<Term value = { this.state.values[1] } />
					<Button ref = { ref => { this.btn[1] = ref }} disabled = { () => this.disable(1) } />
					<Term value = { this.state.values[2] } />
					<Button ref = { ref => { this.btn[2] = ref }} disabled = { () => this.disable(2) } />
					<Term value = { this.state.values[3] } />
					<img style = { StylesE.equals } src = { equal } />
					<Term value = { this.state.result } />
				</div>
			);
		else
			return <div> </div>;
	}
}
