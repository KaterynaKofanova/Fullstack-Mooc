import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {Button} from 'react-bootstrap'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  const handleBlogAdd = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    addBlog(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')
    setBlogFormVisible(false)
  }

  if (blogFormVisible) {
    return (
      <form onSubmit={handleBlogAdd}>
        <div>
          title:
          <input
            id='title'
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id='author'
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id='url'
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          <Button variant="dark" id='buttonAddBlog' type="submit">add</Button>
        </div>
        <div>
          <Button variant="secondary" onClick={() => setBlogFormVisible(false)}>cancel</Button>
        </div>
      </form>
    )
  } else {
    return (
      <Button variant="dark" onClick={() => setBlogFormVisible(true)}>Add new blog</Button>
    )
  }
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
}

export default BlogForm
