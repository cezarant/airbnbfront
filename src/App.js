import React from 'react';
import './App.css';
import {  
  ApolloClient,
  InMemoryCache,
  ApolloProvider  
} from "@apollo/client";
import ListOfReviews from './components/ListofReviews'
import SummaryOfReviews from './components/SummaryOfReviews';

const client = new ApolloClient({
  uri: "https://airbnbserver.herokuapp.com/",
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