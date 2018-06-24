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
	renderNote(i){
		return <Note />;
	}
	render() {
		return(
			<div>
				<div> 
					{this.renderNote(0)}
					{this.renderNote(1)}
					{this.renderNote(2)}
					{this.renderNote(3)}
				</div>
				<div> 
					{this.renderNote(4)}
					{this.renderNote(5)}
					{this.renderNote(6)}
					{this.renderNote(7)}
				</div>
				<div> 
					{this.renderNote(8)}
					{this.renderNote(9)}
					{this.renderNote(10)}
					{this.renderNote(11)}
				</div>
				<div> 
					{this.renderNote(12)}
					{this.renderNote(13)}
					{this.renderNote(14)}
					{this.renderNote(15)}
				</div>
			</div>			
		);
	}
}



ReactDOM.render(
	<Row />,
	document.getElementById('root')
);

