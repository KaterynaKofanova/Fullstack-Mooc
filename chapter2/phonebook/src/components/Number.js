import React from 'react'
const Number = ({number, handle})=>{
    return(
        <div>
            Number: <input value={number} onChange={handle}/>
        </div>
    )
}
export default Number