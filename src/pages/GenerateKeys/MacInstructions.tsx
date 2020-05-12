import React, { useState } from 'react';
import styled from 'styled-components';
import ScrollAnimation from 'react-animate-on-scroll';
import { Heading } from '../../components/Heading';
import { Paper } from '../../components/Paper';
import { Text } from '../../components/Text';
import { TerminalUI } from './TerminalUI';
import { Link } from '../../components/Link';

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

export const MacInstructions = ({ validatorCount }: Props) => {
  const [animateTerminal, setAnimateTerminal] = useState<boolean>(false);
  const terminalCommands = [
    'git clone https://github.com/ethereum/eth2.0-deposit-cli.git',
    'cd eth2.0-deposit-cli',
    'pip3 install -r requirements.txt',
    `python3 src/deposit.py ${
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
            You can install python3 on your MacOS device using{' '}
            <Link primary inline external to="https://brew.sh/">
              homebrew
            </Link>
            . Once you've installed homebrew, you can install Python 3 by running <code>brew install python3</code>.
            If you'd like to install python with homebrew, see{' '}
            <Link
              primary
              inline
              external
              to="https://python.org/about/gettingstarted"
            >
              here
            </Link>
            .
          </Text>
        </Section>
        <Section>
          <Heading level={4} size="small" color="blueMedium" className="mb10">
            Install pip3
          </Heading>
          <Text>
            If you installed Python 3 with{' '}
            <Link primary inline external to="https://brew.sh/">
              homebrew
            </Link>{' '}
            in the previous step, then you'll have installed pip3 automatically.
            If you didn't, follow the instructions{' '}
            <Link
              inline
              external
              primary
              to="https://pip.pypa.io/en/stable/installing/"
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
            On Mavericks (10.9) or above you can do this by simply running <code>git --version</code> 
             (if you don't have it installed already, it will prompt you to install it).
            Otherwise, you can find install instructions{' '}
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
