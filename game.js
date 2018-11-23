'use strict';

var create = React.createElement;

const timerSize = calcWidth(25, 0);
const fontSize = calcWidth(2575/98, 0);
const exclaimations = ['QUOI?', 'AIYA!', 'JOBS DONE', 'NEVER LUCKY', 'NEIN!']
const pos3 = timerSize * 2 + (document.body.clientHeight - timerSize * 2 - calcWidth(45, 0)) / 2 + fontSize;
const pos2 = timerSize * 2 + (document.body.clientHeight - timerSize * 2 - calcWidth(45, 0)) / 2;
const pos1 = timerSize * 2 + (document.body.clientHeight - timerSize * 2 - calcWidth(45, 0)) / 2 - fontSize;
const pos0 = timerSize * 2 + (document.body.clientHeight - timerSize * 2 - calcWidth(45, 0)) / 2 - fontSize * 2;
const opacity0 = 0;
const opacity1 = 1;
const opacity2 = 0.05;
const opacity3 = 0;
var minR = -9, maxR = 99;
var gameRunning = false;
var homeButton = true;
var tut = true, tutCnt = 0, tutAns = [];
var terms = 3;

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.currentEquation = 0;
        homeButton = true;
		this.eq = [];
        this.solvedEq = [];
	}

	symbolPress(symbol) {
        if(tut) {
            tutCnt++;
            this.controls.setTutorial();
        }
		this.eq[this.currentEquation].activate(symbol);
	}

	removeAllSymbols() {
		this.eq[this.currentEquation].removeAllSymbols();
	}

	correctAnswer(solution) {
        winSound();
        this.solvedEq.push({ values: this.eq[this.currentEquation].getValues(), operators: solution, result: this.eq[this.currentEquation].getResult(), time: this.timer.equationSolved(), emoji: winEmojis[Math.floor(Math.random() * winEmojis.length)] });
        if(tut) {
            tut = false;
            this.controls.resetAnimation();
        }
        this.score.scorePoint();
        this.shiftEquations(true);
        
	}

    shiftEquations(reset) {
        this.eq[this.currentEquation].slideTo(pos0, opacity0, false);
        this.eq[(this.currentEquation + 1) % 3].slideTo(pos1, opacity1, false);
        if(reset)
            this.eq[(this.currentEquation + 2) % 3].slideTo(pos2, opacity2, true, pos3, true);
        else 
            this.eq[(this.currentEquation + 2) % 3].slideTo(pos2, opacity2, true, pos3, false);
        this.currentEquation++;
        this.currentEquation %= 3;
    }

    resetGame() {
        if(!gameRunning)
            return;
        gameRunning = false;
        this.timer.initialize();
        this.startGame();
    }

    leaveGame() {
        this.timer.transitionOut();
        this.controls.transitionOut();
        this.score.transitionOut();
        this.menuControls.transitionOut();
        playAnimation(this.equationContainer, 'fade_out_animation');
    }

    joinGame() {
        this.solvedEq = [];
        this.timer.initialize();
        this.timer.resetAnimation();
        this.controls.resetAnimation();
        this.score.resetAnimation();
        this.menuControls.resetAnimation();
        resetAnimation(this.equationContainer, 'fade_out_animation');
    }

    startGame() {
        terms = 3;
        maxR = 99;
        tut = true;  
        this.controls.resetAnimation();  
        this.score.resetScore();
        this.timer.resetTime();
        clearTimeout(this.timeout1);
        clearTimeout(this.timeout2);
        clearTimeout(this.timeout3);
        clearTimeout(this.timeout4);
        this.eq[this.currentEquation].setText('READY');
        this.eq[(this.currentEquation + 1) % 3].setText('SET');
        this.eq[(this.currentEquation + 2) % 3].setText('QUICK MATHS!');
        this.timeout1 = setTimeout(() => { this.shiftEquations(false); readySound(); } , 750);
        this.timeout2 = setTimeout(() => { this.shiftEquations(true); setSound(); }, 1500);
        this.timeout3 = setTimeout(() => { this.shiftEquations(true); goSound(); tut = true; tutCnt = 0; tutAns = this.eq[this.currentEquation].getAnswer(); this.controls.setTutorial() }, 2250);
        this.timeout4 = setTimeout(() => { this.timer.startCountdown(); gameRunning = true }, 2250);
    }

    gameFinished(score) {
        finishSound();
        this.solvedEq.push({ values: this.eq[this.currentEquation].getValues(), operators: convertToImages(this.eq[this.currentEquation].getAnswer()), result: this.eq[this.currentEquation].getResult(), time: 'FAILED', emoji: loseEmojis[Math.floor(Math.random() * loseEmojis.length)] });
        gameRunning = false;
        homeButton = false;
        var i = Math.floor(Math.random() * exclaimations.length);
        this.eq[this.currentEquation].setText(exclaimations[i]);
        this.eq[(this.currentEquation + 1) % 3].setText(exclaimations[(i + 1 + Math.floor(Math.random() * (exclaimations.length - 1))) % exclaimations.length]);
        this.props.quickMaths.scoreScreen(score, this.solvedEq);
    }

	render () {
		return (
			<div>
                <MenuControls quickMaths = { this.props.quickMaths } game = { this } ref = { ref => { this.menuControls = ref }}/>
                <Score ref = { ref => { this.score = ref; }} />
				<Timer game = { this } ref = { ref => { this.timer = ref; }} />
                <div ref = { ref => { this.equationContainer = ref }} className = 'fade_in_animation'>
    				<Equation game = { this } ref = { ref => { this.eq[2] = ref; }} offset = { pos3 } opacity = { opacity3 } />
    				<Equation game = { this } ref = { ref => { this.eq[1] = ref; }} offset = { pos2 } opacity = { opacity2 } />
    				<Equation game = { this } ref = { ref => { this.eq[0] = ref; }} offset = { pos1 } opacity = { opacity1 } />
                </div>
				<Controls ref = { ref => { this.controls = ref }} callbackRef = { this } />
			</div>
		);
	}
}

