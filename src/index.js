import React, { Fragment, Component } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import AngryJoe from './components/AngryJoe';
import Dropdowncards from './components/cards/dropdown/dropdown';
import * as Cards from './components/cards';

class App extends Component {
  state = {
    selectedCardType: ''
  };

  render(){
    return (
      <Fragment>
        <div className="app-bar">
          <h1 className="app-bar-title">Air Bnb Card</h1>
        </div>
        
      </Fragment>
    );
  }


  renderCardSelector(){
    return (
      <div className="form-group top-margin-small">
        <label className="card-selector-label">Select Card Style</label>
        <select className="card-selector form-control"
          onChange={(e) => this.setState({ selectedCardType: e.target.value })}>
          <option></option>
          <option>CardA</option>
          <option>CardB</option>
        </select>
      </div>
    );
  }

  renderSelectedCard(selectedCardType) {
    const Card = Cards[selectedCardType];   
    return <Card selectedCardType={selectedCardType}  />;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

