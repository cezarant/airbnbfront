import React, { Component, useState } from 'react';
import Select from 'react-select';
import { useQuery, gql } from "@apollo/client";

class SummaryOfReviews extends Component{
    getList(){
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
        
        const tiposAcomodacao = Object.values(
                data.reviews.reduce((a, c) => {
                  a[c.room_type] = c;
                  return a
                }, {}))    

        // set value for default selection
        const [selectedValue, setSelectedValue] = useState(3);
        // handle onChange event of the dropdown
        const handleChange = e => {
            setSelectedValue(e.value);
        }

        return (
            <div className="App">
                <a href="https://www.cluemediator.com">Clue Mediator</a><br /><br />

                <Select
                    placeholder="Select Option"
                    value={data.reviews.find(obj => obj.value === selectedValue)} // set selected value
                    options={tiposAcomodacao} // set list of the data
                    onChange={handleChange} // assign onChange function
                />
                {selectedValue && <div style={{ marginTop: 20, lineHeight: '25px' }}>
                    <div><b>Selected Value: </b> {selectedValue}</div>
                </div>}
            </div>
        );
    }
    render(){
        return 
        
        <div>
              <p>Teste</p> 
               </div> 
    } 
}


export default SummaryOfReviews;

/*class App extends Component {
    constructor (props)
    {
        const acomodationTypes =
        <select> {
        Object.values(
          data.reviews.reduce((a, c) => {
            a[c.room_type] = c;
            return a
          }, {})).map(({ room_type }) => (
            <option key={room_type}>{room_type} </option>
          ))
         }</select>
    }
}*/