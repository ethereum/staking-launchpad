import React from 'react';
import styled from 'styled-components';
import _keys from 'lodash/keys';
import _every from 'lodash/every';
import { colors } from '../../../styles/styledComponentsTheme';
import { Animated } from 'react-animated-css';
import {
  AcknowledgementIdsEnum,
  AcknowledgementStateInterface,
} from '../../../store/reducers';
import { Text } from '../../../components/Text';
import { AnimatedCheck } from './AnimatedCheck';

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
  margin: auto auto 25px;
  border-radius: ${(p: { theme: any }) => p.theme.borderRadius};
  border: 1px solid ${(p: Props) => p.theme.gray.medium};
  box-shadow: ${(p: Props) =>
    p.isActive
      ? '-webkit-box-shadow:0 0 10px rgba(0, 0, 0, 0.5);\n' +
        '\t-moz-box-shadow:0 0 10px rgba(0, 0, 0, 0.5);\n' +
        '\tbox-shadow:0 0 10px rgba(0, 0, 0, 0.5);'
      : 'inherit'};
  cursor: ${(p: Props) => (p.disabled ? 'default' : 'pointer')};
  transition: width 0.5s;
`;
const IndexContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${(p: { theme: any }) => p.theme.gray.light};
  padding: 10px 15px;
  height: 40px;
  width: 45px;
  border-radius: ${(p: { theme: any }) =>
    `${p.theme.borderRadius} 0 0 ${p.theme.borderRadius}`};
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
      <Animated
        animationInDuration={300}
        animationIn="fadeIn"
        animationOut="fadeOut"
        isVisible={isComplete}
      >
        <AnimatedCheck show={isComplete}>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 130.2 130.2"
          >
            <circle
              className="path circle"
              fill={isActive ? colors.green.dark : colors.green.medium}
              stroke={isActive ? colors.green.dark : colors.green.medium}
              strokeWidth="6"
              strokeLinecap="round"
              strokeMiterlimit="10"
              cx="65.1"
              cy="65.1"
              r="62.1"
            />
            <polyline
              className="path check"
              fill={isActive ? colors.green.dark : colors.green.medium}
              stroke="#fff"
              strokeWidth="6"
              strokeLinecap="round"
              strokeMiterlimit="10"
              points="100.2,40.2 51.5,88.8 29.8,67.5 "
            />
          </svg>
        </AnimatedCheck>
      </Animated>
    </Container>
  );
};
