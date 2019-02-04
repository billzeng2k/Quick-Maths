import React, { Component } from 'react';
import { calcWidth, setMaxR, setTerms, convertToImages } from './logic.js';
import { playSound, win, ready, set, go, finish } from './sounds';
import { playAnimation, resetAnimation } from './animation.js';
import { timerSize, winEmojis, loseEmojis, tut, tutCnt, setTutCnt, setTut, setTutAns, setHomeButton, gameRunning, setGameRunning } from './game_config.js';
import GameMenuControls from './game_menu_controls.js';
import Equation from './equation.js';
import Controls from './controls.js';
import Timer from './timer.js';
import Score from './score.js';

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

export default class GameScreen extends Component {
	constructor(props) {
		super(props);
		this.currentEquation = 1;
        setHomeButton(true);
		this.eq = [];
        this.solvedEq = [];
	}

	symbolPress(symbol) {
        if(tut) {
            setTutCnt(tutCnt+1);
            this.controls.setTutorial();
        }
		this.eq[this.currentEquation].activate(symbol);
	}

	removeAllSymbols() {
		this.eq[this.currentEquation].removeAllSymbols();
	}

	correctAnswer(solution) {
        playSound(win);
        this.solvedEq.push({ values: this.eq[this.currentEquation].getValues(), operators: solution, result: this.eq[this.currentEquation].getResult(), time: this.timer.equationSolved(), emoji: winEmojis[Math.floor(Math.random() * winEmojis.length)] });
        if(tut) {
            setTut(false);
            this.controls.resetAnimation();
        }
        this.score.scorePoint();
        this.shiftEquations(true);
        
	}

    shiftEquations(reset) {
        this.eq[this.currentEquation].slideTo(pos0, opacity0, false);
        this.eq[(this.currentEquation + 1) % 4].slideTo(pos1, opacity1, false);
        this.eq[(this.currentEquation + 2) % 4].slideTo(pos2, opacity2, false);
        if(reset)
            this.eq[(this.currentEquation + 3) % 4].slideTo(pos3, opacity3, true);
        else 
            this.eq[(this.currentEquation + 3) % 4].slideTo(pos3, opacity3, true);
        this.currentEquation++;
        this.currentEquation %= 4;
    }

    resetGame() {
        if(!gameRunning)
            return;
        this.timer.initialize();
        this.startGame();
    }

    transitionOut() {
        this.timer.transitionOut();
        this.controls.transitionOut();
        this.score.transitionOut();
        this.menuControls.transitionOut();
        playAnimation(this.equationContainer, 'fade_out_animation');
    }

    joinGame() {
        setGameRunning(false);
        this.solvedEq = [];
        this.timer.initialize();
        this.timer.resetAnimation();
        this.controls.resetAnimation();
        this.score.resetAnimation();
        this.menuControls.resetAnimation();
        resetAnimation(this.equationContainer, 'fade_out_animation');
    }

    startGame() {
        clearTimeout(this.timeout1);
        clearTimeout(this.timeout2);
        clearTimeout(this.timeout3);
        clearTimeout(this.timeout4);
        setGameRunning(false);
        setTerms(3);
        setMaxR(99);
        setTut(true); 
        this.controls.resetAnimation();  
        this.score.resetScore();
        this.timer.resetTime();
        this.eq[this.currentEquation].setText('READY');
        this.eq[(this.currentEquation + 1) % 4].setText('SET');
        this.eq[(this.currentEquation + 2) % 4].setText('QUICK MATHS!');
        this.timeout1 = setTimeout(() => { this.shiftEquations(false); playSound(ready); } , 750);
        this.timeout2 = setTimeout(() => { this.shiftEquations(true); playSound(set); }, 1500);
        this.timeout3 = setTimeout(() => { this.shiftEquations(true); playSound(go); setTut(true); setTutCnt(0); setTutAns(this.eq[this.currentEquation].getAnswer()); this.controls.setTutorial() }, 2250);
        this.timeout4 = setTimeout(() => { this.timer.startCountdown(); setGameRunning(true) }, 2250);
    }

    gameFinished(score) {
        playSound(finish);
        this.solvedEq.push({ values: this.eq[this.currentEquation].getValues(), operators: convertToImages(this.eq[this.currentEquation].getAnswer()), result: this.eq[this.currentEquation].getResult(), time: 'FAILED', emoji: loseEmojis[Math.floor(Math.random() * loseEmojis.length)] });
        setGameRunning(false);
        setHomeButton(true);
        let i = Math.floor(Math.random() * exclaimations.length);
        this.eq[this.currentEquation].setText(exclaimations[i]);
        this.eq[(this.currentEquation + 1) % 4].setText(exclaimations[(i + 1 + Math.floor(Math.random() * (exclaimations.length - 1))) % exclaimations.length]);
        this.props.changeScreen('Score', score, this.solvedEq);
    }

	render () {
		return (
			<div>
                <GameMenuControls changeScreen = { this.props.changeScreen } game = { this } ref = { ref => { this.menuControls = ref }}/>
                <Score ref = { ref => { this.score = ref; }} />
				<Timer game = { this } ref = { ref => { this.timer = ref; }} />
                <div ref = { ref => { this.equationContainer = ref }} className = 'fade_in_animation'>
    				<Equation game = { this } ref = { ref => { this.eq[3] = ref; }} offset = { pos3 } opacity = { opacity3 } />
    				<Equation game = { this } ref = { ref => { this.eq[2] = ref; }} offset = { pos2 } opacity = { opacity2 } />
    				<Equation game = { this } ref = { ref => { this.eq[1] = ref; }} offset = { pos1 } opacity = { opacity1 } />
                    <Equation game = { this } ref = { ref => { this.eq[0] = ref; }} offset = { pos0 } opacity = { opacity0 } />
                </div>
				<Controls ref = { ref => { this.controls = ref }} callbackRef = { this } />
			</div>
		);
	}
}