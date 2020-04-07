import React, { useState } from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import { Paper } from '../../components/Paper';
import { CodeBox } from '../../components/CodeBox';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import { TerminalUI } from './TerminalUI';
import { Link } from '../../components/Link';
import styled from 'styled-components';

interface Props {
  validatorCount: number | string;
}

const Section = styled.div`
  background-color: ${(p: any) => p.theme.gray.light};
  padding: 20px;
  margin: 20px 0;
  border-radius: ${(p: any) => p.theme.borderRadius};
  border: ${(p: any) => `1px solid ${p.theme.blue.light}`};
`;

export const LinuxInstructions = ({ validatorCount }: Props) => {
  const [animateTerminal, setAnimateTerminal] = useState<boolean>(false);

  return (
    <div style={{ animation: `fadeIn 1s` }}>
      <Paper className="mt20">
        <Heading level={3} size="small" color="blueMedium" className="mb20">
          3. Install python3, pip3 and git
        </Heading>
        <Heading level={4} size="small" color="blueMedium">
          Install python3
        </Heading>
        <Section>
          <Text>
            Installation may differ depending on your linux build. For the most
            up-to-date installation instructions please visit{' '}
            <Link
              primary
              inline
              external
              to="https://python.org/about/gettingstarted"
            >
              https://python.org/about/gettingstarted
            </Link>
            .
          </Text>
          <Text className="my10">
            Once the installation is complete, you can verify with:
          </Text>
          <CodeBox snippet="python3 --version" className="mx20" />
        </Section>
        <Heading level={4} size="small" color="blueMedium">
          Install pip3
        </Heading>
        <Section>
          <Text className="my10">Ubuntu or Debian Linux:</Text>
          <CodeBox
            snippet="sudo apt-get install python3-pip"
            className="mx20"
          />
          <Text className="my10">Fedora (centOS) Linux:</Text>
          <CodeBox snippet="sudo yum install python3-pip" className="mx20" />

          <Text className="my10">
            For other linux distributions please reference the pip the
            documentation found{' '}
            <Link
              inline
              external
              primary
              to="https://packaging.python.org/guides/installing-using-linux-tools/#installing-pip-setuptools-wheel-with-linux-package-managers"
            >
              here
            </Link>
            .
          </Text>
          <Text className="my10">
            Once the installation is complete, you can verify with:
          </Text>
          <CodeBox snippet="which pip" className="mx20" />
        </Section>
        <Heading level={4} size="small" color="blueMedium">
          Install git
        </Heading>
        <Section>
          <Text className="my10">Ubuntu or Debian Linux:</Text>
          <CodeBox snippet="sudo apt install git-all" className="mx20" />
          <Text className="my10">Fedora (centOS) Linux</Text>
          <CodeBox snippet="sudo yum install git" className="mx20" />
        </Section>
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
