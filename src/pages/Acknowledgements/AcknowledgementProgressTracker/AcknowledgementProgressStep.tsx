import React from 'react';
import styled from 'styled-components';
import _keys from 'lodash/keys';
import _every from 'lodash/every';
import { Animated } from 'react-animated-css';
import { Checkmark } from 'grommet-icons';
import {
  AcknowledgementIdsEnum,
  AcknowledgementStateInterface,
} from '../../../store/reducers';
import { Text } from '../../../components/Text';

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
// const VerticalLine = styled.span`
//   background-color: ${(p: { theme: any }) => p.theme.gray.medium};
//   width: 1px;
//   height: 380px;
//   position: absolute;
//   left: 25px;
//   top: 16px;
// `;
const Radial = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: auto;
  border: 7px solid white;
  background-color: ${(p: { theme: any }) => p.theme.gray.medium};
`;

interface ProgressItemProps {
  acknowledgementsWithCopy: any;
  acknowledgementId: AcknowledgementIdsEnum;
  acknowledgementState: AcknowledgementStateInterface;
  setActiveAcknowledgementId: (id: AcknowledgementIdsEnum) => void;
  isActive: boolean;
}

export const AcknowledgementProgressStep = ({
  acknowledgementsWithCopy,
  acknowledgementId,
  acknowledgementState,
  setActiveAcknowledgementId,
  isActive,
}: ProgressItemProps) => {
  const isComplete = acknowledgementState[acknowledgementId];
  const previousAcknowledgementStatuses = _keys(acknowledgementsWithCopy)
    .slice(0, acknowledgementId)
    // @ts-ignore
    .map(id => acknowledgementState[id]);
  const disabled = !_every(previousAcknowledgementStatuses);

  const handleClick = () => {
    if (!disabled) {
      setActiveAcknowledgementId(acknowledgementId);
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
        {acknowledgementsWithCopy[acknowledgementId]}
      </StyledText>
    </div>
  );
};
