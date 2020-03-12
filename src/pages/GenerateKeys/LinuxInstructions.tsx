import React from "react";
import { Paper } from "../../components/Paper";
import { Heading, Text } from "grommet";
import { CodeBox } from "../../components/CodeBox";

export const LinuxInstructions = () => (
  <div style={{ animation: `fadeIn 1s` }}>
    <Paper className="mt20">
      <Heading level={3} size="small" color="blueMedium">
        2. Type/copy the following lines into your terminal window:
      </Heading>
      <Text>
        Type the following lines into the terminal window and replace the n with
        the amount of validators you plan to run:
      </Text>
      <CodeBox
        className="mt20"
        snippet="git clone https://github.com/CarlBeek/eth2.0-deposit-tooling.git"
      />
      <CodeBox className="mt20" snippet="cd eth2.0-deposit-tooling" />
      <CodeBox className="mt20" snippet="pip3 install -r requirements.txt" />
      <CodeBox
        className="mt20"
        snippet="python3 deposit.py --num_validators n"
      />
    </Paper>
  </div>
);
