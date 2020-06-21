import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      {props.course}
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      {props.part} {props.exercise}
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <p><Part part={props.part1} exercise={props.exercises1} /></p>
      <p><Part part={props.part2} exercise={props.exercises2} /></p>
      <p><Part part={props.part3} exercise={props.exercises3} /></p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <h1><Header course={course.name} /></h1>
        <Content part1={course.parts[0].name} exercises1={course.parts[0].exercises} 
        part2={course.parts[1].name} exercises2={course.parts[1].exercises} 
        part3={course.parts[2].name} exercises3={course.parts[2].exercises} />
        <Total exercises1={course.parts[0].exercises} exercises2={course.parts[1].exercises} exercises3={course.parts[2].exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))