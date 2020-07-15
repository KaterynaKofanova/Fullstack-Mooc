import React from 'react'
const Weather = ({capital,weather}) => {
    console.log('capital is', capital)
    
      console.log ('weather', weather)
      if(!weather){
        return null
      }

      return(
          <div>
            <h3>Current weather in {capital}:</h3>
            <p>temperature: {weather.temperature}</p>
            <div>
            <img src={weather.weather_icons} alt={weather.weather_descriptions} width='150' height='100'></img>
            </div>
            <p>wind: {weather.wind_speed}</p>
          </div>
      )
}
export default Weather