'use strict';

var create = React.createElement;

const timerSize = calcWidth(25, 0);
const fontSize = calcWidth(2575/98, 0);
var pos3 = timerSize * 2 + (document.body.clientHeight - timerSize * 2 - calcWidth(45, 0)) / 2 + fontSize;
var pos2 = timerSize * 2 + (document.body.clientHeight - timerSize * 2 - calcWidth(45, 0)) / 2;
var pos1 = timerSize * 2 + (document.body.clientHeight - timerSize * 2 - calcWidth(45, 0)) / 2 - fontSize;
var pos0 = timerSize * 2 + (document.body.clientHeight - timerSize * 2 - calcWidth(45, 0)) / 2 - fontSize * 2;
var opacity0 = 0;
var opacity1 = 1;
var opacity2 = 0.05;
var opacity3 = 0;
const minR = -9, maxR = 49;
var gameRunning = false;
var terms = 4;

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
        this.score.scorePoint();
		this.shiftEquations(true);
	}

    shiftEquations(reset) {
        this.eq[this.currentEquation].slideTo(pos0, opacity0, false);
        this.eq[(this.currentEquation + 1) % 3].slideTo(pos1, opacity1, false);
        if(reset)
            this.eq[(this.currentEquation + 2) % 3].slideTo(pos2, opacity2, true, pos3);
        else 
            this.eq[(this.currentEquation + 2) % 3].slideTo(pos2, opacity2, false);
        this.currentEquation++;
        this.currentEquation %= 3;
    }

    resetGame() {
        if(!gameRunning)
            return;
        gameRunning = false;
        this.startGame();
    }

    componentDidMount() {

    }

    startGame() {
        this.score.resetScore();
        this.timer.resetTime();
        clearTimeout(this.timeout1);
        clearTimeout(this.timeout2);
        clearTimeout(this.timeout3);
        clearTimeout(this.timeout4);
        this.eq[this.currentEquation].setText('READY');
        this.eq[(this.currentEquation + 1) % 3].setText('SET');
        this.eq[(this.currentEquation + 2) % 3].setText('QUICK MATHS');
        this.timeout1 = setTimeout(() => this.shiftEquations(false), 1000);
        this.timeout2 = setTimeout(() => this.shiftEquations(true), 2000);
        this.timeout3 = setTimeout(() => this.shiftEquations(true), 3000);
        this.timeout4 = setTimeout(() => { this.timer.startCountdown(); gameRunning = true }, 3300);
    }

	render () {
		return (
			<div>
                <MenuControls quickMaths = { this.props.quickMaths } game = { this } />
                <Score ref = { ref => { this.score = ref; }} />
				<Timer ref = { ref => { this.timer = ref; }} />
				<Equation game = { this } ref = { ref => { this.eq[2] = ref; }} offset = { pos3 } opacity = { opacity3 } />
				<Equation game = { this } ref = { ref => { this.eq[1] = ref; }} offset = { pos2 } opacity = { opacity2 } />
				<Equation game = { this } ref = { ref => { this.eq[0] = ref; }} offset = { pos1 } opacity = { opacity1 } />
				<Controls callbackRef = { this } />
			</div>
		);
	}
}

function generateAnswer(values) {
    var ans = [];
    if(terms == 4) {
        for(var i = 0; i < symbols.length; i++) {
        	for(var j = 0; j < symbols.length; j++) {
        		for(var k = 0; k < symbols.length; k++) {
        			var answer = solveEquation(values.slice(0), [symbols[i], symbols[j], symbols[k]]);
        			if(answer <= maxR && answer >= minR)
        				ans.push(answer);
        		}
        	}
        }
    } else {
        for(var i = 0; i < symbols.length; i++) {
            for(var j = 0; j < symbols.length; j++) {
                var answer = solveEquation(values.slice(0), [symbols[i], symbols[j]]);
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