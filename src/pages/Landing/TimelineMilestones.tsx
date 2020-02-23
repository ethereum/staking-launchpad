import React from "react";
import styled from "styled-components";
import ImgUrl from "../../static/TimelineMilestones.svg";
import { Text } from "../../components/Text";
import { Heading } from "grommet";
import ScrollAnimation from "react-animate-on-scroll";

const MilestoneImg = styled.img`
  margin: 100px auto;
  display: block;
  width: 100%;
`;
const Container = styled.div`
  box-sizing: border-box;
  max-width: ${p => p.theme.screenSizes.largest};
  width: 100%;
  margin: 0 auto;
  padding: 0 120px;
  @media only screen and (max-width: ${p => p.theme.screenSizes.largest}) {
    padding: 0 60px;
  }
`;

export const TimelineMileStones = (): JSX.Element => {
  return (
    <Container className="py100">
      <ScrollAnimation animateIn="fadeIn" animateOnce>
        <Heading level={2} size="medium" color="brand" margin="none">
          Timeline and milestones
        </Heading>
      </ScrollAnimation>
      <ScrollAnimation animateIn="fadeInUp" animateOnce>
        <Text className="mt24">
          The eth2 network will be released in several milestones.
        </Text>
      </ScrollAnimation>
      <MilestoneImg src={ImgUrl} alt="" />
    </Container>
  );
};
