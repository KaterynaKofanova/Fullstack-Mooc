import React from 'react'
import {useParams} from 'react-router-dom'

const UserInfo = ({users}) => {
    const id = useParams().id
    const user = users.filter(user => user.id === id)[0]

    if(!user){
        return null
    }
    return(
        <div>
            <h2>{user.name}</h2>
            <h4>Added blogs:</h4>
            <ul>
            {user.blogs.map(blog =>
                <li key={blog.id}>{blog.title}</li>
            )}
            </ul>
        </div>
    )
}

export default UserInfo