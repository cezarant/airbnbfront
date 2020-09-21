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
    const { loading, error, data } = useQuery(GET_REVIEWS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const tiposAcomodacao = Object.values(
      data.reviews.reduce((a, c) => {
        a[c.room_type] = c;
        return a
      }, {}))

    return <div>
      <select onChange={(e) => this.setState({ selectedCardType: e.target.value })}>  
        {tiposAcomodacao.map(vReview => {
          return (<option key={vReview.id} value={vReview.id}>{vReview.room_type}</option>)
        })}
      </select>
      <p>Total of bedrooms: {data.reviews.reduce((start, review) => { return start + review.bedrooms; }, 0)}
      </p>
      <h3>Acomodations</h3>
      <div>
        <p>Entire Home/Apt</p>
        <div>
          {data.reviews.filter(review => review.room_type === 'Entire home/apt').map((
            { _id, name, beds }) =>
            (
              <li key={_id}>
                {name} - Qtd. of Beds<b>{beds}</b>
              </li>
            ))}
        </div>
        <p>Private room</p>
        <div>
          {data.reviews.filter(review => review.room_type === 'Shared room').map(({ _id, name, beds }) =>
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
      <div>
        <this.GetList />
      </div>
    );
  }
}
export default ListOfReviews;