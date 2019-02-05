import React, { Component } from 'react';
import { calcWidth, generateAnswer, solveEquation, terms, convertToImage } from './logic.js';
import { playAnimation, resetAnimation } from './animation.js';
import { tut, tutCnt, setTutCnt, alt } from './game_config.js';
import { plus, minus, multiply, divide, equal } from './images';
import { playSound, add_symbol, error } from './sounds';
import Term from './term.js';
import Button from './button.js';

const borderSize = calcWidth(50/98, 0);
const buttonSize = calcWidth(11, -borderSize);
const fontSize = calcWidth(2575/98, 0);
const numberRatios = [34.699, 17.957, 32.499, 33.4, 34.099, 33.199, 34.399, 28.6, 33.699, 34.399, 32.97];
const letterRatios = [31.969, 33.98, 33.792, 35.18, 29.48, 28.78, 34.392, 35.98, 15.18, 32.946, 32.98, 28.28, 48.18, 37.48, 34.892, 32.78, 34.892, 34.38, 32.717, 27.755, 35.585, 31.969, 48.176, 32.167, 30.683, 29.757];
const miscRatios = {
	space: 13.162,
	exclaimationMark: 15.575,
	questionMark: 32.541
}
const ratio = 86/8599.75;

const Styles = {
	equals: {
		position: 'relative',
		width: buttonSize * 0.7,
		top: -(fontSize / 5) + 'px'
	}
}

export default class Equation extends Component {
	constructor(props) {
		super(props);
		this.state = { mounted: false, equationWidth: 0 };
		this.btn = [];
	}

	componentDidMount() {
		this.setState({ offset: this.props.offset, opacity: this.props.opacity });
	}

	slideTo(endPos, endOp, resetEq) {
		this.setState({ offset: endPos, opacity: endOp });
		if(resetEq)
			this.reset();
	}

	reset() {
		if(this.state.equation)
			this.removeAllSymbols();
		this.setEquation();
	}

	shake() {
		playAnimation(this.container, 'shake-animation');
	}

	setEquation() {
		let values = [];
		for(let i = 0; i < terms; i++)
			values.push(Math.floor(Math.random() * 9) + 1)
		let result = generateAnswer(values);
		this.setState({ values, result: result.result, answer: result.answer, equation: true, active: new Array(terms - 1).fill(false), symbol: [], mounted: true });
		this.calcEquationWidth(values, result.result);
	}

	showAnswer() {
		for(let i = 0; i < this.state.answer.length; i++)
			this.btn[i].open(convertToImage(this.state.answer[i]));
	}

	getAnswer() {
		return this.state.answer;
	}

	getResult() {
		return this.state.result;
	}

	getValues() {
		return this.state.values;
	}

	setText(text) {
		resetAnimation(this.container, 'shake-animation');
		let equationWidth = 0;
		for(let i = 0; i < text.length; i++) {
			if(text[i] === ' ')
				equationWidth += fontSize * ratio * miscRatios.space;
			else if(text[i] === '!')
				equationWidth += fontSize * ratio * miscRatios.exclaimationMark;
			else if(text[i] === '?')
				equationWidth += fontSize * ratio * miscRatios.questionMark;
			else
				equationWidth += fontSize * letterRatios[text.charCodeAt(i) - 65] * ratio;
		}
		this.setState({ text, mounted: true, equation: false, equationWidth });
	}

	calcEquationWidth(values, result) {
		let equationWidth = 0;
		for(let i = 0; i < values.length; i++) 
			equationWidth += fontSize * numberRatios[values[i]] * ratio;
		let resultToString = result.toString();
		for(let i = 0; i < resultToString.length; i++) {
			let digit = resultToString.charAt(i)
			if(digit !== '-')
				equationWidth += fontSize * numberRatios[digit - '0'] * ratio;
		}
		if(result < 0)
			equationWidth += fontSize * numberRatios[10] * ratio;
		equationWidth += borderSize * values.length + buttonSize * values.length;
		this.setState({ equationWidth });
	}

	activate(symbol) {
		let operators = [], active = this.state.active, symbols = this.state.symbol;
		for(let i = 0; i < this.state.values.length - 1; i++) {
			if(!active[i]) {
				this.btn[i].open(symbol);
				active[i] = true;
				symbols[i] = symbol;
				break;
			}
		}
		this.setState({ active, symbol: symbols });
		for(let i = 0; i < this.state.values.length - 1; i++) {
			if(!active[i]) {
				playSound(add_symbol);
				return;
			}
			switch(symbols[i]) {
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
				default: 
					operators[i] = '+';
					break;
			}
		}
		if(solveEquation(this.state.values.slice(0), operators) === this.state.result)
			this.props.game.correctAnswer(symbols);
		else {
			playSound(error);
			this.shake();
		}
	}

	disable(button) {
		let active = this.state.active;
		active[button] = false;
		this.setState({ active });
		if(tut) {
			setTutCnt(Math.min(tutCnt, button));
			this.props.game.controls.setTutorial();
		}
	}

	removeAllSymbols() {
		let active = this.state.active;
		for(let i = 0; i < this.state.values.length - 1; i++) {
			active[i] = false;
			this.btn[i].close();
		}
		this.setState({ active });
	}

	render () {
		return (
			<div ref = { ref => { this.container = ref }} style = {{
				opacity: this.state.mounted ? this.state.opacity : 0,
				position: 'absolute',
				transition: 'margin-top 0.3s linear, opacity 0.3s linear',
				marginLeft: (calcWidth(100, 0) - this.state.equationWidth) / 2 + 'px',
				marginTop: this.state.offset,
				fontSize: fontSize,
			}}>
				{ 
					this.state.equation ? 
					<div>
						<Term value = { this.state.mounted ? this.state.values[0] : 1 } />
						<Button ref = { ref => { this.btn[0] = ref }} disabled = { () => this.disable(0) } />
						<Term value = { this.state.mounted ? this.state.values[1] : 1 } />
						<Button ref = { ref => { this.btn[1] = ref }} disabled = { () => this.disable(1) } />
						<Term value = { this.state.mounted ? this.state.values[2] : 1 } />
						{ this.state.values.length === 4 ? <Button ref = { ref => { this.btn[2] = ref }} disabled = { () => this.disable(2) } /> : null }
						{ this.state.values.length === 4 ? <Term value = { this.state.mounted ?  this.state.values[3]: 1 } /> : null }
						<img style = { Styles.equals } src = { equal } alt = { alt }/>
						<Term value = { this.state.mounted ? this.state.result : 1 } />
					</div> :
					this.state.mounted ? this.state.text : 'hello world'
				}
			</div>
		);
	}
}
