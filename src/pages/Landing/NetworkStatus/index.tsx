import React from 'react';
import styled from 'styled-components';
import ScrollAnimation from 'react-animate-on-scroll';
import { Heading } from '../../../components/Heading';
import { Text } from '../../../components/Text';
import { ProgressBar } from './ProgressBar';
import { numberWithCommas } from '../../../utils/numberWithCommas';
import {
  IS_MAINNET,
  MAINNET_ETH_REQUIREMENT,
  INFURA_PROJECT_ID,
} from '../../../utils/envVars';

const Container = styled.div`
  background-color: ${p => p.theme.green.light};
  position: relative;
  padding: ${(p: { isMobile: boolean }) => (p.isMobile ? '60px 0' : '150px 0')};
`;
const Content = styled.div`
  max-width: ${p => p.theme.screenSizes.largest};
  width: 100%;
  margin: 0 auto;
  padding: 0 120px;
  @media only screen and (max-width: ${p => p.theme.screenSizes.largest}) {
    padding: ${(p: { isMobile: boolean }) =>
      p.isMobile ? '0 20px' : '0 60px'};
  }
`;
const BoldGreen = styled.span`
  color: ${(p: { theme: any; fontSize: number }) => p.theme.green.dark};
  font-size: ${(p: { theme: any; fontSize: number }) => p.fontSize}px;
  font-weight: bold;
`;
const BoldGray = styled.span`
  color: ${(p: { theme: any; fontSize: number }) => p.theme.gray.medium};
  font-size: ${(p: { theme: any; fontSize: number }) => p.fontSize}px;
  font-weight: bold;
`;

export const NetworkStatus: React.FC<{ amountEth?: number }> = ({
  amountEth = 0,
}): JSX.Element | null => {
  const m: boolean = (window as any).mobileCheck();

  const calculatePercentage = () => {
    const percentage = (amountEth / MAINNET_ETH_REQUIREMENT) * 100;
    if (percentage === 0) {
      return 0;
    }
    if (percentage < 1) {
      return 1;
    }
    return percentage;
  };

  const calculateLaunchThreshold = () =>
    (MAINNET_ETH_REQUIREMENT - amountEth).toFixed(1);

  if (!INFURA_PROJECT_ID || INFURA_PROJECT_ID === '') return null;

  return (
    <Container isMobile={m}>
      <Content isMobile={m}>
        <ScrollAnimation delay={750} animateIn="fadeIn" animateOnce>
          <Heading level={2} size="medium" color="blueDark" margin="none">
            Network status
          </Heading>
          <Text size="x-large" className="mt20">
            <BoldGreen className="mr10" fontSize={24}>
              {numberWithCommas(amountEth)}
              &nbsp;ETH
            </BoldGreen>
            already staked and counting.
          </Text>
          <Text className="mt20">
            The eth2 network needs to reach at least
            <BoldGreen className="mr10 ml10" fontSize={24}>
              524,288 ETH,
            </BoldGreen>
            <BoldGray className="mr10" fontSize={24}>
              16,384 validators,
            </BoldGray>
            to launch the
            {IS_MAINNET ? ' mainnet' : ' testnet'}.
          </Text>
          <div>
            <ProgressBar workflow={calculatePercentage()} />
            <div className="flex space-between mt20">
              <span className="flex">
                <BoldGreen fontSize={18} className="mr10">
                  {numberWithCommas(amountEth)}
                  &nbsp;ETH
                </BoldGreen>
                <Text size="small" style={{ marginTop: '2px' }}>
                  Current staking balance
                </Text>
              </span>
              <Text size="small">
                <strong>
                  {numberWithCommas(calculateLaunchThreshold())}
                  &nbsp;ETH&nbsp;
                </strong>
                Launch threshold
              </Text>
            </div>
          </div>
        </ScrollAnimation>
      </Content>
    </Container>
  );
};
