describe('Submission', () => {
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
    cy.visit('http://localhost:3000').wait(1000);
  })


  it('Should be able to see cards for each url', () => {
    cy.get('.url-container')
      .children().first()
        .children().first()
        .should('have.text', 'testOne')
        .next().should('have.text', 'http://localhost:3001/useshorturl/1')
    cy.get('.url-container')
      .children().last()
        .children().first()
        .should('have.text', 'testTwo')
        .next().should('have.text', 'http://localhost:3001/useshorturl/2')
  })
});
