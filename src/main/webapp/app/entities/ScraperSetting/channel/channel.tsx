import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import {
  Translate,
  translate,
  ICrudSearchAction,
  ICrudGetAllAction,
  getSortState,
  IPaginationBaseState,
  getPaginationItemsNumber,
  JhiPagination
} from 'react-simlife';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './channel.reducer';
import { IChannel } from 'app/shared/model/ScraperSetting/channel.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IChannelProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IChannelState extends IPaginationBaseState {
  search: string;
}

export class Channel extends React.Component<IChannelProps, IChannelState> {
  state: IChannelState = {
    search: '',
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
  }

  search = () => {
    if (this.state.search) {
      this.props.getSearchEntities(this.state.search);
    }
  };

  clear = () => {
    this.props.getEntities();
    this.setState({
      search: ''
    });
  };

  handleSearch = event => this.setState({ search: event.target.value });

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { channelList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="channel-heading">
          <Translate contentKey="scraperGatewayApp.scraperSettingChannel.home.title">Channels</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="scraperGatewayApp.scraperSettingChannel.home.createLabel">Create new Channel</Translate>
          </Link>
        </h2>
        <Row>
          <Col sm="12">
            <AvForm onSubmit={this.search}>
              <AvGroup>
                <InputGroup>
                  <AvInput
                    type="text"
                    name="search"
                    value={this.state.search}
                    onChange={this.handleSearch}
                    placeholder={translate('scraperGatewayApp.scraperSettingChannel.home.search')}
                  />
                  <Button className="input-group-addon">
                    <FontAwesomeIcon icon="search" />
                  </Button>
                  <Button type="reset" className="input-group-addon" onClick={this.clear}>
                    <FontAwesomeIcon icon="trash" />
                  </Button>
                </InputGroup>
              </AvGroup>
            </AvForm>
          </Col>
        </Row>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={this.sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('url')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.url">Url</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('contentType')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.contentType">Content Type</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('schedule')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.schedule">Schedule</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('scheduleTimeZone')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.scheduleTimeZone">Schedule Time Zone</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('totalLevel')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.totalLevel">Total Level</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('archiveLevel')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.archiveLevel">Archive Level</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('unlimitedLevel')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.unlimitedLevel">Unlimited Level</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('fetchEngine')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.fetchEngine">Fetch Engine</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('category')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.category">Category</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('tag')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.tag">Tag</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('categorySlug')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.categorySlug">Category Slug</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('tagSlug')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.tagSlug">Tag Slug</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('countryCode')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.countryCode">Country Code</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('languageCode')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.languageCode">Language Code</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('targetQueueChannel')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.targetQueueChannel">Target Queue Channel</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('topics')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.topics">Topics</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('topicSlugs')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.topicSlugs">Topic Slugs</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('postType')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.postType">Post Type</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('rankingCountry')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.rankingCountry">Ranking Country</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelTotalLevel')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.channelTotalLevel">Channel Total Level</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelArchiveLevel')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.channelArchiveLevel">Channel Archive Level</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelFetchEngine')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.channelFetchEngine">Channel Fetch Engine</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelRanking')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.channelRanking">Channel Ranking</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelTargetQueue')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.channelTargetQueue">Channel Target Queue</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelTargetPostType')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.channelTargetPostType">Channel Target Post Type</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelLevelOneFetchEngine')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.channelLevelOneFetchEngine">
                    Channel Level One Fetch Engine
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelLevelTwoFetchEngine')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.channelLevelTwoFetchEngine">
                    Channel Level Two Fetch Engine
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelLevelThreeFetchEngine')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.channelLevelThreeFetchEngine">
                    Channel Level Three Fetch Engine
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelLevelFourFetchEngine')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.channelLevelFourFetchEngine">
                    Channel Level Four Fetch Engine
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelLevelOneContentType')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.channelLevelOneContentType">
                    Channel Level One Content Type
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelLevelTwoContentType')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.channelLevelTwoContentType">
                    Channel Level Two Content Type
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelLevelThreeContentType')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.channelLevelThreeContentType">
                    Channel Level Three Content Type
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelLevelFourContentType')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.channelLevelFourContentType">
                    Channel Level Four Content Type
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelAllowExternalUrl')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.channelAllowExternalUrl">
                    Channel Allow External Url
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelLogo')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.channelLogo">Channel Logo</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelSiteName')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.channelSiteName">Channel Site Name</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('logo')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.logo">Logo</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('siteName')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.siteName">Site Name</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelType')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.channelType">Channel Type</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('levelOneFetchEngine')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.levelOneFetchEngine">Level One Fetch Engine</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('levelTwoFetchEngine')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.levelTwoFetchEngine">Level Two Fetch Engine</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('levelThreeFetchEngine')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.levelThreeFetchEngine">Level Three Fetch Engine</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('levelFourFetchEngine')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.levelFourFetchEngine">Level Four Fetch Engine</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('levelOneContentType')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.levelOneContentType">Level One Content Type</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('levelTwoContentType')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.levelTwoContentType">Level Two Content Type</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('levelThreeContentType')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.levelThreeContentType">Level Three Content Type</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('levelFourContentType')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.levelFourContentType">Level Four Content Type</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('allowExternalUrl')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.allowExternalUrl">Allow External Url</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('targetChannel')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.targetChannel">Target Channel</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('target')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.target">Target</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('name')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.name">Name</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('siteDomain')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.siteDomain">Site Domain</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('siteUrl')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingChannel.siteUrl">Site Url</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {channelList.map((channel, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${channel.id}`} color="link" size="sm">
                      {channel.id}
                    </Button>
                  </td>
                  <td>{channel.url}</td>
                  <td>{channel.contentType}</td>
                  <td>{channel.schedule}</td>
                  <td>{channel.scheduleTimeZone}</td>
                  <td>{channel.totalLevel}</td>
                  <td>{channel.archiveLevel}</td>
                  <td>{channel.unlimitedLevel ? 'true' : 'false'}</td>
                  <td>{channel.fetchEngine}</td>
                  <td>{channel.category}</td>
                  <td>{channel.tag}</td>
                  <td>{channel.categorySlug}</td>
                  <td>{channel.tagSlug}</td>
                  <td>{channel.countryCode}</td>
                  <td>{channel.languageCode}</td>
                  <td>{channel.targetQueueChannel}</td>
                  <td>{channel.topics}</td>
                  <td>{channel.topicSlugs}</td>
                  <td>{channel.postType}</td>
                  <td>{channel.rankingCountry}</td>
                  <td>{channel.channelTotalLevel}</td>
                  <td>{channel.channelArchiveLevel}</td>
                  <td>{channel.channelFetchEngine}</td>
                  <td>{channel.channelRanking}</td>
                  <td>{channel.channelTargetQueue}</td>
                  <td>{channel.channelTargetPostType}</td>
                  <td>{channel.channelLevelOneFetchEngine}</td>
                  <td>{channel.channelLevelTwoFetchEngine}</td>
                  <td>{channel.channelLevelThreeFetchEngine}</td>
                  <td>{channel.channelLevelFourFetchEngine}</td>
                  <td>{channel.channelLevelOneContentType}</td>
                  <td>{channel.channelLevelTwoContentType}</td>
                  <td>{channel.channelLevelThreeContentType}</td>
                  <td>{channel.channelLevelFourContentType}</td>
                  <td>{channel.channelAllowExternalUrl ? 'true' : 'false'}</td>
                  <td>{channel.channelLogo}</td>
                  <td>{channel.channelSiteName}</td>
                  <td>{channel.logo}</td>
                  <td>{channel.siteName}</td>
                  <td>{channel.channelType}</td>
                  <td>{channel.levelOneFetchEngine}</td>
                  <td>{channel.levelTwoFetchEngine}</td>
                  <td>{channel.levelThreeFetchEngine}</td>
                  <td>{channel.levelFourFetchEngine}</td>
                  <td>{channel.levelOneContentType}</td>
                  <td>{channel.levelTwoContentType}</td>
                  <td>{channel.levelThreeContentType}</td>
                  <td>{channel.levelFourContentType}</td>
                  <td>{channel.allowExternalUrl ? 'true' : 'false'}</td>
                  <td>{channel.targetChannel}</td>
                  <td>{channel.target}</td>
                  <td>{channel.name}</td>
                  <td>{channel.siteDomain}</td>
                  <td>{channel.siteUrl}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${channel.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${channel.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${channel.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Row className="justify-content-center">
          <JhiPagination
            items={getPaginationItemsNumber(totalItems, this.state.itemsPerPage)}
            activePage={this.state.activePage}
            onSelect={this.handlePagination}
            maxButtons={5}
          />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ channel }: IRootState) => ({
  channelList: channel.entities,
  totalItems: channel.totalItems
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channel);