function generateAnswer(values) {
    var ans = [];
    var sol = [];
    if(terms == 4) {
        for(var i = 0; i < symbols.length; i++) {
        	for(var j = 0; j < symbols.length; j++) {
        		for(var k = 0; k < symbols.length; k++) {
        			var answer = solveEquation(values.slice(0), [symbols[i], symbols[j], symbols[k]]);
        			if(answer <= maxR && answer >= minR) {
        				ans.push(answer);
                        sol.push([symbols[i], symbols[j], symbols[k]]);
                    }
        		}
        	}
        }
    } else {
        for(var i = 0; i < symbols.length; i++) {
            for(var j = 0; j < symbols.length; j++) {
                var answer = solveEquation(values.slice(0), [symbols[i], symbols[j]]);
                if(answer <= maxR && answer >= minR){
                    ans.push(answer);
                    sol.push([symbols[i], symbols[j]]);
                }
            }
        }
    }
    var index = Math.floor(Math.random() * ans.length);
    return { result: ans[index], answer: sol[index] };
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

function wrongAnswer(values, result) {
    var operators = [];
    for(var i = 0; i < terms - 2; i++)
        operators.push(symbols[Math.floor(Math.random() * symbols.length)]);
    operators.push(symbols[Math.floor(Math.random() * 2)]);
    if(solveEquation(values.slice(0), result) == result){
        if(operators[terms - 2] == '+')
            operators[terms - 2] = '-';
        else
            operators[terms - 2] = '+';
    } 
    return convertToImages(operators);
}

function convertToImages(operators) {
    for(var i = 0; i < operators.length; i++) {
        switch(operators[i]) {
            case '+':
                operators[i] = plus;
                continue;
            case '-':
                operators[i] = minus;
                continue;
            case '*':
                operators[i] = multiply;
                continue;
            case '/':
                operators[i] = divide;
                continue;
        }
    }
    return operators;
}

function lerp(a, b, t) {
	if(t >= 1)
		return b;
	if(t <= 0)
		return a;
	return a + (b - a) * t;
}

function playAnimation(container, animation) {
    container.classList.remove(animation);
    void container.offsetWidth;
    container.classList.add(animation);
}

function resetAnimation(container, animation) {
    container.classList.remove(animation);
}