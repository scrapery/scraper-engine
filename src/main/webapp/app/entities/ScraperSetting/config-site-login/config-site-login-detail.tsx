import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-simlife';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './config-site-login.reducer';
import { IConfigSiteLogin } from 'app/shared/model/ScraperSetting/config-site-login.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IConfigSiteLoginDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class ConfigSiteLoginDetail extends React.Component<IConfigSiteLoginDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { configSiteLoginEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="scraperGatewayApp.scraperSettingConfigSiteLogin.detail.title">ConfigSiteLogin</Translate> [<b>
              {configSiteLoginEntity.id}
            </b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="url">
                <Translate contentKey="scraperGatewayApp.scraperSettingConfigSiteLogin.url">Url</Translate>
              </span>
            </dt>
            <dd>{configSiteLoginEntity.url}</dd>
            <dt>
              <span id="domain">
                <Translate contentKey="scraperGatewayApp.scraperSettingConfigSiteLogin.domain">Domain</Translate>
              </span>
            </dt>
            <dd>{configSiteLoginEntity.domain}</dd>
            <dt>
              <span id="host">
                <Translate contentKey="scraperGatewayApp.scraperSettingConfigSiteLogin.host">Host</Translate>
              </span>
            </dt>
            <dd>{configSiteLoginEntity.host}</dd>
            <dt>
              <span id="selectorAction">
                <Translate contentKey="scraperGatewayApp.scraperSettingConfigSiteLogin.selectorAction">Selector Action</Translate>
              </span>
            </dt>
            <dd>{configSiteLoginEntity.selectorAction}</dd>
            <dt>
              <span id="selectorUsername">
                <Translate contentKey="scraperGatewayApp.scraperSettingConfigSiteLogin.selectorUsername">Selector Username</Translate>
              </span>
            </dt>
            <dd>{configSiteLoginEntity.selectorUsername}</dd>
            <dt>
              <span id="selectorPassword">
                <Translate contentKey="scraperGatewayApp.scraperSettingConfigSiteLogin.selectorPassword">Selector Password</Translate>
              </span>
            </dt>
            <dd>{configSiteLoginEntity.selectorPassword}</dd>
            <dt>
              <span id="selectorButtonLogin">
                <Translate contentKey="scraperGatewayApp.scraperSettingConfigSiteLogin.selectorButtonLogin">
                  Selector Button Login
                </Translate>
              </span>
            </dt>
            <dd>{configSiteLoginEntity.selectorButtonLogin}</dd>
            <dt>
              <span id="username">
                <Translate contentKey="scraperGatewayApp.scraperSettingConfigSiteLogin.username">Username</Translate>
              </span>
            </dt>
            <dd>{configSiteLoginEntity.username}</dd>
            <dt>
              <span id="password">
                <Translate contentKey="scraperGatewayApp.scraperSettingConfigSiteLogin.password">Password</Translate>
              </span>
            </dt>
            <dd>{configSiteLoginEntity.password}</dd>
            <dt>
              <span id="redirectUrl">
                <Translate contentKey="scraperGatewayApp.scraperSettingConfigSiteLogin.redirectUrl">Redirect Url</Translate>
              </span>
            </dt>
            <dd>{configSiteLoginEntity.redirectUrl}</dd>
          </dl>
          <Button tag={Link} to="/entity/config-site-login" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/config-site-login/${configSiteLoginEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ configSiteLogin }: IRootState) => ({
  configSiteLoginEntity: configSiteLogin.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigSiteLoginDetail);
