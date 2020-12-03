import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('form calls the event handler with the right details when a new blog is created', () => {
  const addBlog = jest.fn()
  const component = render(
    <BlogForm addBlog = {addBlog} />
  )
  const button = component.getByText('Add new blog')
  fireEvent.click(button)

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(author, {
    target: { value:'authorTest' }
  })
  fireEvent.change(title, {
    target: { value:'titleTest' }
  })
  fireEvent.change(url, {
    target: { value:'urlTest' }
  })

  fireEvent.submit(form)

  expect(addBlog.mock.calls[0][0].author).toBe('authorTest')
  expect(addBlog.mock.calls[0][0].title).toBe('titleTest')
  expect(addBlog.mock.calls[0][0].url).toBe('urlTest')
})