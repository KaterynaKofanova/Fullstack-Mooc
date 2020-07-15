import React from 'react'

const Filter = ({word,handle}) => {
    return(
        <div>
        Search for country:<input value={word} onChange={handle}/>
        </div>
    )
}

export default Filter