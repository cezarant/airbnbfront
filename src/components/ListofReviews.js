import React, { Component } from 'react'
import {useQuery, gql} from "@apollo/client";

class ListOfReviews extends Component{
    GetList()
    {      
      const { loading, error, data } = useQuery(gql`
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
        }`);      
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;         

      return <div>                    
          <p>Total of Points:
              {data.reviews.reduce((start,review) => { return start + review.bedrooms; },0)}
          </p>
          <h3>Acomodations</h3>
          <div>                       
              <p>Entire Home/Apt</p>
              <div>                       
                {data.reviews.filter(review => review.room_type === 'Entire home/apt').map(({ _id,name, beds  }) =>
                (
                  <li key={_id}>
                    {name} - Qtd. of Beds<b>{beds}</b>
                  </li>
                ))}                                      
              </div>                
              <p>Private room</p>       
              <div>                 
                {data.reviews.filter(review => review.room_type === 'Shared room').map(({ _id,name, beds  }) =>
                (
                  <li key={_id}>
                    {name} - Qtd. of Beds<b>{beds}</b>
                  </li>
                ))}                                      
              </div>
          </div>                                
      </div>
    }           
    render(){
        return (
            <div>
                <this.GetList />
            </div>
        );
    } 
} 
export default ListOfReviews;