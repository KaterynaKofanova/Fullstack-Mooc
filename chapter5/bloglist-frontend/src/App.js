import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {addMessage, removeMessage} from './reducers/messageReducer'
import {initializeBlogs, addNewBlog, like, removeBlog} from './reducers/blogReducer'
import {saveUser, logout} from './reducers/userReducer'
import {initUsersList} from './reducers/usersListReducer'

import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"

import Blog from './components/Blog'
import Message from './components/Message'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'
import BlogForm from './components/BlogForm'
import UsersList from './components/UsersList'
import UserInfo from './components/UserInfo'

const App = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const errorMessage = useSelector(state => state.message)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initUsersList())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes))
  const usersList = useSelector(state => state.usersList)
  console.log('blogs is', blogs)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(saveUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])
  const user = useSelector(state => state.user)

  //Handling of forms
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(saveUser(user))
      setUsername('')
      setPassword('')
      dispatch(addMessage(`${user.name} logged in succesfully!`,'green'))
      setTimeout(() => {
        dispatch(removeMessage())
      }, 5000)
    } catch (exception) {
      dispatch(addMessage('wrong credentials', 'red'))
      setTimeout(() => {
        dispatch(removeMessage())
      }, 5000)
    }
  }

  const handleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    dispatch(logout())
  }

  const addBlog = async (blogObject) => {
    dispatch(addNewBlog(blogObject))
    dispatch(addMessage(`a new blog ${blogObject.title} is added!`, 'green'))
    setTimeout(() => {
      dispatch(removeMessage())
    }, 5000)
  }

  const addLike = async (id, blogObject) => {
    dispatch(like(id, blogObject))
  }

  const deleteBlog = async (id) => {
    dispatch(removeBlog(id))
  }

  //Forms
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="usernameLogin"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="passwordLogin"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="buttonLogin" type="submit">login</button>
    </form>
  )

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <Router>
    <div className='container'>
    <h2>blogs</h2>
          <Message text={errorMessage.message} type={errorMessage.errorType} />
          {user === null ?
            loginForm() :
            <div>
              <p>
                {user.name} logged in <button onClick={handleLogOut}>log out</button>
              </p>
            </div>
          }
      <Switch>
        <Route path='/users/:id'>
          <UserInfo users={usersList}/>
        </Route>
        <Route path='/users'>
          <UsersList users={usersList}/>
        </Route>
        <Route path='/blogs/:id'>
          <Blog
            blogs={blogs}
            addLike={addLike}
            user={user}
            deleteBlog={deleteBlog}
          />
        </Route>
        <Route path='/'>
            <ul style={blogStyle}>
              {blogs.map((blog) => (
                <li key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
                </li>
              ))}
              <p>Add a new blog:</p>
              {<BlogForm addBlog={addBlog} />}
            </ul>
        </Route>
      </Switch>
    </div>
    </Router>
  )
}

export default App
