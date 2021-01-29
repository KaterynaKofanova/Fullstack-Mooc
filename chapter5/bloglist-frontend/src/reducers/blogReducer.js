import blogService from '../services/blogs'

const blogReducer = (state=[], action) => {
    switch(action.type){
        case 'NEW_BLOG' :
            return [...state, action.data]
        case 'LIKE_BLOG':
            return state.map(a => a.id !== action.id ? a : action.data)
        case 'COMMENT_BLOG':
            return state.map(a => a.id !== action.id ? a : action.data)
        case 'DELETE_BLOG':
            return state.filter(a => a.id !== action.id)
        case 'INIT_BLOGS':
            return action.data
        default:
            return state
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type:'INIT_BLOGS',
            data: blogs
        })
    }
}

export const addNewBlog = (blog) => {
    return async dispatch => {
        const newBlog = await blogService.create(blog)
        dispatch({
            type: 'NEW_BLOG',
            data: newBlog
        })
    }
}

export const like = (id, blog) => {
    return async dispatch => {
        const updatedBlog = await blogService.change(id, blog)
        dispatch({
            type: 'LIKE_BLOG',
            data: updatedBlog,
            id
        })
    }
}

export const removeBlog = (id) => {
    return async dispatch => {
        await blogService.del(id)
        dispatch({
            type: 'DELETE_BLOG',
            id
        })
    }
}

export const commentBlog = (id, comment) => {
    return async dispatch => {
        const updatedBlog = await blogService.addComment(id, comment)
        dispatch({
            type: 'COMMENT_BLOG',
            data: updatedBlog,
            id
        })
    }
}


export default blogReducer