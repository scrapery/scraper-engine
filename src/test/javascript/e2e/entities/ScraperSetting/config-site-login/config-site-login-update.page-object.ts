import { element, by, ElementFinder } from 'protractor';

export default class ConfigSiteLoginUpdatePage {
  pageTitle: ElementFinder = element(by.id('scraperGatewayApp.scraperSettingConfigSiteLogin.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  urlInput: ElementFinder = element(by.css('input#config-site-login-url'));
  domainInput: ElementFinder = element(by.css('input#config-site-login-domain'));
  hostInput: ElementFinder = element(by.css('input#config-site-login-host'));
  selectorActionInput: ElementFinder = element(by.css('input#config-site-login-selectorAction'));
  selectorUsernameInput: ElementFinder = element(by.css('input#config-site-login-selectorUsername'));
  selectorPasswordInput: ElementFinder = element(by.css('input#config-site-login-selectorPassword'));
  selectorButtonLoginInput: ElementFinder = element(by.css('input#config-site-login-selectorButtonLogin'));
  usernameInput: ElementFinder = element(by.css('input#config-site-login-username'));
  passwordInput: ElementFinder = element(by.css('input#config-site-login-password'));
  redirectUrlInput: ElementFinder = element(by.css('input#config-site-login-redirectUrl'));

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

  setSelectorActionInput(selectorAction) {
    this.selectorActionInput.sendKeys(selectorAction);
  }

  getSelectorActionInput() {
    return this.selectorActionInput.getAttribute('value');
  }

  setSelectorUsernameInput(selectorUsername) {
    this.selectorUsernameInput.sendKeys(selectorUsername);
  }

  getSelectorUsernameInput() {
    return this.selectorUsernameInput.getAttribute('value');
  }

  setSelectorPasswordInput(selectorPassword) {
    this.selectorPasswordInput.sendKeys(selectorPassword);
  }

  getSelectorPasswordInput() {
    return this.selectorPasswordInput.getAttribute('value');
  }

  setSelectorButtonLoginInput(selectorButtonLogin) {
    this.selectorButtonLoginInput.sendKeys(selectorButtonLogin);
  }

  getSelectorButtonLoginInput() {
    return this.selectorButtonLoginInput.getAttribute('value');
  }

  setUsernameInput(username) {
    this.usernameInput.sendKeys(username);
  }

  getUsernameInput() {
    return this.usernameInput.getAttribute('value');
  }

  setPasswordInput(password) {
    this.passwordInput.sendKeys(password);
  }

  getPasswordInput() {
    return this.passwordInput.getAttribute('value');
  }

  setRedirectUrlInput(redirectUrl) {
    this.redirectUrlInput.sendKeys(redirectUrl);
  }

  getRedirectUrlInput() {
    return this.redirectUrlInput.getAttribute('value');
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
