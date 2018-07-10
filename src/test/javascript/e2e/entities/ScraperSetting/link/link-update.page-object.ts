import { element, by, ElementFinder } from 'protractor';

export default class LinkUpdatePage {
  pageTitle: ElementFinder = element(by.id('scraperGatewayApp.scraperSettingLink.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  urlInput: ElementFinder = element(by.css('input#link-url'));
  scrapeDataIdInput: ElementFinder = element(by.css('input#link-scrapeDataId'));
  scrapeIdInput: ElementFinder = element(by.css('input#link-scrapeId'));
  currentLevelInput: ElementFinder = element(by.css('input#link-currentLevel'));
  scrapeUrlInput: ElementFinder = element(by.css('input#link-scrapeUrl'));
  parentUrlInput: ElementFinder = element(by.css('input#link-parentUrl'));
  scrapeResultIdInput: ElementFinder = element(by.css('input#link-scrapeResultId'));
  scrapeResultPathInput: ElementFinder = element(by.css('input#link-scrapeResultPath'));
  scrapeREsultContentTypeInput: ElementFinder = element(by.css('input#link-scrapeREsultContentType'));
  crawlStatusSelect: ElementFinder = element(by.css('select#link-crawlStatus'));
  internalUrlInput: ElementFinder = element(by.css('input#link-internalUrl'));

  getPageTitle() {
    return this.pageTitle;
  }

  setUrlInput(url) {
    this.urlInput.sendKeys(url);
  }

  getUrlInput() {
    return this.urlInput.getAttribute('value');
  }

  setScrapeDataIdInput(scrapeDataId) {
    this.scrapeDataIdInput.sendKeys(scrapeDataId);
  }

  getScrapeDataIdInput() {
    return this.scrapeDataIdInput.getAttribute('value');
  }

  setScrapeIdInput(scrapeId) {
    this.scrapeIdInput.sendKeys(scrapeId);
  }

  getScrapeIdInput() {
    return this.scrapeIdInput.getAttribute('value');
  }

  setCurrentLevelInput(currentLevel) {
    this.currentLevelInput.sendKeys(currentLevel);
  }

  getCurrentLevelInput() {
    return this.currentLevelInput.getAttribute('value');
  }

  setScrapeUrlInput(scrapeUrl) {
    this.scrapeUrlInput.sendKeys(scrapeUrl);
  }

  getScrapeUrlInput() {
    return this.scrapeUrlInput.getAttribute('value');
  }

  setParentUrlInput(parentUrl) {
    this.parentUrlInput.sendKeys(parentUrl);
  }

  getParentUrlInput() {
    return this.parentUrlInput.getAttribute('value');
  }

  setScrapeResultIdInput(scrapeResultId) {
    this.scrapeResultIdInput.sendKeys(scrapeResultId);
  }

  getScrapeResultIdInput() {
    return this.scrapeResultIdInput.getAttribute('value');
  }

  setScrapeResultPathInput(scrapeResultPath) {
    this.scrapeResultPathInput.sendKeys(scrapeResultPath);
  }

  getScrapeResultPathInput() {
    return this.scrapeResultPathInput.getAttribute('value');
  }

  setScrapeREsultContentTypeInput(scrapeREsultContentType) {
    this.scrapeREsultContentTypeInput.sendKeys(scrapeREsultContentType);
  }

  getScrapeREsultContentTypeInput() {
    return this.scrapeREsultContentTypeInput.getAttribute('value');
  }

  setCrawlStatusSelect(crawlStatus) {
    this.crawlStatusSelect.sendKeys(crawlStatus);
  }

  getCrawlStatusSelect() {
    return this.crawlStatusSelect.element(by.css('option:checked')).getText();
  }

  crawlStatusSelectLastOption() {
    this.crawlStatusSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  setInternalUrlInput(internalUrl) {
    this.internalUrlInput.sendKeys(internalUrl);
  }

  getInternalUrlInput() {
    return this.internalUrlInput.getAttribute('value');
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
