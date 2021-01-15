const filterReducer = (state = '', action) => {
    switch(action.type) {
        case 'NEW_FILTER':
          return action.filter
        default:
            return state
    }
}

export const addFilter = (filter) => {
    return {
        type:'NEW_FILTER',
        filter: filter
    }
}

export default filterReducer