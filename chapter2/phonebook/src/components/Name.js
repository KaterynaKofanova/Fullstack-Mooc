import React from 'react'
const Name = ({name,handle})=> {
    return(
        <div>
            Name: <input value = {name} onChange={handle}/>
        </div>
    )
}
export default Name