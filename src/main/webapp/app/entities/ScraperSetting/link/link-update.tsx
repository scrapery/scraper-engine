import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-simlife';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './link.reducer';
import { ILink } from 'app/shared/model/ScraperSetting/link.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface ILinkUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ILinkUpdateState {
  isNew: boolean;
}

export class LinkUpdate extends React.Component<ILinkUpdateProps, ILinkUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { linkEntity } = this.props;
      const entity = {
        ...linkEntity,
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
    this.props.history.push('/entity/link');
  };

  render() {
    const isInvalid = false;
    const { linkEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="scraperGatewayApp.scraperSettingLink.home.createOrEditLabel">
              <Translate contentKey="scraperGatewayApp.scraperSettingLink.home.createOrEditLabel">Create or edit a Link</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : linkEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="link-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="urlLabel" for="url">
                    <Translate contentKey="scraperGatewayApp.scraperSettingLink.url">Url</Translate>
                  </Label>
                  <AvField id="link-url" type="text" name="url" />
                </AvGroup>
                <AvGroup>
                  <Label id="scrapeDataIdLabel" for="scrapeDataId">
                    <Translate contentKey="scraperGatewayApp.scraperSettingLink.scrapeDataId">Scrape Data Id</Translate>
                  </Label>
                  <AvField id="link-scrapeDataId" type="number" className="form-control" name="scrapeDataId" />
                </AvGroup>
                <AvGroup>
                  <Label id="scrapeIdLabel" for="scrapeId">
                    <Translate contentKey="scraperGatewayApp.scraperSettingLink.scrapeId">Scrape Id</Translate>
                  </Label>
                  <AvField id="link-scrapeId" type="number" className="form-control" name="scrapeId" />
                </AvGroup>
                <AvGroup>
                  <Label id="currentLevelLabel" for="currentLevel">
                    <Translate contentKey="scraperGatewayApp.scraperSettingLink.currentLevel">Current Level</Translate>
                  </Label>
                  <AvField id="link-currentLevel" type="number" className="form-control" name="currentLevel" />
                </AvGroup>
                <AvGroup>
                  <Label id="scrapeUrlLabel" for="scrapeUrl">
                    <Translate contentKey="scraperGatewayApp.scraperSettingLink.scrapeUrl">Scrape Url</Translate>
                  </Label>
                  <AvField id="link-scrapeUrl" type="text" name="scrapeUrl" />
                </AvGroup>
                <AvGroup>
                  <Label id="parentUrlLabel" for="parentUrl">
                    <Translate contentKey="scraperGatewayApp.scraperSettingLink.parentUrl">Parent Url</Translate>
                  </Label>
                  <AvField id="link-parentUrl" type="text" name="parentUrl" />
                </AvGroup>
                <AvGroup>
                  <Label id="scrapeResultIdLabel" for="scrapeResultId">
                    <Translate contentKey="scraperGatewayApp.scraperSettingLink.scrapeResultId">Scrape Result Id</Translate>
                  </Label>
                  <AvField id="link-scrapeResultId" type="number" className="form-control" name="scrapeResultId" />
                </AvGroup>
                <AvGroup>
                  <Label id="scrapeResultPathLabel" for="scrapeResultPath">
                    <Translate contentKey="scraperGatewayApp.scraperSettingLink.scrapeResultPath">Scrape Result Path</Translate>
                  </Label>
                  <AvField id="link-scrapeResultPath" type="text" name="scrapeResultPath" />
                </AvGroup>
                <AvGroup>
                  <Label id="scrapeREsultContentTypeLabel" for="scrapeREsultContentType">
                    <Translate contentKey="scraperGatewayApp.scraperSettingLink.scrapeREsultContentType">
                      Scrape R Esult Content Type
                    </Translate>
                  </Label>
                  <AvField id="link-scrapeREsultContentType" type="text" name="scrapeREsultContentType" />
                </AvGroup>
                <AvGroup>
                  <Label id="crawlStatusLabel">
                    <Translate contentKey="scraperGatewayApp.scraperSettingLink.crawlStatus">Crawl Status</Translate>
                  </Label>
                  <AvInput
                    id="link-crawlStatus"
                    type="select"
                    className="form-control"
                    name="crawlStatus"
                    value={(!isNew && linkEntity.crawlStatus) || 'SUCCESS'}
                  >
                    <option value="SUCCESS">SUCCESS</option>
                    <option value="FALSE">FALSE</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="internalUrlLabel" for="internalUrl">
                    <Translate contentKey="scraperGatewayApp.scraperSettingLink.internalUrl">Internal Url</Translate>
                  </Label>
                  <AvField id="link-internalUrl" type="text" name="internalUrl" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/link" replace color="info">
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
  linkEntity: storeState.link.entity,
  loading: storeState.link.loading,
  updating: storeState.link.updating
});

const mapDispatchToProps = {
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
)(LinkUpdate);
