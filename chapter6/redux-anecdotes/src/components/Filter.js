import React from 'react'
import {addFilter} from '../reducers/filterReducer'
import {connect} from 'react-redux'

const Filter = (props) => {
    const handleChange = (event) => {
        const filter =  event.target.value
        props.addFilter(filter)
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
const connectedFilter = connect(null, {addFilter})(Filter)
export default connectedFilter