import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({courses}) => {
   
    const coursesContent = courses.map(course => <div key={course.id}><Header course={course} />
        <Content course={course} />
        <Total course={course} /></div>)

    return (
        <div>
        {coursesContent}
        </div>
    )
}
export default Course