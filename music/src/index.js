import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Note extends React.Component {
  constructor(){
  	super();

  	this.state = {
  		enabled: false,
  		playing: false
  	}
  }

  setEnabled() {
  	this.setState({enabled: !this.state.enabled}); 
  }

  setPlaying(isPlaying){
   	this.setState({playing: isPlaying}); 
  }
  render() {
  	var note_class;
  	if (this.state.enabled) {
  		if (this.state.playing) {
  			note_class = "note-enabled-playing";
  		} else {
  			note_class = "note-enabled";
  		}
  	} else {
  		if (this.state.playing) {
  			note_class = "note-disabled-playing";
  		} else {
  			note_class = "note-disabled";
  		}
  	} 

    return (
      <button className={note_class} onClick={this.setEnabled.bind(this)} />
    );
  }
}

class Row extends React.Component {
	constructor() {
		super();

		this.state = {
			notes: []
		}

		this.playNoteAt = this.playNoteAt.bind(this);
	}
	 
	setNoteAt(i, ref) {
  		var notes = this.state.notes;
  		notes[i] = ref;
  		this.setState({notes: notes}); 
  	}

	playNoteAt(i, playing) {
		this.state.notes[i].setPlaying(playing);
	}

	__renderNote(i) {
		return <Note ref={(r) => this.state.notes[i] = r}/>;
	}

	__renderNotes() {
		var notes = [];
		for (var i = 0; i < 16; i++) {
			notes.push(this.__renderNote(i));
		}
		return notes;
	}

	render() {
		return(
			<div>
				{this.__renderNotes()}
			</div>
		);
	}
}

class Board extends React.Component {
	constructor(props){
		super();

		this.state = {
			rows: [],
			playing: true,
			bpm: 120.0,
			currentPlaying: 0
		}

		this.incrementIndex = this.incrementIndex.bind(this);
		this.loopPlay = this.loopPlay.bind(this);
	}

	componentDidMount() {
    	this.interval = setInterval(() => {
    		console.log("Test");
    		this.loopPlay();
    	}, 100);
  	}

  	componentWillUnmount() {
    	clearInterval(this.interval);
  	}

  	setRowAt(i, ref) {
  		var rows = this.state.rows;
  		rows[i] = ref;
  		this.setState({rows: rows}); 
  	}

	loopPlay() {
		let currentPlaying = this.state.currentPlaying;
		for (var i=0; i < this.state.rows.length; i++) {
			let row = this.state.rows[i];
			row.playNoteAt(currentPlaying, true);
			if (currentPlaying === 0) {
				row.playNoteAt(15, false);
			}
			else {
				row.playNoteAt(currentPlaying-1, false);
			}
		}
		this.incrementIndex();
	}

	incrementIndex() {
		if (this.state.currentPlaying > 14) {
			this.setState({currentPlaying: 0});
		} else {
			this.setState({currentPlaying: this.state.currentPlaying+1});
		}

	}

	__renderRow(i) {
		return <Row ref={(r) => this.state.rows[i] = r}/>;
	}

	__renderRows(n) {
		var rows = [];
		for (var i = 0; i < n; i++) {
			rows.push(this.__renderRow(i));
		}
		return rows;
	}

	render() {
		return (
			<div className="block">
				{this.__renderRows(this.props.defaultRows)}
			</div>
		);
	}

}

ReactDOM.render(
	<Board defaultRows={4}/>,
	document.getElementById('root')
);
