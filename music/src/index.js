import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Note extends React.Component {
  constructor(){
  	super();

  	this.state = {
  		enabled: false
  	}
  }
  setEnabled() {
  	this.setState({enabled: !this.state.enabled}); 
  }
  render() {
  	let btn_class = this.state.enabled ? "note-enabled" : "note-disabled";
    return (
      <button className={btn_class} onClick={this.setEnabled.bind(this)}>
      	js
      </button>
    );
  }
}

class Row extends React.Component {
	constructor() {
		super();

		this.state = {
			notes: this.renderNotes()
		}
	}
	renderNotes() {
		var notes = new Array(16);
		for (var i = 0; i < 16 ; i++) {
			notes[i] = <Note />;
		}
		return notes;
	}

	render() {
		return(
			<div>
				{this.state.notes}
			</div>

		);
	}
}



ReactDOM.render(
	<Row />,
	document.getElementById('root')
);

