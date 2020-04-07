import React, { useState } from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import { Paper } from '../../components/Paper';
import { CodeBox } from '../../components/CodeBox';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import { TerminalUI } from './TerminalUI';

interface Props {
  validatorCount: number | string;
}

export const LinuxInstructions = ({ validatorCount }: Props) => {
  const [animateTerminal, setAnimateTerminal] = useState<boolean>(false);

  return (
    <div style={{ animation: `fadeIn 1s` }}>
      <Paper className="mt20">
        <Heading level={3} size="small" color="blueMedium">
          3. Type/copy the following lines into your terminal window:
        </Heading>
        <Text className="mt20 mb20">
          Type the following lines into the terminal window.
        </Text>
        <ScrollAnimation
          animateIn="fadeIn"
          animateOnce
          // @ts-ignore
          afterAnimatedIn={() => setAnimateTerminal(true)}
        >
          <TerminalUI
            validatorCount={validatorCount}
            animate={animateTerminal}
          />
        </ScrollAnimation>
        {/*<CodeBox*/}
        {/*  className="mt20"*/}
        {/*  snippet="git clone https://github.com/CarlBeek/eth2.0-deposit-tooling.git"*/}
        {/*/>*/}
        {/*<CodeBox className="mt20" snippet="cd eth2.0-deposit-tooling" />*/}
        {/*<CodeBox className="mt20" snippet="pip3 install -r requirements.txt" />*/}
        {/*<CodeBox*/}
        {/*  className="mt20"*/}
        {/*  snippet={`python3 deposit.py --num_validators ${validatorCount}`}*/}
        {/*/>*/}
      </Paper>
    </div>
  );
};
