const fontSize = calcWidth(1750/98, 0);
const margin = calcWidth(1, 0);

const StylesS = {
	emoji: {
		paddingBottom: fontSize * 0.1 + 'px',
		width: fontSize * 0.5 + 'px',
		height: fontSize * 0.5 + 'px',
		paddingRight: margin + 'px',
		opacity: 0
	},
	container: {
		position: 'absolute',
		fontSize: fontSize + 'px',
		top: margin + 'px',
		right: 0,
		paddingRight: margin * 2 + 'px'
	}
};

class Score extends React.Component {
	constructor(props) {
		super(props);
		this.mounted = false;
		this.emoji = grin;
		this.winEmojis = [grin, love, cool, angel, silly, smile];
	}

	componentDidMount() {
		this.mounted = true;
		this.resetScore();
	}

	resetScore () {
		this.score = 0;
	}

	scorePoint() {
		this.score++;
		this.emoji = this.winEmojis[Math.floor(Math.random() * this.winEmojis.length)];
		playAnimation(this.emojiContainer, 'emoji_animation');
	}

	getScore() {
		return this.score;
	}

	transitionOut() {
		playAnimation(this.container, 'slide_left_out');
	}

	resetAnimation() {
		resetAnimation(this.container, 'slide_left_out');
		resetAnimation(this.emojiContainer, 'emoji_animation');
	}

	render () {
		return (
			<div className = 'slide_left' style = { StylesS.container } ref = { ref => { this.container = ref }} >
				<img ref = { ref => { this.emojiContainer = ref }} style = { StylesS.emoji } src = { this.emoji } />
				{ this.mounted ? this.score : 0 }
			</div>
		);
	}
}