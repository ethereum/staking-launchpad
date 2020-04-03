import React from 'react';
import styled from 'styled-components';
import { InfoBox } from '../../components/InfoBox';
import { DepositKeyInterface } from '../../store/reducers';

const ScrollContainer = styled.div`
  height: 200px;
  margin-top: 20px;
  width: 100%;
  overflow-y: hidden;
  display: flex;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2) inset, 0 0 rgba(0, 0, 0, 0) inset; // shadow on top only
`;

const SubContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 8px;
    background: transparent;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #c5c5c5;
    border-radius: 5px;
    overflow: hidden;
    &:hover {
      background: #a6a6a6;
    }
  }
`;
const StyledPre = styled.pre`
  text-overflow: ellipsis;
  overflow: hidden;
`;

interface Props {
  depositKeys: DepositKeyInterface[];
}

export const KeyList = ({ depositKeys }: Props) => {
  const validatorKeys = depositKeys.map(file => file.pubkey);
  const renderKeys = () =>
    validatorKeys.map(coldKey => (
      <InfoBox key={coldKey} className="px25 py0">
        <StyledPre>{coldKey}</StyledPre>
      </InfoBox>
    ));

  if (validatorKeys.length > 4) {
    return (
      <ScrollContainer>
        <SubContainer>{renderKeys()}</SubContainer>
      </ScrollContainer>
    );
  }
  return <div className="mt20">{renderKeys()}</div>;
};
