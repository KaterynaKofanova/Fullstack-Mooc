import React, { useState } from 'react'

const Blog = ({ blog, addLike, deleteBlog, user }) => {
  const [fullView, setFullView] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

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
    setLikes(newLikes)
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    deleteBlog(blog.id)
  }

  if (fullView){
    if(user.username === blog.user.username){
      return(
        <div style={blogStyle}>
          <div>{blog.title} {blog.author} <button onClick={() => setFullView(false)}>hide</button></div>
          <div>{blog.url}</div>
          <div>likes: {likes} <button onClick={handleLikeAdd}>like</button></div>
          <div>{blog.user.name}</div>
          <div><button onClick={handleDelete} style={delButtonStyle} >delete</button></div>
        </div>
      )
    }else{
      return(
        <div style={blogStyle}>
          <div>{blog.title} {blog.author} <button onClick={() => setFullView(false)}>hide</button></div>
          <div>{blog.url}</div>
          <div>likes: {likes} <button onClick={handleLikeAdd}>like</button></div>
          <div>{blog.user.name}</div>
        </div>
      )
    }
  }else{
    return(
      <div style={blogStyle}>
        {blog.title} {blog.author} <button className='buttonView' onClick={() => setFullView(true)}>view</button>
      </div>)
  }
}

export default Blog
