const borderSize = calcWidth(100/98, 0);
const timerSize = calcWidth(25, 0);
const timeSize = calcWidth(2500/98, 0);

const circumference = timerSize * 2 * Math.PI;
const sequence = ['inf', 'inf', 15, 13, 12, 11, 10, 10, 9, 9, 8, 8, 7, 7, 7, 6, 6, 6, 6, 5, 5, 5, 5, 4, 4, 4, 4, 3, 3, 3, 3];
var gameTime = sequence[0];
var time = gameTime + 1;

const StylesT = {
	container: {
		top: '1%',
		right: ((document.body.clientWidth - (timerSize * 2 + borderSize * 2)) / 2) + 'px',
		position: 'absolute',
		textAlign: 'center',
		width: (timerSize * 2 + borderSize * 2) + 'px',
  		height: (timerSize * 2 + borderSize * 2) + 'px'
	},
	time: {
		fontSize: timeSize  + 'px',
		position: 'absolute',
		top: (-timeSize / 2.25) + 'px',
		bottom: 0,
		left: 0, 
		right: 0
	},
	inf: {
		position: 'absolute',
		width: timeSize * 1.25  + 'px',
		top: timeSize / 2.3 + 'px',
		bottom: 0,
		left: timeSize / 2.4 + 'px', 
	},
	svg: {	
  		width: (timerSize * 2 + borderSize * 2) + 'px',
  		height: (timerSize * 2 + borderSize * 2) + 'px',
  		transform: 'rotateY(-180deg) rotateZ(-90deg)'
	},
	circle: {
 		strokeDasharray: circumference + 'px',
  		strokeLinecap: 'round',
		strokeWidth: borderSize + 'px',
		stroke: 'black',
		fill: 'none',
		WebkitTransition: 'stroke-dashoffset 1s linear',
  		msTransition: 'stroke-dashoffset 1s linear'
	}
}

class Timer extends React.Component {
	constructor(props) {
		super(props);
		this.mounted = false;
	}

	initialize() {
		gameTime = sequence[0];
		this.score = 0;
	}

	equationSolved() {
		this.score++;
		if(this.score < sequence.length)
			gameTime = sequence[this.score];
		this.resetTime();
		this.startCountdown();
	}

	done() {
		clearInterval(this.counter);
		time = 0;
		this.props.game.gameFinished(this.score);
	}

	resetTime() {
		clearInterval(this.counter);
		time = gameTime + 1;
	}

	startCountdown() {
		clearInterval(this.counter);
		time = gameTime + 1;
		this.counter = setInterval(function() {
			time--;
		}, 1000);
	}

	componentDidMount() {
		this.countdown = document.getElementById('timer');
		this.mounted = true;
	}

	transitionOut() {
		playAnimation(this.container, 'pop_down_animation')
	}

	resetAnimation() {
		resetAnimation(this.container, 'pop_down_animation')
	}

	render () {
		if(time <= 0 && gameRunning) 
			this.done();
		if(this.mounted)
			this.countdown.style.setProperty('stroke-dashoffset', gameTime == 'inf' ? 0 : circumference * (gameTime - Math.max(time - 1, 0)) / gameTime);
		return (
			<div ref = { ref => { this.container = ref }} className = 'pop_up_animation' style = { StylesT.container }>
				{ 
					gameTime == 'inf' ? 
					<img style = { StylesT.inf } src = { infinite } /> :
					<p style = { StylesT.time }> { Math.min(time, gameTime) } </p>
				}
				<svg style = { StylesT.svg }>
					<circle id = "timer" style = { StylesT.circle } r = { timerSize + 'px' } cx = { (borderSize + timerSize) + 'px' } cy = { (borderSize + timerSize) + 'px' } />
				</svg>
			</div>
		);
	}
}