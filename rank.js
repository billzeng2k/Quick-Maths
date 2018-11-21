const fontSizeR = calcWidth(800/98, 0);
const entrySize = calcHeight(100, - fontSizeEn * 2 - calcWidth(35, 0)) / 6;

const StylesR = {
	rank: {
		display: 'inline-block',
		margin: 2 * margin + 'px',
		height: entrySize - margin * 4 + 'px',
		float: 'right'
	},
	award: {
		position: 'relative',
		display: 'inline-block',
		margin: margin + 'px',
		width: entrySize - margin * 2 + 'px',
		textAlign: 'center',
		float: 'right',
	},
	awardImg: {
		height: entrySize - margin * 2 + 'px',
		right: 0
	},
	awardText: {
		width: entrySize - margin * 2 + 'px',
		position: 'absolute',
		fontSize: fontSizeR + 'px',
		top: - fontSizeR / 3.5 + 'px'
	}
}

class Rank extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if(this.props.rank == 1)
			return <img style = { StylesR.rank } src = { crown } />;
		if(this.props.rank == 2)
			return <img style = { StylesR.rank } src = { crownS } />;
		if(this.props.rank == 3)
			return <img style = { StylesR.rank } src = { crownC } />;
		return (
			<div style = { StylesR.award }>
				<img style = { StylesR.awardImg } src = { award } />
				<div style = { StylesR.awardText }> { this.props.rank } </div>
			</div>
		);
	}
}