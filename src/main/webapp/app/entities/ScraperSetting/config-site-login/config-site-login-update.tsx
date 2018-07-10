import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-simlife';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './config-site-login.reducer';
import { IConfigSiteLogin } from 'app/shared/model/ScraperSetting/config-site-login.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IConfigSiteLoginUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IConfigSiteLoginUpdateState {
  isNew: boolean;
}

export class ConfigSiteLoginUpdate extends React.Component<IConfigSiteLoginUpdateProps, IConfigSiteLoginUpdateState> {
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
      const { configSiteLoginEntity } = this.props;
      const entity = {
        ...configSiteLoginEntity,
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
    this.props.history.push('/entity/config-site-login');
  };

  render() {
    const isInvalid = false;
    const { configSiteLoginEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="scraperGatewayApp.scraperSettingConfigSiteLogin.home.createOrEditLabel">
              <Translate contentKey="scraperGatewayApp.scraperSettingConfigSiteLogin.home.createOrEditLabel">
                Create or edit a ConfigSiteLogin
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : configSiteLoginEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="config-site-login-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="urlLabel" for="url">
                    <Translate contentKey="scraperGatewayApp.scraperSettingConfigSiteLogin.url">Url</Translate>
                  </Label>
                  <AvField id="config-site-login-url" type="text" name="url" />
                </AvGroup>
                <AvGroup>
                  <Label id="domainLabel" for="domain">
                    <Translate contentKey="scraperGatewayApp.scraperSettingConfigSiteLogin.domain">Domain</Translate>
                  </Label>
                  <AvField id="config-site-login-domain" type="text" name="domain" />
                </AvGroup>
                <AvGroup>
                  <Label id="hostLabel" for="host">
                    <Translate contentKey="scraperGatewayApp.scraperSettingConfigSiteLogin.host">Host</Translate>
                  </Label>
                  <AvField id="config-site-login-host" type="text" name="host" />
                </AvGroup>
                <AvGroup>
                  <Label id="selectorActionLabel" for="selectorAction">
                    <Translate contentKey="scraperGatewayApp.scraperSettingConfigSiteLogin.selectorAction">Selector Action</Translate>
                  </Label>
                  <AvField id="config-site-login-selectorAction" type="text" name="selectorAction" />
                </AvGroup>
                <AvGroup>
                  <Label id="selectorUsernameLabel" for="selectorUsername">
                    <Translate contentKey="scraperGatewayApp.scraperSettingConfigSiteLogin.selectorUsername">Selector Username</Translate>
                  </Label>
                  <AvField id="config-site-login-selectorUsername" type="text" name="selectorUsername" />
                </AvGroup>
                <AvGroup>
                  <Label id="selectorPasswordLabel" for="selectorPassword">
                    <Translate contentKey="scraperGatewayApp.scraperSettingConfigSiteLogin.selectorPassword">Selector Password</Translate>
                  </Label>
                  <AvField id="config-site-login-selectorPassword" type="text" name="selectorPassword" />
                </AvGroup>
                <AvGroup>
                  <Label id="selectorButtonLoginLabel" for="selectorButtonLogin">
                    <Translate contentKey="scraperGatewayApp.scraperSettingConfigSiteLogin.selectorButtonLogin">
                      Selector Button Login
                    </Translate>
                  </Label>
                  <AvField id="config-site-login-selectorButtonLogin" type="text" name="selectorButtonLogin" />
                </AvGroup>
                <AvGroup>
                  <Label id="usernameLabel" for="username">
                    <Translate contentKey="scraperGatewayApp.scraperSettingConfigSiteLogin.username">Username</Translate>
                  </Label>
                  <AvField id="config-site-login-username" type="text" name="username" />
                </AvGroup>
                <AvGroup>
                  <Label id="passwordLabel" for="password">
                    <Translate contentKey="scraperGatewayApp.scraperSettingConfigSiteLogin.password">Password</Translate>
                  </Label>
                  <AvField id="config-site-login-password" type="text" name="password" />
                </AvGroup>
                <AvGroup>
                  <Label id="redirectUrlLabel" for="redirectUrl">
                    <Translate contentKey="scraperGatewayApp.scraperSettingConfigSiteLogin.redirectUrl">Redirect Url</Translate>
                  </Label>
                  <AvField id="config-site-login-redirectUrl" type="text" name="redirectUrl" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/config-site-login" replace color="info">
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
  configSiteLoginEntity: storeState.configSiteLogin.entity,
  loading: storeState.configSiteLogin.loading,
  updating: storeState.configSiteLogin.updating
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
)(ConfigSiteLoginUpdate);
