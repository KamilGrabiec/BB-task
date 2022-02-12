/// <reference types="cypress" />

import { onArticlePage } from '../support/page_objects/articlePage';
import { onEditorPage } from '../support/page_objects/editorPage';
import { onMainPage } from '../support/page_objects/mainPage';
import { onProfilePage } from '../support/page_objects/profilePage';

// Next step to do for this test suite could be moving hardcoded values to variables and create file with variables under fixtures
// I have doubts creating this test suite, tests are depending on each other which is not good practice.
// I'm satisfied how I implemented page object pattern. With this approach, test could be scalable to big number and still keep nice structure. Code can be re-usable. This is an aspect on which I focus most.
// TC 5 is failing, I found dificulties when working with article tags. Automated test is done and if functionality would work as I expect, then test will work properly.

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
    onEditorPage.fillNewArticle(
      'title',
      'description',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'tag'
    );
    // Because tag is not a major functionality of article, I am not veirfying it under verifyArticle function. Instead, I created test case 5 which is dedicated to tag check.
    onArticlePage.verifyArticle(
      'title',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    );
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
    onArticlePage.verifyArticle(
      'title',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    );
  });
});

describe('TC 4: Edit own article', () => {
  it('Navigate to existing user article and edit it.', () => {
    onMainPage.openMainPage();
    onMainPage.signIn('kamilgrabiec@interia.pl', 'TestPassword123'); // This hardcoded values should be moved to variables
    onMainPage.openUserPage();
    onProfilePage.findArticle('title');
    onArticlePage.verifyArticle(
      'title',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    );
    onArticlePage.openEditPage();
    onEditorPage.fillNewArticle(
      'title-edit',
      'description-edit',
      'body-edit',
      'tag-edit'
    );
    onArticlePage.verifyArticle('title-edit', 'body-edit');
  });
});

// Test Case 5 is failing because I was unable to create article with
describe('TC 5: Find article by tag', () => {
  it('On main page, select a tag and verify if new tab is visible', () => {
    onMainPage.openMainPage();
    onMainPage.signIn('kamilgrabiec@interia.pl', 'TestPassword123'); // This hardcoded values should be moved to variables
    onMainPage.selectTag('tag-edit');
  });
});
