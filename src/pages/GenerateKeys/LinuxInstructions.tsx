import React, { useState } from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import styled from 'styled-components';
import { Paper } from '../../components/Paper';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import { TerminalUI } from './TerminalUI';
import { Link } from '../../components/Link';
import { Code } from '../../components/Code';

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
  const terminalCommands = [
    'git clone https://github.com/ethereum/eth2.0-deposit-cli.git',
    'cd eth2.0-deposit-cli',
    'pip3 install -r requirements.txt',
    'python3 setup.py install',
    `python3 cli/deposit.py ${
      validatorCount > 0 ? `--num_validators ${validatorCount}` : ''
    }`,
  ];

  return (
    <div style={{ animation: `fadeIn 1s` }}>
      <Paper className="mt20">
        <Heading level={3} size="small" color="blueMedium" className="mb20">
          3. Install developer libraries
        </Heading>
        <Section>
          <Heading level={4} size="small" color="blueMedium" className="mb10">
            Install python3
          </Heading>
          <Text>
            The python3 install process may differ depending on your linux
            build. For the most up-to-date installation instructions, please
            visit{' '}
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
        </Section>
        <Section>
          <Heading level={4} size="small" color="blueMedium" className="mb10">
            Install pip3
          </Heading>
          <Text>
            You can install pip using a Linux Package Manager like{' '}
            <Code>apt</Code> or <Code>yum</Code>. For the most-up-to-date
            instructions on installing pip3, please reference the pip the
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
        </Section>
        <Section>
          <Heading level={4} size="small" color="blueMedium" className="mb10">
            Install git
          </Heading>
          <Text>
            If git is not already installed on your machine, you can find
            install instructions{' '}
            <Link
              inline
              external
              primary
              to="https://git-scm.com/book/en/v2/Getting-Started-Installing-Git"
            >
              here
            </Link>
            .
          </Text>
        </Section>
      </Paper>

      <Paper className="mt20">
        <Heading level={3} size="small" color="blueMedium">
          4. Generate deposit keys using the Ethereum Foundation deposit tool
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
          <TerminalUI commands={terminalCommands} animate={animateTerminal} />
        </ScrollAnimation>
      </Paper>
    </div>
  );
};
