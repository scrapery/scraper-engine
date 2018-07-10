import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-simlife';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './fetch-site-action.reducer';
import { IFetchSiteAction } from 'app/shared/model/ScraperSetting/fetch-site-action.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFetchSiteActionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class FetchSiteActionDetail extends React.Component<IFetchSiteActionDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { fetchSiteActionEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="scraperGatewayApp.scraperSettingFetchSiteAction.detail.title">FetchSiteAction</Translate> [<b>
              {fetchSiteActionEntity.id}
            </b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="url">
                <Translate contentKey="scraperGatewayApp.scraperSettingFetchSiteAction.url">Url</Translate>
              </span>
            </dt>
            <dd>{fetchSiteActionEntity.url}</dd>
            <dt>
              <span id="domain">
                <Translate contentKey="scraperGatewayApp.scraperSettingFetchSiteAction.domain">Domain</Translate>
              </span>
            </dt>
            <dd>{fetchSiteActionEntity.domain}</dd>
            <dt>
              <span id="host">
                <Translate contentKey="scraperGatewayApp.scraperSettingFetchSiteAction.host">Host</Translate>
              </span>
            </dt>
            <dd>{fetchSiteActionEntity.host}</dd>
            <dt>
              <span id="activeLevel">
                <Translate contentKey="scraperGatewayApp.scraperSettingFetchSiteAction.activeLevel">Active Level</Translate>
              </span>
            </dt>
            <dd>{fetchSiteActionEntity.activeLevel}</dd>
            <dt>
              <span id="selectorAction">
                <Translate contentKey="scraperGatewayApp.scraperSettingFetchSiteAction.selectorAction">Selector Action</Translate>
              </span>
            </dt>
            <dd>{fetchSiteActionEntity.selectorAction}</dd>
            <dt>
              <span id="selectorActionAttr">
                <Translate contentKey="scraperGatewayApp.scraperSettingFetchSiteAction.selectorActionAttr">Selector Action Attr</Translate>
              </span>
            </dt>
            <dd>{fetchSiteActionEntity.selectorActionAttr}</dd>
            <dt>
              <span id="action">
                <Translate contentKey="scraperGatewayApp.scraperSettingFetchSiteAction.action">Action</Translate>
              </span>
            </dt>
            <dd>{fetchSiteActionEntity.action}</dd>
            <dt>
              <span id="totalActions">
                <Translate contentKey="scraperGatewayApp.scraperSettingFetchSiteAction.totalActions">Total Actions</Translate>
              </span>
            </dt>
            <dd>{fetchSiteActionEntity.totalActions}</dd>
            <dt>
              <span id="seleniumActionGetContent">
                <Translate contentKey="scraperGatewayApp.scraperSettingFetchSiteAction.seleniumActionGetContent">
                  Selenium Action Get Content
                </Translate>
              </span>
            </dt>
            <dd>{fetchSiteActionEntity.seleniumActionGetContent}</dd>
            <dt>
              <span id="selectorNextPageUrlsName">
                <Translate contentKey="scraperGatewayApp.scraperSettingFetchSiteAction.selectorNextPageUrlsName">
                  Selector Next Page Urls Name
                </Translate>
              </span>
            </dt>
            <dd>{fetchSiteActionEntity.selectorNextPageUrlsName}</dd>
            <dt>
              <span id="selectorNextPageUrlsNameAttr">
                <Translate contentKey="scraperGatewayApp.scraperSettingFetchSiteAction.selectorNextPageUrlsNameAttr">
                  Selector Next Page Urls Name Attr
                </Translate>
              </span>
            </dt>
            <dd>{fetchSiteActionEntity.selectorNextPageUrlsNameAttr}</dd>
          </dl>
          <Button tag={Link} to="/entity/fetch-site-action" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/fetch-site-action/${fetchSiteActionEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ fetchSiteAction }: IRootState) => ({
  fetchSiteActionEntity: fetchSiteAction.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FetchSiteActionDetail);
