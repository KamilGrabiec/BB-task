export class EditorPage {
  fillNewArticle(title, description, body, tag) {
    cy.get('form').then((form) => {
      cy.wrap(form).find('[formcontrolname="title"]').clear().type(title);
      cy.wrap(form)
        .find('[formcontrolname="description"]')
        .clear()
        .type(description); // I don't see description to be used anywhere, should that be removed?
      cy.wrap(form).find('[formcontrolname="body"]').clear().type(body);
      cy.wrap(form).find('[placeholder="Enter tags"]').clear().type(tag);
      cy.wrap(form).find('button').click();
      cy.get('.banner').find('h1').should('contain', title);
      cy.get('[class="row article-content"]').find('p').should('contain', body);
    });
  }
}

export const onEditorPage = new EditorPage();
