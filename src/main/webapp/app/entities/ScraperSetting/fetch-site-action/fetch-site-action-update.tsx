import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-simlife';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './fetch-site-action.reducer';
import { IFetchSiteAction } from 'app/shared/model/ScraperSetting/fetch-site-action.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IFetchSiteActionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IFetchSiteActionUpdateState {
  isNew: boolean;
}

export class FetchSiteActionUpdate extends React.Component<IFetchSiteActionUpdateProps, IFetchSiteActionUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { fetchSiteActionEntity } = this.props;
      const entity = {
        ...fetchSiteActionEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/fetch-site-action');
  };

  render() {
    const isInvalid = false;
    const { fetchSiteActionEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="scraperGatewayApp.scraperSettingFetchSiteAction.home.createOrEditLabel">
              <Translate contentKey="scraperGatewayApp.scraperSettingFetchSiteAction.home.createOrEditLabel">
                Create or edit a FetchSiteAction
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : fetchSiteActionEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="fetch-site-action-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="urlLabel" for="url">
                    <Translate contentKey="scraperGatewayApp.scraperSettingFetchSiteAction.url">Url</Translate>
                  </Label>
                  <AvField id="fetch-site-action-url" type="text" name="url" />
                </AvGroup>
                <AvGroup>
                  <Label id="domainLabel" for="domain">
                    <Translate contentKey="scraperGatewayApp.scraperSettingFetchSiteAction.domain">Domain</Translate>
                  </Label>
                  <AvField id="fetch-site-action-domain" type="text" name="domain" />
                </AvGroup>
                <AvGroup>
                  <Label id="hostLabel" for="host">
                    <Translate contentKey="scraperGatewayApp.scraperSettingFetchSiteAction.host">Host</Translate>
                  </Label>
                  <AvField id="fetch-site-action-host" type="text" name="host" />
                </AvGroup>
                <AvGroup>
                  <Label id="activeLevelLabel" for="activeLevel">
                    <Translate contentKey="scraperGatewayApp.scraperSettingFetchSiteAction.activeLevel">Active Level</Translate>
                  </Label>
                  <AvField id="fetch-site-action-activeLevel" type="number" className="form-control" name="activeLevel" />
                </AvGroup>
                <AvGroup>
                  <Label id="selectorActionLabel" for="selectorAction">
                    <Translate contentKey="scraperGatewayApp.scraperSettingFetchSiteAction.selectorAction">Selector Action</Translate>
                  </Label>
                  <AvField id="fetch-site-action-selectorAction" type="text" name="selectorAction" />
                </AvGroup>
                <AvGroup>
                  <Label id="selectorActionAttrLabel" for="selectorActionAttr">
                    <Translate contentKey="scraperGatewayApp.scraperSettingFetchSiteAction.selectorActionAttr">
                      Selector Action Attr
                    </Translate>
                  </Label>
                  <AvField id="fetch-site-action-selectorActionAttr" type="text" name="selectorActionAttr" />
                </AvGroup>
                <AvGroup>
                  <Label id="actionLabel">
                    <Translate contentKey="scraperGatewayApp.scraperSettingFetchSiteAction.action">Action</Translate>
                  </Label>
                  <AvInput
                    id="fetch-site-action-action"
                    type="select"
                    className="form-control"
                    name="action"
                    value={(!isNew && fetchSiteActionEntity.action) || 'CLICK'}
                  >
                    <option value="CLICK">CLICK</option>
                    <option value="SCROLL">SCROLL</option>
                    <option value="LOGIN">LOGIN</option>
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="totalActionsLabel" for="totalActions">
                    <Translate contentKey="scraperGatewayApp.scraperSettingFetchSiteAction.totalActions">Total Actions</Translate>
                  </Label>
                  <AvField id="fetch-site-action-totalActions" type="number" className="form-control" name="totalActions" />
                </AvGroup>
                <AvGroup>
                  <Label id="seleniumActionGetContentLabel">
                    <Translate contentKey="scraperGatewayApp.scraperSettingFetchSiteAction.seleniumActionGetContent">
                      Selenium Action Get Content
                    </Translate>
                  </Label>
                  <AvInput
                    id="fetch-site-action-seleniumActionGetContent"
                    type="select"
                    className="form-control"
                    name="seleniumActionGetContent"
                    value={(!isNew && fetchSiteActionEntity.seleniumActionGetContent) || 'DONE_ACTION'}
                  >
                    <option value="DONE_ACTION">DONE_ACTION</option>
                    <option value="EACH_ACTION">EACH_ACTION</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="selectorNextPageUrlsNameLabel" for="selectorNextPageUrlsName">
                    <Translate contentKey="scraperGatewayApp.scraperSettingFetchSiteAction.selectorNextPageUrlsName">
                      Selector Next Page Urls Name
                    </Translate>
                  </Label>
                  <AvField id="fetch-site-action-selectorNextPageUrlsName" type="text" name="selectorNextPageUrlsName" />
                </AvGroup>
                <AvGroup>
                  <Label id="selectorNextPageUrlsNameAttrLabel" for="selectorNextPageUrlsNameAttr">
                    <Translate contentKey="scraperGatewayApp.scraperSettingFetchSiteAction.selectorNextPageUrlsNameAttr">
                      Selector Next Page Urls Name Attr
                    </Translate>
                  </Label>
                  <AvField id="fetch-site-action-selectorNextPageUrlsNameAttr" type="text" name="selectorNextPageUrlsNameAttr" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/fetch-site-action" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={isInvalid || updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  fetchSiteActionEntity: storeState.fetchSiteAction.entity,
  loading: storeState.fetchSiteAction.loading,
  updating: storeState.fetchSiteAction.updating
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FetchSiteActionUpdate);
