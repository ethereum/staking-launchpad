import React, { useState } from 'react';
import styled from 'styled-components';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Text } from '../../components/Text';

const Container = styled.div`
  background-color: #1d1e28;
  min-height: 260px;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  position: relative;
`;
const Dot = styled.div`
  height: 10px;
  width: 10px;
  margin: 5px;
  border-radius: 50%;
  background-color: ${(p: any) => p.color};
`;
const ControlContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  border-bottom: 1px solid;
  padding-bottom: 10px;
`;
const TerminalText = styled(Text)`
  color: #06ff04;
  font-family: monospace;
  overflow-wrap: break-word;
  word-break: break-all;
`;
const CopyContainer = styled.div`
  color: #06ff04;
  font-family: monospace;
  font-size: 16px;
  padding: 0 5px;
  cursor: pointer;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const TerminalUI = ({
  commands,
  animate,
}: {
  commands: string[];
  animate: boolean;
}) => {
  const [copyIdx, setCopyIdx] = useState<null | number>(null);

  const onCopy = (i: number): void => {
    setCopyIdx(i);
  };

  return (
    <Container>
      <ControlContainer>
        <Dot color="#ef655d" />
        <Dot color="#ffcc13" />
        <Dot color="#15e215" />
      </ControlContainer>
      <div className="p10">
        {animate &&
          commands.map((command, i) => (
            <div
              className="flex space-between mb10"
              key={`${command}--${Math.random().toFixed(2)}`}
            >
              <TerminalText>{command}</TerminalText>
              <CopyToClipboard text={command} onCopy={() => onCopy(i)}>
                <CopyContainer>
                  {copyIdx === i ? 'Copied' : 'Copy'}
                </CopyContainer>
              </CopyToClipboard>
            </div>
          ))}
      </div>
    </Container>
  );
};
