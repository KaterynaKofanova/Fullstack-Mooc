import React, { useState } from 'react'
import {useParams} from 'react-router-dom'

const Blog = ({ blogs, addLike, deleteBlog, user, addComment }) => {
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)
  const [comment, setComment] = useState('')

  const delButtonStyle = {
    background: 'lightblue'
  }

  const handleLikeAdd = async (event) => {
    event.preventDefault()
    const newLikes = blog.likes + 1
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: newLikes,
      user: blog.user.id
    }
    addLike(blog.id, blogObject)
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    deleteBlog(blog.id)
  }

  const handleCommentAdd = async(event) => {
    event.preventDefault()
    addComment(blog.id, comment)
    setComment('')
  }

  if(!blog){
    return null
  }
      return(
        <div>
          <h3>{blog.title} {blog.author}</h3>
          <a href={blog.url}>{blog.url}</a>
          <div>likes: {blog.likes} <button onClick={handleLikeAdd}>like</button></div>
          <div>added by {blog.user.name}</div>
          {user.username === blog.user.username ? <div><button onClick={handleDelete} style={delButtonStyle} >delete</button></div> : null}
          <h3>comments:</h3>
          <form onSubmit={handleCommentAdd}>
            <input id='comment' onChange={({ target }) => setComment(target.value)}/>
            <button type='submit'>add comment</button>
          </form>
          <ul>
            {blog.comments.map(c => <li key={c}>{c}</li>)}
          </ul>
        </div>
      )
}

export default Blog
