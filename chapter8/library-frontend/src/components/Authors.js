  
import React, {useState} from 'react'
import {EDIT_AUTHOR, ALL_AUTHORS, ALL_BOOKS} from '../queries'
import { useQuery, useMutation } from '@apollo/client'


const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, { 
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    editAuthor({
      variables:{
        name,
        setBornTo: Number(born)
      }
    })
    setName('')
    setBorn('')
  }

  if (!props.show) {
    return null
  }else{
    if(result.loading || books.loading){
      return <div>loading...</div>
    }
    if(result.data && books.data){
      const authors = result.data.allAuthors
    return (
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                born
              </th>
              <th>
                books
              </th>
            </tr>
            {authors.map(a =>
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{books.data.allBooks.filter(b => b.author.name === a.name).length}</td>
              </tr>
            )}
          </tbody>
        </table>
        {props.token ? 
        <div>
          <h3>Set birthyear</h3>
              <form onSubmit={submit}>
                <div>
                  name: <select
                  value={name}
                  onChange={({ target }) => setName(target.value)}>
                    {authors.map(a => <option value={a.name} key={a.name}>{a.name}</option>)}
                    </select>
                </div>
                <div>
                  born: <input 
                  type='number'
                  value={born}
                  required={true}
                  onChange={({ target }) => setBorn(target.value)}/>
                </div>
                <button type='submit'>update author</button>
              </form>
          </div> : null }
      </div>
    )
    }
  }
}


export default Authors
