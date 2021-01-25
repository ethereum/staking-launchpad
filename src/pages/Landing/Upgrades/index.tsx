import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import styled from 'styled-components';
import { Text } from '../../../components/Text';
import { Heading } from '../../../components/Heading';
import { UpgradeCard } from './UpgradeCard';
import { PRICE_PER_VALIDATOR, TICKER_NAME } from '../../../utils/envVars';

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
const UpgradesContainer = styled.div`
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
const UpgradeTitle = styled(Text)`
  display: inline;
  font-weight: bold;
`;

interface upgrade {
  title: string;
  subTitle: string;
  linkUrl: string;
  link: string;
  external: boolean;
}

const upgrades: upgrade[] = [
  {
    title: 'The upgrades',
    subTitle: 'Dig deeper into how eth2 upgrades Ethereum.',
    linkUrl: 'https://ethereum.org/en/eth2/',
    link: 'How does this all happen?',
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

export const Upgrades = (): JSX.Element => {
  const m: boolean = (window as any).mobileCheck();
  return (
    <Container isMobile={m}>
      <SubContainer isMobile={m}>
        <ResponsiveContainer>
          <div className="px20">
            <ScrollAnimation animateIn="fadeIn" animateOnce>
              <StyledHeading margin="none" className="mt20" isMobile={m}>
                How does eth2 upgrade Ethereum?
              </StyledHeading>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeInUp" animateOnce>
              <Text className="mt20">
                In order to future-proof Ethereum, eth2 will upgrade various
                components of Ethereum while seamlessly continuing on the chain
                of today. The main components of this upgrade are:
              </Text>
              <Text className="mt20">
                <UpgradeTitle>Proof of Stake </UpgradeTitle>
                (PoS) is a more secure, decentralized, and environmentally
                friendly consensus mechanism when compared with Proof of Work
                (PoW) that secures Ethereum today. Proof of Stake works by
                having validators lock up {PRICE_PER_VALIDATOR} {TICKER_NAME}{' '}
                and rewarding them for building the chain and punishing them if
                they try to attack it. This portion of eth2 is already live in
                the form of the beacon chain.
              </Text>
              <Text className="mt20">
                <UpgradeTitle>The Merge </UpgradeTitle>
                is when the beacon chain stops being a separate chain and
                replaces PoW consensus in Ethereum.
              </Text>
              <Text className="mt20">
                <UpgradeTitle>Sharding </UpgradeTitle>
                will dramatically improve Ethereum's data handling capabilities
                by adding 64 parallel chains, each of which will be able to
                handle the same or more data to what Ethereum can today.
              </Text>
            </ScrollAnimation>
          </div>
          <UpgradesContainer>
            {upgrades.map((upgrade: upgrade) => (
              <UpgradeCard key={upgrade.title} {...upgrade} />
            ))}
          </UpgradesContainer>
        </ResponsiveContainer>
      </SubContainer>
    </Container>
  );
};
