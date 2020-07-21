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
    linkUrl:
      'https://docs.ethhub.io/ethereum-roadmap/ethereum-2.0/eth-2.0-phases/',
    link: 'Phase 0, 1, 2 and 3 duration',
    external: true,
  },
  {
    title: 'Deposit contract formally verified',
    subTitle:
      'The deposit contract has been verified at a byte-code level to ensure everyone’s safety.',
    linkUrl:
      'https://runtimeverification.com/blog/end-to-end-formal-verification-of-ethereum-2-0-deposit-smart-contract/',
    link: 'Read about formal verification',
    external: true,
  },
  {
    title: 'Validators FAQ',
    subTitle:
      'Check out the FAQ page for more information about the roles and responsibilities of ETH 2 network validators.',
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
                Transitioning from proof-of-work to proof-of-stake, eth2 will be
                launched in at least 3 phases. The idea is to break up this
                transition into phases each focusing on a different aspect of
                eth2.
              </Text>
              <Text className="mt20">
                <PhaseTitle>Phase 0 </PhaseTitle>
                contains all of the machinery behind eth2&apos;s consensus, it
                tracks the validators and their balances.
              </Text>
              <Text className="mt20">
                <PhaseTitle>Phase 1 </PhaseTitle>
                handles adding and storing the data associated with eth2.
              </Text>
              <Text className="mt20">
                <PhaseTitle>Phase 2 </PhaseTitle>
                Phase 2 adds execution to eth2 which enables programmes to be
                run on top of it.
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
