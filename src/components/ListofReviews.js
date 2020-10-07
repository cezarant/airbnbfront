import React, { Component } from 'react'
import ReactDOM from "react-dom";
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

class ListOfReviews extends Component {  
  state = { selectedTypeReview : ''};
  handleChange = (e) => {
    console.log(e);
  }
  GetList() {
    console.log('Teste');
    const { loading, error, data } = useQuery(GET_REVIEWS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const tiposAcomodacao = Object.values(
      data.reviews.reduce((a, c) => {
        a[c.room_type] = c;
        return a
      }, {}))

    return <div>
        <p>Teste</p>
      </div>
  }
  render() {
    return (
      <div>
        <p>teste</p>
      </div>
    );
  }
}
export default ListOfReviews;