import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-simlife';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IChannelOuterLink } from 'app/shared/model/ScraperSetting/channel-outer-link.model';
import { getEntities as getChannelOuterLinks } from 'app/entities/ScraperSetting/channel-outer-link/channel-outer-link.reducer';
import { IConfigMapping } from 'app/shared/model/ScraperSetting/config-mapping.model';
import { getEntities as getConfigMappings } from 'app/entities/ScraperSetting/config-mapping/config-mapping.reducer';
import { IConfigGroup } from 'app/shared/model/ScraperSetting/config-group.model';
import { getEntities as getConfigGroups } from 'app/entities/ScraperSetting/config-group/config-group.reducer';
import { getEntity, updateEntity, createEntity, reset } from './site-channel.reducer';
import { ISiteChannel } from 'app/shared/model/ScraperSetting/site-channel.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface ISiteChannelUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ISiteChannelUpdateState {
  isNew: boolean;
  idsouter: any[];
  idsmapping: any[];
  idsconfigGroup: any[];
  idstargetGroup: any[];
}

export class SiteChannelUpdate extends React.Component<ISiteChannelUpdateProps, ISiteChannelUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsouter: [],
      idsmapping: [],
      idsconfigGroup: [],
      idstargetGroup: [],
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getChannelOuterLinks();
    this.props.getConfigMappings();
    this.props.getConfigGroups();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { siteChannelEntity } = this.props;
      const entity = {
        ...siteChannelEntity,
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
    this.props.history.push('/entity/site-channel');
  };

  outerUpdate = element => {
    const selected = Array.from(element.target.selectedOptions).map((e: any) => e.value);
    this.setState({
      idsouter: keysToValues(selected, this.props.channelOuterLinks, 'configName')
    });
  };

  mappingUpdate = element => {
    const selected = Array.from(element.target.selectedOptions).map((e: any) => e.value);
    this.setState({
      idsmapping: keysToValues(selected, this.props.configMappings, 'name')
    });
  };

  configGroupUpdate = element => {
    const selected = Array.from(element.target.selectedOptions).map((e: any) => e.value);
    this.setState({
      idsconfigGroup: keysToValues(selected, this.props.configGroups, 'name')
    });
  };

  targetGroupUpdate = element => {
    const selected = Array.from(element.target.selectedOptions).map((e: any) => e.value);
    this.setState({
      idstargetGroup: keysToValues(selected, this.props.configGroups, 'name')
    });
  };

  displayouter(value: any) {
    if (this.state.idsouter && this.state.idsouter.length !== 0) {
      const list = [];
      for (const i in this.state.idsouter) {
        if (this.state.idsouter[i]) {
          list.push(this.state.idsouter[i].configName);
        }
      }
      return list;
    }
    if (value.outers && value.outers.length !== 0) {
      const list = [];
      for (const i in value.outers) {
        if (value.outers[i]) {
          list.push(value.outers[i].configName);
        }
      }
      this.setState({
        idsouter: keysToValues(list, this.props.channelOuterLinks, 'configName')
      });
      return list;
    }
    return null;
  }

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

  displayconfigGroup(value: any) {
    if (this.state.idsconfigGroup && this.state.idsconfigGroup.length !== 0) {
      const list = [];
      for (const i in this.state.idsconfigGroup) {
        if (this.state.idsconfigGroup[i]) {
          list.push(this.state.idsconfigGroup[i].name);
        }
      }
      return list;
    }
    if (value.configGroups && value.configGroups.length !== 0) {
      const list = [];
      for (const i in value.configGroups) {
        if (value.configGroups[i]) {
          list.push(value.configGroups[i].name);
        }
      }
      this.setState({
        idsconfigGroup: keysToValues(list, this.props.configGroups, 'name')
      });
      return list;
    }
    return null;
  }

  displaytargetGroup(value: any) {
    if (this.state.idstargetGroup && this.state.idstargetGroup.length !== 0) {
      const list = [];
      for (const i in this.state.idstargetGroup) {
        if (this.state.idstargetGroup[i]) {
          list.push(this.state.idstargetGroup[i].name);
        }
      }
      return list;
    }
    if (value.targetGroups && value.targetGroups.length !== 0) {
      const list = [];
      for (const i in value.targetGroups) {
        if (value.targetGroups[i]) {
          list.push(value.targetGroups[i].name);
        }
      }
      this.setState({
        idstargetGroup: keysToValues(list, this.props.configGroups, 'name')
      });
      return list;
    }
    return null;
  }

  render() {
    const isInvalid = false;
    const { siteChannelEntity, channelOuterLinks, configMappings, configGroups, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="scraperGatewayApp.scraperSettingSiteChannel.home.createOrEditLabel">
              <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.home.createOrEditLabel">
                Create or edit a SiteChannel
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : siteChannelEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="site-channel-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="urlLabel" for="url">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.url">Url</Translate>
                  </Label>
                  <AvField id="site-channel-url" type="text" name="url" />
                </AvGroup>
                <AvGroup>
                  <Label id="contentTypeLabel">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.contentType">Content Type</Translate>
                  </Label>
                  <AvInput
                    id="site-channel-contentType"
                    type="select"
                    className="form-control"
                    name="contentType"
                    value={(!isNew && siteChannelEntity.contentType) || 'HTML'}
                  >
                    <option value="HTML">HTML</option>
                    <option value="XML">XML</option>
                    <option value="JSON">JSON</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="scheduleLabel" for="schedule">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.schedule">Schedule</Translate>
                  </Label>
                  <AvField id="site-channel-schedule" type="text" name="schedule" />
                </AvGroup>
                <AvGroup>
                  <Label id="scheduleTimeZoneLabel" for="scheduleTimeZone">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.scheduleTimeZone">Schedule Time Zone</Translate>
                  </Label>
                  <AvField id="site-channel-scheduleTimeZone" type="text" name="scheduleTimeZone" />
                </AvGroup>
                <AvGroup>
                  <Label id="totalLevelLabel" for="totalLevel">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.totalLevel">Total Level</Translate>
                  </Label>
                  <AvField id="site-channel-totalLevel" type="number" className="form-control" name="totalLevel" />
                </AvGroup>
                <AvGroup>
                  <Label id="archiveLevelLabel" for="archiveLevel">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.archiveLevel">Archive Level</Translate>
                  </Label>
                  <AvField id="site-channel-archiveLevel" type="number" className="form-control" name="archiveLevel" />
                </AvGroup>
                <AvGroup>
                  <Label id="unlimitedLevelLabel" check>
                    <AvInput id="site-channel-unlimitedLevel" type="checkbox" className="form-control" name="unlimitedLevel" />
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.unlimitedLevel">Unlimited Level</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="fetchEngineLabel">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.fetchEngine">Fetch Engine</Translate>
                  </Label>
                  <AvInput
                    id="site-channel-fetchEngine"
                    type="select"
                    className="form-control"
                    name="fetchEngine"
                    value={(!isNew && siteChannelEntity.fetchEngine) || 'SELENIUM'}
                  >
                    <option value="SELENIUM">SELENIUM</option>
                    <option value="HTTP">HTTP</option>
                    <option value="RSS">RSS</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="categoryLabel" for="category">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.category">Category</Translate>
                  </Label>
                  <AvField id="site-channel-category" type="text" name="category" />
                </AvGroup>
                <AvGroup>
                  <Label id="tagLabel" for="tag">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.tag">Tag</Translate>
                  </Label>
                  <AvField id="site-channel-tag" type="text" name="tag" />
                </AvGroup>
                <AvGroup>
                  <Label id="categorySlugLabel" for="categorySlug">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.categorySlug">Category Slug</Translate>
                  </Label>
                  <AvField id="site-channel-categorySlug" type="text" name="categorySlug" />
                </AvGroup>
                <AvGroup>
                  <Label id="tagSlugLabel" for="tagSlug">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.tagSlug">Tag Slug</Translate>
                  </Label>
                  <AvField id="site-channel-tagSlug" type="text" name="tagSlug" />
                </AvGroup>
                <AvGroup>
                  <Label id="countryCodeLabel" for="countryCode">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.countryCode">Country Code</Translate>
                  </Label>
                  <AvField id="site-channel-countryCode" type="text" name="countryCode" />
                </AvGroup>
                <AvGroup>
                  <Label id="languageCodeLabel" for="languageCode">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.languageCode">Language Code</Translate>
                  </Label>
                  <AvField id="site-channel-languageCode" type="text" name="languageCode" />
                </AvGroup>
                <AvGroup>
                  <Label id="targetQueueChannelLabel" for="targetQueueChannel">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.targetQueueChannel">Target Queue Channel</Translate>
                  </Label>
                  <AvField id="site-channel-targetQueueChannel" type="text" name="targetQueueChannel" />
                </AvGroup>
                <AvGroup>
                  <Label id="topicsLabel" for="topics">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.topics">Topics</Translate>
                  </Label>
                  <AvField id="site-channel-topics" type="text" name="topics" />
                </AvGroup>
                <AvGroup>
                  <Label id="topicSlugsLabel" for="topicSlugs">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.topicSlugs">Topic Slugs</Translate>
                  </Label>
                  <AvField id="site-channel-topicSlugs" type="text" name="topicSlugs" />
                </AvGroup>
                <AvGroup>
                  <Label id="postTypeLabel">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.postType">Post Type</Translate>
                  </Label>
                  <AvInput
                    id="site-channel-postType"
                    type="select"
                    className="form-control"
                    name="postType"
                    value={(!isNew && siteChannelEntity.postType) || 'ARTICLE'}
                  >
                    <option value="ARTICLE">ARTICLE</option>
                    <option value="VIDEO">VIDEO</option>
                    <option value="MUSIC">MUSIC</option>
                    <option value="MOVIE">MOVIE</option>
                    <option value="NEWS">NEWS</option>
                    <option value="AUDIO">AUDIO</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="rankingCountryLabel" for="rankingCountry">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.rankingCountry">Ranking Country</Translate>
                  </Label>
                  <AvField id="site-channel-rankingCountry" type="number" className="form-control" name="rankingCountry" />
                </AvGroup>
                <AvGroup>
                  <Label id="channelTotalLevelLabel" for="channelTotalLevel">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelTotalLevel">Channel Total Level</Translate>
                  </Label>
                  <AvField id="site-channel-channelTotalLevel" type="number" className="form-control" name="channelTotalLevel" />
                </AvGroup>
                <AvGroup>
                  <Label id="channelArchiveLevelLabel" for="channelArchiveLevel">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelArchiveLevel">
                      Channel Archive Level
                    </Translate>
                  </Label>
                  <AvField id="site-channel-channelArchiveLevel" type="number" className="form-control" name="channelArchiveLevel" />
                </AvGroup>
                <AvGroup>
                  <Label id="channelFetchEngineLabel">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelFetchEngine">Channel Fetch Engine</Translate>
                  </Label>
                  <AvInput
                    id="site-channel-channelFetchEngine"
                    type="select"
                    className="form-control"
                    name="channelFetchEngine"
                    value={(!isNew && siteChannelEntity.channelFetchEngine) || 'SELENIUM'}
                  >
                    <option value="SELENIUM">SELENIUM</option>
                    <option value="HTTP">HTTP</option>
                    <option value="RSS">RSS</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="channelRankingLabel" for="channelRanking">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelRanking">Channel Ranking</Translate>
                  </Label>
                  <AvField id="site-channel-channelRanking" type="number" className="form-control" name="channelRanking" />
                </AvGroup>
                <AvGroup>
                  <Label id="channelTargetQueueLabel" for="channelTargetQueue">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelTargetQueue">Channel Target Queue</Translate>
                  </Label>
                  <AvField id="site-channel-channelTargetQueue" type="text" name="channelTargetQueue" />
                </AvGroup>
                <AvGroup>
                  <Label id="channelTargetPostTypeLabel">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelTargetPostType">
                      Channel Target Post Type
                    </Translate>
                  </Label>
                  <AvInput
                    id="site-channel-channelTargetPostType"
                    type="select"
                    className="form-control"
                    name="channelTargetPostType"
                    value={(!isNew && siteChannelEntity.channelTargetPostType) || 'ARTICLE'}
                  >
                    <option value="ARTICLE">ARTICLE</option>
                    <option value="VIDEO">VIDEO</option>
                    <option value="MUSIC">MUSIC</option>
                    <option value="MOVIE">MOVIE</option>
                    <option value="NEWS">NEWS</option>
                    <option value="AUDIO">AUDIO</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="channelLevelOneFetchEngineLabel">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelLevelOneFetchEngine">
                      Channel Level One Fetch Engine
                    </Translate>
                  </Label>
                  <AvInput
                    id="site-channel-channelLevelOneFetchEngine"
                    type="select"
                    className="form-control"
                    name="channelLevelOneFetchEngine"
                    value={(!isNew && siteChannelEntity.channelLevelOneFetchEngine) || 'SELENIUM'}
                  >
                    <option value="SELENIUM">SELENIUM</option>
                    <option value="HTTP">HTTP</option>
                    <option value="RSS">RSS</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="channelLevelTwoFetchEngineLabel">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelLevelTwoFetchEngine">
                      Channel Level Two Fetch Engine
                    </Translate>
                  </Label>
                  <AvInput
                    id="site-channel-channelLevelTwoFetchEngine"
                    type="select"
                    className="form-control"
                    name="channelLevelTwoFetchEngine"
                    value={(!isNew && siteChannelEntity.channelLevelTwoFetchEngine) || 'SELENIUM'}
                  >
                    <option value="SELENIUM">SELENIUM</option>
                    <option value="HTTP">HTTP</option>
                    <option value="RSS">RSS</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="channelLevelThreeFetchEngineLabel">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelLevelThreeFetchEngine">
                      Channel Level Three Fetch Engine
                    </Translate>
                  </Label>
                  <AvInput
                    id="site-channel-channelLevelThreeFetchEngine"
                    type="select"
                    className="form-control"
                    name="channelLevelThreeFetchEngine"
                    value={(!isNew && siteChannelEntity.channelLevelThreeFetchEngine) || 'SELENIUM'}
                  >
                    <option value="SELENIUM">SELENIUM</option>
                    <option value="HTTP">HTTP</option>
                    <option value="RSS">RSS</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="channelLevelFourFetchEngineLabel">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelLevelFourFetchEngine">
                      Channel Level Four Fetch Engine
                    </Translate>
                  </Label>
                  <AvInput
                    id="site-channel-channelLevelFourFetchEngine"
                    type="select"
                    className="form-control"
                    name="channelLevelFourFetchEngine"
                    value={(!isNew && siteChannelEntity.channelLevelFourFetchEngine) || 'SELENIUM'}
                  >
                    <option value="SELENIUM">SELENIUM</option>
                    <option value="HTTP">HTTP</option>
                    <option value="RSS">RSS</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="channelLevelOneContentTypeLabel">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelLevelOneContentType">
                      Channel Level One Content Type
                    </Translate>
                  </Label>
                  <AvInput
                    id="site-channel-channelLevelOneContentType"
                    type="select"
                    className="form-control"
                    name="channelLevelOneContentType"
                    value={(!isNew && siteChannelEntity.channelLevelOneContentType) || 'HTML'}
                  >
                    <option value="HTML">HTML</option>
                    <option value="XML">XML</option>
                    <option value="JSON">JSON</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="channelLevelTwoContentTypeLabel">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelLevelTwoContentType">
                      Channel Level Two Content Type
                    </Translate>
                  </Label>
                  <AvInput
                    id="site-channel-channelLevelTwoContentType"
                    type="select"
                    className="form-control"
                    name="channelLevelTwoContentType"
                    value={(!isNew && siteChannelEntity.channelLevelTwoContentType) || 'HTML'}
                  >
                    <option value="HTML">HTML</option>
                    <option value="XML">XML</option>
                    <option value="JSON">JSON</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="channelLevelThreeContentTypeLabel">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelLevelThreeContentType">
                      Channel Level Three Content Type
                    </Translate>
                  </Label>
                  <AvInput
                    id="site-channel-channelLevelThreeContentType"
                    type="select"
                    className="form-control"
                    name="channelLevelThreeContentType"
                    value={(!isNew && siteChannelEntity.channelLevelThreeContentType) || 'HTML'}
                  >
                    <option value="HTML">HTML</option>
                    <option value="XML">XML</option>
                    <option value="JSON">JSON</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="channelLevelFourContentTypeLabel">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelLevelFourContentType">
                      Channel Level Four Content Type
                    </Translate>
                  </Label>
                  <AvInput
                    id="site-channel-channelLevelFourContentType"
                    type="select"
                    className="form-control"
                    name="channelLevelFourContentType"
                    value={(!isNew && siteChannelEntity.channelLevelFourContentType) || 'HTML'}
                  >
                    <option value="HTML">HTML</option>
                    <option value="XML">XML</option>
                    <option value="JSON">JSON</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="channelAllowExternalUrlLabel" check>
                    <AvInput
                      id="site-channel-channelAllowExternalUrl"
                      type="checkbox"
                      className="form-control"
                      name="channelAllowExternalUrl"
                    />
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelAllowExternalUrl">
                      Channel Allow External Url
                    </Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="channelLogoLabel" for="channelLogo">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelLogo">Channel Logo</Translate>
                  </Label>
                  <AvField id="site-channel-channelLogo" type="text" name="channelLogo" />
                </AvGroup>
                <AvGroup>
                  <Label id="channelSiteNameLabel" for="channelSiteName">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelSiteName">Channel Site Name</Translate>
                  </Label>
                  <AvField id="site-channel-channelSiteName" type="text" name="channelSiteName" />
                </AvGroup>
                <AvGroup>
                  <Label id="logoLabel" for="logo">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.logo">Logo</Translate>
                  </Label>
                  <AvField id="site-channel-logo" type="text" name="logo" />
                </AvGroup>
                <AvGroup>
                  <Label id="siteNameLabel" for="siteName">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.siteName">Site Name</Translate>
                  </Label>
                  <AvField id="site-channel-siteName" type="text" name="siteName" />
                </AvGroup>
                <AvGroup>
                  <Label id="channelTypeLabel">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelType">Channel Type</Translate>
                  </Label>
                  <AvInput
                    id="site-channel-channelType"
                    type="select"
                    className="form-control"
                    name="channelType"
                    value={(!isNew && siteChannelEntity.channelType) || 'CHANNEL_FOR_GETTING_CHANNEL'}
                  >
                    <option value="CHANNEL_FOR_GETTING_CHANNEL">CHANNEL_FOR_GETTING_CHANNEL</option>
                    <option value="CHANNEL_FOR_GETTING_FEED">CHANNEL_FOR_GETTING_FEED</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="levelOneFetchEngineLabel">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.levelOneFetchEngine">
                      Level One Fetch Engine
                    </Translate>
                  </Label>
                  <AvInput
                    id="site-channel-levelOneFetchEngine"
                    type="select"
                    className="form-control"
                    name="levelOneFetchEngine"
                    value={(!isNew && siteChannelEntity.levelOneFetchEngine) || 'SELENIUM'}
                  >
                    <option value="SELENIUM">SELENIUM</option>
                    <option value="HTTP">HTTP</option>
                    <option value="RSS">RSS</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="levelTwoFetchEngineLabel">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.levelTwoFetchEngine">
                      Level Two Fetch Engine
                    </Translate>
                  </Label>
                  <AvInput
                    id="site-channel-levelTwoFetchEngine"
                    type="select"
                    className="form-control"
                    name="levelTwoFetchEngine"
                    value={(!isNew && siteChannelEntity.levelTwoFetchEngine) || 'SELENIUM'}
                  >
                    <option value="SELENIUM">SELENIUM</option>
                    <option value="HTTP">HTTP</option>
                    <option value="RSS">RSS</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="levelThreeFetchEngineLabel">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.levelThreeFetchEngine">
                      Level Three Fetch Engine
                    </Translate>
                  </Label>
                  <AvInput
                    id="site-channel-levelThreeFetchEngine"
                    type="select"
                    className="form-control"
                    name="levelThreeFetchEngine"
                    value={(!isNew && siteChannelEntity.levelThreeFetchEngine) || 'SELENIUM'}
                  >
                    <option value="SELENIUM">SELENIUM</option>
                    <option value="HTTP">HTTP</option>
                    <option value="RSS">RSS</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="levelFourFetchEngineLabel">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.levelFourFetchEngine">
                      Level Four Fetch Engine
                    </Translate>
                  </Label>
                  <AvInput
                    id="site-channel-levelFourFetchEngine"
                    type="select"
                    className="form-control"
                    name="levelFourFetchEngine"
                    value={(!isNew && siteChannelEntity.levelFourFetchEngine) || 'SELENIUM'}
                  >
                    <option value="SELENIUM">SELENIUM</option>
                    <option value="HTTP">HTTP</option>
                    <option value="RSS">RSS</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="levelOneContentTypeLabel">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.levelOneContentType">
                      Level One Content Type
                    </Translate>
                  </Label>
                  <AvInput
                    id="site-channel-levelOneContentType"
                    type="select"
                    className="form-control"
                    name="levelOneContentType"
                    value={(!isNew && siteChannelEntity.levelOneContentType) || 'HTML'}
                  >
                    <option value="HTML">HTML</option>
                    <option value="XML">XML</option>
                    <option value="JSON">JSON</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="levelTwoContentTypeLabel">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.levelTwoContentType">
                      Level Two Content Type
                    </Translate>
                  </Label>
                  <AvInput
                    id="site-channel-levelTwoContentType"
                    type="select"
                    className="form-control"
                    name="levelTwoContentType"
                    value={(!isNew && siteChannelEntity.levelTwoContentType) || 'HTML'}
                  >
                    <option value="HTML">HTML</option>
                    <option value="XML">XML</option>
                    <option value="JSON">JSON</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="levelThreeContentTypeLabel">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.levelThreeContentType">
                      Level Three Content Type
                    </Translate>
                  </Label>
                  <AvInput
                    id="site-channel-levelThreeContentType"
                    type="select"
                    className="form-control"
                    name="levelThreeContentType"
                    value={(!isNew && siteChannelEntity.levelThreeContentType) || 'HTML'}
                  >
                    <option value="HTML">HTML</option>
                    <option value="XML">XML</option>
                    <option value="JSON">JSON</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="levelFourContentTypeLabel">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.levelFourContentType">
                      Level Four Content Type
                    </Translate>
                  </Label>
                  <AvInput
                    id="site-channel-levelFourContentType"
                    type="select"
                    className="form-control"
                    name="levelFourContentType"
                    value={(!isNew && siteChannelEntity.levelFourContentType) || 'HTML'}
                  >
                    <option value="HTML">HTML</option>
                    <option value="XML">XML</option>
                    <option value="JSON">JSON</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="allowExternalUrlLabel" check>
                    <AvInput id="site-channel-allowExternalUrl" type="checkbox" className="form-control" name="allowExternalUrl" />
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.allowExternalUrl">Allow External Url</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="siteUrlLabel" for="siteUrl">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.siteUrl">Site Url</Translate>
                  </Label>
                  <AvField id="site-channel-siteUrl" type="text" name="siteUrl" />
                </AvGroup>
                <AvGroup>
                  <Label id="targetChannelLabel">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.targetChannel">Target Channel</Translate>
                  </Label>
                  <AvInput
                    id="site-channel-targetChannel"
                    type="select"
                    className="form-control"
                    name="targetChannel"
                    value={(!isNew && siteChannelEntity.targetChannel) || 'PUBLISHER'}
                  >
                    <option value="PUBLISHER">PUBLISHER</option>
                    <option value="CATEGORY">CATEGORY</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="targetLabel">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.target">Target</Translate>
                  </Label>
                  <AvInput
                    id="site-channel-target"
                    type="select"
                    className="form-control"
                    name="target"
                    value={(!isNew && siteChannelEntity.target) || 'PUBLISHER'}
                  >
                    <option value="PUBLISHER">PUBLISHER</option>
                    <option value="CATEGORY">CATEGORY</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="siteDomainLabel" for="siteDomain">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.siteDomain">Site Domain</Translate>
                  </Label>
                  <AvField id="site-channel-siteDomain" type="text" name="siteDomain" />
                </AvGroup>
                <AvGroup>
                  <Label for="channelOuterLinks">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.outer">Outer</Translate>
                  </Label>
                  <AvInput
                    id="site-channel-outer"
                    type="select"
                    multiple
                    className="form-control"
                    name="fakechannelOuterLinks"
                    value={this.displayouter(siteChannelEntity)}
                    onChange={this.outerUpdate}
                  >
                    <option value="" key="0" />
                    {channelOuterLinks
                      ? channelOuterLinks.map(otherEntity => (
                          <option value={otherEntity.configName} key={otherEntity.id}>
                            {otherEntity.configName}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvInput id="site-channel-outer" type="hidden" name="outers" value={this.state.idsouter} />
                </AvGroup>
                <AvGroup>
                  <Label for="configMappings">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.mapping">Mapping</Translate>
                  </Label>
                  <AvInput
                    id="site-channel-mapping"
                    type="select"
                    multiple
                    className="form-control"
                    name="fakeconfigMappings"
                    value={this.displaymapping(siteChannelEntity)}
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
                  <AvInput id="site-channel-mapping" type="hidden" name="mappings" value={this.state.idsmapping} />
                </AvGroup>
                <AvGroup>
                  <Label for="configGroups">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.configGroup">Config Group</Translate>
                  </Label>
                  <AvInput
                    id="site-channel-configGroup"
                    type="select"
                    multiple
                    className="form-control"
                    name="fakeconfigGroups"
                    value={this.displayconfigGroup(siteChannelEntity)}
                    onChange={this.configGroupUpdate}
                  >
                    <option value="" key="0" />
                    {configGroups
                      ? configGroups.map(otherEntity => (
                          <option value={otherEntity.name} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvInput id="site-channel-configGroup" type="hidden" name="configGroups" value={this.state.idsconfigGroup} />
                </AvGroup>
                <AvGroup>
                  <Label for="configGroups">
                    <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.targetGroup">Target Group</Translate>
                  </Label>
                  <AvInput
                    id="site-channel-targetGroup"
                    type="select"
                    multiple
                    className="form-control"
                    name="fakeconfigGroups"
                    value={this.displaytargetGroup(siteChannelEntity)}
                    onChange={this.targetGroupUpdate}
                  >
                    <option value="" key="0" />
                    {configGroups
                      ? configGroups.map(otherEntity => (
                          <option value={otherEntity.name} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvInput id="site-channel-targetGroup" type="hidden" name="targetGroups" value={this.state.idstargetGroup} />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/site-channel" replace color="info">
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
  channelOuterLinks: storeState.channelOuterLink.entities,
  configMappings: storeState.configMapping.entities,
  configGroups: storeState.configGroup.entities,
  siteChannelEntity: storeState.siteChannel.entity,
  loading: storeState.siteChannel.loading,
  updating: storeState.siteChannel.updating
});

const mapDispatchToProps = {
  getChannelOuterLinks,
  getConfigMappings,
  getConfigGroups,
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
)(SiteChannelUpdate);
