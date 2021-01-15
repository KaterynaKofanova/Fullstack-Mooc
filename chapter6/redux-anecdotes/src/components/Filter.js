import React from 'react'
import {addFilter} from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
    const dipatch = useDispatch()
    const handleChange = (event) => {
        const filter =  event.target.value
        dipatch(addFilter(filter))
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
        filter <input onChange={handleChange} />
        </div>
    )
}

export default Filter