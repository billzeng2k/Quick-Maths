const borderSize = calcWidth(100/98, 0);
const timerSize = calcWidth(25, 0);
const timeSize = calcWidth(2500/98, 0);

const circumference = timerSize * 2 * Math.PI;
const gameTime = 60;
var time = gameTime;

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

	startCountdown() {
		clearInterval(this.counter);
		time = gameTime;
		this.counter = setInterval(function() {
			time--;
		}, 1000);
	}

	componentDidMount() {
		this.countdown = document.getElementById('timer');
		this.startCountdown();
		this.mounted = true;
	}

	render () {
		if(time <= 0) 
			this.startCountdown();
		if(this.mounted)
			this.countdown.style.setProperty('stroke-dashoffset', circumference * (gameTime + 1 - time) / gameTime);
		return (
			<div style = { StylesT.container }>
				<p style = { StylesT.time }> { time } </p>
				<svg style = { StylesT.svg }>
					<circle id = "timer" style = { StylesT.circle } r = { timerSize + 'px' } cx = { (borderSize + timerSize) + 'px' } cy = { (borderSize + timerSize) + 'px' } />
				</svg>
			</div>
		);
	}
}