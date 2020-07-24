import React from 'react';
import styled from 'styled-components';
import ScrollAnimation from 'react-animate-on-scroll';
import { Heading } from '../../../components/Heading';
import { Text } from '../../../components/Text';
import { ProgressBar } from './ProgressBar';
import { numberWithCommas } from '../../../utils/numberWithCommas';
import {
  IS_MAINNET,
  ETH_REQUIREMENT,
  ENABLE_RPC_FEATURES,
  ETH2_NETWORK_NAME,
  PRICE_PER_VALIDATOR,
  TICKER_NAME,
} from '../../../utils/envVars';
import useMobileCheck from '../../../hooks/useMobileCheck';

//
// Helpers

const calculatePercentage = (amountEth: number) => {
  const percentage = (amountEth / +ETH_REQUIREMENT) * 100;
  return percentage && Math.max(1, percentage);
};

const calculateLaunchThreshold = (amountEth: number) =>
  Math.floor(+ETH_REQUIREMENT - amountEth);

//
// Styled Components

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

//
// Sub-components

const PreThresholdSubText = ({
  amountEth = 0,
  mobile = false,
}: {
  amountEth?: number;
  mobile?: boolean;
}) => (
  <div className="flex space-between mt20">
    <span className={`flex ${mobile ? 'flex-column flex-start' : ''}`}>
      <BoldGreen fontSize={18} className="mr10">
        {numberWithCommas(amountEth)} {TICKER_NAME}
      </BoldGreen>
      <Text size="small" style={{ marginTop: '2px' }}>
        current staking balance
      </Text>
    </span>
    <Text
      className={mobile ? 'flex flex-column align-flex-end' : ''}
      size="small"
    >
      <strong>
        {calculateLaunchThreshold(amountEth)} {TICKER_NAME}
        {mobile ? <br /> : <>&nbsp;</>}
      </strong>
      until launch threshold
    </Text>
  </div>
);

const PostThresholdSubText = ({
  amountEth = 0,
  mobile = false,
}: {
  amountEth?: number;
  mobile?: boolean;
}) => (
  <div className="flex space-between mt20">
    <Text size="small">
      <strong>
        {numberWithCommas(ETH_REQUIREMENT)} {TICKER_NAME}
        {mobile ? <br /> : <>&nbsp;</>}
      </strong>
      until launch threshold
    </Text>
    <span
      className={`flex ${
        mobile ? 'flex-column flex-start align-flex-end' : ''
      }`}
    >
      <BoldGreen fontSize={18} className={mobile ? '' : 'mr10'}>
        {numberWithCommas(amountEth)} {TICKER_NAME}
      </BoldGreen>
      <Text size="small" style={{ marginTop: '2px' }}>
        current staking balance
      </Text>
    </span>
  </div>
);

//
// Main Component

export const NetworkStatus: React.FC<{ amountEth?: number }> = ({
  amountEth = 0,
}): JSX.Element | null => {
  const isSmallScreen: boolean = useMobileCheck('630px');
  const [m, setM] = React.useState<boolean>((window as any).mobileCheck());
  const percentageComplete = calculatePercentage(amountEth);
  const thresholdReached = amountEth >= +ETH_REQUIREMENT;

  React.useEffect(() => {
    const resizeListener = () => {
      setM((window as any).mobileCheck());
    };
    window.addEventListener('resize', resizeListener);
    return () => window.removeEventListener('resize', resizeListener);
  }, []);

  if (!ENABLE_RPC_FEATURES) return null;

  const validatorRequirement = numberWithCommas(
    Math.round(+ETH_REQUIREMENT / +PRICE_PER_VALIDATOR)
  );

  return (
    <Container isMobile={m}>
      <Content isMobile={m}>
        <ScrollAnimation delay={750} animateIn="fadeIn" animateOnce>
          <Heading level={2} size="medium" color="blueDark" margin="none">
            Network status
          </Heading>
          <Text size="x-large" className="mt20">
            <BoldGreen className="mr10" fontSize={24}>
              {numberWithCommas(amountEth)} {TICKER_NAME}
            </BoldGreen>
            already staked and counting.
          </Text>
          {thresholdReached ? (
            <>
              <Text className="mt20">
                The threshold to launch the eth2
                {IS_MAINNET ? ` mainnet ` : ` ${ETH2_NETWORK_NAME} testnet `}
                has been reached 🎉
              </Text>
              <div>
                <ProgressBar workflow={percentageComplete} />
                <PostThresholdSubText
                  {...{ amountEth, mobile: isSmallScreen }}
                />
              </div>
            </>
          ) : (
            <>
              <Text className="mt20">
                The eth2 network needs to reach at least
                <BoldGreen className="mr10 ml10" fontSize={24}>
                  {numberWithCommas(ETH_REQUIREMENT)} {TICKER_NAME},
                </BoldGreen>
                <BoldGray className="mr10" fontSize={24}>
                  {validatorRequirement} validators,
                </BoldGray>
                to launch the
                {IS_MAINNET ? ` mainnet` : ` ${ETH2_NETWORK_NAME} testnet`}.
              </Text>
              <div>
                <ProgressBar workflow={percentageComplete} />
                <PreThresholdSubText
                  {...{ amountEth, mobile: isSmallScreen }}
                />
              </div>
            </>
          )}
        </ScrollAnimation>
      </Content>
    </Container>
  );
};
