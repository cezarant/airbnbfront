import {  
  ApolloClient,
  InMemoryCache,
  ApolloProvider  
} from "@apollo/client";
import React, { Fragment, Component } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import AngryJoe from './components/AngryJoe';
import Dropdowncards from './components/cards/dropdown/dropdown';
import * as Cards from './components/cards';
import { useQuery, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://airbnbserver.herokuapp.com/',
  cache: new InMemoryCache()
}); 

const GET_REVIEWS = gql`
{
  reviews 
  { 
    _id           
    name 
    listing_url
    beds
    room_type 
    bedrooms
  }
}`; 


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
        <section className="app-section container">
          <Dropdowncards />          

          <div className="top-margin-small">
            {this.renderSelectedCard(this.state.selectedCardType)}
          </div>
        </section>
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
    if (!selectedCardType)
      return <AngryJoe text="Pick a card style bruh!" />;

    const Card = Cards[selectedCardType];   
    return <Card selectedCardType={selectedCardType}  />;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

