describe('Form', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      url: 'http://localhost:3001/api/v1/urls'
    },
    {
      statusCode: 201,
      body: {urls: [
        {
          id: 1,
          long_url: "https://www.google.com/",
          short_url: "http://localhost:3001/useshorturl/1",
          title: 'testOne'
        },
        {
          id: 2,
          long_url: "https://www.google.com/",
          short_url: "http://localhost:3001/useshorturl/2",
          title: 'testTwo'
        }
      ]}
    })
    cy.visit('http://localhost:3000');
  })

  it('Should see form with input for title and url', () => {
    cy.get('form').children().first().should('have.class', 'title-input')
      .next().should('have.class', 'url-input')
  })

  it('Form inputs should reflect what user types', () => {
    cy.get('form').find('input[name="title"]')
      .type("Test Title")
      .should('have.value', 'Test Title')
    cy.get('form').find('input[name="urlToShorten"]')
      .type("https://www.google.com/")
      .should('have.value', 'https://www.google.com/')
  })

});

describe('Form Submission', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  })

  it('Should be able to see new url rendered on submit', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      body: {
        id: 3,
        long_url: "https://www.google.com/",
        short_url: "http://localhost:3001/useshorturl/3",
        title: 'testPOST'
      }
    })
    cy.intercept({
      method: 'GET',
      url: 'http://localhost:3001/api/v1/urls'
    },
    {
      statusCode: 201,
      body: {urls: [
        {
          id: 1,
          long_url: "https://www.google.com/",
          short_url: "http://localhost:3001/useshorturl/1",
          title: 'testOne'
        },
        {
          id: 2,
          long_url: "https://www.google.com/",
          short_url: "http://localhost:3001/useshorturl/2",
          title: 'testTwo'
        },
        {
          id: 3,
          long_url: "https://www.google.com/",
          short_url: "http://localhost:3001/useshorturl/3",
          title: 'testPOST'
        }
      ]}
    })
    cy.get('form').find('.title-input').type('test')
    cy.get('form').find('.url-input').type('https://www.google.com/')
    cy.get('form').find('.submit-button').click().wait(2000)
    cy.get('.url-container')
      .children().last()
        .children().first()
        .should('have.text', 'testPOST')
  })
});
