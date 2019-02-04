import React, { Component } from 'react';
import { playAnimation, resetAnimation } from './animation.js';
import { playSound, menu, toggleSound, muted } from './sounds';
import { calcWidth, setContext } from './logic.js';
import { trophy, home, challenge, sound, mute } from './images';
import { alt } from './game_config';

const fontSize = calcWidth(1000 / 98, 0);

const Styles = {
    container: {
        position: 'absolute',
        bottom: 0
    },
    menu_button: {
        display: 'inline-block',
        width: calcWidth(33, 0),
        textAlign: 'center',
    },
    menu_icon: {
        width: '60%'
    },
    menu_icon_big: {
        width: '85%'
    },
    menu_text: {
        fontSize: fontSize + 'px',
        bottom: calcWidth(2, 0)
    }
}

let ButtonTypes = {
    'leaderboard': {
        image: trophy,
        text: 'Leaderboard'
    }, 
    'home': {
        image: home,
        text: 'Home'
    },
    'challenge': {
        image: challenge,
        text: 'Challenge',
    },
    'sound': {
        image: sound,
        text: 'Mute'
    }
}

export class ButtonContainer extends Component {
    constructor(props) {
        super(props);
        this.button = [];
    }

    start() {
        this.button[0].start();
        this.button[1].start();
        this.button[2].start();
    }

    reset() {
        this.button[0].reset();
        this.button[1].reset();
        this.button[2].reset();
    }

    render() {
        return (
            <div style={Styles.container}>
                <Button changeScreen={this.props.changeScreen} buttonType={this.props.button1} buttonNumber={1} ref={ref => { this.button[0] = ref }} />
                <Button changeScreen={this.props.changeScreen} buttonType={this.props.button2} buttonNumber={2} ref={ref => { this.button[1] = ref }} />
                <Button changeScreen={this.props.changeScreen} buttonType={this.props.button3} buttonNumber={3} ref={ref => { this.button[2] = ref }} />
            </div>
        );
    }
}

class Button extends Component {
    start() {
        playAnimation(this.button, 'pop_down_animation');
    }

    reset() {
        resetAnimation(this.button, 'pop_down_animation');
    }

    clickAction() {
        if(this.props.buttonType === 'challenge')
            setContext(this.props.changeScreen);
        else if(this.props.buttonType === 'sound') {
            toggleSound();
            this.forceUpdate()
        }
        else
            this.props.changeScreen(ButtonTypes[this.props.buttonType].text)
    }

    renderImage() {
        if(this.props.buttonType === 'sound') 
            return muted ? mute : sound;
        else 
            return ButtonTypes[this.props.buttonType].image;
    }

    renderText() {
        if(this.props.buttonType === 'sound') 
            return muted ? 'Unmute' : 'Mute';
        else   
            return ButtonTypes[this.props.buttonType].text;
    }

    render() {
        return (
            <div id='button' className={'menu_button_animation' + this.props.buttonNumber} style={Styles.menu_button} onClick={() => { this.clickAction(); playSound(menu) }}>
                <div ref={ref => { this.button = ref }} >
                    <img style={this.props.buttonType === 'challenge' ? Styles.menu_icon_big : Styles.menu_icon} src={this.renderImage()} alt = { alt }/>
                    <div style={Styles.menu_text}> {this.renderText()} </div>
                </div>
            </div>
        )
    }
}