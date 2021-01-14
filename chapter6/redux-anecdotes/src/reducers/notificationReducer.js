
const notificationReducer = (state = 'First Message', action) => {
    switch(action.type){
        case 'SET_NOTIFICATION':
            return action.notification
        default:
            return state
    }
}
  
export default notificationReducer