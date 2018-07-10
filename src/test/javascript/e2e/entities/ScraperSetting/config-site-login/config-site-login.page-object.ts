import { element, by, ElementFinder } from 'protractor';

export default class ConfigSiteLoginComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  title: ElementFinder = element(by.id('config-site-login-heading'));

  clickOnCreateButton() {
    return this.createButton.click();
  }

  getTitle() {
    return this.title;
  }
}
