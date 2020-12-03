import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('Blog renders the title and author, but does not render its url or number of likes by default', () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: '1',
  }
  const component = render(
    <Blog blog = {blog}/>
  )

  expect(component.container).toHaveTextContent('title')
  expect(component.container).toHaveTextContent('author')
  expect(component.container).not.toHaveTextContent('url')
  expect(component.container).not.toHaveTextContent('1')

})

test('url and likes are shown when the button controlling the shown details has been clicked', () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: '1',
    user: {
      username:'User1'
    }
  }
  const user = {
    username:'User1'
  }
  const component = render(
    <Blog blog = {blog} user = {user}/>
  )
  const button = component.getByText('view')
  fireEvent.click(button)
  expect(component.container).toHaveTextContent('title')
  expect(component.container).toHaveTextContent('author')
  expect(component.container).toHaveTextContent('url')
  expect(component.container).toHaveTextContent('1')

})

test('clicking like button twice calls event handler twice', () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: '1',
    user: {
      username:'User1'
    }
  }
  const user = {
    username:'User1'
  }
  const mockHandler = jest.fn()
  const component = render(
    <Blog blog = {blog} user = {user} addLike = {mockHandler}/>
  )
  const buttonView = component.getByText('view')
  fireEvent.click(buttonView)
  const buttonLike = component.getByText('like')
  fireEvent.click(buttonLike)
  fireEvent.click(buttonLike)

  expect(mockHandler.mock.calls).toHaveLength(2)
})