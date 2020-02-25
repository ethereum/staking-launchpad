import React from "react";
import styled from "styled-components";
import ScrollAnimation from "react-animate-on-scroll";
import TimelineGraphic from "../../static/timeline.svg";
import TimelineGraphicMobile from "../../static/timeline-mobile.svg";
import { Heading } from "../../components/Heading";
import { Text } from "../../components/Text";

const MilestoneImg = styled.img`
  margin: 100px auto;
  display: block;
  width: 100%;
  @media only screen and (max-width: ${p => p.theme.screenSizes.medium}) {
    display: none;
  }
`;

const MilestoneImgMMobile = styled.img`
  margin-top: 40px;
  width: 280px;
  display: none;
  @media only screen and (max-width: ${p => p.theme.screenSizes.medium}) {
    display: block;
  }
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
  console.log((window as any).mobileCheck());
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
      <MilestoneImg
        src={
          (window as any).mobileCheck()
            ? TimelineGraphicMobile
            : TimelineGraphic
        }
        alt=""
      />
      <MilestoneImgMMobile
        src={TimelineGraphicMobile}
        alt=""
      />
    </Container>
  );
};
