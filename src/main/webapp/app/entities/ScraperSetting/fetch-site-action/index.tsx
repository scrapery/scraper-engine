import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FetchSiteAction from './fetch-site-action';
import FetchSiteActionDetail from './fetch-site-action-detail';
import FetchSiteActionUpdate from './fetch-site-action-update';
import FetchSiteActionDeleteDialog from './fetch-site-action-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FetchSiteActionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FetchSiteActionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FetchSiteActionDetail} />
      <ErrorBoundaryRoute path={match.url} component={FetchSiteAction} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={FetchSiteActionDeleteDialog} />
  </>
);

export default Routes;
