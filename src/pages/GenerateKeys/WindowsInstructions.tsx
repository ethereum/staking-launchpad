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

export const WindowsInstructions = ({ validatorCount }: Props) => {
  const [animateTerminal, setAnimateTerminal] = useState<boolean>(false);
  const terminalCommands = [`we need windows commands ${validatorCount}`];

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
            Download python3 from{' '}
            <Link
              primary
              inline
              external
              to="https://docs.python.org/3/using/windows.html"
            >
              python.org
            </Link>{' '}
            and follow the installation instructions.
          </Text>
        </Section>
        <Section>
          <Heading level={4} size="small" color="blueMedium" className="mb10">
            Install pip3
          </Heading>
          <Text>
            The latest version of pip should have been installed with python
            3.x.x. For more information about pip, you can visit the windows
            install guide{' '}
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
