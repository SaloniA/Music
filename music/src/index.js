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
      <button className={note_class} onClick={this.setEnabled.bind(this)}>
      	js
      </button>
    );
  }
}

class Row extends React.Component {
	constructor() {
		super();

		this.state = {
			notes: this.createNotes()
		}

		this.playNoteAt = this.playNoteAt.bind(this);
	}
	createNotes() {
		var notes = new Array(16);
		for (var i = 0; i < 16 ; i++) {
			notes[i] = <Note />;
		}
		return notes;
	}

	playNoteAt(i) {
		this.state.notes[i].setPlaying(true);
	}

	render() {
		return(
			<div>
				{this.state.notes}
			</div>

		);
	}
}

class Board extends React.Component {
	constructor(props){
		super();

		this.state = {
			rows: this.createRows(props.defaultRows),
			playing: true,
			bpm: 120.0,
			currentPlaying: 0
		}
		this.loopPlay = this.loopPlay.bind(this);
		this.incrementIndex = this.incrementIndex.bind(this);
		this.loopPlay();
	}

	createRows(numRows) {
		var rows = [];
		for (var i=0; i < numRows; i++) {
			rows.push(<Row />);
		}
		return rows;
	}

	loopPlay() {
		console.log("Test");
		setInterval(this.loopPlay, (60/(this.state.bpm*16))*1000);
		this.state.rows.forEach(function (row) {
			row.playNoteAt(this.state.currentPlaying);
		});
		this.incrementIndex();
	}

	incrementIndex() {
		if (this.state.currentPlaying > 15) {
			this.setState({currentPlaying: 0});
		} else {
			this.setState({currentPlaying: this.state.currentPlaying+1});
		}

	}
	render() {
		return (
//			<div style={{display: "block"}}>
			<div className="block">
				{this.state.rows}
			</div>
		);

	}

}

ReactDOM.render(
	<Board defaultRows={4}/>,
	document.getElementById('root')
);
