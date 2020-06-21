import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)


const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(props.anecdotes.map(()=> 0))
  console.log("votes is", votes)
  const copy =[...votes]
  console.log('copy is', copy)

  const voting = ()=> {
    copy[selected]+=1 
    setVotes(copy)
  }

  const indexOfMaxVotes = votes.indexOf(Math.max(...votes));
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button onClick={()=> setSelected(Math.floor(Math.random() * 6))} text='Next anecdote' />
      <Button onClick={voting} text="Vote" />
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[indexOfMaxVotes]}</p>
      <p>has {votes[indexOfMaxVotes]} votes</p>
    </div>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)