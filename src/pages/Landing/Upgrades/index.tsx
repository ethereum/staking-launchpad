import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import styled from 'styled-components';
import { Text } from '../../../components/Text';
import { Link } from '../../../components/Link';
import { Heading } from '../../../components/Heading';
import { UpgradeCard } from './UpgradeCard';

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
  font-weight: bold;
  font-size: 24px;
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
    subTitle: 'Dig deeper into how Eth2 upgrades Ethereum.',
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
      'Check out the FAQ page for more information about the roles and responsibilities of Eth2 network validators.',
    linkUrl: '/faq',
    link: 'More on validators',
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
                How does Eth2 upgrade Ethereum?
              </StyledHeading>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeInUp" animateOnce>
              <Text className="mt20 mb40">
                To better future-proof Ethereum, Eth2 will upgrade various
                components of Ethereum while seamlessly continuing on the chain
                of today. The main components of this upgrade are:
              </Text>
              <UpgradeTitle className="mt20">
                Proof-of-stake (PoS) and the Beacon Chain{' '}
              </UpgradeTitle>
              <Text className="mt20">
                PoS is a more secure, decentralized, and environmentally
                friendly consensus mechanism than the Proof-of-work (PoW) that
                secures Ethereum today. It works by rewarding validators for
                building the chain, but slashing their deposits if they try to
                attack it, incentivising healthy behaviour . This upgrade is
                already live in the form of the Beacon Chain.
              </Text>
              <Link
                className="mt20 mb40"
                external
                to="https://www.ethereum.org/eth2/beacon-chain/"
              >
                More on the Beacon Chain
              </Link>
              <UpgradeTitle className="mt20">The Merge (docking)</UpgradeTitle>
              <Text className="mt20">
                The merge, also known as the docking, is when the Ethereum
                mainnet we use todaay merge with the Beacon Chain. This is when
                Ethereum fully transitions to proof of stake.
              </Text>
              <Link
                className="mt20 mb40"
                external
                to="https://www.ethereum.org/eth2/the-docking/"
              >
                More on the merge
              </Link>
              <UpgradeTitle className="mt20">Sharding </UpgradeTitle>
              <Text className="mt20">
                Sharding will add 64 parallel chains to the network. This will
                dramatically improve Ethereum's data handling capabilities as
                each chain will be able to handle at least as much data as
                mainnet Ethereum can today, probably more.
              </Text>
              <Link
                className="mt20 mb40"
                external
                to="https://www.ethereum.org/eth2/shard-chains/"
              >
                More on shard chains
              </Link>
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
