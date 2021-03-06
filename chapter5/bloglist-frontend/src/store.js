import { createStore, combineReducers, applyMiddleware } from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import messageReducer from './reducers/messageReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import usersListReducer from './reducers/usersListReducer'

const reducer = combineReducers({
    message: messageReducer,
    blogs: blogReducer,
    user: userReducer,
    usersList: usersListReducer
})
const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store