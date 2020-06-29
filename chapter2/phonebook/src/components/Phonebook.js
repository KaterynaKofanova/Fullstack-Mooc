import React from 'react'
const Phonebook = ({persons}) => {
    const phonebook=persons.map(person => <p key= {person.name}> {person.name} {person.number}</p>)
    console.log('phonebook is', phonebook)
    return( 
        <div>
            {phonebook}
        </div>
    )
}
export default Phonebook