/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import ConfigSiteComponentsPage from './config-site.page-object';
import ConfigSiteUpdatePage from './config-site-update.page-object';

const expect = chai.expect;

describe('ConfigSite e2e test', () => {
  let navBarPage: NavBarPage;
  let configSiteUpdatePage: ConfigSiteUpdatePage;
  let configSiteComponentsPage: ConfigSiteComponentsPage;

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage();
    navBarPage.autoSignIn();
  });

  it('should load ConfigSites', async () => {
    navBarPage.getEntityPage('config-site');
    configSiteComponentsPage = new ConfigSiteComponentsPage();
    expect(await configSiteComponentsPage.getTitle().getText()).to.match(/Config Sites/);
  });

  it('should load create ConfigSite page', async () => {
    configSiteComponentsPage.clickOnCreateButton();
    configSiteUpdatePage = new ConfigSiteUpdatePage();
    expect(await configSiteUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /scraperGatewayApp.scraperSettingConfigSite.home.createOrEditLabel/
    );
  });

  it('should create and save ConfigSites', async () => {
    configSiteUpdatePage.setUrlInput('url');
    expect(await configSiteUpdatePage.getUrlInput()).to.match(/url/);
    configSiteUpdatePage.setNameInput('name');
    expect(await configSiteUpdatePage.getNameInput()).to.match(/name/);
    configSiteUpdatePage.setHostInput('host');
    expect(await configSiteUpdatePage.getHostInput()).to.match(/host/);
    configSiteUpdatePage.setConfigNameInput('configName');
    expect(await configSiteUpdatePage.getConfigNameInput()).to.match(/configName/);
    configSiteUpdatePage.setTotalLevelInput('5');
    expect(await configSiteUpdatePage.getTotalLevelInput()).to.eq('5');
    configSiteUpdatePage.setUserIdInput('5');
    expect(await configSiteUpdatePage.getUserIdInput()).to.eq('5');
    configSiteUpdatePage.fetchEngineSelectLastOption();
    // configSiteUpdatePage.mappingSelectLastOption();
    // configSiteUpdatePage.loginActionSelectLastOption();
    await configSiteUpdatePage.save();
    expect(await configSiteUpdatePage.getSaveButton().isPresent()).to.be.false;
  });

  after(() => {
    navBarPage.autoSignOut();
  });
});
