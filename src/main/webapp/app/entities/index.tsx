import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Channel from './ScraperSetting/channel';
import ConfigGroup from './ScraperSetting/config-group';
import ConfigMapping from './ScraperSetting/config-mapping';
import ChannelOuterLink from './ScraperSetting/channel-outer-link';
import ConfigSite from './ScraperSetting/config-site';
import ConfigSiteLogin from './ScraperSetting/config-site-login';
import FetchSiteAction from './ScraperSetting/fetch-site-action';
import Link from './ScraperSetting/link';
import SiteChannel from './ScraperSetting/site-channel';
import TryParser from './ScraperSetting/try-parser';
/* simlife-needle-add-route-import - Simlife will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/channel`} component={Channel} />
      <ErrorBoundaryRoute path={`${match.url}/config-group`} component={ConfigGroup} />
      <ErrorBoundaryRoute path={`${match.url}/config-mapping`} component={ConfigMapping} />
      <ErrorBoundaryRoute path={`${match.url}/channel-outer-link`} component={ChannelOuterLink} />
      <ErrorBoundaryRoute path={`${match.url}/config-site`} component={ConfigSite} />
      <ErrorBoundaryRoute path={`${match.url}/config-site-login`} component={ConfigSiteLogin} />
      <ErrorBoundaryRoute path={`${match.url}/fetch-site-action`} component={FetchSiteAction} />
      <ErrorBoundaryRoute path={`${match.url}/link`} component={Link} />
      <ErrorBoundaryRoute path={`${match.url}/site-channel`} component={SiteChannel} />
      <ErrorBoundaryRoute path={`${match.url}/try-parser`} component={TryParser} />
      {/* simlife-needle-add-route-path - Simlife will routes here */}
    </Switch>
  </div>
);

export default Routes;
