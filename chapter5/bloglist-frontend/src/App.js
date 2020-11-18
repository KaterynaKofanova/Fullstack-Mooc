import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Message from './components/Message'
import blogService from './services/blogs'
import loginService from './services/login' 
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorType, setErrorType] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }

  },[])

//Handling of forms
  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage(`${user.name} logged in succesfully!`)
      setErrorType('green')
      setTimeout(() => {
        setErrorMessage(null)
        setErrorType('')
      }, 5000)
    }
    catch (exception) {
      setErrorMessage('wrong credentials')
      setErrorType('red')
      setTimeout(() => {
        setErrorMessage(null)
        setErrorType('')
      }, 5000)

    }
  }

  const handleBlogAdd = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    const newBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(newBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
    setErrorMessage(`a new blog ${newBlog.title} is added!`)
    setErrorType('green')
  }

  const handleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

//Forms
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => (
    <form onSubmit={handleBlogAdd}>
      <div>
        title:
          <input 
            type='text'
            value={title}
            name='title'
            onChange={({target}) => setTitle(target.value)} 
          />
      </div>
      <div>
        author:
          <input 
            type='text'
            value={author}
            name='author'
            onChange={({target}) => setAuthor(target.value)} 
          />
      </div>
      <div>
        url:
          <input 
            type='text'
            value={url}
            name='url'
            onChange={({target}) => setUrl(target.value)} 
          />
      </div>
      <button type="submit">add</button>
    </form>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Message text={errorMessage} type={errorType} />
      {user === null ? 
        loginForm() : 
        <div>
          <p>{user.name} logged in <button onClick={handleLogOut}>log out</button></p>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
          <p>Add a new blog:</p>
          {blogForm()}
        </div>
      }
      
    </div>
  )
}

export default App