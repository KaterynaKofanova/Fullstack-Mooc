import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {addMessage, removeMessage} from './reducers/messageReducer'
import {initializeBlogs, addNewBlog, like, removeBlog, commentBlog} from './reducers/blogReducer'
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

import {Navbar, Nav, Button } from 'react-bootstrap'

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

  const addComment = async(id, comment) => {
    dispatch(commentBlog(id, comment))
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
      <Button variant="dark" id="buttonLogin" type="submit">login</Button>
    </form>
  )

  return (
    <Router>
    <div className='container'>
      <Navbar bg="dark" variant="dark" expand="lg" sticky='top'>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav style={{fontWeight:"bold"}}>
            <Nav.Link href='/' style={{ textAlign: "center" }}>Blogs</Nav.Link>
            <Nav.Link href='/users'>Users</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
          {user ? <Navbar.Text style={{fontWeight:"bold", color:"white"}}>
                {user.name} logged in <Button onClick={handleLogOut} variant="light">log out</Button>
                </Navbar.Text> : <Navbar.Text></Navbar.Text> }

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    <h1>Blog App</h1>
          <Message text={errorMessage.message} type={errorMessage.errorType} />
          {user === null ? loginForm() : null}
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
            addComment={addComment}
          />
        </Route>
        <Route path='/'>
            <h2>Blogs:</h2>
            <ul>
              {blogs.map((blog) => (
                <li key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
                </li>
              ))}
            </ul>
            <p>Add a new blog:</p>
            {<BlogForm addBlog={addBlog} />}
        </Route>
      </Switch>
    </div>
    </Router>
  )
}

export default App
