const fontSizeSS = calcWidth(2500/98, 0);

const StylesSS = {
	container: {
		textAlign: 'center'
	},
	score: {
		fontSize: fontSizeSS + 'px'
	},
	bar: {
		backgroundColor: 'black',
		width: calcWidth(40, 0),
		margin: 'auto',
		height: '5px'
	},
	highScore: {
		display: 'inline-block',
		fontSize: fontSizeSS / 2 + 'px'
	},
	highScoreCrown: {
		display: 'inline-block',
		paddingLeft: calcWidth(1, 0) + 'px',
		paddingRight: calcWidth(1, 0) + 'px',
		width: fontSizeSS / 2 + 'px'
	},
}

class ScoreScreen extends React.Component {
	constructor(props) {
		super(props);
		this.newBest = false;
		this.score = 0;
		this.highScore = 0;
	}

	transitionOut() {
		playAnimation(this.text, 'fade_out_animation');
		this.buttons.slideOut();
	}

	reset(score) {
		FBInstant
		  .getLeaderboardAsync('BaseGame.' + FBInstant.context.getID())
		  .then(leaderboard => leaderboard.getPlayerEntryAsync())
		  .then(entry => {
		    console.log(
		      entries[i].getRank() + '. ' +
		      entries[i].getPlayer().getName() + ': ' +
		      entries[i].getScore()
		    );
		  }).catch(error => console.error(error));
		this.score = score;
		this.buttons.reset();
		resetAnimation(this.text, 'fade_out_animation');
	}

	render() {
		return (
			<div style = { StylesSS.container }>
				<div className = 'slide_down_pop_animation' style = {{ marginTop: calcHeight(2, 0) + 'px' }}>
					<img style = { this.newBest ? { width: calcWidth(20, 0) + 'px' } : { display: 'none' }} src = { crown } />
					<div style = { StylesSS.score }> { this.score } </div>
					<div className = 'pulse' style = { this.newBest ? { fontSize: fontSizeSS/2 + 'px' } : { display: 'none' }}> New Best! </div>
					<div style = { this.newBest ? { display: 'none' } : { display: 'inherit' }}> 
						<div style = { StylesSS.bar }> </div>
						<img style = { StylesSS.highScoreCrown } src = { crown } />
						<div style = { StylesSS.highScore }> { this.highScore } </div>
						<img style = { StylesSS.highScoreCrown } src = { crown } />
						<div style = { StylesSS.bar }> </div>
					</div>
				</div>
				<div className = 'pulse' style = {{ 
					textAlign: 'center',
					fontSize: fontSizeSS + 'px',
					marginTop: this.newBest ? calcHeight(50, -fontSize * 1.5 - calcWidth(40 / 1.5, 0)) : calcHeight(50, -fontSize * 2)
				}} onClick = { () => { this.props.quickMaths.startGame() }}> <div ref = { ref => { this.text = ref }}> Play Again </div> </div>
				<ScoreScreenButtons quickMaths = { this.props.quickMaths } ref = { ref => { this.buttons = ref }} />
			</div>
		);
	}
}