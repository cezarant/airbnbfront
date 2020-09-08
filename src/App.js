import React from 'react';
import './App.css';
import {  
  ApolloClient,
  InMemoryCache,
  ApolloProvider  
} from "@apollo/client";
import ListOfReviews from './components/ListofReviews'

const client = new ApolloClient({
  uri: "https://airbnbacomodations.herokuapp.com/",
  cache: new InMemoryCache()
}); 

function App() {  
  return (
    <ApolloProvider client={client}>
       <div>
         <ListOfReviews />        
      </div>    
    </ApolloProvider>);    
}
export default App;