import React, { useState } from 'react'
import {useParams} from 'react-router-dom'
import {Button} from 'react-bootstrap'

const Blog = ({ blogs, addLike, deleteBlog, user, addComment }) => {
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)
  const [comment, setComment] = useState('')

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
          <div>Likes: {blog.likes} <Button variant="success" onClick={handleLikeAdd}>like</Button></div>
          <div>Added by {blog.user.name}</div>
          {user && user.username === blog.user.username ? <div><Button onClick={handleDelete} variant="danger">delete</Button></div> : null}
          <h3>Comments:</h3>
          <form onSubmit={handleCommentAdd}>
            <input id='comment' onChange={({ target }) => setComment(target.value)}/>
            <Button variant="dark" type='submit'>add comment</Button>
          </form>
          <ul>
            {blog.comments.map(c => <li key={c}>{c}</li>)}
          </ul>
        </div>
      )
}

export default Blog
