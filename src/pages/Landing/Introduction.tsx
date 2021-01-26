import React from 'react';
import styled from 'styled-components';
import ScrollAnimation from 'react-animate-on-scroll';
import EthDiamondPlain from '../../static/eth-diamond-plain.svg';
import EthRound from '../../static/eth-round-landing.svg';
import { Text } from '../../components/Text';
import { Heading } from '../../components/Heading';

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
              How does eth2 upgrade Ethereum?
            </Heading>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeInUp" animateOnce>
            <Text className="mt25">
              Eth2 is the name for a collection of upgrades to the underlying
              consensus and data-handling capabilities of Ethereum. It is not a
              replacement of the Ethereum chain you know and love, but a way to
              achieve a more rapid and less risky upgrade for Ethereum.
            </Text>
            <Text className="mt25">
              The <i>beacon chain</i> had its genesis on the 1st of December
              2020 and forms the basis for all the eth2 upgrades. When the chain
              is stable enough and feature-complete, it will be swapped in as
              the consensus mechanism for Ethereum.
            </Text>
            <Text className="mt25">
              Eth2 uses a different type of consensus, called Proof of Stake
              (PoS), which requires active participants – known as validators.
              Validators are responsible for securing the network and receive
              continuous payouts for actions that help the network reach
              consensus.
            </Text>
            <Text className="mt25">
              This Launch Pad takes you through the process of becoming one.
            </Text>
          </ScrollAnimation>
        </ContentContainer>
      </SubContainer>
    </Container>
  );
};
