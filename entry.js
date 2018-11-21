const fontSizeEn = calcWidth(1250/98, 0);
const entrySize = calcHeight(100, - fontSizeEn * 2 - calcWidth(35, 0)) / 6;
const margin = calcHeight(1, 0);

const StylesEn = {
	entry: {
		fontSize: fontSizeEn + 'px',
		borderStyle: 'solid',
		borderWidth: '0px 0px ' + calcHeight(0.3, 0) + 'px',
		lineHeight: entrySize + 'px',
		width: calcWidth(100, 0),
	},
	loading: {
		fontSize: fontSizeEn + 'px',
		borderStyle: 'solid',
		borderWidth: '0px 0px ' + calcHeight(0.3, 0) + 'px',
		lineHeight: entrySize + 'px',
		width: calcWidth(100, 0),
		textAlign: 'center'
	},
	score: {
		display: 'inline-block',
		verticalAlign: 'top',
		float: 'right'
	},
	name: {
		display: 'inline-block',
		verticalAlign: 'top',
	},
	componentImage: {
		display: 'inline-block',
		margin: margin + 'px',
		height: entrySize - margin * 2 + 'px',
		width: entrySize - margin * 2 + 'px',
		borderRadius: entrySize + 'px'
	}
}

class Entry extends React.Component {
	constructor(props) {
		super(props);
		this.rank = this.props.rank;
		this.name = this.props.name;
		this.photo = this.props.photo;
		this.score = this.props.score;
	}

	setEntry(rank, name, photo, score) {
		this.rank = rank;
		this.name = name;
		this.photo = photo;
		this.score = score;
	}

	render() {
		if(this.rank == null) 
			return <div style = { StylesEn.loading }> Loading </div>;
		return (
			<div style = { StylesEn.entry }>
				<img style = { StylesEn.componentImage } src = { this.photo } />
				<div style = { StylesEn.name }> { this.name } </div>
				<Rank rank = { this.rank } />
				<div style = { StylesEn.score }> { this.score } </div>
			</div>
		);
	}
}