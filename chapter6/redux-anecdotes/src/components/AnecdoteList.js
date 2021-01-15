import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {vote} from '../reducers/anecdoteReducer'
import {addNotification, removeNotification} from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes.sort((a,b) => b.votes - a.votes).filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase())))
    const dispatch = useDispatch()

    const handleVote = (anecdote) => {
        dispatch(vote(anecdote.id))
        const message = `You voted for '${anecdote.content}'`
        dispatch(addNotification(message))
        setTimeout(()=>{dispatch(removeNotification())}, 5000)
    }
 
    return(
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes} 
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList