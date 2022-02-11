export class MainPage {
  openMainPage() {
    cy.visit('/', {
      auth: {
        username: 'candidatex',
        password: 'qa-is-cool',
      },
    });
  }

  signIn(email, password) {
    cy.get('nav').find('[routerlink="/login"]').click();
    cy.get('form').find('[formcontrolname="email"]').type(email);
    cy.get('form').find('[formcontrolname="password"]').type(password);
    cy.get('form').submit();
    cy.url().should('eq', 'https://qa-task.backbasecloud.com/');
    cy.get('nav')
      .find('li')
      .eq(3)
      .find('a')
      .invoke('attr', 'routerlinkactive')
      .should('contain', 'active');
  }

  openUserPage() {
    cy.get('nav').find('li').eq(3).find('a').click();
  }

  openNewArticlePage() {
    cy.get('nav').find('.ion-compose').click();
    cy.url().should('eq', 'https://qa-task.backbasecloud.com/editor');
  }

  findArticle(title) {
    cy.get('.feed-toggle').contains('a', 'Global Feed').click();
    cy.wait(300);
    cy.get('app-article-list')
      .find('h1')
      .contains(title)
      .then((article) => {
        cy.wrap(article).should('be.visible');
        cy.wrap(article).click();
      });
  }

  selectTag(tag) {
    cy.get('.sidebar').find('.tag-list').contains(tag).click();
    cy.get('.feed-toggle')
      .find('.nav-item')
      .eq(2)
      .contains(tag)
      .should('be.visible');
  }
}

export const onMainPage = new MainPage();
