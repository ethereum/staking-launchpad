import React from "react";
import styled from "styled-components";
import TimelineImg from "../../static/TimelineMilestones.svg";
import { Hero } from "./Hero";

const NetworkStatus = styled.div``;
const StakingRewards = styled.div``;
const SignupIntro = styled.div``;
const ThreeSteps = styled.div``;
const Phase0Info = styled.div``;
const CTAFooter = styled.div``;
const Timeline = styled.img`
  margin: 100px;
  width: 100%;
`;

export const LandingPage = (): JSX.Element => {
  return (
    <div>
      <Hero />
      <NetworkStatus>NetworkStatus</NetworkStatus>
      <StakingRewards>StakingRewards</StakingRewards>
      <Timeline src={TimelineImg} />
      <SignupIntro>SignupIntro</SignupIntro>
      <ThreeSteps>ThreeSteps</ThreeSteps>
      <Phase0Info>Phase0Info</Phase0Info>
      <CTAFooter>CTAFooter</CTAFooter>
    </div>
  );
};
