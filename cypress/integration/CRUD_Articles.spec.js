/// <reference types="cypress" />

import { onArticlePage } from '../support/articlePage';
import { onEditorPage } from '../support/page_objects/editorPage';
import { onMainPage } from '../support/page_objects/mainPage';
import { onProfilePage } from '../support/page_objects/profilePage';

describe('TC 1: Create an article', () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('Create a new article', () => {
    onMainPage.openMainPage();
    onMainPage.signIn('kamilgrabiec@interia.pl', 'TestPassword123'); // This hardcoded values should be moved to variables
    onMainPage.openNewArticlePage();
    onEditorPage.fillNewArticle('title', 'b', 'c', 'd'); // This hardcoded values should be moved to variables
    onArticlePage.verifyArticle('title');
  });
});

describe('TC 2: Artcile published on Global feed', () => {
  it('Verify article visible under global feed by unlogged user', () => {
    onMainPage.openMainPage();
    onMainPage.findArticle('title');
  });
});

describe('TC 3: Article visible under my posts', () => {
  it('Verify article visible under my post section', () => {
    onMainPage.openMainPage();
    onMainPage.signIn('kamilgrabiec@interia.pl', 'TestPassword123'); // This hardcoded values should be moved to variables
    onMainPage.openUserPage();
    onProfilePage.findArticle('title');
    onArticlePage.verifyArticle('title');
  });
});

describe('TC 4: Edit own article', () => {
  it('Navigate to existing user article and edit it.', () => {
    onMainPage.openMainPage();
    onMainPage.signIn('kamilgrabiec@interia.pl', 'TestPassword123'); // This hardcoded values should be moved to variables
    onMainPage.openUserPage();
    onProfilePage.findArticle('title');
    onArticlePage.verifyArticle('title');
    onArticlePage.openEditPage();
    onEditorPage.fillNewArticle('title - edit', 'b-edit', 'c-edit', 'd-edit');
    onArticlePage.verifyArticle('title');
  });

  it('Find article by Tag', () => {
    onMainPage.openMainPage();
    onMainPage.signIn('kamilgrabiec@interia.pl', 'TestPassword123'); // This hardcoded values should be moved to variables
    onMainPage.selectTag('d-edit');
  });
});
