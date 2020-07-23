import React from 'react';
import { range as d3Range } from 'd3';
import styled from 'styled-components';
import 'animate.css/animate.min.css';
import ScrollAnimation from 'react-animate-on-scroll';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import { Link } from '../../components/Link';
import calculateEth2Rewards from '../../utils/calculateEth2Rewards';
import StakingRewardsChart from './StakingRewardsChart';
import { TICKER_NAME } from '../../utils/envVars';

/**
 * Utils
 */

const calcChartParams = (currentStaked: number) => {
  const increment = currentStaked > 40_000_000 ? 100_000 : 50_000;
  const millionHigher =
    currentStaked + 2_000_000 + increment - (currentStaked % 1_000_000);

  // We need to scale the chart based off a few things...

  // First, the max x value should default to 9 mil if the current staked
  // isn't close yet... But if it's close to or past 9 mil, then we add 2 mil
  // so that there's buffer room on the right
  const xMax = Math.max(millionHigher, 10_000_000 + increment);
  // Similar concept to the max except that all X values before x = 524,288 are
  // irrelevant and don't make sense to show... so if currentlyStaked < 524,288,
  // we just default to 524,288
  const xMin = Math.max(currentStaked, 524_288);

  return { xMin, xMax, increment };
};

/**
 * Styled Components
 */

const Container = styled.div`
  background: ${p => p.theme.white};
  padding: ${(p: { isMobile: boolean }) => (p.isMobile ? '60px 0' : '150px 0')};
`;

const SubContainer = styled.div`
  width: 100%;
  max-width: ${p =>
    p.theme.screenSizes.largest}; // needed to contain the chart svg
  margin: 0 auto;
  padding: 0 120px;
  @media only screen and (max-width: ${p => p.theme.screenSizes.largest}) {
    padding: ${(p: { isMobile: boolean }) =>
      p.isMobile ? '0 20px' : '0 60px'};
  }
`;

/**
 * Main Component
 */

export const StakingRewards: React.FC<{ currentStaked?: number }> = ({
  currentStaked = 524_288,
}): JSX.Element => {
  const m = (window as any).mobileCheck();

  // Here we'll generate the data points that make the curve in the chart.
  // We increment by 10k until the amount staked is past 15M, then we double the
  // increment to 20k (this is because the chart starts lagging with a lot of
  // points)
  const { xMax, xMin, increment } = calcChartParams(currentStaked);
  const data = [
    { x: 524_288, y: calculateEth2Rewards({ totalAtStake: 524_288 }) },
    ...d3Range(550_000, xMax, increment).map(totalAtStake => ({
      x: totalAtStake,
      y: calculateEth2Rewards({ totalAtStake }),
    })),
  ];

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
            Validators get rewarded for proposing and attesting to blocks. The
            rewards are tied to the overall amount of {TICKER_NAME} staked in
            the network.
          </Text>
          <Link
            external
            to="https://docs.google.com/spreadsheets/d/15tmPOvOgi3wKxJw7KQJKoUe-uonbYR6HF7u83LR5Mj4/edit#gid=842896204"
            className="my10"
            primary
          >
            Learn more about the economics of eth2 →
          </Link>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeIn" animateOnce delay={450}>
          <div style={{ width: '100%', marginTop: 100 }}>
            <StakingRewardsChart
              height={450}
              data={data}
              domains={{ x: [0, xMax + 1_000_000], y: [0, 0.26] }}
              color="#045388"
              showTooltips
              current={{
                x: xMin,
                y: calculateEth2Rewards({ totalAtStake: xMin }),
              }}
              xAxis={{
                range: [1_000_000, xMax],
                ticks: Math.floor(xMax / 1_000_000),
                format: (xAxisValue: number) =>
                  xAxisValue < 1_000_000
                    ? ''
                    : `${Math.floor(xAxisValue / 1_000_000)}`,
              }}
              yAxis={{
                range: [0, 0.26],
                ticks: 14,
                format: (yAxisValue: number) =>
                  yAxisValue && Math.round(yAxisValue) % 2
                    ? ''
                    : `${Math.round(yAxisValue * 100)}%`,
              }}
            />
          </div>
        </ScrollAnimation>
      </SubContainer>
    </Container>
  );
};
