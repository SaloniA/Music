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




ReactDOM.render(
	<div>
		<Note />
	</div>,
	document.getElementById('root'),
);

