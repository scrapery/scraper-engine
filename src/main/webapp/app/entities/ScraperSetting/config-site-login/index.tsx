import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ConfigSiteLogin from './config-site-login';
import ConfigSiteLoginDetail from './config-site-login-detail';
import ConfigSiteLoginUpdate from './config-site-login-update';
import ConfigSiteLoginDeleteDialog from './config-site-login-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ConfigSiteLoginUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ConfigSiteLoginUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ConfigSiteLoginDetail} />
      <ErrorBoundaryRoute path={match.url} component={ConfigSiteLogin} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ConfigSiteLoginDeleteDialog} />
  </>
);

export default Routes;
