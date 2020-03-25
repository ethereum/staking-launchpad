import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { InfoBox } from '../../components/InfoBox';
import { Heading } from '../../components/Heading';
import { Paper } from '../../components/Paper';
import { StoreState } from '../../store/reducers';
import { keyFile } from '../../store/actions';

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

interface KeyListProps {
  keyFiles: keyFile[];
}

const _KeyList = ({ keyFiles }: KeyListProps) => {
  const validatorKeys = keyFiles.map(file => file.pubkey);
  const renderKeys = () =>
    validatorKeys.map(key => (
      <InfoBox key={key} className="px25 py0">
        <StyledPre>{key}</StyledPre>
      </InfoBox>
    ));

  if (validatorKeys.length > 4) {
    return (
      <ScrollContainer>
        <SubContainer>{renderKeys()}</SubContainer>
      </ScrollContainer>
    );
  }

  return (
    <Paper className="mt20">
      <Heading level={3} size="small" color="blueDark">
        keys
      </Heading>
      <div className="mt20">{renderKeys()}</div>
    </Paper>
  );
};

const mstp = ({ keyFiles }: StoreState) => ({
  keyFiles,
});

export const KeyList = connect(mstp)(_KeyList);
