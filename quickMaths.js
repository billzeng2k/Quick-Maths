var muted = false;
var wait = false;
var menuSoundSrcConnected = false;
var highScore = 0;

class QuickMaths extends React.Component {
	constructor(props) {
		super(props);
		setTimeout(() => { this.screen = 'menu' }, 200);
	}

	selectContext(quickMaths) {
		FBInstant.context
		  .chooseAsync()
		  .then(function() {
		    FBInstant
			  .getLeaderboardAsync('BaseGame.' + FBInstant.context.getID())
			  .then(leaderboard => { return leaderboard.setScoreAsync(0); })
			  .then(() => {
			  	FBInstant
				  .getLeaderboardAsync('BaseGame.' + FBInstant.context.getID())
				  .then(leaderboard => leaderboard.getPlayerEntryAsync())
				  .then(entry => {
				    highScore = entry.getScore();
				  }).catch(error => {
				  	console.error(error);
				  	highScore = 0;
				  });
			  	quickMaths.startGame()
			  })
			  .catch(error => console.error(error));
		  })
		  .catch(error => console.error(error));
	}

	startGame() {
		if(wait)
			return;
		if(this.screen == 'menu')
			this.menu.transitionOut();
		else if(this.screen == 'score')
			this.score.transitionOut();
		else if(this.screen == 'leaderboard')
			this.leaderboard.transitionOut();
		wait = true;
		homeButton = true;
		this.game.joinGame();
		setTimeout(() => {
			this.screen = 'game';
			this.game.startGame();
			wait = false;
		}, 700);
	}

	goHome() {
		if(wait)
			return;
		wait = true;
		if(this.screen == 'game')
			this.game.leaveGame();
		else if(this.screen == 'score')
			this.score.transitionOut();
		else if(this.screen == 'leaderboard')
			this.leaderboard.transitionOut();
		setTimeout(() => {
			this.screen = 'menu';
			this.menu.reset();
			wait = false;
		}, 700);
	}

	scoreScreen(score, solvedEq) {
		if(wait)
			return;
		wait = true;
		if(this.screen == 'game')
			setTimeout(() => {
				this.game.leaveGame();
			}, 1000);
		setTimeout(() => {
			this.screen = 'score';
			this.score.reset(score, solvedEq);
			wait = false;
		}, 1700);
	}

	displayLeaderboard() {
		if(wait)
			return;
		if(this.screen == 'menu')
			this.menu.transitionOut();
		else if(this.screen == 'score')
			this.score.transitionOut();
		wait = true;
		setTimeout(() => {
			this.screen = 'leaderboard';
			this.leaderboard.reset();
			wait = false;
		}, 700);
	}

	render () {
		return (
			<div>
				<div style = {
					this.screen != 'menu' ? { display: 'none' } : { display: 'initial' }
				}> 
					<Menu quickMaths = { this } ref = { ref => { this.menu = ref }} />
				</div>
				<div style = {
					this.screen != 'score' ? { display: 'none' } : { display: 'initial' }
				}>
					<ScoreScreen quickMaths = { this } ref = { ref => { this.score = ref }} />
				</div>
				<div style = {
					this.screen != 'leaderboard' ? { display: 'none' } : { display: 'initial' }
				}>
					<Leaderboard quickMaths = { this } ref = { ref => { this.leaderboard = ref }} />
				</div>
				<div style = {
					this.screen != 'game' ? { display: 'none' } : { display: 'initial' }
				}>
					<Game quickMaths = { this } ref = { ref => { this.game = ref }} />
				</div>
			</div>
		);
	}
}
//
function toggleSound() {
	muted = !muted;
}

function startGame(playerName) {
	const domContainer = document.querySelector('.game_container');
	setInterval(function () { ReactDOM.render(<QuickMaths />, domContainer) }, 10);
}

function readySound() {
	if(!muted && FBInstant.getPlatform() != 'IOS') {
		const readySrc = new Audio('sounds/ready.mp3');
		(audioCtx.createMediaElementSource(readySrc)).connect(audioCtx.destination);
		readySrc.play();
	}
}

function setSound() {
	if(!muted && FBInstant.getPlatform() != 'IOS') {
		const setSrc = new Audio('sounds/set.mp3');
		(audioCtx.createMediaElementSource(setSrc)).connect(audioCtx.destination);
		setSrc.play();
	}
}

function goSound() {
	if(!muted && FBInstant.getPlatform() != 'IOS') {
		const goSrc = new Audio('sounds/go.mp3');
		(audioCtx.createMediaElementSource(goSrc)).connect(audioCtx.destination);
		goSrc.play();
	}
}

function winSound() {
	if(!muted && FBInstant.getPlatform() != 'IOS') {
		const winSrc = new Audio('sounds/win.mp3');
		(audioCtx.createMediaElementSource(winSrc)).connect(audioCtx.destination);
		winSrc.play();
	}
}

function finishSound() {
	if(!muted && FBInstant.getPlatform() != 'IOS') {
		const finishSrc = new Audio('sounds/finish.mp3');
		(audioCtx.createMediaElementSource(finishSrc)).connect(audioCtx.destination);
		finishSrc.play();
	}
}

function errorSound() {
	if(!muted && FBInstant.getPlatform() != 'IOS') {
		const errorSrc = new Audio('sounds/error.mp3');
		(audioCtx.createMediaElementSource(errorSrc)).connect(audioCtx.destination);
		errorSrc.play();
	}
}

function addSymbolSound() {
	if(!muted && FBInstant.getPlatform() != 'IOS') {
		const addSymbolSrc = new Audio('sounds/addSymbol.mp3');
		(audioCtx.createMediaElementSource(addSymbolSrc)).connect(audioCtx.destination);
		addSymbolSrc.play();
	}
}

function removeSymbolSound() {
	if(!muted && FBInstant.getPlatform() != 'IOS') {
		const removeSymbolSrc = new Audio('sounds/removeSymbol.mp3');
		(audioCtx.createMediaElementSource(removeSymbolSrc)).connect(audioCtx.destination);
		removeSymbolSrc.play();
	}
}

function menuSound() {
	if(!muted) {
		const menuSoundSrc = document.querySelector('audio');
		if (!menuSoundSrcConnected) {
			(audioCtx.createMediaElementSource(menuSoundSrc)).connect(audioCtx.destination);
			menuSoundSrcConnected = true;
		}
		menuSoundSrc.play();
	}
}