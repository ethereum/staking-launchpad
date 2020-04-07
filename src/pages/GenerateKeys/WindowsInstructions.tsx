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

export const WindowsInstructions = ({ validatorCount }: Props) => {
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
            <li>
              Follow this link and download the latest python3 Windows installer
            </li>
            <li>
              Run the installer and follow the steps to install python3 on your
              computer. Use recommended options to install pip.
            </li>
            <li>
              Once the installation is done, you can verify with: Navigate to
              the directory in which Python was installed on the system. In our
              case, it is
              C:\Users\Username\AppData\Local\Programs\Python\Python37 since we
              have installed the latest version. Double-click python.exe. The
              output should be similar to what you can see below:
            </li>
          </ul>
        </Text>
        <Text className="mt20">
          Install pip3:
          <ul>
            <li>
              If you used the recommended options, pip should be installed.
            </li>
            <li>you can verify from the command prompt with: `pip -V`</li>
            <li>
              Once the installation completes you should see the prompt print
              message similar to this
            </li>
            <li>
              If your version of Python is missing Pip, see our article How to
              Install Pip to Manage Python Packages on Windows.
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
