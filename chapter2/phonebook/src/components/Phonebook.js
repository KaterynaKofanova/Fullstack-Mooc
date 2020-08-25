import React from 'react'
const Phonebook = ({persons,handleDelete}) => {
    const phonebook=persons.map(person => <p key= {person.name}> 
        {person.name} {person.number} <button onClick={()=>handleDelete(person.id)}>delete</button> </p>)
    console.log('phonebook is', phonebook)
    return( 
        <div>
            {phonebook}
        </div>
    )
}
export default Phonebook