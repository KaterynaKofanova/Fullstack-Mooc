import React from 'react'
import OneCountry from './OneCountry'
const Country = ({countries, filter, setFilter}) => {
   
    if (countries.length===1) {
        return(
            <OneCountry countries={countries[0]} />
            )
        }else if (countries.length <11){
            return(
                <div>
                {countries.map(country=><p key={country.name}> {country.name} <button onClick={()=>{setFilter(country.name)}}>Show</button></p>)}
                </div>
            )
        }else{return(
            <div>
            To many matches. Specify another flter.
            </div>
            )
        }
   
    }   
export default Country