import React from 'react';
import './App.css';
import {  
  ApolloClient,
  InMemoryCache,
  ApolloProvider  
} from "@apollo/client";
import ListOfReviews from './components/ListofReviews'
const client = new ApolloClient({
  uri: "http://airbnbserver.herokuapp.com/",
  cache: new InMemoryCache()
}); 

function App() {  
  return (
    <div>
      <p>Algo</p>
    </div>);    
}
export default App;