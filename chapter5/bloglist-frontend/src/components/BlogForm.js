import React, {useState, useImperativeHandle} from 'react'


const BlogForm = ({addBlog}) => {
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
    
    if(blogFormVisible){
    return(
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
      <div><button type="submit">add</button></div>
      <div><button onClick={() => setBlogFormVisible(false)}>cancel</button></div>
    </form>
    )} else {
        return(
            <button onClick={() => setBlogFormVisible(true)}>Add new blog</button>
        )
    }
}

export default BlogForm