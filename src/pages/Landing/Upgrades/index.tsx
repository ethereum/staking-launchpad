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
        defaultMessage: 'Dig deeper into Ethereum upgrades.',
      }),
      linkUrl: 'https://ethereum.org/en/upgrades/',
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
                to="https://ethereum.org/en/upgrades/beacon-chain/"
              >
                <FormattedMessage defaultMessage="More on the Beacon Chain" />
              </Link>
              <UpgradeTitle className="mt20">
                <FormattedMessage defaultMessage="The Merge" />
              </UpgradeTitle>
              <Text className="mt20">
                <FormattedMessage defaultMessage="The Merge upgrade prepared the chain for future scaling upgrades by bringing proof-of-stake consensus together with Mainnet. This unlocks the ability to implement data sharding to further scale network capacity and throughput." />
              </Text>
              <Text className="mt20">
                <FormattedMessage
                  defaultMessage="This upgrade is rapidly approaching and brings a few changes that stakers should be aware of before hand. Check out the {mergeReadinessChecklist} to make sure you're prepared."
                  values={{
                    mergeReadinessChecklist: (
                      <Link primary inline to="/checklist/#merge-readiness">
                        Merge Readiness Checklist
                      </Link>
                    ),
                  }}
                />
              </Text>
              <Link
                className="mt20 mb40"
                to="https://ethereum.org/en/upgrades/merge/"
              >
                <FormattedMessage defaultMessage="More on the Merge" />
              </Link>
              <UpgradeTitle className="mt20">
                <FormattedMessage defaultMessage="Sharding" />
              </UpgradeTitle>
              <Text className="mt20">
                <FormattedMessage defaultMessage="Sharding will change the requirement that full nodes carry the entire history of the chain, and instead will distribute this load amongst the network while still ensuring data availability. This will significantly expand the capacity of layer 1 Ethereum while maintaining the ability to operate a full node on consumer hardware, keeping the network decentralized." />
              </Text>
              <Link
                className="mt20 mb40"
                to="https://ethereum.org/en/upgrades/shard-chains/"
              >
                <FormattedMessage defaultMessage="More on data sharding" />
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
