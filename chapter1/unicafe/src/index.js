import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)
const Statistic = ({text, value}) => {
  if (text==="Positive"){
    return(
      <tr><td>{text}</td><td>{value} %</td></tr>
    )
  }
  return(
    <tr><td>{text}</td><td>{value}</td></tr>
  )
}
  
const Statistics = ({good, neutral, bad}) => {
  let total = good+neutral+bad
  let avg=(good+bad*(-1))/total
  let posit=good*100/total
  if (total=== 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return(
      <table>
      <Statistic text="Good" value={good}/>
      <Statistic text="Neutral" value={neutral}/>
      <Statistic text="Bad" value={bad}/>
      <Statistic text="All" value={total}/>
      <Statistic text="Average score" value={avg.toFixed(2)}/>
      <Statistic text="Positive" value={posit.toFixed(2)} />
      </table>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <div>
      <h1>Give feedback here</h1>
      <Button onClick={()=> setGood(good + 1)} text='Good' />
      <Button onClick={()=> setNeutral(neutral + 1)} text='Neutral' />
      <Button onClick={()=> setBad(bad + 1)} text='Bad' />
      <h2>Statistics</h2>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)