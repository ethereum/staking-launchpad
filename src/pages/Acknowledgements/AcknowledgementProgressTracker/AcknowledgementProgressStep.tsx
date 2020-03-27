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

interface Props {
  theme: any;
  disabled: boolean;
  isActive: boolean;
}

const Container = styled.div`
  position: relative;
  display: flex;
  background-color: white;
  width: ${(p: Props) => (p.isActive ? '100%' : '235px')};
  margin: auto auto 20px;
  border-radius: 4px;
  border: 1px solid ${(p: Props) => p.theme.gray.light};
  box-shadow: ${(p: Props) =>
    p.isActive
      ? '-webkit-box-shadow:0 0 10px rgba(0, 0, 0, 0.5);\n' +
        '\t-moz-box-shadow:0 0 10px rgba(0, 0, 0, 0.5);\n' +
        '\tbox-shadow:0 0 10px rgba(0, 0, 0, 0.5);'
      : 'inherit'};
  cursor: ${(p: Props) => (p.disabled ? 'default' : 'pointer')};
`;
const IndexContainer = styled.div`
  background-color: ${(p: { theme: any }) => p.theme.gray.light};
  padding: 10px 15px;
`;

const CheckContainer = styled.div`
  background-color: ${(p: { theme: any; isActive: boolean }) =>
    p.isActive ? p.theme.green.dark : p.theme.green.medium};
  position: absolute;
  right: -20px;
  top: -20px;
  border-radius: 50%;
  padding: ${(p: { isActive: boolean }) =>
    p.isActive ? '7px 9px 4px;' : '3px 5px 0px;'};
`;

const StyledText = styled(Text)`
  color: ${(p: Props) =>
    p.disabled ? p.theme.gray.medium : p.theme.gray.dark};
  font-weight: ${(p: Props) => (p.isActive ? 600 : 200)};
  font-size: 18px;
  line-height: 40px;
  margin-left: 15px;
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
    <Container
      key={acknowledgementId}
      disabled={disabled}
      isActive={isActive}
      onClick={handleClick}
    >
      <IndexContainer>
        <Text>{+acknowledgementId + 1}</Text>
      </IndexContainer>
      <StyledText disabled={disabled} isActive={isActive}>
        {acknowledgementsWithCopy[acknowledgementId]}
      </StyledText>
      {isComplete && (
        <CheckContainer isActive={isActive}>
          <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible>
            <Checkmark size="medium" color="white" />
          </Animated>
        </CheckContainer>
      )}
    </Container>
  );
};
