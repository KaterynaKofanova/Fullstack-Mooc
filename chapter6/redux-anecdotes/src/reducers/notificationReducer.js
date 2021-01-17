
const notificationReducer = (state = '', action) => {
    switch(action.type){
        case 'SET_NOTIFICATION':
            return action.notification
        case 'REMOVE_NOTIFICATION':
            return ''
        default:
            return state
    }
}

export const addNotification = (message, seconds) => {
    return async dispatch => {
        await dispatch({
            type: 'SET_NOTIFICATION',
            notification: message
        })
        setTimeout(() => {dispatch({
            type: 'REMOVE_NOTIFICATION'
        })}, seconds*1000)
    }
}

// export const removeNotification = () => {
//     return {
//         type: 'REMOVE_NOTIFICATION'
//     }
// }

export default notificationReducer