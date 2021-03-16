import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import styled from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';
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
}

export const Upgrades = (): JSX.Element => {
  const { formatMessage } = useIntl();

  const m: boolean = (window as any).mobileCheck();

  const upgrades: upgrade[] = [
    {
      title: formatMessage({ defaultMessage: 'The upgrades' }),
      subTitle: formatMessage({
        defaultMessage: 'Dig deeper into how Eth2 upgrades Ethereum.',
      }),
      linkUrl: 'https://ethereum.org/en/eth2/',
      link: formatMessage({ defaultMessage: 'How does this all happen?' }),
    },
    {
      title: formatMessage({
        defaultMessage: 'Deposit contract formally verified',
      }),
      subTitle: formatMessage({
        defaultMessage:
          'The deposit contract has been verified at a byte-code level to ensure your safety.',
      }),
      linkUrl:
        'https://github.com/runtimeverification/deposit-contract-verification/blob/96434de/deposit-contract-verification.pdf',
      link: formatMessage({ defaultMessage: 'Formal verification report' }),
    },
    {
      title: formatMessage({ defaultMessage: 'Validators FAQ' }),
      subTitle: formatMessage({
        defaultMessage:
          'Learn more about the roles and responsibilities of Eth2 validators.',
      }),
      linkUrl: '/faq',
      link: formatMessage({ defaultMessage: 'More on validators' }),
    },
  ];

  return (
    <Container isMobile={m}>
      <SubContainer isMobile={m}>
        <ResponsiveContainer>
          <div className="px20">
            <ScrollAnimation animateIn="fadeIn" animateOnce>
              <StyledHeading margin="none" className="mt20" isMobile={m}>
                <FormattedMessage defaultMessage="How does Eth2 upgrade Ethereum?" />
              </StyledHeading>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeInUp" animateOnce>
              <Text className="mt20 mb40">
                <FormattedMessage
                  defaultMessage="Eth2 is a set of upgrades that will make Ethereum more scalable, secure, and sustainable. These upgrades will improve Ethereum while seamlessly continuing on the chain
                  of today. Here's more on the different upgrades:"
                />
              </Text>
              <UpgradeTitle className="mt20">
                <FormattedMessage defaultMessage="Proof-of-stake (PoS) and the Beacon Chain" />
              </UpgradeTitle>
              <Text className="mt20">
                <FormattedMessage
                  defaultMessage="PoS is a more secure, decentralized, and environmentally-friendly consensus mechanism than the proof-of-work (PoW) that
                    secures Ethereum today. It rewards validators for
                    building the chain, but slashes their deposits if they try to
                    attack it, incentivising healthy behaviour. This upgrade is
                    already live in the form of the Beacon Chain."
                />
              </Text>
              <Link
                className="mt20 mb40"
                to="https://ethereum.org/eth2/beacon-chain/"
              >
                <FormattedMessage defaultMessage="More on the Beacon Chain" />
              </Link>
              <UpgradeTitle className="mt20">The Merge (docking)</UpgradeTitle>
              <Text className="mt20">
                <FormattedMessage
                  defaultMessage="The merge, also known as the docking, will see the Ethereum
                    mainnet we use today merge with the Beacon Chain. This is when
                    Ethereum will fully transition to proof-of-stake."
                />
              </Text>
              <Link
                className="mt20 mb40"
                to="https://ethereum.org/eth2/the-docking/"
              >
                <FormattedMessage defaultMessage="More on the merge" />
              </Link>
              <UpgradeTitle className="mt20">Sharding </UpgradeTitle>
              <Text className="mt20">
                <FormattedMessage defaultMessage="Sharding will make more data available to the network by introducing 64 parallel chains. Each new chain will be able to handle at least as much data as mainnet today, probably more." />
              </Text>
              <Link
                className="mt20 mb40"
                to="https://ethereum.org/eth2/shard-chains/"
              >
                <FormattedMessage defaultMessage="More on shard chains" />
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
