import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import {
  byteSize,
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
import { getSearchEntities, getEntities } from './try-parser.reducer';
import { ITryParser } from 'app/shared/model/ScraperSetting/try-parser.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ITryParserProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ITryParserState extends IPaginationBaseState {
  search: string;
}

export class TryParser extends React.Component<ITryParserProps, ITryParserState> {
  state: ITryParserState = {
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
    const { tryParserList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="try-parser-heading">
          <Translate contentKey="scraperGatewayApp.scraperSettingTryParser.home.title">Try Parsers</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="scraperGatewayApp.scraperSettingTryParser.home.createLabel">Create new Try Parser</Translate>
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
                    placeholder={translate('scraperGatewayApp.scraperSettingTryParser.home.search')}
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
                  <Translate contentKey="scraperGatewayApp.scraperSettingTryParser.url">Url</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('userAgent')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingTryParser.userAgent">User Agent</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('htmlContent')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingTryParser.htmlContent">Html Content</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('parsedContent')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingTryParser.parsedContent">Parsed Content</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('selector')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingTryParser.selector">Selector</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('selectorResult')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingTryParser.selectorResult">Selector Result</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('fetchEngine')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingTryParser.fetchEngine">Fetch Engine</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('attributeSelector')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingTryParser.attributeSelector">Attribute Selector</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('docType')}>
                  <Translate contentKey="scraperGatewayApp.scraperSettingTryParser.docType">Doc Type</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {tryParserList.map((tryParser, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${tryParser.id}`} color="link" size="sm">
                      {tryParser.id}
                    </Button>
                  </td>
                  <td>{tryParser.url}</td>
                  <td>{tryParser.userAgent}</td>
                  <td>{tryParser.htmlContent}</td>
                  <td>{tryParser.parsedContent}</td>
                  <td>{tryParser.selector}</td>
                  <td>{tryParser.selectorResult}</td>
                  <td>{tryParser.fetchEngine}</td>
                  <td>{tryParser.attributeSelector}</td>
                  <td>{tryParser.docType}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${tryParser.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tryParser.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tryParser.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ tryParser }: IRootState) => ({
  tryParserList: tryParser.entities,
  totalItems: tryParser.totalItems
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
)(TryParser);
