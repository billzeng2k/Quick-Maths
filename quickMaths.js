class QuickMaths extends React.Component {
	constructor(props) {
		super(props);
		this.screen = 'menu'
	}

	startGame() {
		this.screen = 'game';
		this.game.startGame();
	}

	goHome() {
		this.screen = 'menu';
	}

	render () {
		return (
			<div>
				<div style = {
					this.screen != 'menu' ? { display: 'none' } : { display: 'initial' }
				}> 
					<Menu quickMaths = { this } />
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

function startGame(playerName) {
	const domContainer = document.querySelector('.game_container');
	setInterval(function () { ReactDOM.render(<QuickMaths />, domContainer) }, 10);
}