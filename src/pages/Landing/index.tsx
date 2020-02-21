import React from "react";
import styled from "styled-components";
import { Hero } from "./Hero";
import { NetworkStatus } from "./NetworkStatus";
import { StakingRewards } from "./StakingRewards";
import { TimelineMileStones } from "./TimelineMilestones";

const SignupIntro = styled.div``;
const ThreeSteps = styled.div``;
const Phase0Info = styled.div``;
const CTAFooter = styled.div``;

export const LandingPage = (): JSX.Element => {
  return (
    <div>
      <Hero />
      <NetworkStatus />
      <StakingRewards />
      <TimelineMileStones />
      {/*<SignupIntro>SignupIntro</SignupIntro>*/}
      {/*<ThreeSteps>ThreeSteps</ThreeSteps>*/}
      {/*<Phase0Info>Phase0Info</Phase0Info>*/}
      {/*<CTAFooter>CTAFooter</CTAFooter>*/}
    </div>
  );
};
