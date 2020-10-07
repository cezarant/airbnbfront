import React, { Component } from 'react'
import img from './cardA.jpeg';
import './cardA.css';
import {  
  ApolloClient,
  InMemoryCache,
  ApolloProvider  
} from "@apollo/client";
import { useQuery, gql } from "@apollo/client";
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


const headerImg = {
  backgroundImage: `url(${img})`,
  backgroundSize: 'cover',
  backgroundPosition: '0 -75px',
  backgroundRepeat: 'no-repeat',
  height: 145,
  width: '100%', 
  opacity: '1',
  position: 'relative',
  zIndex: 500
};
const dotenv = require('dotenv');
dotenv.config();
const client = new ApolloClient({
  uri:  process.env.URL_API,
  cache: new InMemoryCache()
}); 

class cardA extends Component{          
  constructor(props){       
    super(props);  
    this.state = {  selectedCardType : this.props.selectedCardType};        
    this.getList = this.getList.bind(this); 
    console.log(process.env.URL_API) 
  }
  getList(){
      const { loading, error, data } = useQuery(GET_REVIEWS);
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return(           
      <div>        
        <p>Selected : {this.state.selectedCardType}</p>
        {data.reviews.filter(review => review.room_type === 'Shared room').map(({ _id, name, beds }) =>
        (
            <li key={_id}>              
                {name} - Qtd. of Beds<b>{beds}</b>
            </li>
        ))}
      </div>)  
    }
    render(){
       return (
        <div>
          <p>Teste</p>
        </div> 
        );
    } 
}
export default cardA; 
/*export default (props) => (
  <aside className="cardA">
    <header className="cardA-header" style={headerImg}></header>
    <main className="cardA-body">
      <h1 className="cardA-title center">Guardians Of The Galaxy</h1>
      <p>
        {props.descricao}
      </p>
    </main>
    <footer className="cardA-footer">
      <i className="ico far fa-heart" title="add as favorite"></i>
      <i className="ico fas fa-share-alt" title="share"></i>
      <i className="ico fab fa-instagram" title="post on Instagram"></i>
    </footer>
  </aside>
);*/