const borderSize = calcWidth(50/98, 0);
const buttonSize = calcWidth(11, -borderSize);
const height = calcWidth(2500/98, 0);
const fontSize = calcWidth(2575/98, 0);
const numberRatios = [34.699, 17.957, 32.499, 33.4, 34.099, 33.199, 34.399, 28.6, 33.699, 34.399, 35.906];
const letterRatios = [31.969, 33.98, 33.792, 35.18, 29.48, 28.78, 34.392, 35.98, 15.18, 32.946, 32.98, 28.28, 48.18, 37.48, 34.892, 32.78, 34.892, 34.38, 32.717, 27.755, 35.585, 31.969, 48.176, 32.167, 30.683, 29.757];
const miscRatios = {
	space: 13.162,
	exclaimationMark: 15.575,
	questionMark: 32.541
}
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
		this.tut = false;
		this.mounted = false;
		this.equationWidth = 0;
		this.btn = [];
	}

	componentDidMount() {
		this.offset = this.props.offset;
		this.opacity = this.props.opacity;
	}

	slideTo(endPos, endOp, reset, resetPos, resetEq) {
		if(reset) {
			this.container.style.setProperty('-webkit-transition', 'none');
			this.container.style.setProperty('-ms-transition', 'none');
			this.container.style.marginTop = resetPos;
			void this.container.offsetWidth;
		}
		this.container.style.setProperty('-webkit-transition', 'margin-top 0.3s linear, opacity 0.3s linear');
		this.container.style.setProperty('-ms-transition', 'margin-top 0.3s linear, opacity 0.3s linear');
		this.offset = endPos;
		this.opacity = endOp;
		if(resetEq)
			this.reset();
	}

	reset() {
		if(this.equation)
			this.removeAllSymbols();
		this.setEquation();
	}

	shake() {
		playAnimation(this.container, 'shake-animation');
	}

	setEquation() {
		this.tut = false;
		var values = [];
		for(var i = 0; i < terms; i++)
			values.push(Math.floor(Math.random() * 9) + 1)
		var result = generateAnswer(values);
		this.values = values;
		this.result = result.result;
		this.answer = result.answer;
		this.active = new Array(terms - 1).fill(false);
		this.symbol = [];
		this.calcEquationWidth(values, this.result);
		this.mounted = true;
		this.equation = true;
	}

	getAnswer() {
		return this.answer;
	}

	getResult() {
		return this.result;
	}

	getValues() {
		return this.values;
	}

	setText(text) {
		this.tut = false;
		resetAnimation(this.container, 'shake-animation');
		this.equationWidth = 0;
		for(var i = 0; i < text.length; i++) {
			if(text[i] == ' ')
				this.equationWidth += fontSize * ratio * miscRatios.space;
			else if(text[i] == '!')
				this.equationWidth += fontSize * ratio * miscRatios.exclaimationMark;
			else if(text[i] == '?')
				this.equationWidth += fontSize * ratio * miscRatios.questionMark;
			else
				this.equationWidth += fontSize * letterRatios[text.charCodeAt(i) - 65] * ratio;
		}
		this.text = text;
		this.mounted = true;
		this.equation = false;
	}

	setTut(text) {
		this.tut = true;
		this.text = text;
		this.equation = false;
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
		this.equationWidth += borderSize * terms + buttonSize * terms;
	}

	activateTut(symbols){
		for(var i = 0; i < symbols.length; i++) {
			this.btn[i].open(symbols[i]);
			this.btn[i].pulseTut();
			this.active[i] = true;
			this.symbol[i] = symbols[i];
		}
	}

	activate(symbol) {
		var operators = [];
		for(var i = 0; i < terms - 1; i++) {
			if(!this.active[i]) {
				this.btn[i].open(symbol);
				this.active[i] = true;
				this.symbol[i] = symbol;
				break;
			}
		}
		for(var i = 0; i < terms - 1; i++) {
			if(!this.active[i])
				return;
			switch(this.symbol[i]) {
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
		if(solveEquation(this.values.slice(0), operators) == this.result)
			this.props.game.correctAnswer();
		else 
			this.shake();
	}

	disable(button) {
		this.active[button] = false;
	}

	removeAllSymbols() {
		for(var i = 0; i < terms - 1; i++) {
			this.active[i] = false;
			this.btn[i].close();
		}
	}

	render () {
		if(this.container != null)
			this.container.style.marginTop = this.offset;
		return (
			<div ref = { ref => { this.container = ref }} style = {{
				opacity: this.mounted ? this.opacity : 0,
				position: 'absolute',
				marginLeft: this.tut? 0 : (calcWidth(100, 0) - this.equationWidth) / 2 + 'px',
				fontSize: fontSize
			}}>
				{ 
					this.tut ? 
					<div style = {{ fontSize: fontSize / 2, textAlign: 'center' }}> { this.text } </div> : 
					this.equation ? 
					<div>
						<Term value = { this.mounted ? this.values[0] : 1 } />
						<Button ref = { ref => { this.btn[0] = ref }} disabled = { () => this.disable(0) } />
						<Term value = { this.mounted ? this.values[1] : 1 } />
						<Button ref = { ref => { this.btn[1] = ref }} disabled = { () => this.disable(1) } />
						<Term value = { this.mounted ? this.values[2] : 1 } />
						{ terms == 4 ? <Button ref = { ref => { this.btn[2] = ref }} disabled = { () => this.disable(2) } /> : null }
						{ terms == 4 ? <Term value = { this.mounted ?  this.values[3]: 1 } /> : null }
						<img style = { StylesE.equals } src = { equal } />
						<Term value = { this.mounted ? this.result : 1 } />
					</div> :
					this.mounted ? this.text : 'hello world'
				}
			</div>
		);
	}
}
