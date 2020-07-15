import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Components/Filter'
import Country from './Components/Country'

const App =  () => {
  /*Get data from server*/
  const [countries, setCountries] = useState([]);
  useEffect(()=> {
    axios
          .get('https://restcountries.eu/rest/v2/all')
          .then(response=>{
            setCountries(response.data)
          })
  },[])
  
  
  
  /*Values entered by user*/
  const[newFilter, setNewFilter]= useState('');

  /*Event handlers*/
  const handleFilterChange =(event)=>{
    setNewFilter(event.target.value)
  }
  console.log('filter is', newFilter)

  const countriesFiltered = countries.filter(country=>country.name.toLowerCase().includes(newFilter.toLowerCase()))
  console.log('countriesFiltered is', countriesFiltered)

  return(
    <div>
      <Filter word={newFilter} handle={handleFilterChange} />
      <Country countries={countriesFiltered} setFilter={setNewFilter} />
    </div>
  )
}

export default App;
