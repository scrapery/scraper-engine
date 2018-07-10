import { element, by, ElementFinder } from 'protractor';

export default class ConfigSiteUpdatePage {
  pageTitle: ElementFinder = element(by.id('scraperGatewayApp.scraperSettingConfigSite.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  urlInput: ElementFinder = element(by.css('input#config-site-url'));
  nameInput: ElementFinder = element(by.css('input#config-site-name'));
  hostInput: ElementFinder = element(by.css('input#config-site-host'));
  configNameInput: ElementFinder = element(by.css('input#config-site-configName'));
  totalLevelInput: ElementFinder = element(by.css('input#config-site-totalLevel'));
  userIdInput: ElementFinder = element(by.css('input#config-site-userId'));
  fetchEngineSelect: ElementFinder = element(by.css('select#config-site-fetchEngine'));
  mappingSelect: ElementFinder = element(by.css('select#config-site-mapping'));
  loginActionSelect: ElementFinder = element(by.css('select#config-site-loginAction'));

  getPageTitle() {
    return this.pageTitle;
  }

  setUrlInput(url) {
    this.urlInput.sendKeys(url);
  }

  getUrlInput() {
    return this.urlInput.getAttribute('value');
  }

  setNameInput(name) {
    this.nameInput.sendKeys(name);
  }

  getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  setHostInput(host) {
    this.hostInput.sendKeys(host);
  }

  getHostInput() {
    return this.hostInput.getAttribute('value');
  }

  setConfigNameInput(configName) {
    this.configNameInput.sendKeys(configName);
  }

  getConfigNameInput() {
    return this.configNameInput.getAttribute('value');
  }

  setTotalLevelInput(totalLevel) {
    this.totalLevelInput.sendKeys(totalLevel);
  }

  getTotalLevelInput() {
    return this.totalLevelInput.getAttribute('value');
  }

  setUserIdInput(userId) {
    this.userIdInput.sendKeys(userId);
  }

  getUserIdInput() {
    return this.userIdInput.getAttribute('value');
  }

  setFetchEngineSelect(fetchEngine) {
    this.fetchEngineSelect.sendKeys(fetchEngine);
  }

  getFetchEngineSelect() {
    return this.fetchEngineSelect.element(by.css('option:checked')).getText();
  }

  fetchEngineSelectLastOption() {
    this.fetchEngineSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  mappingSelectLastOption() {
    this.mappingSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  mappingSelectOption(option) {
    this.mappingSelect.sendKeys(option);
  }

  getMappingSelect() {
    return this.mappingSelect;
  }

  getMappingSelectedOption() {
    return this.mappingSelect.element(by.css('option:checked')).getText();
  }

  loginActionSelectLastOption() {
    this.loginActionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  loginActionSelectOption(option) {
    this.loginActionSelect.sendKeys(option);
  }

  getLoginActionSelect() {
    return this.loginActionSelect;
  }

  getLoginActionSelectedOption() {
    return this.loginActionSelect.element(by.css('option:checked')).getText();
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
