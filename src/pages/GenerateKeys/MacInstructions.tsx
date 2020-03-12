import React from "react";
import { Paper } from "../../components/Paper";
import { Heading, Text } from "grommet";
import { CodeBox } from "../../components/CodeBox";

export const MacInstructions = () => (
  <div style={{ animation: `fadeIn 1s` }}>
    <Paper className="mt20">
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
