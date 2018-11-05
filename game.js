'use strict';

var create = React.createElement;

const timerSize = calcWidth(25, 0);
const fontSize = calcWidth(2575/98, 0);
var pos0 = timerSize * 2 + (document.body.clientHeight - timerSize * 2 - calcWidth(45, 0)) / 2 + fontSize;
var pos1 = timerSize * 2 + (document.body.clientHeight - timerSize * 2 - calcWidth(45, 0)) / 2;
var pos2 = timerSize * 2 + (document.body.clientHeight - timerSize * 2 - calcWidth(45, 0)) / 2 - fontSize;
var pos3 = timerSize * 2 + (document.body.clientHeight - timerSize * 2 - calcWidth(45, 0)) / 2 - fontSize * 2;
var opacity0 = 0;
var opacity1 = 1;
var opacity2 = 0.1;
var opacity3 = 0;
const minR = -9, maxR = 99;

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.currentEquation = 0;
		this.eq = [];
	}

	symbolPress(symbol) {
		this.eq[this.currentEquation].activate(symbol);
	}

	removeAllSymbols() {
		this.eq[this.currentEquation].removeAllSymbols();
	}

	correctAnswer() {
		this.eq[this.currentEquation].slideTo(pos0, opacity0, false);
		this.eq[(this.currentEquation + 1) % 3].slideTo(pos1, opacity1, false);
		this.eq[(this.currentEquation + 2) % 3].slideTo(pos2, opacity2, true, pos3);
		this.currentEquation++;
		this.currentEquation %= 3;
	}

	render () {
		return (
			<div>
				<Timer />
				<Equation game = { this } ref = { ref => { this.eq[2] = ref; }} offset = { pos3 } opacity = { opacity3 }/>
				<Equation game = { this } ref = { ref => { this.eq[1] = ref; }} offset = { pos2 } opacity = { opacity2 }/>
				<Equation game = { this } ref = { ref => { this.eq[0] = ref; }} offset = { pos1 } opacity = { opacity1 }/>
				<Controls callbackRef = { this } />
			</div>
		);
	}
}

function startGame(playerName) {
	const domContainer = document.querySelector('.game_container');
	setInterval(function () { ReactDOM.render(<Game />, domContainer) }, 10);
}

function generateAnswer(values) {
    var ans = [];
    for(var i = 0; i < symbols.length; i++) {
    	for(var j = 0; j < symbols.length; j++) {
    		for(var k = 0; k < symbols.length; k++) {
    			var answer = solveEquation(values.slice(0), [symbols[i], symbols[j], symbols[k]]);
    			if(answer <= maxR && answer >= minR)
    				ans.push(answer);
    		}
    	}
    }
    return ans[Math.floor(Math.random() * ans.length)];
}

function solveEquation(values, operators) {
    for (var i = 0; i < operators.length; i++) {
        if(operators[i] == '*') {
            values[i] *= values[i + 1];
            values.splice(i + 1, 1);
            operators.splice(i, 1);
            i = -1;
        } else if(operators[i] == '/') {
            values[i] /= values[i + 1];
            values.splice(i + 1, 1);
            operators.splice(i, 1);
            i = -1;
        }
    }
    for (var i = 0; i < operators.length; i++) {
        if(operators[i] == '+') {
            values[i] += values[i + 1];
            values.splice(i + 1, 1);
            operators.splice(i, 1);
            i = -1;
        } else if(operators[i] == '-') {
            values[i] -= values[i + 1];
            values.splice(i + 1, 1);
            operators.splice(i, 1);
            i = -1;
        }
    }
    return values[0] % 1 == 0 ? values[0] : maxR + 1;
}

function lerp(a, b, t) {
	if(t >= 1)
		return b;
	if(t <= 0)
		return a;
	return a + (b - a) * t;
}