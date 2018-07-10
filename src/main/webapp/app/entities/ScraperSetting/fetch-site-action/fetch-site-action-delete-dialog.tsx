import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-simlife';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IFetchSiteAction } from 'app/shared/model/ScraperSetting/fetch-site-action.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './fetch-site-action.reducer';

export interface IFetchSiteActionDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class FetchSiteActionDeleteDialog extends React.Component<IFetchSiteActionDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.fetchSiteActionEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { fetchSiteActionEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody>
          <Translate
            contentKey="scraperGatewayApp.scraperSettingFetchSiteAction.delete.question"
            interpolate={{ id: fetchSiteActionEntity.id }}
          >
            Are you sure you want to delete this FetchSiteAction?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />&nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />&nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ fetchSiteAction }: IRootState) => ({
  fetchSiteActionEntity: fetchSiteAction.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FetchSiteActionDeleteDialog);
