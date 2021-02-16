import React from 'react';
import {courseParts} from '../types'

const Total: React.FC<{courseParts: courseParts[]}> = ({courseParts}) => {
   return( 
       <p>
       Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
       </p>
    )
}

export default Total