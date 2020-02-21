import React from "react";
import styled from "styled-components";
import ImgUrl from "../../static/TimelineMilestones.svg";
import { Text } from "../../components/Text";
import { Heading } from "grommet";

const MilestoneImg = styled.img`
  margin: 100px auto;
  display: block;
  width: 100%;
`;
const Container = styled.div`
  box-sizing: border-box;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 0 120px;
  @media only screen and (max-width: 1440px) {
    padding: 0 60px;
  }
`;

export const TimelineMileStones = (): JSX.Element => {
  return (
    <Container className="py100">
      <Heading level={2} size="medium" color="brand" margin="none">
        Timeline and milestones
      </Heading>
      <Text className="mt24">
        The eth2 network will be released in several milestones.
      </Text>
      <MilestoneImg src={ImgUrl} alt="" />
    </Container>
  );
};
