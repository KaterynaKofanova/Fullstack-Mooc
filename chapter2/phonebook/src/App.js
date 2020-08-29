import React, { useState, useEffect } from 'react'
import Phonebook from './components/Phonebook'
import Number from './components/Number'
import Name from './components/Name'
import Search from './components/Search'
import contactService from './services/contacts'
import Notification from './components/Notification'
import ErrorRed from './components/Error'
import './index.css'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const[errorRed, setErrorRed]= useState(null)

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
      .delCont(id, setErrorRed)
      .then(deleted=>{setPersons(persons.filter(person=>person.id!==id))})
    setErrorMessage(
      `Contact was deleted from the phonebook`
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
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
        .then(response =>{
          setPersons(persons.map(person=>person.name!==response.data.name?person:response.data))
          setErrorMessage(
            `Number for ${newName} was changed`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorRed('Information on this contact has been removed from the server')
          setTimeout(()=> { 
            setErrorRed(null)}, 5000)
            setPersons(persons.filter(person=>person.id!==existing.id))
        })
        setNewName('');
        setNewNumber('');  
    }
    }else if(persons.some(person => person.number === newNumber)){
      window.alert(`${newNumber} is already added to phonebook`);
      setNewNumber('');
    }else{
      contactService.addNew(newPerson)
        .then(newContact=> {
          setPersons(persons.concat(newContact))
        })
        setErrorMessage(
          `${newName} was added to the phonebook`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
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
      <Notification message={errorMessage} />
      <ErrorRed message={errorRed} />
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
