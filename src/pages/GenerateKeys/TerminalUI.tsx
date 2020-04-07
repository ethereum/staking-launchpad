import React, { useState } from 'react';
import styled from 'styled-components';
// @ts-ignore
import Typewriter from 'typewriter-effect';
import { Animated } from 'react-animated-css';

const Container = styled.div`
  background-color: #1d1e28;
  height: 260px;
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
  margin-bottom: 15px;
`;

const WindowControls = () => {
  return (
    <ControlContainer>
      <Dot color="red" />
      <Dot color="yellow" />
      <Dot color="green" />
    </ControlContainer>
  );
};

const CopyBtn = (p: any) => {
  const CopyContainer = styled.div`
    color: #06ff04;
    font-family: monospace;
    font-size: 16px;
    padding: 0 5px;
    cursor: pointer;
  `;

  return (
    <CopyContainer
      onClick={() => {
        navigator.clipboard.writeText(p.command);
        p.setCopyIdx(p.idx);
      }}
    >
      {p.copied ? 'Copied' : 'Copy'}
    </CopyContainer>
  );
};

export const TerminalUI = ({
  validatorCount,
  animate,
}: {
  validatorCount: number | string;
  animate: boolean;
}) => {
  const opts = {
    delay: 0,
    cursor: '',
  };
  const delayMs = 2000;
  const commands = [
    'git clone https://github.com/CarlBeek/eth2.0-deposit-tooling.git',
    'cd eth2.0-deposit-tooling',
    'pip3 install -r requirements.txt',
    `python3 deposit.py --num_validators ${validatorCount}`,
  ];

  const [copyIdx, setCopyIdx] = useState(999999999);

  return (
    <Container>
      <WindowControls />
      <div className="p10">
        {animate &&
          commands.map((command, i) => (
            <div className="flex space-between mb10">
              <Typewriter
                options={opts}
                onInit={(typewriter: any) => {
                  typewriter
                    .pauseFor(delayMs * i)
                    .typeString(
                      `<span style="color: #06FF04; font-family: monospace">
                  ${command}
                </span>`
                    )
                    .start();
                }}
              />
              <Animated
                animationInDelay={delayMs * i + 1500}
                animationInDuration={500}
                animationIn="bounceIn"
                animationOut="fadeOut"
                isVisible={animate}
              >
                <CopyBtn
                  copied={copyIdx === i}
                  setCopyIdx={setCopyIdx}
                  idx={i}
                  command={command}
                />
              </Animated>
            </div>
          ))}
      </div>
    </Container>
  );
};
