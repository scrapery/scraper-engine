import { element, by, ElementFinder } from 'protractor';

export default class ConfigSiteComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  title: ElementFinder = element(by.id('config-site-heading'));

  clickOnCreateButton() {
    return this.createButton.click();
  }

  getTitle() {
    return this.title;
  }
}
