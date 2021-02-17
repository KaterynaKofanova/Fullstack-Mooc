import React from 'react';
import {CoursePart} from '../types';


const Part: React.FC<{part:CoursePart}> = ({part}) => {
    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };
    switch(part.name){
        case "Fundamentals":
            return(
                <div>
                    {part.name} {part.exerciseCount} 
                    {part.description}
                </div>
            )
        case "Deeper type usage":
            return(
                <div>
                    {part.name} {part.exerciseCount} 
                    {part.description} 
                    {part.exerciseSubmissionLink}
                </div>
            )
        case "Using props to pass data":
            return(
                <div>
                    {part.name} 
                    {part.exerciseCount} 
                    {part.groupProjectCount}
                </div>
            )
        case "React components with TypeScript":
            return(
                <div>
                    {part.name} {part.exerciseCount} 
                    {part.description}
                </div>
            )
        default: 
            return assertNever(part);
    }
}

export default Part