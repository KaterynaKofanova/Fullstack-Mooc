import {gql} from '@apollo/client'

export const ALL_AUTHORS = gql`
    query{
        allAuthors{
            name
            born
            bookCount
            id
        }
    }
`
export const ALL_BOOKS = gql`
    query{
        allBooks{
            title
            published
            author{
                name
                born
                bookCount
                id
            }
            genres
            id
        }
    }
`
export const CREATE_BOOK = gql`
    mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String]! ){
        addBook(
            title: $title,
            published: $published,
            author: $author,
            genres: $genres
        ){
            title,
            published,
            author{
                name
                born
                bookCount
                id
            },
            genres,
            id
        }
    }
`
export const EDIT_AUTHOR = gql`
    mutation editAuthor($name: String!, $setBornTo: Int!){
        editAuthor(name:$name, setBornTo:$setBornTo){
            name,
            born,
            bookCount,
            id
        }
    }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ME = gql`
    query{
        me{
            favoriteGenre
        }
    }
`

export const FIND_BOOK = gql`
    query findBook($genre: String! ){
            allBooks(genre: $genre){
                title
                published
                author{
                    name
                    born
                    bookCount
                    id
                }
                genres
                id
            }
        }
`

export const BOOK_ADDED = gql`
        subscription{
            bookAdded{
                title
                published
                author{
                    name
                    born
                    bookCount
                    id
                }
                genres
                id
            }
        }
`