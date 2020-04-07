import React from 'react';
import styled from 'styled-components';
// @ts-ignore
import Typewriter from 'typewriter-effect';

const Container = styled.div`
  background-color: #1d1e28;
  height: 200px;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
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

export const TerminalUI = () => {
  return (
    <Container>
      <WindowControls />
      <div className="p10">
        <Typewriter
          options={{
            delay: 0,
            cursor: '',
          }}
          onInit={(typewriter: any) => {
            typewriter
              .typeString(
                `<span style="color: #06FF04; font-family: monospace">
                  python3 deposit.py --num_validators 2
                </span>`
              )
              .start();
          }}
        />
        <Typewriter
          options={{
            cursor: '',
          }}
          onInit={(typewriter: any) => {
            typewriter
              .typeString(
                `<span style="color: #06FF04; font-family: monospace">
                  git clone https://github.com/CarlBeek/eth2.0-deposit-tooling.git
                </span>`
              )
              .start();
          }}
        />
      </div>
    </Container>
  );
};
