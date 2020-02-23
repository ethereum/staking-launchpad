import React from "react";
import styled from "styled-components";
import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";
import ChartUrl from "../../static/StakingRewards.svg";
import { Heading } from "../../components/Heading";
import { Text } from "../../components/Text";

const Container = styled.div`
  background: white;
`;
const APRChart = styled.img`
  margin: 100px auto;
  display: block;
  width: 100%;
`;
const SubContainer = styled.div`
  box-sizing: border-box;
  max-width: ${p => p.theme.screenSizes.largest};
  width: 100%;
  margin: 0 auto;
  padding: 0 120px;
  @media only screen and (max-width: ${p => p.theme.screenSizes.largest}) {
    padding: 0 60px;
  }
`;

export const StakingRewards = (): JSX.Element => {
  return (
    <Container>
      <SubContainer className="py100">
        <ScrollAnimation animateIn="fadeIn" animateOnce>
          <Heading level={2} size="medium" color="brand" margin="none">
            Staking and rewards
          </Heading>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInUp" animateOnce>
          <Text className="mt24">
            Once the mainnet has launched, validators get rewarded for attesting
            and proposing blocks. The rewards are tired to the overall amount of
            ETH staking in the network
          </Text>
        </ScrollAnimation>
        <APRChart src={ChartUrl} alt="" />
      </SubContainer>
    </Container>
  );
};
