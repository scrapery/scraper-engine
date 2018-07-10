import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-simlife';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './channel.reducer';
import { IChannel } from 'app/shared/model/ScraperSetting/channel.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IChannelDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class ChannelDetail extends React.Component<IChannelDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { channelEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="scraperGatewayApp.scraperSettingChannel.detail.title">Channel</Translate> [<b>{channelEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="url">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.url">Url</Translate>
              </span>
            </dt>
            <dd>{channelEntity.url}</dd>
            <dt>
              <span id="contentType">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.contentType">Content Type</Translate>
              </span>
            </dt>
            <dd>{channelEntity.contentType}</dd>
            <dt>
              <span id="schedule">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.schedule">Schedule</Translate>
              </span>
            </dt>
            <dd>{channelEntity.schedule}</dd>
            <dt>
              <span id="scheduleTimeZone">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.scheduleTimeZone">Schedule Time Zone</Translate>
              </span>
            </dt>
            <dd>{channelEntity.scheduleTimeZone}</dd>
            <dt>
              <span id="totalLevel">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.totalLevel">Total Level</Translate>
              </span>
            </dt>
            <dd>{channelEntity.totalLevel}</dd>
            <dt>
              <span id="archiveLevel">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.archiveLevel">Archive Level</Translate>
              </span>
            </dt>
            <dd>{channelEntity.archiveLevel}</dd>
            <dt>
              <span id="unlimitedLevel">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.unlimitedLevel">Unlimited Level</Translate>
              </span>
            </dt>
            <dd>{channelEntity.unlimitedLevel ? 'true' : 'false'}</dd>
            <dt>
              <span id="fetchEngine">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.fetchEngine">Fetch Engine</Translate>
              </span>
            </dt>
            <dd>{channelEntity.fetchEngine}</dd>
            <dt>
              <span id="category">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.category">Category</Translate>
              </span>
            </dt>
            <dd>{channelEntity.category}</dd>
            <dt>
              <span id="tag">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.tag">Tag</Translate>
              </span>
            </dt>
            <dd>{channelEntity.tag}</dd>
            <dt>
              <span id="categorySlug">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.categorySlug">Category Slug</Translate>
              </span>
            </dt>
            <dd>{channelEntity.categorySlug}</dd>
            <dt>
              <span id="tagSlug">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.tagSlug">Tag Slug</Translate>
              </span>
            </dt>
            <dd>{channelEntity.tagSlug}</dd>
            <dt>
              <span id="countryCode">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.countryCode">Country Code</Translate>
              </span>
            </dt>
            <dd>{channelEntity.countryCode}</dd>
            <dt>
              <span id="languageCode">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.languageCode">Language Code</Translate>
              </span>
            </dt>
            <dd>{channelEntity.languageCode}</dd>
            <dt>
              <span id="targetQueueChannel">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.targetQueueChannel">Target Queue Channel</Translate>
              </span>
            </dt>
            <dd>{channelEntity.targetQueueChannel}</dd>
            <dt>
              <span id="topics">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.topics">Topics</Translate>
              </span>
            </dt>
            <dd>{channelEntity.topics}</dd>
            <dt>
              <span id="topicSlugs">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.topicSlugs">Topic Slugs</Translate>
              </span>
            </dt>
            <dd>{channelEntity.topicSlugs}</dd>
            <dt>
              <span id="postType">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.postType">Post Type</Translate>
              </span>
            </dt>
            <dd>{channelEntity.postType}</dd>
            <dt>
              <span id="rankingCountry">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.rankingCountry">Ranking Country</Translate>
              </span>
            </dt>
            <dd>{channelEntity.rankingCountry}</dd>
            <dt>
              <span id="channelTotalLevel">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.channelTotalLevel">Channel Total Level</Translate>
              </span>
            </dt>
            <dd>{channelEntity.channelTotalLevel}</dd>
            <dt>
              <span id="channelArchiveLevel">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.channelArchiveLevel">Channel Archive Level</Translate>
              </span>
            </dt>
            <dd>{channelEntity.channelArchiveLevel}</dd>
            <dt>
              <span id="channelFetchEngine">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.channelFetchEngine">Channel Fetch Engine</Translate>
              </span>
            </dt>
            <dd>{channelEntity.channelFetchEngine}</dd>
            <dt>
              <span id="channelRanking">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.channelRanking">Channel Ranking</Translate>
              </span>
            </dt>
            <dd>{channelEntity.channelRanking}</dd>
            <dt>
              <span id="channelTargetQueue">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.channelTargetQueue">Channel Target Queue</Translate>
              </span>
            </dt>
            <dd>{channelEntity.channelTargetQueue}</dd>
            <dt>
              <span id="channelTargetPostType">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.channelTargetPostType">Channel Target Post Type</Translate>
              </span>
            </dt>
            <dd>{channelEntity.channelTargetPostType}</dd>
            <dt>
              <span id="channelLevelOneFetchEngine">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.channelLevelOneFetchEngine">
                  Channel Level One Fetch Engine
                </Translate>
              </span>
            </dt>
            <dd>{channelEntity.channelLevelOneFetchEngine}</dd>
            <dt>
              <span id="channelLevelTwoFetchEngine">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.channelLevelTwoFetchEngine">
                  Channel Level Two Fetch Engine
                </Translate>
              </span>
            </dt>
            <dd>{channelEntity.channelLevelTwoFetchEngine}</dd>
            <dt>
              <span id="channelLevelThreeFetchEngine">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.channelLevelThreeFetchEngine">
                  Channel Level Three Fetch Engine
                </Translate>
              </span>
            </dt>
            <dd>{channelEntity.channelLevelThreeFetchEngine}</dd>
            <dt>
              <span id="channelLevelFourFetchEngine">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.channelLevelFourFetchEngine">
                  Channel Level Four Fetch Engine
                </Translate>
              </span>
            </dt>
            <dd>{channelEntity.channelLevelFourFetchEngine}</dd>
            <dt>
              <span id="channelLevelOneContentType">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.channelLevelOneContentType">
                  Channel Level One Content Type
                </Translate>
              </span>
            </dt>
            <dd>{channelEntity.channelLevelOneContentType}</dd>
            <dt>
              <span id="channelLevelTwoContentType">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.channelLevelTwoContentType">
                  Channel Level Two Content Type
                </Translate>
              </span>
            </dt>
            <dd>{channelEntity.channelLevelTwoContentType}</dd>
            <dt>
              <span id="channelLevelThreeContentType">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.channelLevelThreeContentType">
                  Channel Level Three Content Type
                </Translate>
              </span>
            </dt>
            <dd>{channelEntity.channelLevelThreeContentType}</dd>
            <dt>
              <span id="channelLevelFourContentType">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.channelLevelFourContentType">
                  Channel Level Four Content Type
                </Translate>
              </span>
            </dt>
            <dd>{channelEntity.channelLevelFourContentType}</dd>
            <dt>
              <span id="channelAllowExternalUrl">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.channelAllowExternalUrl">
                  Channel Allow External Url
                </Translate>
              </span>
            </dt>
            <dd>{channelEntity.channelAllowExternalUrl ? 'true' : 'false'}</dd>
            <dt>
              <span id="channelLogo">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.channelLogo">Channel Logo</Translate>
              </span>
            </dt>
            <dd>{channelEntity.channelLogo}</dd>
            <dt>
              <span id="channelSiteName">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.channelSiteName">Channel Site Name</Translate>
              </span>
            </dt>
            <dd>{channelEntity.channelSiteName}</dd>
            <dt>
              <span id="logo">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.logo">Logo</Translate>
              </span>
            </dt>
            <dd>{channelEntity.logo}</dd>
            <dt>
              <span id="siteName">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.siteName">Site Name</Translate>
              </span>
            </dt>
            <dd>{channelEntity.siteName}</dd>
            <dt>
              <span id="channelType">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.channelType">Channel Type</Translate>
              </span>
            </dt>
            <dd>{channelEntity.channelType}</dd>
            <dt>
              <span id="levelOneFetchEngine">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.levelOneFetchEngine">Level One Fetch Engine</Translate>
              </span>
            </dt>
            <dd>{channelEntity.levelOneFetchEngine}</dd>
            <dt>
              <span id="levelTwoFetchEngine">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.levelTwoFetchEngine">Level Two Fetch Engine</Translate>
              </span>
            </dt>
            <dd>{channelEntity.levelTwoFetchEngine}</dd>
            <dt>
              <span id="levelThreeFetchEngine">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.levelThreeFetchEngine">Level Three Fetch Engine</Translate>
              </span>
            </dt>
            <dd>{channelEntity.levelThreeFetchEngine}</dd>
            <dt>
              <span id="levelFourFetchEngine">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.levelFourFetchEngine">Level Four Fetch Engine</Translate>
              </span>
            </dt>
            <dd>{channelEntity.levelFourFetchEngine}</dd>
            <dt>
              <span id="levelOneContentType">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.levelOneContentType">Level One Content Type</Translate>
              </span>
            </dt>
            <dd>{channelEntity.levelOneContentType}</dd>
            <dt>
              <span id="levelTwoContentType">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.levelTwoContentType">Level Two Content Type</Translate>
              </span>
            </dt>
            <dd>{channelEntity.levelTwoContentType}</dd>
            <dt>
              <span id="levelThreeContentType">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.levelThreeContentType">Level Three Content Type</Translate>
              </span>
            </dt>
            <dd>{channelEntity.levelThreeContentType}</dd>
            <dt>
              <span id="levelFourContentType">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.levelFourContentType">Level Four Content Type</Translate>
              </span>
            </dt>
            <dd>{channelEntity.levelFourContentType}</dd>
            <dt>
              <span id="allowExternalUrl">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.allowExternalUrl">Allow External Url</Translate>
              </span>
            </dt>
            <dd>{channelEntity.allowExternalUrl ? 'true' : 'false'}</dd>
            <dt>
              <span id="targetChannel">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.targetChannel">Target Channel</Translate>
              </span>
            </dt>
            <dd>{channelEntity.targetChannel}</dd>
            <dt>
              <span id="target">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.target">Target</Translate>
              </span>
            </dt>
            <dd>{channelEntity.target}</dd>
            <dt>
              <span id="name">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.name">Name</Translate>
              </span>
            </dt>
            <dd>{channelEntity.name}</dd>
            <dt>
              <span id="siteDomain">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.siteDomain">Site Domain</Translate>
              </span>
            </dt>
            <dd>{channelEntity.siteDomain}</dd>
            <dt>
              <span id="siteUrl">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannel.siteUrl">Site Url</Translate>
              </span>
            </dt>
            <dd>{channelEntity.siteUrl}</dd>
            <dt>
              <Translate contentKey="scraperGatewayApp.scraperSettingChannel.outer">Outer</Translate>
            </dt>
            <dd>
              {channelEntity.outers
                ? channelEntity.outers.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.configName}</a>
                      {i === channelEntity.outers.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>
              <Translate contentKey="scraperGatewayApp.scraperSettingChannel.mapping">Mapping</Translate>
            </dt>
            <dd>
              {channelEntity.mappings
                ? channelEntity.mappings.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.name}</a>
                      {i === channelEntity.mappings.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>
              <Translate contentKey="scraperGatewayApp.scraperSettingChannel.configGroup">Config Group</Translate>
            </dt>
            <dd>
              {channelEntity.configGroups
                ? channelEntity.configGroups.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.name}</a>
                      {i === channelEntity.configGroups.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>
              <Translate contentKey="scraperGatewayApp.scraperSettingChannel.targetGroup">Target Group</Translate>
            </dt>
            <dd>
              {channelEntity.targetGroups
                ? channelEntity.targetGroups.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.name}</a>
                      {i === channelEntity.targetGroups.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/channel" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/channel/${channelEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ channel }: IRootState) => ({
  channelEntity: channel.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelDetail);
