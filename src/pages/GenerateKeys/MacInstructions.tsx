import React, { useState } from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import { Paper } from '../../components/Paper';
import { CodeBox } from '../../components/CodeBox';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import { TerminalUI } from './TerminalUI';
import { OperatingSystemButtons } from './OperatingSystemButtons';

interface Props {
  validatorCount: number | string;
}

export const MacInstructions = ({ validatorCount }: Props) => {
  const [animateTerminal, setAnimateTerminal] = useState<boolean>(false);

  return (
    <div style={{ animation: `fadeIn 1s` }}>
      <Paper className="mt20">
        <Heading level={3} size="small" color="blueMedium">
          3. Install python3, pip and git
        </Heading>
        <Text className="mt20">
          Install python3:
          <ul>
            <li>sudo apt-get install python3.6</li>
            <li>Once the installation is done, you can verify with:</li>
          </ul>
        </Text>
        <Text className="mt20">
          Install pip3:
          <ul>
            <li>Securely download the get-pip.py file from this link</li>
            <li>
              From the directory where the file was downloaded to, run the
              following command in the Terminal: python3 get-pip.py
            </li>
            <li>
              Once the installation completes you should see the prompt print
              message similar to this
            </li>
            <li>
              Verify the installation of pip3 by running the following on the
              Terminal
            </li>
            <li>
              which pip3. This should return the install location of pip3.
            </li>
          </ul>
        </Text>
        <Text className="mt20">
          Install git:
          <ul>
            <li>sudo apt install git-all</li>
          </ul>
        </Text>
      </Paper>

      <Paper className="mt20">
        <Heading level={3} size="small" color="blueMedium">
          4. Type/copy the following lines into your terminal window:
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
      </Paper>
    </div>
  );
};
