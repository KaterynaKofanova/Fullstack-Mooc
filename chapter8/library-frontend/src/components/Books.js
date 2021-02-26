import React, {useState} from 'react'
import {ALL_BOOKS} from '../queries'
import { useQuery } from '@apollo/client'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [filter, setFilter] = useState('')
  if (!props.show) {
    return null
  }
  if(result.loading){
    return <div>loading...</div>
  }
  if(result.data){
    const books = result.data.allBooks
    let genres = []
    books.map(b => genres.push(...b.genres))
    const uniqueGenres = [...new Set(genres)]
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.filter(b => filter ? b.genres.includes(filter) : b).map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <h4>Filter books by genre:</h4>
        {uniqueGenres.map(g => <button key={g} onClick={()=> setFilter(g)}>{g}</button>)}
        <button onClick={()=> setFilter('')}>all genres</button>

      </div>
    </div>
  )

  }

  
}

export default Books