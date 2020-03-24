import React from 'react';
import { Animated } from 'react-animated-css';
import { connect } from 'react-redux';
import styled from 'styled-components';
import _map from 'lodash/map';
import _keys from 'lodash/keys';
import _every from 'lodash/every';
import { Checkmark } from 'grommet-icons';
import { Paper } from '../../components/Paper';
import { Text } from '../../components/Text';
import {
  AcknowledgementIdsEnum,
  AcknowledgementStateInterface,
  StoreState,
} from '../../store/reducers';

const Container = styled.div`
  min-width: 250px;
  margin-left: 30px;
  @media only screen and (max-width: ${p => p.theme.screenSizes.large}) {
    display: none;
  }
`;

const acknowledgements = {
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

const IconContainer = styled.div`
  width: 30px;
  margin-right: 5px;
  margin-left: 5px;
  display: flex;
  align-items: center;
`;
const CheckContainer = styled.div`
  background-color: white;
  margin-left: 5px;
`;

interface P {
  theme: any;
  disabled: boolean;
  active: boolean;
}

const StyledText = styled(Text)`
  cursor: pointer;
  color: ${(p: P) => (p.disabled ? p.theme.gray.medium : p.theme.gray.dark)};
  font-weight: ${(p: P) => (p.active ? 600 : 200)};
  font-size: 18px;
  line-height: 40px;
`;
const VerticalLine = styled.span`
  background-color: ${(p: { theme: any }) => p.theme.gray.medium};
  width: 1px;
  height: 380px;
  position: absolute;
  left: 25px;
  top: 16px;
`;
const Radial = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: auto;
  border: 7px solid white;
  background-color: ${(p: { theme: any }) => p.theme.gray.medium};
`;

export interface AcknowledgementProgressTrackerProps {
  acknowledgementState: AcknowledgementStateInterface;
  activeAcknowledgement: AcknowledgementIdsEnum;
  setActiveAcknowledgement: (id: AcknowledgementIdsEnum) => void;
}

export const _AcknowledgementProgressTracker = ({
  acknowledgementState,
  activeAcknowledgement,
  setActiveAcknowledgement,
}: AcknowledgementProgressTrackerProps): JSX.Element => {
  const renderAcknowledgement = (
    text: string,
    acknowledgementId: AcknowledgementIdsEnum
  ) => {
    const isComplete = acknowledgementState[acknowledgementId];
    const previousAcknowledgementStatuses = _keys(acknowledgements)
      .slice(0, acknowledgementId)
      // @ts-ignore
      .map(id => acknowledgementState[id]);
    const disabled = !_every(previousAcknowledgementStatuses);
    // eslint-disable-next-line eqeqeq
    const isActive = activeAcknowledgement == acknowledgementId;
    const handleClick = () => {
      if (!disabled) {
        setActiveAcknowledgement(acknowledgementId);
      }
    };
    return (
      <div className="flex" key={acknowledgementId} style={{ zIndex: 1 }}>
        <IconContainer>
          {isComplete ? (
            <CheckContainer>
              <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible>
                <Checkmark size="medium" color="green" />
              </Animated>
            </CheckContainer>
          ) : (
            <Radial />
          )}
        </IconContainer>
        <StyledText disabled={disabled} onClick={handleClick} active={isActive}>
          {text}
        </StyledText>
      </div>
    );
  };

  return (
    <Container>
      <Paper pad="xsmall" className="relative">
        {_map(acknowledgements, renderAcknowledgement)}
        <VerticalLine />
      </Paper>
    </Container>
  );
};

const mstp = ({ acknowledgementState }: StoreState) => ({
  acknowledgementState,
});

export const AcknowledgementProgressTracker = connect(mstp)(
  _AcknowledgementProgressTracker
);
