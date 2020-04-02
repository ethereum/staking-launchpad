import React from 'react';
import { connect } from 'react-redux';
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

const acknowledgementsWithCopy = {
  [AcknowledgementIdsEnum.introSection]: 'Overview',
  [AcknowledgementIdsEnum.signup]: 'Signup',
  [AcknowledgementIdsEnum.responsibilities]: 'Responsibilities',
  [AcknowledgementIdsEnum.slashing]: 'Slashing',
  [AcknowledgementIdsEnum.keyManagement]: 'Key Management',
  [AcknowledgementIdsEnum.signingKeys]: 'Signing Keys',
  [AcknowledgementIdsEnum.transferDelay]: 'Transfer Delay',
  [AcknowledgementIdsEnum.commitment]: 'Commitment',
  [AcknowledgementIdsEnum.earlyAdoptionRisks]: 'Early Adoption Risks',
  [AcknowledgementIdsEnum.confirmation]: 'Confirmation',
};

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
              isActive={activeAcknowledgementId == acknowledgementId}
              acknowledgementState={acknowledgementState}
            />
          );
        }
      )}
    </Container>
  );
};

const mstp = ({ acknowledgementState }: StoreState) => ({
  acknowledgementState,
});

export const AcknowledgementProgressTracker = connect(mstp)(
  _AcknowledgementProgressTracker
);
