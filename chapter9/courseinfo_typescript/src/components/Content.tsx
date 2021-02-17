import React from 'react';
import {CoursePart} from '../types'
import Part from './Part'

const Content: React.FC<{courseParts: CoursePart[]}> = ({courseParts}) => {
   return( 
       <div>
       {courseParts.map(c => <Part part={c} key={c.name}/> )}
       </div>
    )
}

export default Content