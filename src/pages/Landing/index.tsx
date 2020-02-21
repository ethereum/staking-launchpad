import React from "react";
import styled from "styled-components";
import TimelineImg from "../../static/TimelineMilestones.svg";
import { Hero } from "./Hero";
import { NetworkStatus } from "./NetworkStatus";
import { StakingRewards } from "./StakingRewards";

const SignupIntro = styled.div``;
const ThreeSteps = styled.div``;
const Phase0Info = styled.div``;
const CTAFooter = styled.div``;
const Timeline = styled.img``;

export const LandingPage = (): JSX.Element => {
  return (
    <div>
      <Hero />
      <NetworkStatus />
      <StakingRewards />
      {/*<Timeline src={TimelineImg} />*/}
      {/*<SignupIntro>SignupIntro</SignupIntro>*/}
      {/*<ThreeSteps>ThreeSteps</ThreeSteps>*/}
      {/*<Phase0Info>Phase0Info</Phase0Info>*/}
      {/*<CTAFooter>CTAFooter</CTAFooter>*/}
    </div>
  );
};
