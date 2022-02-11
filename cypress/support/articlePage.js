export class ArticlePage {
  verifyArticle(title) {
    cy.url().should('contain', `https://qa-task.backbasecloud.com/article/`);
    cy.get('.banner').find('h1').should('contain', title);
  }

  openEditPage() {
    cy.get('.article-meta').find('.btn').contains('Edit Article').click();
    cy.wait(300);
  }
}

export const onArticlePage = new ArticlePage();
