describe('Submission', () => {
  beforeEach(() => {
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

  it('Should be able to see new url rendered on submit', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      body: {
        id: 1,
        long_url: "https://www.google.com/",
        short_url: "http://localhost:3001/useshorturl/1",
        title: 'test'
      }
    })
    cy.get('form').find('.title-input').type('test')
    cy.get('form').find('.url-input').type('https://www.google.com/')
    cy.get('form').find('.submit-button').click().wait('2000')
    cy.get('url-container').children().last().should('have.class', 'test')
    cy.get('url-container')
      .children().last()
        .children().first()
        .should('have.text', 'test')
  })
});
