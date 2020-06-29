import React from 'react'
const Search = ({word, handle})=>{
    return(
        <div>
        Search for contact: <input value={word} onChange={handle} />
        </div>
    )
}
export default Search