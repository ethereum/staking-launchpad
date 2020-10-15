import React from 'react';
import styled from 'styled-components';
import ScrollAnimation from 'react-animate-on-scroll';
import TimelineGraphic from '../../static/timeline_deposit_contract_launch.svg';
import TimelineGraphicMobile from '../../static/timeline_deposit_contract_launch_mobile.svg';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';

const Container = styled.div`
  width: 100%;
  max-width: ${p => p.theme.screenSizes.largest}; // needed to contain the SVG
  margin: 0 auto;
  padding: 150px 60px;
  @media only screen and (max-width: ${p => p.theme.screenSizes.largest}) {
    padding: ${(p: { isMobile: boolean }) =>
      p.isMobile ? '40px' : '150px 60px'};
  }
`;
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
  margin-left: -20px;
  width: 280px;
  display: none;
  @media only screen and (max-width: ${p => p.theme.screenSizes.medium}) {
    display: block;
  }
`;

export const TimelineMileStones = (): JSX.Element => {
  const m = (window as any).mobileCheck();
  return (
    <Container isMobile={m}>
      <ScrollAnimation animateIn="fadeIn" animateOnce>
        <Heading level={2} size="medium" color="blueDark" margin="none">
          Timeline and milestones
        </Heading>
      </ScrollAnimation>
      <ScrollAnimation animateIn="fadeInUp" animateOnce>
        <Text className="mt25">Eth2 will be released in several phases.</Text>
      </ScrollAnimation>
      <ScrollAnimation animateIn="fadeIn" animateOnce>
        <MilestoneImg
          src={m ? TimelineGraphicMobile : TimelineGraphic}
          alt=""
        />
        <MilestoneImgMMobile src={TimelineGraphicMobile} alt="" />
      </ScrollAnimation>
    </Container>
  );
};
