import React from 'react';
import {courseParts} from '../types'

const Content: React.FC<{courseParts: courseParts[]}> = ({courseParts}) => {
   return( 
       <div>
       {courseParts.map(c => <p key={c.name}>{c.name} {c.exerciseCount}</p> )}
       </div>
    )
}

export default Content