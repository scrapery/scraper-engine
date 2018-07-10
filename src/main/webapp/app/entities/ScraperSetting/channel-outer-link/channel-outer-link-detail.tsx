import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-simlife';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './channel-outer-link.reducer';
import { IChannelOuterLink } from 'app/shared/model/ScraperSetting/channel-outer-link.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IChannelOuterLinkDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class ChannelOuterLinkDetail extends React.Component<IChannelOuterLinkDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { channelOuterLinkEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="scraperGatewayApp.scraperSettingChannelOuterLink.detail.title">ChannelOuterLink</Translate> [<b>
              {channelOuterLinkEntity.id}
            </b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="configName">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannelOuterLink.configName">Config Name</Translate>
              </span>
            </dt>
            <dd>{channelOuterLinkEntity.configName}</dd>
            <dt>
              <span id="selectorName">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannelOuterLink.selectorName">Selector Name</Translate>
              </span>
            </dt>
            <dd>{channelOuterLinkEntity.selectorName}</dd>
            <dt>
              <span id="selectorAttr">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannelOuterLink.selectorAttr">Selector Attr</Translate>
              </span>
            </dt>
            <dd>{channelOuterLinkEntity.selectorAttr}</dd>
            <dt>
              <span id="host">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannelOuterLink.host">Host</Translate>
              </span>
            </dt>
            <dd>{channelOuterLinkEntity.host}</dd>
            <dt>
              <span id="url">
                <Translate contentKey="scraperGatewayApp.scraperSettingChannelOuterLink.url">Url</Translate>
              </span>
            </dt>
            <dd>{channelOuterLinkEntity.url}</dd>
          </dl>
          <Button tag={Link} to="/entity/channel-outer-link" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/channel-outer-link/${channelOuterLinkEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ channelOuterLink }: IRootState) => ({
  channelOuterLinkEntity: channelOuterLink.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelOuterLinkDetail);
