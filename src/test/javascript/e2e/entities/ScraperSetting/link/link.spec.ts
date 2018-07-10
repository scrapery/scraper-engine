/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import LinkComponentsPage from './link.page-object';
import LinkUpdatePage from './link-update.page-object';

const expect = chai.expect;

describe('Link e2e test', () => {
  let navBarPage: NavBarPage;
  let linkUpdatePage: LinkUpdatePage;
  let linkComponentsPage: LinkComponentsPage;

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage();
    navBarPage.autoSignIn();
  });

  it('should load Links', async () => {
    navBarPage.getEntityPage('link');
    linkComponentsPage = new LinkComponentsPage();
    expect(await linkComponentsPage.getTitle().getText()).to.match(/Links/);
  });

  it('should load create Link page', async () => {
    linkComponentsPage.clickOnCreateButton();
    linkUpdatePage = new LinkUpdatePage();
    expect(await linkUpdatePage.getPageTitle().getAttribute('id')).to.match(/scraperGatewayApp.scraperSettingLink.home.createOrEditLabel/);
  });

  it('should create and save Links', async () => {
    linkUpdatePage.setUrlInput('url');
    expect(await linkUpdatePage.getUrlInput()).to.match(/url/);
    linkUpdatePage.setScrapeDataIdInput('5');
    expect(await linkUpdatePage.getScrapeDataIdInput()).to.eq('5');
    linkUpdatePage.setScrapeIdInput('5');
    expect(await linkUpdatePage.getScrapeIdInput()).to.eq('5');
    linkUpdatePage.setCurrentLevelInput('5');
    expect(await linkUpdatePage.getCurrentLevelInput()).to.eq('5');
    linkUpdatePage.setScrapeUrlInput('scrapeUrl');
    expect(await linkUpdatePage.getScrapeUrlInput()).to.match(/scrapeUrl/);
    linkUpdatePage.setParentUrlInput('parentUrl');
    expect(await linkUpdatePage.getParentUrlInput()).to.match(/parentUrl/);
    linkUpdatePage.setScrapeResultIdInput('5');
    expect(await linkUpdatePage.getScrapeResultIdInput()).to.eq('5');
    linkUpdatePage.setScrapeResultPathInput('scrapeResultPath');
    expect(await linkUpdatePage.getScrapeResultPathInput()).to.match(/scrapeResultPath/);
    linkUpdatePage.setScrapeREsultContentTypeInput('scrapeREsultContentType');
    expect(await linkUpdatePage.getScrapeREsultContentTypeInput()).to.match(/scrapeREsultContentType/);
    linkUpdatePage.crawlStatusSelectLastOption();
    linkUpdatePage.setInternalUrlInput('internalUrl');
    expect(await linkUpdatePage.getInternalUrlInput()).to.match(/internalUrl/);
    await linkUpdatePage.save();
    expect(await linkUpdatePage.getSaveButton().isPresent()).to.be.false;
  });

  after(() => {
    navBarPage.autoSignOut();
  });
});
