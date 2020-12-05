/* eslint-disable no-undef */
describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
          username:'testUser1',
          password: 'password',
          name: 'testUser1'
      }
      cy.request('POST', 'http://localhost:3001/api/users', user)
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.contains('username')
      cy.contains('password')
      cy.contains('login')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
          cy.get('#usernameLogin').type('testUser1')
          cy.get('#passwordLogin').type('password')
          cy.get('#buttonLogin').click()
          cy.contains('testUser1 logged in succesfully')
        })
    
        it('fails with wrong credentials', function() {
            cy.get('#usernameLogin').type('User1')
            cy.get('#passwordLogin').type('password')
            cy.get('#buttonLogin').click()
            cy.contains('wrong credentials').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe.only('When logged in', function() {
        beforeEach(function() {
          cy.login({username:'testUser1', password:'password'})
        })
    
        it('A blog can be created', function() {
          cy.contains('Add new blog').click()
          cy.get('#title').type('title1')
          cy.get('#author').type('author1')
          cy.get('#url').type('url1')
          cy.get('#buttonAddBlog').click()
          cy.contains('title1')
        })

        it('A user can like a blog', function(){
            cy.createBlog({title:'title2', author:'author2', url:'url2'})
            cy.contains('title2').contains('view').click()
            cy.contains('likes: 0')
            cy.contains('like').click()
            cy.contains('likes: 1')
        })

        it('A user who created a blog can delete it', function(){
            cy.createBlog({title:'title3', author:'author3', url:'url3'})
            cy.contains('title3').contains('view').click()
            cy.contains('delete').click()
            cy.should('not.contain', 'title3')
        })

        it('Blogs are ordered according to likes', function(){
            cy.createBlog({title:'title1', author:'author1', url:'url1'})
            cy.createBlog({title:'title2', author:'author2', url:'url2', likes:'3'})
            cy.createBlog({title:'title3', author:'author3', url:'url3', likes:'2'})
            cy.get('.buttonView').eq(0).click()
            cy.contains('likes: 3')
            cy.contains('hide').click()
            cy.get('.buttonView').eq(2).click()
            cy.contains('likes: 0')
        })
      })

  })