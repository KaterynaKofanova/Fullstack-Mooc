import usersService from '../services/users'

const usersListReducer = (state=[], action) => {
    switch(action.type){
        case 'INIT_USERS_LIST':
            return action.data
        default:
            return state
    }
}

export const initUsersList = () => {
    return async dispatch => {
        const users = await usersService.getAll()
        dispatch({
            type:'INIT_USERS_LIST',
            data: users
        })
    }
}

export default usersListReducer