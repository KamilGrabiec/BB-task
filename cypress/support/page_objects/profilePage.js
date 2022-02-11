export class ProfilePage {
  findArticle(title) {
    cy.get('.articles-toggle').contains('a', 'My Posts').click();
    cy.wait(300);
    cy.get('app-article-list')
      .find('h1')
      .contains(title)
      .then((article) => {
        cy.wrap(article).should('be.visible');
        cy.wrap(article).click();
      });
  }
}

export const onProfilePage = new ProfilePage();
