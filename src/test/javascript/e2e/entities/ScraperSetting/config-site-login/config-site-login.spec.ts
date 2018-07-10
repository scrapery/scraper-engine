/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import ConfigSiteLoginComponentsPage from './config-site-login.page-object';
import ConfigSiteLoginUpdatePage from './config-site-login-update.page-object';

const expect = chai.expect;

describe('ConfigSiteLogin e2e test', () => {
  let navBarPage: NavBarPage;
  let configSiteLoginUpdatePage: ConfigSiteLoginUpdatePage;
  let configSiteLoginComponentsPage: ConfigSiteLoginComponentsPage;

  before(() => {
    browser.get('/');
    navBarPage = new NavBarPage();
    navBarPage.autoSignIn();
  });

  it('should load ConfigSiteLogins', async () => {
    navBarPage.getEntityPage('config-site-login');
    configSiteLoginComponentsPage = new ConfigSiteLoginComponentsPage();
    expect(await configSiteLoginComponentsPage.getTitle().getText()).to.match(/Config Site Logins/);
  });

  it('should load create ConfigSiteLogin page', async () => {
    configSiteLoginComponentsPage.clickOnCreateButton();
    configSiteLoginUpdatePage = new ConfigSiteLoginUpdatePage();
    expect(await configSiteLoginUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /scraperGatewayApp.scraperSettingConfigSiteLogin.home.createOrEditLabel/
    );
  });

  it('should create and save ConfigSiteLogins', async () => {
    configSiteLoginUpdatePage.setUrlInput('url');
    expect(await configSiteLoginUpdatePage.getUrlInput()).to.match(/url/);
    configSiteLoginUpdatePage.setDomainInput('domain');
    expect(await configSiteLoginUpdatePage.getDomainInput()).to.match(/domain/);
    configSiteLoginUpdatePage.setHostInput('host');
    expect(await configSiteLoginUpdatePage.getHostInput()).to.match(/host/);
    configSiteLoginUpdatePage.setSelectorActionInput('selectorAction');
    expect(await configSiteLoginUpdatePage.getSelectorActionInput()).to.match(/selectorAction/);
    configSiteLoginUpdatePage.setSelectorUsernameInput('selectorUsername');
    expect(await configSiteLoginUpdatePage.getSelectorUsernameInput()).to.match(/selectorUsername/);
    configSiteLoginUpdatePage.setSelectorPasswordInput('selectorPassword');
    expect(await configSiteLoginUpdatePage.getSelectorPasswordInput()).to.match(/selectorPassword/);
    configSiteLoginUpdatePage.setSelectorButtonLoginInput('selectorButtonLogin');
    expect(await configSiteLoginUpdatePage.getSelectorButtonLoginInput()).to.match(/selectorButtonLogin/);
    configSiteLoginUpdatePage.setUsernameInput('username');
    expect(await configSiteLoginUpdatePage.getUsernameInput()).to.match(/username/);
    configSiteLoginUpdatePage.setPasswordInput('password');
    expect(await configSiteLoginUpdatePage.getPasswordInput()).to.match(/password/);
    configSiteLoginUpdatePage.setRedirectUrlInput('redirectUrl');
    expect(await configSiteLoginUpdatePage.getRedirectUrlInput()).to.match(/redirectUrl/);
    await configSiteLoginUpdatePage.save();
    expect(await configSiteLoginUpdatePage.getSaveButton().isPresent()).to.be.false;
  });

  after(() => {
    navBarPage.autoSignOut();
  });
});
