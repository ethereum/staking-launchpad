import React from 'react';
import { Paper } from '../../components/Paper';
import { CodeBox } from '../../components/CodeBox';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';

interface Props {
  validatorCount: number;
}

export const LinuxInstructions = ({ validatorCount }: Props) => (
  <div style={{ animation: `fadeIn 1s` }}>
    <Paper className="mt20">
      <Heading level={3} size="small" color="blueMedium">
        3. Type/copy the following lines into your terminal window:
      </Heading>
      <Text className="mt20">
        Type the following lines into the terminal window.
      </Text>
      <CodeBox
        className="mt20"
        snippet="git clone https://github.com/CarlBeek/eth2.0-deposit-tooling.git"
      />
      <CodeBox className="mt20" snippet="cd eth2.0-deposit-tooling" />
      <CodeBox className="mt20" snippet="pip3 install -r requirements.txt" />
      <CodeBox
        className="mt20"
        snippet={`python3 deposit.py --num_validators ${validatorCount}`}
      />
    </Paper>
  </div>
);
