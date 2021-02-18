import React from 'react';
import styled from 'styled-components';
import ScrollAnimation from 'react-animate-on-scroll';
import { FormattedMessage, useIntl } from 'react-intl';
import { Heading } from '../../../components/Heading';
import { Text } from '../../../components/Text';
import { Link } from '../../../components/Link';
import { Button } from '../../../components/Button';
import { numberWithCommas } from '../../../utils/numberWithCommas';
import {
  BEACONCHAIN_URL,
  ENABLE_RPC_FEATURES,
  TICKER_NAME,
} from '../../../utils/envVars';
import calculateEth2Rewards from '../../../utils/calculateEth2Rewards';

//
// Styled Components

const Container = styled.div`
  background-color: ${p => p.theme.green.light};
  position: relative;
  padding: ${(p: { isMobile: boolean }) => (p.isMobile ? '64px 0' : '124px 0')};
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

const Card = styled.div`
  padding: 24px;
  border: 1px solid ${p => p.theme.gray.dark};
  border-radius: 4px;
  width: 100%;
  margin: 16px;
  background: white;
  @media only screen and (max-width: ${p => p.theme.screenSizes.medium}) {
    margin: 0px;
    margin-top: 16px;
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: ${p => p.theme.screenSizes.medium}) {
    flex-direction: column;
  }
`;

type PropData = {
  count: number;
  status: number;
};

//
// Main Component

export const NetworkStatus: React.FC<{
  amountEth?: number;
  totalValidators?: PropData;
}> = ({ amountEth = 0, totalValidators }): JSX.Element | null => {
  const { formatMessage } = useIntl();
  const [m, setM] = React.useState<boolean>((window as any).mobileCheck());

  React.useEffect(() => {
    const resizeListener = () => {
      setM((window as any).mobileCheck());
    };
    window.addEventListener('resize', resizeListener);
    return () => window.removeEventListener('resize', resizeListener);
  }, []);

  if (!ENABLE_RPC_FEATURES) return null;

  const currentAPR = calculateEth2Rewards({ totalAtStake: amountEth });
  const formattedAPR = (Math.round(currentAPR * 1000) / 10).toLocaleString();

  const TotalValidators = () => {
    if (totalValidators?.status === 200) {
      return <span>{numberWithCommas(totalValidators.count)}</span>;
    }
    if (totalValidators?.status === 500) {
      return <FormattedMessage defaultMessage="Loading error" />;
    }
    return <FormattedMessage defaultMessage="Loading..." />;
  };

  return (
    <Container isMobile={m}>
      <ScrollAnimation delay={750} animateIn="fadeIn" animateOnce>
        <Content isMobile={m}>
          <Heading level={2} size="medium" color="blueDark" className="mb40">
            <FormattedMessage defaultMessage="The Eth2 network" />
          </Heading>
          <CardContainer>
            <Card>
              <Heading level={3} size="medium" color="blueDark" margin="none">
                <FormattedMessage
                  defaultMessage="Total {TICKER_NAME} staked"
                  values={{ TICKER_NAME }}
                />
              </Heading>
              <Text size="x-large" className="mt20">
                <BoldGreen className="mr10" fontSize={24}>
                  {numberWithCommas(amountEth)} {TICKER_NAME}
                </BoldGreen>
              </Text>
            </Card>
            <Card>
              <Heading level={3} size="medium" color="blueDark" margin="none">
                <FormattedMessage defaultMessage="Total validators" />
              </Heading>
              <Text size="x-large" className="mt20">
                <BoldGreen className="mr10" fontSize={24}>
                  <TotalValidators />
                </BoldGreen>
              </Text>
            </Card>
            <Card>
              <Heading level={3} size="medium" color="blueDark" margin="none">
                <FormattedMessage
                  defaultMessage="Current APR"
                  description="APR refers to Annual Percentage Rate"
                />
              </Heading>
              <Text size="x-large" className="mt20">
                <BoldGreen className="mr10" fontSize={24}>
                  {formattedAPR}%
                </BoldGreen>
              </Text>
            </Card>
          </CardContainer>
          <Link isTextLink={false} to={BEACONCHAIN_URL} className="pt40">
            <Button
              className="m-auto"
              fullWidth
              width={m ? undefined : 400}
              label={formatMessage({ defaultMessage: 'More stats' })}
            />
          </Link>
        </Content>
      </ScrollAnimation>
    </Container>
  );
};
