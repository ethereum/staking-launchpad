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
        defaultMessage: 'Dig deeper into the Ethereum roadmap.',
      }),
      linkUrl: 'https://ethereum.org/en/roadmap/',
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
          'Learn more about the roles and responsibilities of Ethereum validators.',
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
                <FormattedMessage defaultMessage="How is Ethereum scaling?" />
              </StyledHeading>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeInUp" animateOnce>
              <Text className="mt20 mb40">
                <FormattedMessage
                  defaultMessage="Several upgrades are underway that will make Ethereum more scalable, secure, and sustainable. These upgrades will improve Ethereum while seamlessly continuing on the chain
                  of today. Here's more on the different upgrades:"
                />
              </Text>
              <UpgradeTitle className="mt20">
                <FormattedMessage defaultMessage="Proof-of-stake and the Beacon Chain" />
              </UpgradeTitle>
              <Text className="mt20">
                <FormattedMessage
                  defaultMessage="Ethereum is secured by proof-of-stake, although this was not always the case.
                  The Beacon Chain was the first step to establishing a PoS consensus layer on Ethereum, launching in parallel to Mainnet in December 2020.
                  This allowed participants to start staking their ETH and prepare the network for the formal transition from proof-of-work to proof-of-stake via The Merge."
                />
              </Text>
              <Link
                className="mt20 mb40"
                to="https://ethereum.org/en/roadmap/beacon-chain/"
              >
                <FormattedMessage defaultMessage="More on the Beacon Chain" />
              </Link>
              <UpgradeTitle className="mt20">
                <FormattedMessage defaultMessage="The Merge" />
              </UpgradeTitle>
              <Text className="mt20">
                <FormattedMessage defaultMessage="The Merge upgrade officially brought proof-of-stake to Ethereum on September 15, 2022, simultaneously deprecating proof-of-work. This prepared the chain for future scaling upgrades such as Danksharding by bringing proof-of-stake consensus together with Mainnet, while simultaneously reducing energy consumption by over 99.9%." />
              </Text>
              <Text className="mt20">
                <FormattedMessage defaultMessage="This marked the merging of the execution layer (existing Mainnet) with the new consensus layer (the Beacon Chain) to form the single Ethereum chain of today." />
              </Text>
              <Link
                className="mt20 mb40"
                to="https://ethereum.org/en/roadmap/merge/"
              >
                <FormattedMessage defaultMessage="More on the Merge" />
              </Link>
              <UpgradeTitle className="mt20">
                <FormattedMessage defaultMessage="Sharding" />
              </UpgradeTitle>
              <Text className="mt20">
                <FormattedMessage defaultMessage="Danksharding will change the requirement that full nodes carry the entire history of the chain, and instead will distribute this load amongst the network while still ensuring data availability. This will significantly expand the capacity of layer 1 Ethereum while maintaining the ability to operate a full node on consumer hardware, keeping the network decentralized." />
              </Text>
              <Link
                className="mt20 mb40"
                to="https://ethereum.org/en/roadmap/danksharding/"
              >
                <FormattedMessage defaultMessage="More on Danksharding" />
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
