const fontSizeLB = calcWidth(2500/98, 0);
const entrySize = calcHeight(100, - fontSizeLB * 2 - calcWidth(35, 0)) / 6;

const StylesLB = {
	title: {
		textAlign: 'center',
		fontSize: fontSizeLB + 'px'
	},
	noContext: {
		textAlign: 'center',
		fontSize: fontSizeLB / 2 + 'px',
		marginTop: calcHeight(50, -fontSizeLB * 1.5 - calcWidth(18, 0)) + 'px'
	},
	noContextImage: {
		width: calcWidth(40, 0) + 'px'
	},
	entryContainer: {
		position: 'relative',
		height: entrySize * 6 + 'px',
		width: calcWidth(100, 0) + 'px',
		paddingRight: '17px',
		overflowX: 'hidden',
		overflowY: 'auto',
	},
	foreground: {
		pointerEvents: 'none',
		position: 'fixed',
		top: fontSizeLB * 1.2 + entrySize + 'px',
		height: entrySize * 6 + 'px',
		width: '100%',
		zIndex: 1,
		backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0) 90%, rgba(255, 255, 255, 1) 97%)'
	},
};

class Leaderboard extends React.Component {
	constructor (props) {
		super(props);
	}

	transitionOut() {
		playAnimation(this.noContext, 'fade_out_animation');
		playAnimation(this.entryContainer, 'fade_out_animation');
		playAnimation(this.title, 'slide_up_out_animation');
		this.buttons.slideOut();
	}

	reset() {
		FBInstant.getLeaderboardAsync('BaseGame.' + FBInstant.context.getID())
		  .then((leaderboard) => leaderboard.getPlayerEntryAsync())
		  .then((entry) => this.currentPlayer.setEntry(entry.getRank(), entry.getPlayer().getName(), entry.getPlayer().getPhoto(), entry.getScore()));
		FBInstant.getLeaderboardAsync('BaseGame.' + FBInstant.context.getID())
		  .then((leaderboard) => leaderboard.getEntriesAsync())
		  .then((entries) => this.entries = entries)
		this.buttons.reset();
		resetAnimation(this.noContext, 'fade_out_animation');
		resetAnimation(this.entryContainer, 'fade_out_animation');
		resetAnimation(this.title, 'slide_up_out_animation');
	}

	renderEntries() {
		if(this.entries == null)
			return;
		var elements = [];
		for(var i = 0; i < this.entries.length; i++) {
			if(FBInstant.player.getID() == this.entries[i].getPlayer().getID())
				continue;
			var entry = <Entry key = { i } rank = { this.entries[i].getRank() } name = { this.entries[i].getPlayer().getName() } photo = { this.entries[i].getPlayer().getPhoto() } score = { this.entries[i].getScore() }/>;
			elements.push(entry);
		}
		return elements;
	}

	render() {
		return (
			<div>
				<div style = { StylesLB.title } className = 'slide_down_pop_animation' ref = { ref => { this.title = ref }}> Leaderboard </div>
				<div className = 'fade_in_animation' style = { FBInstant.context.getID() == null ? { display:  'none' } : { }} ref = { ref => { this.entryContainer = ref }}>
					<Entry ref = { ref => { this.currentPlayer = ref }}/>
					<div style = { StylesLB.entryContainer }>
						{ this.renderEntries() }
						<div style = { StylesLB.foreground }> </div>
					</div>
				</div>
				<div style = { FBInstant.context.getID() == null ? StylesLB.noContext : { display:  'none' }} ref = { ref => { this.noContext = ref }}>
					<div className = 'pulse'>
						<img style = { StylesLB.noContextImage } src = { fight }/>
						<div> Challenge a friend first! </div>
					</div>
				</div>
				<LeaderboardButtons quickMaths = { this.props.quickMaths } ref = { ref => { this.buttons = ref }}/>
			</div>
		);
	}
}