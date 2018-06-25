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
			notes: []
		}

		this.playNoteAt = this.playNoteAt.bind(this);
	}

	// __createNoteRefs() {
 //  		var refs = [];
 //  		for (var i=0; i < 16; i++) {
 //  			refs[i] = React.createRef();
 //  		}
 //  		return refs;
 //  	}
	 
	setNoteAt(i, ref) {
  		var notes = this.state.notes;
  		notes[i] = ref;
  		this.setState({notes: notes}); 
  	}

	playNoteAt(i, playing) {
		this.state.notes[i].setPlaying(playing);
	}

	render() {
		return(
			<div>
				<Note ref={(r) => this.state.notes[0] = r}/>
				<Note ref={(r) => this.state.notes[1] = r}/>
				<Note ref={(r) => this.state.notes[2] = r}/>
				<Note ref={(r) => this.state.notes[3] = r}/>
				<Note ref={(r) => this.state.notes[4] = r}/>
				<Note ref={(r) => this.state.notes[5] = r}/>
				<Note ref={(r) => this.state.notes[6] = r}/>
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
    	this.loopPlay();
  	}

  	// __createRowRefs() {
  	// 	var refs = [];
  	// 	for (var i=0; i < 4; i++) {
  	// 		refs[i] = React.createRef();
  	// 	}
  	// 	console.log(refs);
  	// 	return refs;
  	// }

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
				row.playNoteAt(6, false);
			}
			else {
				row.playNoteAt(currentPlaying-1, false);
			}
		}
		this.incrementIndex();
		//setInterval(this.loopPlay, (60/(this.state.bpm*16))*1000);
		var d = new Date();
		console.log(d.toLocaleTimeString());
		setInterval(this.loopPlay, 2000);
	}

	incrementIndex() {
		if (this.state.currentPlaying > 5) {
			this.setState({currentPlaying: 0});
		} else {
			this.setState({currentPlaying: this.state.currentPlaying+1});
		}

	}
	render() {
		return (
			<div className="block">
				<Row ref={(r) => this.state.rows[0] = r}/>
				<Row ref={(r) => this.state.rows[1] = r}/>
				<Row ref={(r) => this.state.rows[2] = r}/>
				<Row ref={(r) => this.state.rows[3] = r}/>
			</div>
		);
	}

}

ReactDOM.render(
	<Board defaultRows={4}/>,
	document.getElementById('root')
);
