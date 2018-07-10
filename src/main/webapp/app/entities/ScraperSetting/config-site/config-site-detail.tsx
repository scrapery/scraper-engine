import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-simlife';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './config-site.reducer';
import { IConfigSite } from 'app/shared/model/ScraperSetting/config-site.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IConfigSiteDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class ConfigSiteDetail extends React.Component<IConfigSiteDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { configSiteEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="scraperGatewayApp.scraperSettingConfigSite.detail.title">ConfigSite</Translate> [<b>
              {configSiteEntity.id}
            </b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="url">
                <Translate contentKey="scraperGatewayApp.scraperSettingConfigSite.url">Url</Translate>
              </span>
            </dt>
            <dd>{configSiteEntity.url}</dd>
            <dt>
              <span id="name">
                <Translate contentKey="scraperGatewayApp.scraperSettingConfigSite.name">Name</Translate>
              </span>
            </dt>
            <dd>{configSiteEntity.name}</dd>
            <dt>
              <span id="host">
                <Translate contentKey="scraperGatewayApp.scraperSettingConfigSite.host">Host</Translate>
              </span>
            </dt>
            <dd>{configSiteEntity.host}</dd>
            <dt>
              <span id="configName">
                <Translate contentKey="scraperGatewayApp.scraperSettingConfigSite.configName">Config Name</Translate>
              </span>
            </dt>
            <dd>{configSiteEntity.configName}</dd>
            <dt>
              <span id="totalLevel">
                <Translate contentKey="scraperGatewayApp.scraperSettingConfigSite.totalLevel">Total Level</Translate>
              </span>
            </dt>
            <dd>{configSiteEntity.totalLevel}</dd>
            <dt>
              <span id="userId">
                <Translate contentKey="scraperGatewayApp.scraperSettingConfigSite.userId">User Id</Translate>
              </span>
            </dt>
            <dd>{configSiteEntity.userId}</dd>
            <dt>
              <span id="fetchEngine">
                <Translate contentKey="scraperGatewayApp.scraperSettingConfigSite.fetchEngine">Fetch Engine</Translate>
              </span>
            </dt>
            <dd>{configSiteEntity.fetchEngine}</dd>
            <dt>
              <Translate contentKey="scraperGatewayApp.scraperSettingConfigSite.mapping">Mapping</Translate>
            </dt>
            <dd>
              {configSiteEntity.mappings
                ? configSiteEntity.mappings.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.name}</a>
                      {i === configSiteEntity.mappings.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>
              <Translate contentKey="scraperGatewayApp.scraperSettingConfigSite.loginAction">Login Action</Translate>
            </dt>
            <dd>
              {configSiteEntity.loginActions
                ? configSiteEntity.loginActions.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.domain}</a>
                      {i === configSiteEntity.loginActions.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/config-site" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/config-site/${configSiteEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ configSite }: IRootState) => ({
  configSiteEntity: configSite.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigSiteDetail);
