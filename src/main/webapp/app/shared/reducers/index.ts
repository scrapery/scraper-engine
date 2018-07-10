import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import channel, {
  ChannelState
} from 'app/entities/ScraperSetting/channel/channel.reducer';
// prettier-ignore
import configGroup, {
  ConfigGroupState
} from 'app/entities/ScraperSetting/config-group/config-group.reducer';
// prettier-ignore
import configMapping, {
  ConfigMappingState
} from 'app/entities/ScraperSetting/config-mapping/config-mapping.reducer';
// prettier-ignore
import channelOuterLink, {
  ChannelOuterLinkState
} from 'app/entities/ScraperSetting/channel-outer-link/channel-outer-link.reducer';
// prettier-ignore
import configSite, {
  ConfigSiteState
} from 'app/entities/ScraperSetting/config-site/config-site.reducer';
// prettier-ignore
import configSiteLogin, {
  ConfigSiteLoginState
} from 'app/entities/ScraperSetting/config-site-login/config-site-login.reducer';
// prettier-ignore
import fetchSiteAction, {
  FetchSiteActionState
} from 'app/entities/ScraperSetting/fetch-site-action/fetch-site-action.reducer';
// prettier-ignore
import link, {
  LinkState
} from 'app/entities/ScraperSetting/link/link.reducer';
// prettier-ignore
import siteChannel, {
  SiteChannelState
} from 'app/entities/ScraperSetting/site-channel/site-channel.reducer';
// prettier-ignore
import tryParser, {
  TryParserState
} from 'app/entities/ScraperSetting/try-parser/try-parser.reducer';
/* simlife-needle-add-reducer-import - Simlife will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly channel: ChannelState;
  readonly configGroup: ConfigGroupState;
  readonly configMapping: ConfigMappingState;
  readonly channelOuterLink: ChannelOuterLinkState;
  readonly configSite: ConfigSiteState;
  readonly configSiteLogin: ConfigSiteLoginState;
  readonly fetchSiteAction: FetchSiteActionState;
  readonly link: LinkState;
  readonly siteChannel: SiteChannelState;
  readonly tryParser: TryParserState;
  /* simlife-needle-add-reducer-type - Simlife will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  channel,
  configGroup,
  configMapping,
  channelOuterLink,
  configSite,
  configSiteLogin,
  fetchSiteAction,
  link,
  siteChannel,
  tryParser,
  /* simlife-needle-add-reducer-combine - Simlife will add reducer here */
  loadingBar
});

export default rootReducer;
