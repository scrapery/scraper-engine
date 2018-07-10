import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-simlife';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './link.reducer';
import { ILink } from 'app/shared/model/ScraperSetting/link.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILinkDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class LinkDetail extends React.Component<ILinkDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { linkEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="scraperGatewayApp.scraperSettingLink.detail.title">Link</Translate> [<b>{linkEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="url">
                <Translate contentKey="scraperGatewayApp.scraperSettingLink.url">Url</Translate>
              </span>
            </dt>
            <dd>{linkEntity.url}</dd>
            <dt>
              <span id="scrapeDataId">
                <Translate contentKey="scraperGatewayApp.scraperSettingLink.scrapeDataId">Scrape Data Id</Translate>
              </span>
            </dt>
            <dd>{linkEntity.scrapeDataId}</dd>
            <dt>
              <span id="scrapeId">
                <Translate contentKey="scraperGatewayApp.scraperSettingLink.scrapeId">Scrape Id</Translate>
              </span>
            </dt>
            <dd>{linkEntity.scrapeId}</dd>
            <dt>
              <span id="currentLevel">
                <Translate contentKey="scraperGatewayApp.scraperSettingLink.currentLevel">Current Level</Translate>
              </span>
            </dt>
            <dd>{linkEntity.currentLevel}</dd>
            <dt>
              <span id="scrapeUrl">
                <Translate contentKey="scraperGatewayApp.scraperSettingLink.scrapeUrl">Scrape Url</Translate>
              </span>
            </dt>
            <dd>{linkEntity.scrapeUrl}</dd>
            <dt>
              <span id="parentUrl">
                <Translate contentKey="scraperGatewayApp.scraperSettingLink.parentUrl">Parent Url</Translate>
              </span>
            </dt>
            <dd>{linkEntity.parentUrl}</dd>
            <dt>
              <span id="scrapeResultId">
                <Translate contentKey="scraperGatewayApp.scraperSettingLink.scrapeResultId">Scrape Result Id</Translate>
              </span>
            </dt>
            <dd>{linkEntity.scrapeResultId}</dd>
            <dt>
              <span id="scrapeResultPath">
                <Translate contentKey="scraperGatewayApp.scraperSettingLink.scrapeResultPath">Scrape Result Path</Translate>
              </span>
            </dt>
            <dd>{linkEntity.scrapeResultPath}</dd>
            <dt>
              <span id="scrapeREsultContentType">
                <Translate contentKey="scraperGatewayApp.scraperSettingLink.scrapeREsultContentType">Scrape R Esult Content Type</Translate>
              </span>
            </dt>
            <dd>{linkEntity.scrapeREsultContentType}</dd>
            <dt>
              <span id="crawlStatus">
                <Translate contentKey="scraperGatewayApp.scraperSettingLink.crawlStatus">Crawl Status</Translate>
              </span>
            </dt>
            <dd>{linkEntity.crawlStatus}</dd>
            <dt>
              <span id="internalUrl">
                <Translate contentKey="scraperGatewayApp.scraperSettingLink.internalUrl">Internal Url</Translate>
              </span>
            </dt>
            <dd>{linkEntity.internalUrl}</dd>
          </dl>
          <Button tag={Link} to="/entity/link" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/link/${linkEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ link }: IRootState) => ({
  linkEntity: link.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkDetail);
