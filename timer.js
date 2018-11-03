const borderSize = calcWidth(100/98, 0);
const timerSize = calcWidth(25, 0);
const timeSize = calcWidth(2500/98, 0);

const circumference = timerSize * 2 * Math.PI;
var time = 60;

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
		strokeDashoffset: circumference * (60 - time) / 60 + 'px',
  		strokeLinecap: 'round',
		strokeWidth: borderSize + 'px',
		stroke: 'black',
		fill: 'none'
	}
}

class Timer extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {
		return (
			<div style = { StylesT.container }>
				<p style = { StylesT.time }> { time } </p>
				<svg style = { StylesT.svg }>
					<circle style = { StylesT.circle } r = { timerSize + 'px' } cx = { (borderSize + timerSize) + 'px' } cy = { (borderSize + timerSize) + 'px' } />
				</svg>
			</div>
		);
	}
}