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
import { getSearchEntities, getEntities } from './fetch-site-action.reducer';
import { IFetchSiteAction } from 'app/shared/model/ScraperSetting/fetch-site-action.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IFetchSiteActionProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IFetchSiteActionState extends IPaginationBaseState {
  search: string;
}

export class FetchSiteAction extends React.Component<IFetchSiteActionProps, IFetchSiteActionState> {
  state: IFetchSiteActionState = {
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
    const { fetchSiteActionList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="fetch-site-action-heading">
          <Translate contentKey="scraperGatewayApp.scraperSettingFetchSiteAction.home.title">Fetch Site Actions</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="scraperGatewayApp.scraperSettingFetchSiteAction.home.createLabel">
              Create new Fetch Site Action
            </Translate>
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
                    placeholder={translate('scraperGatewayApp.scraperSettingFetchSiteAction.home.search')}
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
                  <Translate contentKey="scraperGatewayApp.scraperSettingFetchSiteAction.url">Url</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('domain')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingFetchSiteAction.domain">Domain</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('host')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingFetchSiteAction.host">Host</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('activeLevel')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingFetchSiteAction.activeLevel">Active Level</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('selectorAction')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingFetchSiteAction.selectorAction">Selector Action</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('selectorActionAttr')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingFetchSiteAction.selectorActionAttr">
                    Selector Action Attr
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('action')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingFetchSiteAction.action">Action</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('totalActions')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingFetchSiteAction.totalActions">Total Actions</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('seleniumActionGetContent')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingFetchSiteAction.seleniumActionGetContent">
                    Selenium Action Get Content
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('selectorNextPageUrlsName')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingFetchSiteAction.selectorNextPageUrlsName">
                    Selector Next Page Urls Name
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('selectorNextPageUrlsNameAttr')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingFetchSiteAction.selectorNextPageUrlsNameAttr">
                    Selector Next Page Urls Name Attr
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {fetchSiteActionList.map((fetchSiteAction, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${fetchSiteAction.id}`} color="link" size="sm">
                      {fetchSiteAction.id}
                    </Button>
                  </td>
                  <td>{fetchSiteAction.url}</td>
                  <td>{fetchSiteAction.domain}</td>
                  <td>{fetchSiteAction.host}</td>
                  <td>{fetchSiteAction.activeLevel}</td>
                  <td>{fetchSiteAction.selectorAction}</td>
                  <td>{fetchSiteAction.selectorActionAttr}</td>
                  <td>{fetchSiteAction.action}</td>
                  <td>{fetchSiteAction.totalActions}</td>
                  <td>{fetchSiteAction.seleniumActionGetContent}</td>
                  <td>{fetchSiteAction.selectorNextPageUrlsName}</td>
                  <td>{fetchSiteAction.selectorNextPageUrlsNameAttr}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${fetchSiteAction.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${fetchSiteAction.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${fetchSiteAction.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ fetchSiteAction }: IRootState) => ({
  fetchSiteActionList: fetchSiteAction.entities,
  totalItems: fetchSiteAction.totalItems
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
)(FetchSiteAction);
