'use strict';

var create = React.createElement;

const timerSize = calcWidth(25, 0);
const fontSize = calcWidth(2575/98, 0);
var eq1 = timerSize * 2 + (document.body.clientHeight - timerSize * 2 - calcWidth(45, 0)) / 2;
var eq2 = timerSize * 2 + (document.body.clientHeight - timerSize * 2 - calcWidth(45, 0)) / 2 - fontSize;
var opacity1 = 0.1;
var opacity2 = 1;

class Game extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {
		return (
			<div>
				<Timer />
				<Equation offset = { eq2 } opacity = { opacity1 }/>
				<Equation offset = { eq1 } opacity = { opacity2 }/>
				<Controls />
			</div>
		);
	}
}

function startGame(playerName) {
	const domContainer = document.querySelector('.game_container');
	setInterval(function () { ReactDOM.render(<Game playerName = {playerName} />, domContainer) }, 100);
}