import React from 'react'
import {connect} from 'react-redux'
import {vote} from '../reducers/anecdoteReducer'
import {addNotification} from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const anecdotes = props.anecdotes.sort((a,b) => b.votes - a.votes).filter(a => a.content.toLowerCase().includes(props.filter.toLowerCase()))

    const handleVote = (anecdote) => {
        props.vote(anecdote)
        const message = `You voted for '${anecdote.content}'`
        props.addNotification(message, 5)
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

const mapStateToProps = (state) => {
    return {
    anecdotes : state.anecdotes,
    filter : state.filter
    }
}

const mapDispatchToProps = {
    addNotification,
    vote
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList