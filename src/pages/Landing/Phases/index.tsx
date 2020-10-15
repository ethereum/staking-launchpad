import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import styled from 'styled-components';
import { Text } from '../../../components/Text';
import { Heading } from '../../../components/Heading';
import { PhaseCard } from './PhaseCard';

const Container = styled.div`
  background-color: ${p => p.theme.purple.light};
  padding: ${(p: { isMobile: boolean }) => (p.isMobile ? '20px 0' : '150px 0')};
`;
const SubContainer = styled.div`
  max-width: ${p => p.theme.screenSizes.largest};
  width: 100%;
  margin: 0 auto;
  padding: 0 120px;
  @media only screen and (max-width: ${p => p.theme.screenSizes.largest}) {
    padding: ${(p: { isMobile: boolean }) =>
      p.isMobile ? '0 20px' : '0 60px'};
  }
`;
const PhasesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;
const ResponsiveContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: ${p => p.theme.screenSizes.larger}) {
    flex-direction: column;
  }
`;
const StyledHeading = styled(Heading)`
  width: ${(p: { isMobile: boolean }) =>
    p.isMobile ? '220px' : undefined}; // force word break
`;
const PhaseTitle = styled(Text)`
  display: inline;
  font-weight: bold;
`;

interface phase {
  title: string;
  subTitle: string;
  linkUrl: string;
  link: string;
  external: boolean;
}

const phases: phase[] = [
  {
    title: 'Duration',
    subTitle:
      'The duration for the deployment of the individual phases depends on many factors.',
    linkUrl: 'https://ethereum.org/en/eth2/#roadmap',
    link: 'Phase 0, 1, 1.5, and 2 duration',
    external: true,
  },
  {
    title: 'Deposit contract formally verified',
    subTitle:
      'The deposit contract has been verified at a byte-code level to ensure everyone’s safety.',
    linkUrl:
      'https://github.com/runtimeverification/deposit-contract-verification/blob/96434de/deposit-contract-verification.pdf',
    link: 'Formal verification report',
    external: true,
  },
  {
    title: 'Validators FAQ',
    subTitle:
      'Check out the FAQ page for more information about the roles and responsibilities of eth2 network validators.',
    linkUrl: '/faq',
    link: 'Learn more about validators',
    external: false,
  },
];

export const Phases = (): JSX.Element => {
  const m: boolean = (window as any).mobileCheck();
  return (
    <Container isMobile={m}>
      <SubContainer isMobile={m}>
        <ResponsiveContainer>
          <div className="px20">
            <ScrollAnimation animateIn="fadeIn" animateOnce>
              <StyledHeading margin="none" className="mt20" isMobile={m}>
                What is eth2 phase 0?
              </StyledHeading>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeInUp" animateOnce>
              <Text className="mt20">
                Transitioning from proof-of-work (PoW) to proof-of-stake (PoS),
                eth2 will be launched in at least 4 phases. The idea is to break
                up this transition into phases each focusing on a different
                aspect of eth2.
              </Text>
              <Text className="mt20">
                <PhaseTitle>Phase 0 </PhaseTitle>
                contains all of the machinery behind eth2&apos;s PoS consensus,
                it tracks the validators and their balances.
              </Text>
              <Text className="mt20">
                <PhaseTitle>Phase 1 </PhaseTitle>
                handles adding, storing, and retrieving the data associated with
                eth2's shards.
              </Text>
              <Text className="mt20">
                <PhaseTitle>Phase 1.5 </PhaseTitle>
                updates Ethereum as we know it today from PoW to PoS by making
                it a shard under eth2.
              </Text>
              <Text className="mt20">
                <PhaseTitle>Phase 2 </PhaseTitle>
                Phase 2 adds execution to the remaining eth2 shards which
                enables smart contracts to run on all of the shards.
              </Text>
            </ScrollAnimation>
          </div>
          <PhasesContainer>
            {phases.map((phase: phase) => (
              <PhaseCard key={phase.title} {...phase} />
            ))}
          </PhasesContainer>
        </ResponsiveContainer>
      </SubContainer>
    </Container>
  );
};
