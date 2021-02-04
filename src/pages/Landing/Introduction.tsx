import React from 'react';
import styled from 'styled-components';
import ScrollAnimation from 'react-animate-on-scroll';
import EthDiamondPlain from '../../static/eth-diamond-plain.svg';
import EthRound from '../../static/eth-round-landing.svg';
import { Text } from '../../components/Text';
import { Heading } from '../../components/Heading';
import { Link } from '../../components/Link';

const Container = styled.div`
  background: ${p => p.theme.white};
`;
const SubContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  max-width: ${p => p.theme.screenSizes.largest};
  width: 100%;
  margin: 0 auto;
  padding: 0 120px;
  @media only screen and (max-width: ${p => p.theme.screenSizes.largest}) {
    padding: 0 60px;
  }
`;
const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0 20px;
  @media only screen and (max-width: ${p => p.theme.screenSizes.medium}) {
    display: none;
  }
`;

// adds an opaque eth logo behind the text on small screen sizes
const ContentContainer = styled.div`
  @media only screen and (max-width: ${p => p.theme.screenSizes.medium}) {
    :before {
      content: ' ';
      display: block;
      position: absolute;
      right: 60px;
      top: 35px;
      width: 250px;
      height: 400px;
      z-index: 1;
      opacity: 0.15;
      background-image: url(${EthDiamondPlain});
      background-repeat: no-repeat;
      background-position: 50% 0;
      -ms-background-size: cover;
      -o-background-size: cover;
      -moz-background-size: cover;
      -webkit-background-size: cover;
      background-size: cover;
    }
  }
`;
export const Introduction = (): JSX.Element => {
  return (
    <Container>
      <SubContainer className="py100 flex">
        <ImgContainer>
          <img src={EthRound} alt="" />
        </ImgContainer>
        <ContentContainer>
          <ScrollAnimation animateIn="fadeIn" animateOnce>
            <Heading level={2} size="medium" color="blueDark" margin="none">
              Validators and Eth2
            </Heading>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeInUp" animateOnce>
            <Text className="mt20">
              This launchpad will help you become a validator, so you can play
              an active part in Ethereum's future. Validators are key to the
              more secure, scalable, and sustainable Ethereum we're building
              together.
            </Text>
            <Link
              className="mt20 mb40"
              to="https://ethereum.org/en/eth2/vision/"
            >
              More on the Eth2 vision
            </Link>
            <Text className="mt20">
              As a validator, you'll be responsible for securing the network and
              receive continuous payouts for actions that help the network reach
              consensus.
            </Text>
            <Text className="mt20">
              Today, you'll secure the Beacon Chain, the first Eth2 upgrade.
              It's a separate chain that uses a proof-of-stake consensus
              mechanism. Eventually you'll help secure all of Ethereum, once
              mainnet (the Ethereum we use today) merges with the Beacon Chain.
            </Text>
            <Link
              className="mt20 mb40"
              to="https://ethereum.org/en/eth2/docking/"
            >
              More on the merge
            </Link>
            <Text className="mt20">
              Validating in Ethereum is not the same as mining. The outcomes are
              similar: the work you do will extend and secure the chain. But the
              process is completely different because they use different
              consensus mechanisms.
            </Text>
            <Link
              className="mt20 mb40"
              to="https://ethereum.org/en/developers/docs/consensus-mechanisms/"
            >
              More on consensus mechanisms
            </Link>
            {/* NOTE: this section felt like there was a lot of repetition with the section below so have reframed to talk about validators in the context of the upgrades */}
          </ScrollAnimation>
        </ContentContainer>
      </SubContainer>
    </Container>
  );
};
