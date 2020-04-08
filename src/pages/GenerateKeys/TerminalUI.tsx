import React from 'react';
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
  margin-bottom: 10px;
  border-bottom: 1px solid;
  padding-bottom: 10px;
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
  const opts = {
    delay: -5,
    cursor: '',
  };
  const delayMs = 2000;

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
                <CopyContainer
                  onClick={() => navigator.clipboard.writeText(command)}
                >
                  Copy
                </CopyContainer>
              </Animated>
            </div>
          ))}
      </div>
    </Container>
  );
};
