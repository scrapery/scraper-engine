/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import FetchSiteActionComponentsPage from './fetch-site-action.page-object';
import FetchSiteActionUpdatePage from './fetch-site-action-update.page-object';

const expect = chai.expect;

describe('FetchSiteAction e2e test', () => {
  let navBarPage: NavBarPage;
  let fetchSiteActionUpdatePage: FetchSiteActionUpdatePage;
  let fetchSiteActionComponentsPage: FetchSiteActionComponentsPage;

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage();
    navBarPage.autoSignIn();
  });

  it('should load FetchSiteActions', async () => {
    navBarPage.getEntityPage('fetch-site-action');
    fetchSiteActionComponentsPage = new FetchSiteActionComponentsPage();
    expect(await fetchSiteActionComponentsPage.getTitle().getText()).to.match(/Fetch Site Actions/);
  });

  it('should load create FetchSiteAction page', async () => {
    fetchSiteActionComponentsPage.clickOnCreateButton();
    fetchSiteActionUpdatePage = new FetchSiteActionUpdatePage();
    expect(await fetchSiteActionUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /scraperGatewayApp.scraperSettingFetchSiteAction.home.createOrEditLabel/
    );
  });

  it('should create and save FetchSiteActions', async () => {
    fetchSiteActionUpdatePage.setUrlInput('url');
    expect(await fetchSiteActionUpdatePage.getUrlInput()).to.match(/url/);
    fetchSiteActionUpdatePage.setDomainInput('domain');
    expect(await fetchSiteActionUpdatePage.getDomainInput()).to.match(/domain/);
    fetchSiteActionUpdatePage.setHostInput('host');
    expect(await fetchSiteActionUpdatePage.getHostInput()).to.match(/host/);
    fetchSiteActionUpdatePage.setActiveLevelInput('5');
    expect(await fetchSiteActionUpdatePage.getActiveLevelInput()).to.eq('5');
    fetchSiteActionUpdatePage.setSelectorActionInput('selectorAction');
    expect(await fetchSiteActionUpdatePage.getSelectorActionInput()).to.match(/selectorAction/);
    fetchSiteActionUpdatePage.setSelectorActionAttrInput('selectorActionAttr');
    expect(await fetchSiteActionUpdatePage.getSelectorActionAttrInput()).to.match(/selectorActionAttr/);
    fetchSiteActionUpdatePage.actionSelectLastOption();
    fetchSiteActionUpdatePage.setTotalActionsInput('5');
    expect(await fetchSiteActionUpdatePage.getTotalActionsInput()).to.eq('5');
    fetchSiteActionUpdatePage.seleniumActionGetContentSelectLastOption();
    fetchSiteActionUpdatePage.setSelectorNextPageUrlsNameInput('selectorNextPageUrlsName');
    expect(await fetchSiteActionUpdatePage.getSelectorNextPageUrlsNameInput()).to.match(/selectorNextPageUrlsName/);
    fetchSiteActionUpdatePage.setSelectorNextPageUrlsNameAttrInput('selectorNextPageUrlsNameAttr');
    expect(await fetchSiteActionUpdatePage.getSelectorNextPageUrlsNameAttrInput()).to.match(/selectorNextPageUrlsNameAttr/);
    await fetchSiteActionUpdatePage.save();
    expect(await fetchSiteActionUpdatePage.getSaveButton().isPresent()).to.be.false;
  });

  after(() => {
    navBarPage.autoSignOut();
  });
});
