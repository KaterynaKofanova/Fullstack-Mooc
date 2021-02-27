const { ApolloServer, gql, UserInputError } = require('apollo-server')
require('dotenv').config()
const uuid = require('uuid')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const MONGODB_URI = process.env.MONGODB_URI
const SECRET = process.env.SECRET

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

// let authors = [
//   {
//     name: 'Robert Martin',
//     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1952,
//   },
//   {
//     name: 'Martin Fowler',
//     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1963
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821
//   },
//   { 
//     name: 'Joshua Kerievsky', // birthyear not known
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//   },
//   { 
//     name: 'Sandi Metz', // birthyear not known
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//   },
// ]

// let books = [
//   {
//     title: 'Clean Code',
//     published: 2008,
//     author: 'Robert Martin',
//     id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Agile software development',
//     published: 2002,
//     author: 'Robert Martin',
//     id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//     genres: ['agile', 'patterns', 'design']
//   },
//   {
//     title: 'Refactoring, edition 2',
//     published: 2018,
//     author: 'Martin Fowler',
//     id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Refactoring to patterns',
//     published: 2008,
//     author: 'Joshua Kerievsky',
//     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'patterns']
//   },  
//   {
//     title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//     published: 2012,
//     author: 'Sandi Metz',
//     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'design']
//   },
//   {
//     title: 'Crime and punishment',
//     published: 1866,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'crime']
//   },
//   {
//     title: 'The Demon ',
//     published: 1872,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'revolution']
//   },
// ]

const typeDefs = gql`
  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
      me: User
  }
  type Author {
      name: String!
      id: ID!
      born: Int,
      bookCount: Int!
  }
  type Book {
      title: String!
      published: Int!
      author: Author!
      genres: [String!]!
      id: ID!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Mutation{
      addBook(
        title: String!,
        published: Int!,
        author: String!
        genres: [String]!
      ): Book!
      editAuthor(
        name: String!
        setBornTo: Int!
      ): Author
      createUser(
        username: String!
        favoriteGenre: String!
      ): User
      login(
          username: String!
          password: String!
      ): Token
  }
  type Subscription{
    bookAdded: Book!
  }
    
`
const {PubSub} = require ('apollo-server')
const pubsub = new PubSub()

const resolvers = {
  Author: {
    bookCount: (root) => {
      return root.books.length
    }
  },
  Query: {
      bookCount: () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      allBooks: async (root, args) => { 
          if(!args.author && !args.genre){
            return Book.find({}).populate('author')
          }
          if(!args.author && args.genre){
            return Book.find({genres: {$in: args.genre}}).populate('author')
          }
          if(args.author && !args.genre){
            const author = await Author.findOne({name: args.author})
            return Book.find({author: author ? author._id: null}).populate('author')
          }
          if(args.author && args.genre){
            const author = await Author.findOne({name: args.author})
            return Book.find({author: author ? author._id: null, genres: {$in: args.genre}}).populate('author')
          }
        },
      allAuthors: () => Author.find({}).populate('books'),
      me: (root, args, context) => {
        return context.currentUser
      }
  },
  Mutation: {
      addBook:async (root, args, context) => {

          if(!context.currentUser){
            throw new AuthenticationError("Not authenticated")
          }

          let author = await Author.findOne({name: args.author})
          if(!author){
            author = new Author({name: args.author})
              try{
                author = await author.save()
              }catch(error){
                throw new UserInputError(error.message,{
                  invalidArgs: args,
                })
              }
          }
          const book = new Book({
            title: args.title,
            published: args.published,
            author: author._id,
            genres: args.genres,
          })
          try{
            const addedBook = await book.save()
            author.books = author.books ? author.books.concat(addedBook._id) : [addedBook._id]
            await author.save()
          }catch(error){
            throw new UserInputError(error.message,{
              invalidArgs: args,
            })
          }
          const savedBook = await book.populate('author').execPopulate()
          pubsub.publish('BOOK_ADDED', {bookAdded: savedBook})
          return savedBook
      },
      editAuthor: async (root, args, context) => {

        if(!context.currentUser){
          throw new AuthenticationError("Not authenticated")
        }

        const author = await Author.findOne({name: args.name})
        if(author){
          author.born =  args.setBornTo
          try{
            await author.save()
          }catch(error){
            throw new UserInputError(error.message,{
              invalidArgs: args,
            })
          }
        }
        return author
      },
      createUser: (root, args) => {
        const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
        return user.save()
          .catch(error => {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
    
        if ( !user || args.password !== 'password' ) {
          throw new UserInputError("wrong credentials")
        }
    
        const userForToken = {
          username: user.username,
          id: user._id,
        }
    
        return { value: jwt.sign(userForToken, SECRET) }
      }, 
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)

      return { currentUser }
    }
  }  
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})