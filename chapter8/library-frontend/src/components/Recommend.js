import React, {useState, useEffect} from 'react'
import {FIND_BOOK, ME} from '../queries'
import { useLazyQuery } from '@apollo/client'

const Recommend = (props) => {
    const [getUser, resultUser] =  useLazyQuery(ME)
    const [getRecommendations, resultBooks] = useLazyQuery(FIND_BOOK)
    const [books, setBooks] = useState(null)
    const [genre, setGenre] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
       getUser()
       if(resultUser.data && resultUser.data.me){
       getRecommendations({variables: {genre: resultUser.data.me.favoriteGenre}})
       setGenre(resultUser.data.me.favoriteGenre)
       if(resultBooks.data){
       setBooks(resultBooks.data.allBooks)
        }}}
        fetchData()
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [props.token, resultUser.data, resultBooks.data])

    if (!props.show) {
        return null
    }
     
    if(!props.token){
        return <div>Please log in to see the recomendations!</div>
    }
    
    if(books && genre){
        return(
            <div>
                <h1>Recommendations</h1>
                <p>Books in your favourite genre <strong>{genre}</strong></p>
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
                    {books.map(a =>
                        <tr key={a.title}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
 
    }else{
        return(<div>loading...</div>)
    }


}

export default Recommend