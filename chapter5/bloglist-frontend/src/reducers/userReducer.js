const userReducer = (state = null, action) => {
    switch(action.type){
        case 'SAVE_USER':
            return action.data
        case 'LOGOUT':
            return null
        default: return state
    }
}

export const saveUser = (user) => {
    return {
        type: 'SAVE_USER',
        data: user
    }

}

export const logout = () => {
    return {
        type: 'LOGOUT'
    }
}

export default userReducer