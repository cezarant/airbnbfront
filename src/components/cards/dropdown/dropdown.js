import React, { Component } from 'react';

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider, useLazyQuery
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

const client = new ApolloClient({
    uri: 'https://airbnbacomodations.herokuapp.com/',
    cache: new InMemoryCache()
});

class dpCards extends Component {
    constructor() {
        super()
        this.state = {
            selectedCardType: ''
        };
        this.getdropdown = this.getdropdown.bind(this);
    }    
    getdropdown() {
        const { loading, error, data } = useQuery(GET_REVIEWS);
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        
        const tiposAcomodacao = Object.values(
            data.reviews.reduce((a, c) => {
                a[c.room_type] = c;
                return a
            }, {}))
            console.log(tiposAcomodacao);    

        return <div>
            <div className="form-group top-margin-small">
                <label className="card-selector-label">Selecione:</label>
                <select  
                    onChange={(e) => this.setState({ selectedCardType: e.target.value })}>
                    <option key={null} />
                    {tiposAcomodacao.map(vReview => {
                        return (<option key={vReview._id} value={vReview.room_type}>{vReview.room_type}</option>)
                    })}
                </select>
                <div>
                    <p>Selected : {this.state.selectedCardType}</p>
                    {data.reviews.filter(review => review.room_type === this.state.selectedCardType).map(({ _id, name, beds }) =>
                        (
                            <li key={_id}>
                                {name} - Qtd. of Beds<b>{beds}</b>
                            </li>
                        ))}
                </div>
            </div>
        </div>
    }
    render() {
        return (
            <ApolloProvider client={client}>
                <div>
                    <this.getdropdown />
                </div>
            </ApolloProvider>);
    }
}

export default dpCards;