import { element, by, ElementFinder } from 'protractor';

export default class FetchSiteActionUpdatePage {
  pageTitle: ElementFinder = element(by.id('scraperGatewayApp.scraperSettingFetchSiteAction.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  urlInput: ElementFinder = element(by.css('input#fetch-site-action-url'));
  domainInput: ElementFinder = element(by.css('input#fetch-site-action-domain'));
  hostInput: ElementFinder = element(by.css('input#fetch-site-action-host'));
  activeLevelInput: ElementFinder = element(by.css('input#fetch-site-action-activeLevel'));
  selectorActionInput: ElementFinder = element(by.css('input#fetch-site-action-selectorAction'));
  selectorActionAttrInput: ElementFinder = element(by.css('input#fetch-site-action-selectorActionAttr'));
  actionSelect: ElementFinder = element(by.css('select#fetch-site-action-action'));
  totalActionsInput: ElementFinder = element(by.css('input#fetch-site-action-totalActions'));
  seleniumActionGetContentSelect: ElementFinder = element(by.css('select#fetch-site-action-seleniumActionGetContent'));
  selectorNextPageUrlsNameInput: ElementFinder = element(by.css('input#fetch-site-action-selectorNextPageUrlsName'));
  selectorNextPageUrlsNameAttrInput: ElementFinder = element(by.css('input#fetch-site-action-selectorNextPageUrlsNameAttr'));

  getPageTitle() {
    return this.pageTitle;
  }

  setUrlInput(url) {
    this.urlInput.sendKeys(url);
  }

  getUrlInput() {
    return this.urlInput.getAttribute('value');
  }

  setDomainInput(domain) {
    this.domainInput.sendKeys(domain);
  }

  getDomainInput() {
    return this.domainInput.getAttribute('value');
  }

  setHostInput(host) {
    this.hostInput.sendKeys(host);
  }

  getHostInput() {
    return this.hostInput.getAttribute('value');
  }

  setActiveLevelInput(activeLevel) {
    this.activeLevelInput.sendKeys(activeLevel);
  }

  getActiveLevelInput() {
    return this.activeLevelInput.getAttribute('value');
  }

  setSelectorActionInput(selectorAction) {
    this.selectorActionInput.sendKeys(selectorAction);
  }

  getSelectorActionInput() {
    return this.selectorActionInput.getAttribute('value');
  }

  setSelectorActionAttrInput(selectorActionAttr) {
    this.selectorActionAttrInput.sendKeys(selectorActionAttr);
  }

  getSelectorActionAttrInput() {
    return this.selectorActionAttrInput.getAttribute('value');
  }

  setActionSelect(action) {
    this.actionSelect.sendKeys(action);
  }

  getActionSelect() {
    return this.actionSelect.element(by.css('option:checked')).getText();
  }

  actionSelectLastOption() {
    this.actionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  setTotalActionsInput(totalActions) {
    this.totalActionsInput.sendKeys(totalActions);
  }

  getTotalActionsInput() {
    return this.totalActionsInput.getAttribute('value');
  }

  setSeleniumActionGetContentSelect(seleniumActionGetContent) {
    this.seleniumActionGetContentSelect.sendKeys(seleniumActionGetContent);
  }

  getSeleniumActionGetContentSelect() {
    return this.seleniumActionGetContentSelect.element(by.css('option:checked')).getText();
  }

  seleniumActionGetContentSelectLastOption() {
    this.seleniumActionGetContentSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  setSelectorNextPageUrlsNameInput(selectorNextPageUrlsName) {
    this.selectorNextPageUrlsNameInput.sendKeys(selectorNextPageUrlsName);
  }

  getSelectorNextPageUrlsNameInput() {
    return this.selectorNextPageUrlsNameInput.getAttribute('value');
  }

  setSelectorNextPageUrlsNameAttrInput(selectorNextPageUrlsNameAttr) {
    this.selectorNextPageUrlsNameAttrInput.sendKeys(selectorNextPageUrlsNameAttr);
  }

  getSelectorNextPageUrlsNameAttrInput() {
    return this.selectorNextPageUrlsNameAttrInput.getAttribute('value');
  }

  save() {
    return this.saveButton.click();
  }

  cancel() {
    this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
