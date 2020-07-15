import React, { useState, useEffect } from 'react'
import Weather from './Weather'
import axios from 'axios'

const OneCountry = ({countries})=>{
    const [newWeather, setWeather] = useState(null);
    const api_key = process.env.REACT_APP_API_KEY
    const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${countries.capital}`
      useEffect(()=> {
        axios.get(url).then(response=>{
            setWeather(response.data.current)
          })
        }, [])
      console.log('newWeather is', newWeather)
    return(
        <div>
            <h1>{countries.name}</h1>
            <p>Capital: {countries.capital}</p>
            <p>Population: {countries.population}</p>
            <h3 >Languages:</h3>
            {countries.languages.map(language=><ul><li>{language.name}</li></ul>)}
            <img src={countries.flag} alt={countries.name} width='150' height='100'></img>
            <Weather capital={countries.capital} weather={newWeather} />
        </div>
    )
}
export default OneCountry
