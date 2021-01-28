const messageReducer = (state = {message: '', errorType: ''}, action) => {
    switch(action.type){
        case 'SET_MESSAGE':
            return {
                message: action.message,
                errorType: action.errorType
            }
        case 'REMOVE_MESSAGE':
            return {
                message: '', 
                errorType: ''
            }
        default:
            return state
    }
}

export const addMessage = (message, errorType) => {
    return {
        type: 'SET_MESSAGE',
        message,
        errorType
    }
}

export const removeMessage = () => {
    return {
        type: 'REMOVE_MESSAGE'
    }
}

export default messageReducer