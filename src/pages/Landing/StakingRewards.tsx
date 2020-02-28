import React from "react";
import styled from "styled-components";
import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";
import ChartUrl from "../../static/StakingRewards.svg";
import { Heading } from "../../components/Heading";
import { Text } from "../../components/Text";

const Container = styled.div`
  background: ${p => p.theme.white};
  padding: ${(p: { isMobile: boolean }) => (p.isMobile ? "60px 0" : "150px 0")};
`;
const APRChart = styled.img`
  margin: ${(p: { isMobile: boolean }) =>
    p.isMobile ? "40px auto 0" : "100px auto 0"};
  display: block;
  width: ${(p: { isMobile: boolean }) => (p.isMobile ? "100%" : "66%")};
  @media only screen and (max-width: ${p => p.theme.screenSizes.medium}) {
    width: 100%;
  }
`;
const SubContainer = styled.div`
  width: 100%;
  max-width: ${p =>
    p.theme.screenSizes.largest}; // needed to contain the chart svg
  margin: 0 auto;
  padding: 0 120px;
  @media only screen and (max-width: ${p => p.theme.screenSizes.largest}) {
    padding: ${(p: { isMobile: boolean }) =>
      p.isMobile ? "0 20px" : "0 60px"};
  }
`;

export const StakingRewards = (): JSX.Element => {
  const m = (window as any).mobileCheck();
  return (
    <Container isMobile={m}>
      <SubContainer isMobile={m}>
        <ScrollAnimation animateIn="fadeIn" animateOnce>
          <Heading level={2} size="medium" color="blueDark" margin="none">
            Staking and rewards
          </Heading>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInUp" animateOnce>
          <Text className="mt25">
            Once the mainnet has launched, validators get rewarded for attesting
            and proposing blocks. The rewards are tired to the overall amount of
            ETH staking in the network
          </Text>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeIn" animateOnce delay={450}>
          <APRChart src={ChartUrl} alt="" isMobile={m} />
        </ScrollAnimation>
      </SubContainer>
    </Container>
  );
};
