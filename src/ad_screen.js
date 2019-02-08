import React, { Component } from 'react';
import { playAnimation, resetAnimation } from './animation.js';
import { yeahIcons, nahIcons, alt } from './game_config.js';
import { calcWidth, calcHeight } from './logic.js';
import { playAd } from './ad.js';

const Styles = {
    continue: {
        marginTop: calcHeight(50, 0) - calcWidth(35, 0) - calcWidth(1500 / 98, 0),
        fontSize: calcWidth(3000 / 98, 0),
    },
    option: {
        display: 'inline-block',
        width: calcWidth(35, 0),
        margin: '0 ' + calcWidth(3, 0) + 'px'
    },
    image: {
        width: calcWidth(35, 0),
        height: calcWidth(35, 0)
    },
    option_text: {
        fontSize: calcWidth(1500 / 98, 0),
        textAlign: 'center'
    },
    option_text_sub: {
        fontSize: calcWidth(750 / 98, 0),
        lineHeight: 0.5,
        textAlign: 'center'
    }
};

export default class AdScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { tick: false, score: 0 };
        this.randomize();
    }

    transitionOut() {
        playAnimation(this.yeah, 'pop_down_animation');
        playAnimation(this.nah, 'pop_down_animation');
        playAnimation(this.continue, 'fade_out_animation');
        playAnimation(this.bar, 'fade_out_animation');
        setTimeout(() => { this.setState({ tick: false }); this.randomize() }, 700);
    }

    randomize() {
        let i = Math.floor(Math.random() * yeahIcons.length);
        this.ye = yeahIcons[i];
        this.ne = nahIcons[i];
    }

    reset(score) {
        resetAnimation(this.yeah, 'pop_down_animation');
        resetAnimation(this.nah, 'pop_down_animation');
        resetAnimation(this.continue, 'fade_out_animation');
        resetAnimation(this.bar, 'fade_out_animation');
        setTimeout(() => this.setState({ tick: true, score }), 100);
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => this.nah_dont(), 15300);
    }

    yeah_do_it() {
        clearTimeout(this.timeout);
        playAd(() => this.props.changeScreen('Play', this.state.score), () => this.props.changeScreen('Score', this.state.score));
    }

    nah_dont() {
        clearTimeout(this.timeout);
        this.props.changeScreen('Score', this.state.score);
    }

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <div className='fade_in_animation' style={Styles.continue} ref={ref => { this.continue = ref }}> Continue? </div>
                <div className='fade_in_animation' style={{
                    transition: 'width 15s linear, background-color 15s linear',
                    backgroundColor: this.state.tick ? 'red' : 'black',
                    borderRadius: 100,
                    width: this.state.tick ? 0 : calcWidth(90, 0),
                    height: calcWidth(1.5, 0),
                    margin: 'auto'
                }} ref={ref => { this.bar = ref }}> </div>
                <div style={{ marginTop: calcWidth(5, 0) }}>
                    <div id='button' className='pop_pulse' style={Styles.option} ref={ref => { this.yeah = ref }} onClick={() => this.yeah_do_it()}>
                        <img src={this.ye} style={Styles.image} alt = { alt }/>
                        <div style={Styles.option_text}> Yeah! </div>
                        <div style={Styles.option_text_sub}> (watch an ad) </div>
                    </div>
                    <div id='button' className='tease_animation' style={Styles.option} ref={ref => { this.nah = ref }} onClick={() => this.nah_dont()}>
                        <img src={this.ne} style={Styles.image} alt = { alt } />
                        <div style={Styles.option_text}> Nah </div>
                        <div style={Styles.option_text_sub}> (lose tragically :o) </div>
                    </div>
                </div>
            </div>
        );
    }
}