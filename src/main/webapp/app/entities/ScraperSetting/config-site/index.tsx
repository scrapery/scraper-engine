import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ConfigSite from './config-site';
import ConfigSiteDetail from './config-site-detail';
import ConfigSiteUpdate from './config-site-update';
import ConfigSiteDeleteDialog from './config-site-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ConfigSiteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ConfigSiteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ConfigSiteDetail} />
      <ErrorBoundaryRoute path={match.url} component={ConfigSite} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ConfigSiteDeleteDialog} />
  </>
);

export default Routes;
