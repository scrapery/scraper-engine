import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-simlife';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IChannelOuterLink } from 'app/shared/model/ScraperSetting/channel-outer-link.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './channel-outer-link.reducer';

export interface IChannelOuterLinkDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class ChannelOuterLinkDeleteDialog extends React.Component<IChannelOuterLinkDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.channelOuterLinkEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { channelOuterLinkEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody>
          <Translate
            contentKey="scraperGatewayApp.scraperSettingChannelOuterLink.delete.question"
            interpolate={{ id: channelOuterLinkEntity.id }}
          >
            Are you sure you want to delete this ChannelOuterLink?
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

const mapStateToProps = ({ channelOuterLink }: IRootState) => ({
  channelOuterLinkEntity: channelOuterLink.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelOuterLinkDeleteDialog);
