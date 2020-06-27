import React from 'react'

const Content = ({ course}) => {
   const parts = course.parts.map(part => <p key= {part.id} > {part.name} {part.exercises} </p>)
   return (
       <div>
           {parts}
       </div>
   )
}
export default Content 