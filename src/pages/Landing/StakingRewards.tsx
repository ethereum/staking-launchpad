import React from "react";
import styled from "styled-components";
import ChartUrl from "../../static/StakingRewards.svg";
import { Text } from "../../components/Text";
import { Heading } from "grommet";

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
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 0 120px;
  @media only screen and (max-width: 1440px) {
    padding: 0 60px;
  }
`;

export const StakingRewards = (): JSX.Element => {
  return (
    <Container>
      <SubContainer className="py100">
        <Heading level={2} size="medium" color="brand" margin="none">
          Staking and rewards
        </Heading>
        <Text className="mt24">
          Once the mainnet has launched, validators get rewarded for attesting
          and proposing blocks. The rewards are tired to the overall amount of
          ETH staking in the network
        </Text>
        <APRChart src={ChartUrl} alt="" />
      </SubContainer>
    </Container>
  );
};
