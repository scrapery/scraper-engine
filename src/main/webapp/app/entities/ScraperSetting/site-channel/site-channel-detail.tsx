import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-simlife';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './site-channel.reducer';
import { ISiteChannel } from 'app/shared/model/ScraperSetting/site-channel.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISiteChannelDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class SiteChannelDetail extends React.Component<ISiteChannelDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { siteChannelEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.detail.title">SiteChannel</Translate> [<b>
              {siteChannelEntity.id}
            </b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="url">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.url">Url</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.url}</dd>
            <dt>
              <span id="contentType">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.contentType">Content Type</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.contentType}</dd>
            <dt>
              <span id="schedule">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.schedule">Schedule</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.schedule}</dd>
            <dt>
              <span id="scheduleTimeZone">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.scheduleTimeZone">Schedule Time Zone</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.scheduleTimeZone}</dd>
            <dt>
              <span id="totalLevel">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.totalLevel">Total Level</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.totalLevel}</dd>
            <dt>
              <span id="archiveLevel">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.archiveLevel">Archive Level</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.archiveLevel}</dd>
            <dt>
              <span id="unlimitedLevel">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.unlimitedLevel">Unlimited Level</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.unlimitedLevel ? 'true' : 'false'}</dd>
            <dt>
              <span id="fetchEngine">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.fetchEngine">Fetch Engine</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.fetchEngine}</dd>
            <dt>
              <span id="category">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.category">Category</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.category}</dd>
            <dt>
              <span id="tag">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.tag">Tag</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.tag}</dd>
            <dt>
              <span id="categorySlug">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.categorySlug">Category Slug</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.categorySlug}</dd>
            <dt>
              <span id="tagSlug">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.tagSlug">Tag Slug</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.tagSlug}</dd>
            <dt>
              <span id="countryCode">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.countryCode">Country Code</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.countryCode}</dd>
            <dt>
              <span id="languageCode">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.languageCode">Language Code</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.languageCode}</dd>
            <dt>
              <span id="targetQueueChannel">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.targetQueueChannel">Target Queue Channel</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.targetQueueChannel}</dd>
            <dt>
              <span id="topics">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.topics">Topics</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.topics}</dd>
            <dt>
              <span id="topicSlugs">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.topicSlugs">Topic Slugs</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.topicSlugs}</dd>
            <dt>
              <span id="postType">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.postType">Post Type</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.postType}</dd>
            <dt>
              <span id="rankingCountry">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.rankingCountry">Ranking Country</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.rankingCountry}</dd>
            <dt>
              <span id="channelTotalLevel">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelTotalLevel">Channel Total Level</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.channelTotalLevel}</dd>
            <dt>
              <span id="channelArchiveLevel">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelArchiveLevel">Channel Archive Level</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.channelArchiveLevel}</dd>
            <dt>
              <span id="channelFetchEngine">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelFetchEngine">Channel Fetch Engine</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.channelFetchEngine}</dd>
            <dt>
              <span id="channelRanking">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelRanking">Channel Ranking</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.channelRanking}</dd>
            <dt>
              <span id="channelTargetQueue">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelTargetQueue">Channel Target Queue</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.channelTargetQueue}</dd>
            <dt>
              <span id="channelTargetPostType">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelTargetPostType">
                  Channel Target Post Type
                </Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.channelTargetPostType}</dd>
            <dt>
              <span id="channelLevelOneFetchEngine">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelLevelOneFetchEngine">
                  Channel Level One Fetch Engine
                </Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.channelLevelOneFetchEngine}</dd>
            <dt>
              <span id="channelLevelTwoFetchEngine">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelLevelTwoFetchEngine">
                  Channel Level Two Fetch Engine
                </Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.channelLevelTwoFetchEngine}</dd>
            <dt>
              <span id="channelLevelThreeFetchEngine">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelLevelThreeFetchEngine">
                  Channel Level Three Fetch Engine
                </Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.channelLevelThreeFetchEngine}</dd>
            <dt>
              <span id="channelLevelFourFetchEngine">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelLevelFourFetchEngine">
                  Channel Level Four Fetch Engine
                </Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.channelLevelFourFetchEngine}</dd>
            <dt>
              <span id="channelLevelOneContentType">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelLevelOneContentType">
                  Channel Level One Content Type
                </Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.channelLevelOneContentType}</dd>
            <dt>
              <span id="channelLevelTwoContentType">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelLevelTwoContentType">
                  Channel Level Two Content Type
                </Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.channelLevelTwoContentType}</dd>
            <dt>
              <span id="channelLevelThreeContentType">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelLevelThreeContentType">
                  Channel Level Three Content Type
                </Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.channelLevelThreeContentType}</dd>
            <dt>
              <span id="channelLevelFourContentType">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelLevelFourContentType">
                  Channel Level Four Content Type
                </Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.channelLevelFourContentType}</dd>
            <dt>
              <span id="channelAllowExternalUrl">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelAllowExternalUrl">
                  Channel Allow External Url
                </Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.channelAllowExternalUrl ? 'true' : 'false'}</dd>
            <dt>
              <span id="channelLogo">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelLogo">Channel Logo</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.channelLogo}</dd>
            <dt>
              <span id="channelSiteName">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelSiteName">Channel Site Name</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.channelSiteName}</dd>
            <dt>
              <span id="logo">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.logo">Logo</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.logo}</dd>
            <dt>
              <span id="siteName">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.siteName">Site Name</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.siteName}</dd>
            <dt>
              <span id="channelType">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelType">Channel Type</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.channelType}</dd>
            <dt>
              <span id="levelOneFetchEngine">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.levelOneFetchEngine">Level One Fetch Engine</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.levelOneFetchEngine}</dd>
            <dt>
              <span id="levelTwoFetchEngine">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.levelTwoFetchEngine">Level Two Fetch Engine</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.levelTwoFetchEngine}</dd>
            <dt>
              <span id="levelThreeFetchEngine">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.levelThreeFetchEngine">
                  Level Three Fetch Engine
                </Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.levelThreeFetchEngine}</dd>
            <dt>
              <span id="levelFourFetchEngine">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.levelFourFetchEngine">Level Four Fetch Engine</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.levelFourFetchEngine}</dd>
            <dt>
              <span id="levelOneContentType">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.levelOneContentType">Level One Content Type</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.levelOneContentType}</dd>
            <dt>
              <span id="levelTwoContentType">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.levelTwoContentType">Level Two Content Type</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.levelTwoContentType}</dd>
            <dt>
              <span id="levelThreeContentType">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.levelThreeContentType">
                  Level Three Content Type
                </Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.levelThreeContentType}</dd>
            <dt>
              <span id="levelFourContentType">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.levelFourContentType">Level Four Content Type</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.levelFourContentType}</dd>
            <dt>
              <span id="allowExternalUrl">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.allowExternalUrl">Allow External Url</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.allowExternalUrl ? 'true' : 'false'}</dd>
            <dt>
              <span id="siteUrl">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.siteUrl">Site Url</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.siteUrl}</dd>
            <dt>
              <span id="targetChannel">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.targetChannel">Target Channel</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.targetChannel}</dd>
            <dt>
              <span id="target">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.target">Target</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.target}</dd>
            <dt>
              <span id="siteDomain">
                <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.siteDomain">Site Domain</Translate>
              </span>
            </dt>
            <dd>{siteChannelEntity.siteDomain}</dd>
            <dt>
              <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.outer">Outer</Translate>
            </dt>
            <dd>
              {siteChannelEntity.outers
                ? siteChannelEntity.outers.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.configName}</a>
                      {i === siteChannelEntity.outers.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>
              <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.mapping">Mapping</Translate>
            </dt>
            <dd>
              {siteChannelEntity.mappings
                ? siteChannelEntity.mappings.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.name}</a>
                      {i === siteChannelEntity.mappings.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>
              <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.configGroup">Config Group</Translate>
            </dt>
            <dd>
              {siteChannelEntity.configGroups
                ? siteChannelEntity.configGroups.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.name}</a>
                      {i === siteChannelEntity.configGroups.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>
              <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.targetGroup">Target Group</Translate>
            </dt>
            <dd>
              {siteChannelEntity.targetGroups
                ? siteChannelEntity.targetGroups.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.name}</a>
                      {i === siteChannelEntity.targetGroups.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/site-channel" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/site-channel/${siteChannelEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ siteChannel }: IRootState) => ({
  siteChannelEntity: siteChannel.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteChannelDetail);
