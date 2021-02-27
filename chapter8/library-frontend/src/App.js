
import React, { useState, useEffect } from 'react'
import { useApolloClient, useLazyQuery} from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'
import {ME} from './queries'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [favGenre, setFavGenre] = useState(null)

  const [getUser, resultUser] =  useLazyQuery(ME)

  useEffect(() => {
    const fetchData = async () => {
      getUser()
      if(resultUser.data && resultUser.data.me){
      setFavGenre(resultUser.data.me.favoriteGenre)
      }
    }
    fetchData()
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [token, resultUser.data, favGenre])

  const client = useApolloClient()
  const handleLogOut = () => {
    setToken(null)
    setFavGenre(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? <button onClick={() => setPage('add')}>add book</button> : null}
        {!token ? <button onClick={() => setPage('login')}>login</button> : null}
        {token ? <button onClick={() => setPage('recommend')}>recommend</button> : null}
        {token ? <button onClick={handleLogOut}>log out</button> : null}
      </div>

      <Authors
        show={page === 'authors'} token={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'} favGenre={favGenre}
      />

      <Recommend 
        show={page === 'recommend'} token={token} 
      />

      <Login 
        show={page ==='login'} setToken={setToken} setPage={setPage}
      />

    </div>
  )
}

export default App