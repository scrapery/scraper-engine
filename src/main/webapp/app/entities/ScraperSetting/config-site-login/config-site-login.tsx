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
import { getSearchEntities, getEntities } from './config-site-login.reducer';
import { IConfigSiteLogin } from 'app/shared/model/ScraperSetting/config-site-login.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IConfigSiteLoginProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IConfigSiteLoginState extends IPaginationBaseState {
  search: string;
}

export class ConfigSiteLogin extends React.Component<IConfigSiteLoginProps, IConfigSiteLoginState> {
  state: IConfigSiteLoginState = {
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
    const { configSiteLoginList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="config-site-login-heading">
          <Translate contentKey="scraperGatewayApp.scraperSettingConfigSiteLogin.home.title">Config Site Logins</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="scraperGatewayApp.scraperSettingConfigSiteLogin.home.createLabel">
              Create new Config Site Login
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
                    placeholder={translate('scraperGatewayApp.scraperSettingConfigSiteLogin.home.search')}
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
                  <Translate contentKey="scraperGatewayApp.scraperSettingConfigSiteLogin.url">Url</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('domain')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingConfigSiteLogin.domain">Domain</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('host')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingConfigSiteLogin.host">Host</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('selectorAction')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingConfigSiteLogin.selectorAction">Selector Action</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('selectorUsername')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingConfigSiteLogin.selectorUsername">Selector Username</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('selectorPassword')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingConfigSiteLogin.selectorPassword">Selector Password</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('selectorButtonLogin')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingConfigSiteLogin.selectorButtonLogin">
                    Selector Button Login
                  </Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('username')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingConfigSiteLogin.username">Username</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('password')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingConfigSiteLogin.password">Password</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('redirectUrl')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingConfigSiteLogin.redirectUrl">Redirect Url</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {configSiteLoginList.map((configSiteLogin, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${configSiteLogin.id}`} color="link" size="sm">
                      {configSiteLogin.id}
                    </Button>
                  </td>
                  <td>{configSiteLogin.url}</td>
                  <td>{configSiteLogin.domain}</td>
                  <td>{configSiteLogin.host}</td>
                  <td>{configSiteLogin.selectorAction}</td>
                  <td>{configSiteLogin.selectorUsername}</td>
                  <td>{configSiteLogin.selectorPassword}</td>
                  <td>{configSiteLogin.selectorButtonLogin}</td>
                  <td>{configSiteLogin.username}</td>
                  <td>{configSiteLogin.password}</td>
                  <td>{configSiteLogin.redirectUrl}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${configSiteLogin.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${configSiteLogin.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${configSiteLogin.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ configSiteLogin }: IRootState) => ({
  configSiteLoginList: configSiteLogin.entities,
  totalItems: configSiteLogin.totalItems
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
)(ConfigSiteLogin);
