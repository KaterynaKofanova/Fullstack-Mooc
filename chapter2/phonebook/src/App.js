import React, { useState } from 'react'
import Phonebook from './components/Phonebook'
import Number from './components/Number'
import Name from './components/Name'
import Search from './components/Search'


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  /*Values of inputs by user*/
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  

  /*Handling changes in values*/
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  /*Form onClick*/ 
  const addName = (event) => {
    event.preventDefault()
    const newPerson = { name: newName,number: newNumber,}

    if(persons.some(person => person.name === newName)){
      window.alert(`${newName} is already added to phonebook`);
      setNewName('');
    }else if(persons.some(person => person.number === newNumber)){
      window.alert(`${newNumber} is already added to phonebook`);
      setNewNumber('');
    }else{
    setPersons(persons.concat(newPerson));
    setNewFilter('');
    setNewName('');
    setNewNumber('');
    }
    console.log('persons is', persons)
    
  }
  
  console.log('persons is', persons, 'filter is', newFilter)
  /*Filter persons*/
  const personsToShow = newFilter===' '?persons:persons.filter(person=>person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
       <Search word={newFilter} handle={handleFilterChange} />
      <h3>Add new contact</h3>
      <form onSubmit ={addName}>
          <Name name = {newName} handle={handleNameChange}/>
          <Number number={newNumber} handle={handleNumberChange}/>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      <Phonebook persons={personsToShow} />
    </div>
  )
}

export default App
