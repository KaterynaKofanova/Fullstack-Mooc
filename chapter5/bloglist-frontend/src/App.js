import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Message from './components/Message'
import blogService from './services/blogs'
import loginService from './services/login' 
import './App.css'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorType, setErrorType] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes ))

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

  const handleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    const newBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(newBlog))
    setErrorMessage(`a new blog ${newBlog.title} is added!`)
    setErrorType('green')
    setTimeout(() => {
      setErrorMessage(null)
      setErrorType('')
    }, 5000)
  }

  const addLike = async(id, blogObject) => {
    const changedBlog = await blogService.change(id, blogObject)
    setBlogs(blogs.map(blog => blog.id!== changedBlog.id ? blog : changedBlog))
  }

  const deleteBlog = async(id) => {
    await blogService.del(id)
    setBlogs(blogs.filter(blog => blog.id!== id))
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

  

  return (
    <div>
      <h2>blogs</h2>
      <Message text={errorMessage} type={errorType} />
      {user === null ? 
        loginForm() : 
        <div>
          <p>{user.name} logged in <button onClick={handleLogOut}>log out</button></p>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} addLike={addLike} user={user} deleteBlog={deleteBlog}/>
          )}
          <p>Add a new blog:</p>
          {<BlogForm addBlog={addBlog} />}
        </div>
      }
      
    </div>
  )
}

export default App