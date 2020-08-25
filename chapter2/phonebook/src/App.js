import React, { useState, useEffect } from 'react'
import Phonebook from './components/Phonebook'
import Number from './components/Number'
import Name from './components/Name'
import Search from './components/Search'
import contactService from './services/contacts'

const App = () => {
  const [ persons, setPersons ] = useState([])

/*Get initial contacts from the server*/
  useEffect(() => {
    contactService.getAll()
      .then(initialContacts => {
      setPersons(initialContacts)
    })
  }, [] )
  
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
  const handleDelete=(id)=>{
    if (window.confirm("Do you really want to delete this contact?")) { 
    contactService
    .delCont(id)
    .then(deleted=>{setPersons(persons.filter(person=>person.id!==id))})
    }}

  /*Form onClick*/ 
  const addName = (event) => {
    event.preventDefault()
    const newPerson = { name: newName,number: newNumber,}

    if(persons.some(person => person.name === newName)){
      if (window.confirm(`${newName} is already added to the phonebook. Do you want to change the number?`)){
        const existing=persons.find(n=>n.name===newName)
        const changedPerson={...existing,number:newNumber}
        contactService.changeCont(existing.id, changedPerson)
        .then(changed =>{
          setPersons(persons.map(person=>person.name!==changed.name?person:changed))
        }) 
      }
      setNewName('');
      setNewNumber('');
    }else if(persons.some(person => person.number === newNumber)){
      window.alert(`${newNumber} is already added to phonebook`);
      setNewNumber('');
    }else{
      contactService.addNew(newPerson)
        .then(newContact=> {
          setPersons(persons.concat(newContact))
        })
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
      <Phonebook persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App
