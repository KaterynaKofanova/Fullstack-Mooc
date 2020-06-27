import React from 'react'

const Total = ({ course}) => {
  const tot = course.parts.reduce((sum, {exercises}) => sum + exercises, 0)
  return(
    <div>
    <h4>Number of exercises {tot}</h4>
    </div>
  ) 
}

export default Total