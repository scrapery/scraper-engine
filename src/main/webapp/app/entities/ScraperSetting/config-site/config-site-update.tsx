import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-simlife';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IConfigMapping } from 'app/shared/model/ScraperSetting/config-mapping.model';
import { getEntities as getConfigMappings } from 'app/entities/ScraperSetting/config-mapping/config-mapping.reducer';
import { IConfigSiteLogin } from 'app/shared/model/ScraperSetting/config-site-login.model';
import { getEntities as getConfigSiteLogins } from 'app/entities/ScraperSetting/config-site-login/config-site-login.reducer';
import { getEntity, updateEntity, createEntity, reset } from './config-site.reducer';
import { IConfigSite } from 'app/shared/model/ScraperSetting/config-site.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IConfigSiteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IConfigSiteUpdateState {
  isNew: boolean;
  idsmapping: any[];
  idsloginAction: any[];
}

export class ConfigSiteUpdate extends React.Component<IConfigSiteUpdateProps, IConfigSiteUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsmapping: [],
      idsloginAction: [],
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getConfigMappings();
    this.props.getConfigSiteLogins();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { configSiteEntity } = this.props;
      const entity = {
        ...configSiteEntity,
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
    this.props.history.push('/entity/config-site');
  };

  mappingUpdate = element => {
    const selected = Array.from(element.target.selectedOptions).map((e: any) => e.value);
    this.setState({
      idsmapping: keysToValues(selected, this.props.configMappings, 'name')
    });
  };

  loginActionUpdate = element => {
    const selected = Array.from(element.target.selectedOptions).map((e: any) => e.value);
    this.setState({
      idsloginAction: keysToValues(selected, this.props.configSiteLogins, 'name')
    });
  };

  displaymapping(value: any) {
    if (this.state.idsmapping && this.state.idsmapping.length !== 0) {
      const list = [];
      for (const i in this.state.idsmapping) {
        if (this.state.idsmapping[i]) {
          list.push(this.state.idsmapping[i].name);
        }
      }
      return list;
    }
    if (value.mappings && value.mappings.length !== 0) {
      const list = [];
      for (const i in value.mappings) {
        if (value.mappings[i]) {
          list.push(value.mappings[i].name);
        }
      }
      this.setState({
        idsmapping: keysToValues(list, this.props.configMappings, 'name')
      });
      return list;
    }
    return null;
  }

  displayloginAction(value: any) {
    if (this.state.idsloginAction && this.state.idsloginAction.length !== 0) {
      const list = [];
      for (const i in this.state.idsloginAction) {
        if (this.state.idsloginAction[i]) {
          list.push(this.state.idsloginAction[i].name);
        }
      }
      return list;
    }
    if (value.loginActions && value.loginActions.length !== 0) {
      const list = [];
      for (const i in value.loginActions) {
        if (value.loginActions[i]) {
          list.push(value.loginActions[i].name);
        }
      }
      this.setState({
        idsloginAction: keysToValues(list, this.props.configSiteLogins, 'name')
      });
      return list;
    }
    return null;
  }

  render() {
    const isInvalid = false;
    const { configSiteEntity, configMappings, configSiteLogins, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="scraperGatewayApp.scraperSettingConfigSite.home.createOrEditLabel">
              <Translate contentKey="scraperGatewayApp.scraperSettingConfigSite.home.createOrEditLabel">
                Create or edit a ConfigSite
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : configSiteEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="config-site-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="urlLabel" for="url">
                    <Translate contentKey="scraperGatewayApp.scraperSettingConfigSite.url">Url</Translate>
                  </Label>
                  <AvField id="config-site-url" type="text" name="url" />
                </AvGroup>
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="scraperGatewayApp.scraperSettingConfigSite.name">Name</Translate>
                  </Label>
                  <AvField id="config-site-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="hostLabel" for="host">
                    <Translate contentKey="scraperGatewayApp.scraperSettingConfigSite.host">Host</Translate>
                  </Label>
                  <AvField id="config-site-host" type="text" name="host" />
                </AvGroup>
                <AvGroup>
                  <Label id="configNameLabel" for="configName">
                    <Translate contentKey="scraperGatewayApp.scraperSettingConfigSite.configName">Config Name</Translate>
                  </Label>
                  <AvField id="config-site-configName" type="text" name="configName" />
                </AvGroup>
                <AvGroup>
                  <Label id="totalLevelLabel" for="totalLevel">
                    <Translate contentKey="scraperGatewayApp.scraperSettingConfigSite.totalLevel">Total Level</Translate>
                  </Label>
                  <AvField id="config-site-totalLevel" type="number" className="form-control" name="totalLevel" />
                </AvGroup>
                <AvGroup>
                  <Label id="userIdLabel" for="userId">
                    <Translate contentKey="scraperGatewayApp.scraperSettingConfigSite.userId">User Id</Translate>
                  </Label>
                  <AvField id="config-site-userId" type="number" className="form-control" name="userId" />
                </AvGroup>
                <AvGroup>
                  <Label id="fetchEngineLabel">
                    <Translate contentKey="scraperGatewayApp.scraperSettingConfigSite.fetchEngine">Fetch Engine</Translate>
                  </Label>
                  <AvInput
                    id="config-site-fetchEngine"
                    type="select"
                    className="form-control"
                    name="fetchEngine"
                    value={(!isNew && configSiteEntity.fetchEngine) || 'SELENIUM'}
                  >
                    <option value="SELENIUM">SELENIUM</option>
                    <option value="HTTP">HTTP</option>
                    <option value="RSS">RSS</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="configMappings">
                    <Translate contentKey="scraperGatewayApp.scraperSettingConfigSite.mapping">Mapping</Translate>
                  </Label>
                  <AvInput
                    id="config-site-mapping"
                    type="select"
                    multiple
                    className="form-control"
                    name="fakeconfigMappings"
                    value={this.displaymapping(configSiteEntity)}
                    onChange={this.mappingUpdate}
                  >
                    <option value="" key="0" />
                    {configMappings
                      ? configMappings.map(otherEntity => (
                          <option value={otherEntity.name} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvInput id="config-site-mapping" type="hidden" name="mappings" value={this.state.idsmapping} />
                </AvGroup>
                <AvGroup>
                  <Label for="configSiteLogins">
                    <Translate contentKey="scraperGatewayApp.scraperSettingConfigSite.loginAction">Login Action</Translate>
                  </Label>
                  <AvInput
                    id="config-site-loginAction"
                    type="select"
                    multiple
                    className="form-control"
                    name="fakeconfigSiteLogins"
                    value={this.displayloginAction(configSiteEntity)}
                    onChange={this.loginActionUpdate}
                  >
                    <option value="" key="0" />
                    {configSiteLogins
                      ? configSiteLogins.map(otherEntity => (
                          <option value={otherEntity.domain} key={otherEntity.id}>
                            {otherEntity.domain}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvInput id="config-site-loginAction" type="hidden" name="loginActions" value={this.state.idsloginAction} />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/config-site" replace color="info">
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
  configMappings: storeState.configMapping.entities,
  configSiteLogins: storeState.configSiteLogin.entities,
  configSiteEntity: storeState.configSite.entity,
  loading: storeState.configSite.loading,
  updating: storeState.configSite.updating
});

const mapDispatchToProps = {
  getConfigMappings,
  getConfigSiteLogins,
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
)(ConfigSiteUpdate);
