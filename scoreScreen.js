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
		height: calcHeight(0.3, 0) + 'px'
	},
	highScore: {
		display: 'inline-block',
		fontSize: fontSizeSS / 2 + 'px'
	},
	highScoreCrown: {
		display: 'inline-block',
		paddingLeft: calcWidth(1, 0) + 'px',
		paddingRight: calcWidth(1, 0) + 'px',
		paddingBottom: fontSizeSS / 18 + 'px',
		width: fontSizeSS / 2.8 + 'px'
	},
}

class ScoreScreen extends React.Component {
	constructor(props) {
		super(props);
		this.newBest = false;
		this.score = 0;
	}

	transitionOut() {
		playAnimation(this.scoreContainer, 'slide_up_out_animation');
		playAnimation(this.text, 'fade_out_animation');
		this.buttons.slideOut();
	}

	reset(score) {
		if(highScore < score) {
			this.newBest = true;
			FBInstant
			  .getLeaderboardAsync('BaseGame.' + FBInstant.context.getID())
			  .then(leaderboard => { return leaderboard.setScoreAsync(score); })
			  .then(console.log('Score Updated'))
			  .catch(error => console.error(error));
			FBInstant.updateAsync({
			  action: 'LEADERBOARD',
			  name: 'BaseGame.' + FBInstant.context.getID()
			})
			  .then(() => console.log('Update Posted'))
			  .catch(error => console.error(error));
		} else
			this.newBest = false;
		this.score = score;
		this.buttons.reset();
		resetAnimation(this.scoreContainer, 'slide_up_out_animation');
		resetAnimation(this.text, 'fade_out_animation');
	}

	render() {
		return (
			<div style = { StylesSS.container }>
				<div className = 'slide_down_pop_animation' style = {{ marginTop: calcHeight(2, 0) + 'px' }} ref = { ref => { this.scoreContainer = ref }}>
					<img className = 'bob' style = { this.newBest ? { width: calcWidth(20, 0) + 'px' } : { display: 'none' }} src = { crown } />
					<div style = { StylesSS.score }> { this.score } </div>
					<div className = 'tilt' style = { this.newBest ? { fontSize: fontSizeSS/2 + 'px' } : { display: 'none' }}> New Best! </div>
					<div className = 'tilt' style = { this.newBest ? { display: 'none' } : { }}> 
						<div style = { StylesSS.bar }> </div>
						<img style = { StylesSS.highScoreCrown } src = { crown } />
						<div style = { StylesSS.highScore }> { highScore } </div>
						<img style = { StylesSS.highScoreCrown } src = { crown } />
						<div style = { StylesSS.bar }> </div>
					</div>
				</div>
				<div className = 'pulse' style = {{ 
					textAlign: 'center',
					fontSize: fontSizeSS + 'px',
					marginTop: this.newBest ? calcHeight(50, -fontSize * 1.5 - calcWidth(40 / 1.5, 0)) : calcHeight(50, -fontSize * 2.25)
				}} onClick = { () => { this.props.quickMaths.startGame() }}> <div ref = { ref => { this.text = ref }}> Play Again </div> </div>
				<ScoreScreenButtons quickMaths = { this.props.quickMaths } ref = { ref => { this.buttons = ref }} />
			</div>
		);
	}
}