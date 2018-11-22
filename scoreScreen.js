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
	book: {
		position: 'absolute',
		width: fontSizeSS / 1.5,
		right: calcWidth(2, 0),
		top: 0
	},
}

class ScoreScreen extends React.Component {
	constructor(props) {
		super(props);
		this.newBest = false;
		this.score = 0;
		this.history = false;
	}

	transitionOut() {
		playAnimation(this.scoreContainer, 'slide_up_out_animation');
		playAnimation(this.historyContainer, 'fade_out_animation');
		playAnimation(this.text, 'fade_out_animation');
		playAnimation(this.book, 'fade_out_animation');
		this.buttons.slideOut();
	}

	reset(score, solvedEq) {
		this.once = false;
		this.history = false;
		this.solvedEq = solvedEq;
		if(highScore < score) {
			highScore = score;
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
		resetAnimation(this.historyContainer, 'fade_out_animation');
		resetAnimation(this.book, 'fade_out_animation');
		resetAnimation(this.text, 'fade_out_animation');
	}

	toggleHistory() {
		this.once = true;
		this.history = !this.history;
		this.buttons.toggleHistory(this.newBest);
	}

	renderScoreEntries() {
		if(this.solvedEq == null)
			return <div> </div>;
		var container = [];
		container.push(<ScoreEntry key = { this.solvedEq.length - 1 } values = { this.solvedEq[this.solvedEq.length - 1].values } operators = { this.solvedEq[this.solvedEq.length - 1].operators } result = { this.solvedEq[this.solvedEq.length - 1].result } time = { this.solvedEq[this.solvedEq.length - 1].time } special = { true } emoji = { this.solvedEq[this.solvedEq.length - 1].emoji }/>);
		for(var i = this.solvedEq.length - 2; i >= 0; i--)
			container.push(<ScoreEntry key = { i } values = { this.solvedEq[i].values } operators = { this.solvedEq[i].operators } result = { this.solvedEq[i].result } time = { this.solvedEq[i].time } emoji = { this.solvedEq[i].emoji }/>);
		return container;
	}

	render() {
		return (
			<div style = { StylesSS.container }>
				<img id = 'button' className = 'tease_animation' src = { book } style = { StylesSS.book } onClick = { () => this.toggleHistory() } ref = { ref => { this.book = ref }}/>
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
				<div className = 'pulse' style = { this.history ? 
				{ 
					WebkitTransition: this.once ? 'all 1s ease-out' : 'none', 
					msTransition: this.once ? 'all 1s ease-out' : 'none',
					textAlign: 'center',
					fontSize: fontSizeSS + 'px',
					marginTop: 0,
				}
				: { 
					WebkitTransition: this.once ? 'all 1s ease-out' : 'none', 
					msTransition: this.once ? 'all 1s ease-out' : 'none',
					textAlign: 'center',
					fontSize: fontSizeSS + 'px',
					marginTop: this.newBest ? calcHeight(50, -fontSize * 1.5 - calcWidth(40 / 1.5, 0)) : calcHeight(50, -fontSize * 2.25)
				}} onClick = { () => { this.props.quickMaths.startGame() }}> <div ref = { ref => { this.text = ref }}> Play Again </div> </div>
				<ScoreScreenButtons quickMaths = { this.props.quickMaths } ref = { ref => { this.buttons = ref }} />
				<div ref = { ref => { this.historyContainer = ref }} style = { this.history ? 
				{ 
					WebkitTransition: this.once ? 'all 1s ease-out' : 'none', 
					msTransition: this.once ? 'all 1s ease-out' : 'none',
					overflowX: 'hidden',
					paddingRight: '17px',
					width: calcWidth(100, 0),
					height: calcHeight(100, -fontSizeSS * (this.newBest ? 4.5 : 4)),
					bottom: 0,
					position: 'fixed'
				}
				: { 
					WebkitTransition: this.once ? 'all 1s ease-out' : 'none', 
					msTransition: this.once ? 'all 1s ease-out' : 'none',
					overflowX: 'hidden',
					paddingRight: '17px',
					width: calcWidth(100, 0),
					height: calcHeight(100, -fontSizeSS * (this.newBest ? 4.5 : 4)),
					bottom: '-100%',
					position: 'fixed'
				}}> 
					{ this.renderScoreEntries() }
				</div>
				<div style = { this.history ? 
				{ 
					WebkitTransition: this.once ? 'all 1s ease-out' : 'none', 
					msTransition: this.once ? 'all 1s ease-out' : 'none',
					pointerEvents: 'none',
					position: 'absolute',
					height: calcHeight(100, -fontSizeSS * (this.newBest ? 4.5 : 4)),
					bottom: 0,
					width: '100%',
					zIndex: 1,
					backgroundImage: 'linear-gradient(rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 5%)'
				}
				: { 
					WebkitTransition: this.once ? 'all 1s ease-out' : 'none', 
					msTransition: this.once ? 'all 1s ease-out' : 'none',
					pointerEvents: 'none',
					position: 'absolute',
					height: calcHeight(100, -fontSizeSS * (this.newBest ? 4.5 : 4)),
					bottom: '-100%',
					width: '100%',
					zIndex: 1,
					backgroundImage: 'linear-gradient(rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 5%)'
				}}> </div>
			</div>
		);
	}
}