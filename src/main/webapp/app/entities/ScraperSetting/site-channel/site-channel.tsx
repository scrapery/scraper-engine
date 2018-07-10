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
import { getSearchEntities, getEntities } from './site-channel.reducer';
import { ISiteChannel } from 'app/shared/model/ScraperSetting/site-channel.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ISiteChannelProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ISiteChannelState extends IPaginationBaseState {
  search: string;
}

export class SiteChannel extends React.Component<ISiteChannelProps, ISiteChannelState> {
  state: ISiteChannelState = {
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
    const { siteChannelList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="site-channel-heading">
          <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.home.title">Site Channels</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.home.createLabel">Create new Site Channel</Translate>
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
                    placeholder={translate('scraperGatewayApp.scraperSettingSiteChannel.home.search')}
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
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.url">Url</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('contentType')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.contentType">Content Type</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('schedule')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.schedule">Schedule</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('scheduleTimeZone')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.scheduleTimeZone">Schedule Time Zone</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('totalLevel')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.totalLevel">Total Level</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('archiveLevel')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.archiveLevel">Archive Level</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('unlimitedLevel')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.unlimitedLevel">Unlimited Level</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('fetchEngine')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.fetchEngine">Fetch Engine</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('category')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.category">Category</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('tag')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.tag">Tag</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('categorySlug')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.categorySlug">Category Slug</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('tagSlug')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.tagSlug">Tag Slug</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('countryCode')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.countryCode">Country Code</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('languageCode')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.languageCode">Language Code</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('targetQueueChannel')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.targetQueueChannel">Target Queue Channel</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('topics')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.topics">Topics</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('topicSlugs')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.topicSlugs">Topic Slugs</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('postType')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.postType">Post Type</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('rankingCountry')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.rankingCountry">Ranking Country</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelTotalLevel')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelTotalLevel">Channel Total Level</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelArchiveLevel')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelArchiveLevel">Channel Archive Level</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelFetchEngine')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelFetchEngine">Channel Fetch Engine</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelRanking')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelRanking">Channel Ranking</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelTargetQueue')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelTargetQueue">Channel Target Queue</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelTargetPostType')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelTargetPostType">
                    Channel Target Post Type
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelLevelOneFetchEngine')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelLevelOneFetchEngine">
                    Channel Level One Fetch Engine
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelLevelTwoFetchEngine')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelLevelTwoFetchEngine">
                    Channel Level Two Fetch Engine
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelLevelThreeFetchEngine')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelLevelThreeFetchEngine">
                    Channel Level Three Fetch Engine
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelLevelFourFetchEngine')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelLevelFourFetchEngine">
                    Channel Level Four Fetch Engine
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelLevelOneContentType')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelLevelOneContentType">
                    Channel Level One Content Type
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelLevelTwoContentType')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelLevelTwoContentType">
                    Channel Level Two Content Type
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelLevelThreeContentType')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelLevelThreeContentType">
                    Channel Level Three Content Type
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelLevelFourContentType')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelLevelFourContentType">
                    Channel Level Four Content Type
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelAllowExternalUrl')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelAllowExternalUrl">
                    Channel Allow External Url
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelLogo')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelLogo">Channel Logo</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelSiteName')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelSiteName">Channel Site Name</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('logo')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.logo">Logo</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('siteName')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.siteName">Site Name</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('channelType')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.channelType">Channel Type</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('levelOneFetchEngine')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.levelOneFetchEngine">Level One Fetch Engine</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('levelTwoFetchEngine')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.levelTwoFetchEngine">Level Two Fetch Engine</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('levelThreeFetchEngine')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.levelThreeFetchEngine">
                    Level Three Fetch Engine
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('levelFourFetchEngine')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.levelFourFetchEngine">
                    Level Four Fetch Engine
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('levelOneContentType')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.levelOneContentType">Level One Content Type</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('levelTwoContentType')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.levelTwoContentType">Level Two Content Type</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('levelThreeContentType')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.levelThreeContentType">
                    Level Three Content Type
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('levelFourContentType')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.levelFourContentType">
                    Level Four Content Type
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('allowExternalUrl')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.allowExternalUrl">Allow External Url</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('siteUrl')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.siteUrl">Site Url</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('targetChannel')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.targetChannel">Target Channel</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('target')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.target">Target</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('siteDomain')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingSiteChannel.siteDomain">Site Domain</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {siteChannelList.map((siteChannel, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${siteChannel.id}`} color="link" size="sm">
                      {siteChannel.id}
                    </Button>
                  </td>
                  <td>{siteChannel.url}</td>
                  <td>{siteChannel.contentType}</td>
                  <td>{siteChannel.schedule}</td>
                  <td>{siteChannel.scheduleTimeZone}</td>
                  <td>{siteChannel.totalLevel}</td>
                  <td>{siteChannel.archiveLevel}</td>
                  <td>{siteChannel.unlimitedLevel ? 'true' : 'false'}</td>
                  <td>{siteChannel.fetchEngine}</td>
                  <td>{siteChannel.category}</td>
                  <td>{siteChannel.tag}</td>
                  <td>{siteChannel.categorySlug}</td>
                  <td>{siteChannel.tagSlug}</td>
                  <td>{siteChannel.countryCode}</td>
                  <td>{siteChannel.languageCode}</td>
                  <td>{siteChannel.targetQueueChannel}</td>
                  <td>{siteChannel.topics}</td>
                  <td>{siteChannel.topicSlugs}</td>
                  <td>{siteChannel.postType}</td>
                  <td>{siteChannel.rankingCountry}</td>
                  <td>{siteChannel.channelTotalLevel}</td>
                  <td>{siteChannel.channelArchiveLevel}</td>
                  <td>{siteChannel.channelFetchEngine}</td>
                  <td>{siteChannel.channelRanking}</td>
                  <td>{siteChannel.channelTargetQueue}</td>
                  <td>{siteChannel.channelTargetPostType}</td>
                  <td>{siteChannel.channelLevelOneFetchEngine}</td>
                  <td>{siteChannel.channelLevelTwoFetchEngine}</td>
                  <td>{siteChannel.channelLevelThreeFetchEngine}</td>
                  <td>{siteChannel.channelLevelFourFetchEngine}</td>
                  <td>{siteChannel.channelLevelOneContentType}</td>
                  <td>{siteChannel.channelLevelTwoContentType}</td>
                  <td>{siteChannel.channelLevelThreeContentType}</td>
                  <td>{siteChannel.channelLevelFourContentType}</td>
                  <td>{siteChannel.channelAllowExternalUrl ? 'true' : 'false'}</td>
                  <td>{siteChannel.channelLogo}</td>
                  <td>{siteChannel.channelSiteName}</td>
                  <td>{siteChannel.logo}</td>
                  <td>{siteChannel.siteName}</td>
                  <td>{siteChannel.channelType}</td>
                  <td>{siteChannel.levelOneFetchEngine}</td>
                  <td>{siteChannel.levelTwoFetchEngine}</td>
                  <td>{siteChannel.levelThreeFetchEngine}</td>
                  <td>{siteChannel.levelFourFetchEngine}</td>
                  <td>{siteChannel.levelOneContentType}</td>
                  <td>{siteChannel.levelTwoContentType}</td>
                  <td>{siteChannel.levelThreeContentType}</td>
                  <td>{siteChannel.levelFourContentType}</td>
                  <td>{siteChannel.allowExternalUrl ? 'true' : 'false'}</td>
                  <td>{siteChannel.siteUrl}</td>
                  <td>{siteChannel.targetChannel}</td>
                  <td>{siteChannel.target}</td>
                  <td>{siteChannel.siteDomain}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${siteChannel.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${siteChannel.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${siteChannel.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ siteChannel }: IRootState) => ({
  siteChannelList: siteChannel.entities,
  totalItems: siteChannel.totalItems
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
)(SiteChannel);
