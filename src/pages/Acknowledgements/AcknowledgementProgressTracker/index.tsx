import React from 'react';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import _map from 'lodash/map';
import {
  AcknowledgementIdsEnum,
  AcknowledgementStateInterface,
  StoreState,
} from '../../../store/reducers';
import { AcknowledgementProgressStep } from './AcknowledgementProgressStep';

const Container = styled.div`
  min-width: 250px;
  margin-right: 40px;
  @media only screen and (max-width: 940px) {
    display: none;
  }
`;

export interface AcknowledgementProgressTrackerProps {
  acknowledgementState: AcknowledgementStateInterface;
  activeAcknowledgementId: AcknowledgementIdsEnum;
  setActiveAcknowledgementId: (id: AcknowledgementIdsEnum) => void;
}

export const _AcknowledgementProgressTracker = ({
  acknowledgementState,
  activeAcknowledgementId,
  setActiveAcknowledgementId,
}: AcknowledgementProgressTrackerProps): JSX.Element => {
  const { formatMessage } = useIntl();
  const acknowledgementsWithCopy = {
    [AcknowledgementIdsEnum.introSection]: formatMessage({
      defaultMessage: 'Proof of stake',
    }),
    [AcknowledgementIdsEnum.deposit]: formatMessage({
      defaultMessage: 'Deposit',
    }),
    [AcknowledgementIdsEnum.terminal]: formatMessage({
      defaultMessage: 'The terminal',
    }),
    [AcknowledgementIdsEnum.responsibilities]: formatMessage({
      defaultMessage: 'Uptime',
    }),
    [AcknowledgementIdsEnum.slashing]: formatMessage({
      defaultMessage: 'Bad behaviour',
    }),
    [AcknowledgementIdsEnum.keyManagement]: formatMessage({
      defaultMessage: 'Key management',
    }),
    [AcknowledgementIdsEnum.commitment]: formatMessage({
      defaultMessage: 'Commitment',
    }),
    [AcknowledgementIdsEnum.earlyAdoptionRisks]: formatMessage({
      defaultMessage: 'Early adoption risks',
    }),
    [AcknowledgementIdsEnum.checklist]: formatMessage({
      defaultMessage: 'Checklist',
    }),
    [AcknowledgementIdsEnum.confirmation]: formatMessage({
      defaultMessage: 'Confirmation',
    }),
  };
  return (
    <Container>
      {_map(
        acknowledgementsWithCopy,
        (_, acknowledgementId: AcknowledgementIdsEnum) => {
          return (
            <AcknowledgementProgressStep
              key={acknowledgementId}
              acknowledgementsWithCopy={acknowledgementsWithCopy}
              acknowledgementId={acknowledgementId}
              setActiveAcknowledgementId={setActiveAcknowledgementId}
              /* eslint-disable-next-line eqeqeq */
              isActive={activeAcknowledgementId == acknowledgementId}
              acknowledgementState={acknowledgementState}
            />
          );
        }
      )}
    </Container>
  );
};

const mapStateToProps = ({ acknowledgementState }: StoreState) => ({
  acknowledgementState,
});

export const AcknowledgementProgressTracker = connect(mapStateToProps)(
  _AcknowledgementProgressTracker
);
