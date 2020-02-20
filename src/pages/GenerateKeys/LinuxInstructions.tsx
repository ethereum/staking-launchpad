import React from "react";
import { Paper } from "../../components/Paper";
import { Heading, Text } from "grommet";
import { CodeBox } from "../../components/CodeBox";

export const LinuxInstructions = () => (
  <div style={{ animation: `fadeIn 1s` }}>
    <Paper className="mt20">
      <Heading level={3} size="small" color="secondary">
        2. Install Python and git
      </Heading>
      <Text className="my10">
        You can install python and git from here and follow the instructions on
        screen.
      </Text>
      <Text>
        To install Git on Linux on a debian based distribution (Ubuntu), type
        the following:
      </Text>
      <CodeBox className="mt20" snippet="sudo apt install git-all" />
    </Paper>
    <Paper className="mt20">
      <Heading level={3} size="small" color="secondary">
        3. Clone and install the deposit tool repository
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
