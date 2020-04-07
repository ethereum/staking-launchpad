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
          3. Install developer libraries
        </Heading>
        <Section>
          <Heading level={4} size="small" color="blueMedium">
            Install python3
          </Heading>
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
        </Section>
        <Section>
          <Heading level={4} size="small" color="blueMedium">
            Install pip3
          </Heading>
          <Text className="my10">
            For a the most-up-to-date instructions on install pip3, please
            reference the pip the documentation found{' '}
            <Link
              inline
              external
              primary
              to="https://packaging.python.org/guides/installing-using-linux-tools/#installing-pip-setuptools-wheel-with-linux-package-managers"
            >
              here
            </Link>
          </Text>
        </Section>
        <Section>
          <Heading level={4} size="small" color="blueMedium">
            Install git
          </Heading>
          <Text className="my10">
            If git is not already installed on your machine, you can find
            install instructions
            <Link
              inline
              external
              primary
              to="https://git-scm.com/book/en/v2/Getting-Started-Installing-Git"
            >
              here
            </Link>
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
          <TerminalUI
            validatorCount={validatorCount}
            animate={animateTerminal}
          />
        </ScrollAnimation>
      </Paper>
    </div>
  );
};
