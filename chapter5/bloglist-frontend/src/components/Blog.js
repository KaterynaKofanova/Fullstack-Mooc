import React, { useState } from 'react'
import {useParams} from 'react-router-dom'

const Blog = ({ blogs, addLike, deleteBlog, user }) => {
  const id = useParams().id
  console.log('id is', id)
  const blog = blogs.find(blog => blog.id === id)
  console.log('blogs is', blogs)
  // const [fullView, setFullView] = useState(false)
  // const [likes, setLikes] = useState(blog.likes)

  

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
    // setLikes(newLikes)
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    deleteBlog(blog.id)
  }

  if(!blog){
    return null
  }
    if(user.username === blog.user.username){
      return(
        <div>
          <h3>{blog.title} {blog.author}</h3>
          <a href={blog.url}>{blog.url}</a>
          <div>likes: {blog.likes} <button onClick={handleLikeAdd}>like</button></div>
          <div>added by {blog.user.name}</div>
          <div><button onClick={handleDelete} style={delButtonStyle} >delete</button></div>
        </div>
      )
    }else{
      return(
        <div>
          <h3>{blog.title} {blog.author}</h3>
          <a href={blog.url}>{blog.url}</a>
          <div>likes: {blog.likes} <button onClick={handleLikeAdd}>like</button></div>
          <div>added by {blog.user.name}</div>
        </div>
      )
    }
}

export default Blog
