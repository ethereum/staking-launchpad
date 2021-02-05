import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { AppBar } from '../../components/AppBar';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import { Alert } from '../../components/Alert';
import { Link } from '../../components/Link';
import { FormNext } from 'grommet-icons';
import { colors } from '../../styles/styledComponentsTheme';
import { ProgressBar } from './ProgresBar';
import { queryContract } from '../../utils/queryContract';
import { ProgressBarInfo } from './ProgressBarInfo';
import { DepositKeyInterface, StoreState } from '../../store/reducers';
import { WorkflowStep } from '../../store/actions/workflowActions';
import calculateEth2Rewards from '../../utils/calculateEth2Rewards';
import {
  ENABLE_RPC_FEATURES,
  ETH_REQUIREMENT,
  PRICE_PER_VALIDATOR,
  ETH2_NETWORK_NAME,
  TICKER_NAME,
} from '../../utils/envVars';
import { routesEnum } from '../../Routes';
import LeslieTheRhinoPNG from '../../static/eth2-leslie-rhino.png';
import { Button } from '../../components/Button';
import { routeToCorrectWorkflowStep } from '../../utils/RouteToCorrectWorkflowStep';
import { FormattedMessage, useIntl } from 'react-intl';

const RainbowBackground = styled.div`
  background-image: ${p =>
    `radial-gradient(circle at 100% -80%, ${p.theme.rainbowLight})`};
  min-height: 100vh;
`;

const Gutter = styled.div`
  padding: 0 48px;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 30px 0;
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
  width: 496px;
  margin-bottom: 24px;
  @media only screen and (max-width: ${p => p.theme.screenSizes.medium}) {
    margin: 0px;
    margin-top: 16px;
    width: 100%;
  }
`;

const CardLink = styled(Link)`
  padding: 24px;
  border: 1px solid ${p => p.theme.gray.dark};
  border-radius: 4px;
  width: 496px;
  margin-bottom: 24px;
  background-image: ${p =>
    `radial-gradient(circle at 100% -80%, ${p.theme.rainbowLight})`};
  @media only screen and (max-width: ${p => p.theme.screenSizes.medium}) {
    margin: 0px;
    margin-top: 16px;
    width: 100%;
  }
  &:hover {
    border-radius: 4px;
    box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.15);
    background-image: ${p => `linear-gradient(to right, ${p.theme.rainbow})`};
    transition: transform 0.1s;
    transform: scale(1.02);
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  @media only screen and (max-width: ${p => p.theme.screenSizes.medium}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
  flex-wrap: wrap;
  @media only screen and (max-width: ${p => p.theme.screenSizes.medium}) {
    flex-direction: column;
    margin-top: 32px;
    margin-bottom: 32px;
  }
`;

const ChecklistAlert = styled.div`
  display: flex;
  margin: 3rem 0rem;
  padding: 1rem;
  background: #5da2b2;
  border-radius: 4px;
  > div {
    margin-left: 5rem;
  }
  .flex {
    height: 100%;
    flex-direction: column;
    justify-content: center;
  }
  @media only screen and (max-width: ${p => p.theme.screenSizes.medium}) {
    flex-direction: column;
    > div {
      margin-left: 0rem;
    }
  }
`;

const Leslie = styled.img.attrs({ src: LeslieTheRhinoPNG })`
  width: 200px;
  transform: scale(-1.2, 1.2);
  margin: 3rem 0 5rem 4rem;
`;

interface OwnProps {}
interface StateProps {
  depositKeys: DepositKeyInterface[];
  workflow: WorkflowStep;
}
interface DispatchProps {}
interface Client {
  header: string;
  text: string;
  imgUrl: any;
  url: routesEnum;
  linkText: string;
}
type Props = StateProps & DispatchProps & OwnProps;

const _CongratulationsPage = ({
  depositKeys,
  workflow,
}: Props): JSX.Element => {
  const [amountEth, setAmountEth] = useState(0);
  const { formatMessage } = useIntl();
  const currentAPR = calculateEth2Rewards({ totalAtStake: amountEth });
  const formattedAPR = (Math.round(currentAPR * 1000) / 10).toLocaleString();

  useEffect(() => {
    if (ENABLE_RPC_FEATURES) {
      const getBalance = async () => {
        const ethBalance = await queryContract();
        setAmountEth(ethBalance);
      };
      getBalance();
    }
  });

  const stakingBalancePercent = (() => {
    // @ts-ignore (type check in envVars.ts)
    const percent = (amountEth / ETH_REQUIREMENT) * 100;
    if (percent === 0) return 0;
    if (percent < 1) return 0.25;
    return percent;
  })();
  const amountAddedPercent = (() => {
    const percent =
      // @ts-ignore
      ((depositKeys.length * PRICE_PER_VALIDATOR) / ETH_REQUIREMENT) * 100;
    if (percent === 0) return 0;
    if (percent < 1) return 0.25;
    return percent;
  })();
  const thresholdPercent = 100 - stakingBalancePercent - amountAddedPercent;

  if (workflow < WorkflowStep.CONGRATULATIONS) {
    return routeToCorrectWorkflowStep(workflow);
  }

  return (
    <RainbowBackground>
      <AppBar />
      <Gutter>
        <Content>
          <Heading
            level={2}
            size="medium"
            className="mt30"
            color="blueDark"
            margin="none"
          >
            <FormattedMessage defaultMessage="Your stake has reached the deposit contract!" />
            <span role="img" aria-label="congratulations">
              {' '}
              🎉
            </span>
          </Heading>
          <Alert variant="info" className="mt30" pad="medium">
            <FormattedMessage
              defaultMessage="There is a bit of a wait before your validator becomes active on the Beacon Chain. Use this time to complete the checklist and spend some time validating {testnet}"
              values={{
                testnet: (
                  <Link inline to="https://pyrmont.launchpad.ethereum.org">
                    {ETH2_NETWORK_NAME}
                  </Link>
                ),
              }}
            />
          </Alert>
          <div>
            {ENABLE_RPC_FEATURES && (
              <>
                <Heading
                  level={3}
                  size="medium"
                  color="blueDark"
                  margin="none"
                  className="mt60"
                >
                  <FormattedMessage defaultMessage="Overview" />
                </Heading>
                <CardContainer>
                  <Card>
                    <Heading
                      level={3}
                      size="medium"
                      color="blueDark"
                      margin="none"
                    >
                      <FormattedMessage defaultMessage="Your stake" />
                    </Heading>
                    <Text size="x-large" className="mt20">
                      <BoldGreen className="mr10" fontSize={24}>
                        {depositKeys.length * +PRICE_PER_VALIDATOR}{' '}
                        {TICKER_NAME}
                      </BoldGreen>
                    </Text>
                  </Card>
                  <Card>
                    <Heading
                      level={3}
                      size="medium"
                      color="blueDark"
                      margin="none"
                    >
                      <FormattedMessage defaultMessage="Your validators" />
                    </Heading>
                    <Text size="x-large" className="mt20">
                      <BoldGreen className="mr10" fontSize={24}>
                        <FormattedMessage
                          defaultMessage="{depositKeys} validators"
                          values={{
                            depositKeys: <span>{depositKeys.length}</span>,
                          }}
                        />
                      </BoldGreen>
                    </Text>
                  </Card>
                  <Card>
                    <Heading
                      level={3}
                      size="medium"
                      color="blueDark"
                      margin="none"
                    >
                      <FormattedMessage defaultMessage="Current APR" />
                    </Heading>
                    <Text size="x-large" className="mt20">
                      <BoldGreen className="mr10" fontSize={24}>
                        {formattedAPR}%
                      </BoldGreen>
                    </Text>
                  </Card>
                  <CardLink to={routesEnum.checklistPage}>
                    <Row>
                      <div>
                        <Heading
                          level={3}
                          size="medium"
                          color="blueDark"
                          margin="none"
                        >
                          <span role="img" aria-label="clipboard">
                            📋{' '}
                          </span>
                          <FormattedMessage defaultMessage="Next" />
                        </Heading>
                        <Text size="x-large" className="mt20">
                          <FormattedMessage defaultMessage="Complete the staker checklist" />
                        </Text>
                      </div>
                      <FormNext size="large" />
                    </Row>
                  </CardLink>
                </CardContainer>
                <Heading
                  level={3}
                  size="medium"
                  className="mt40"
                  color="blueDark"
                  margin="none"
                >
                  <FormattedMessage defaultMessage="The Eth2 network" />
                </Heading>
                <ProgressBar
                  complete={stakingBalancePercent}
                  newlyAdded={amountAddedPercent}
                  incomplete={thresholdPercent}
                />
                <div className="flex space-between mt20">
                  <ProgressBarInfo
                    title={formatMessage({
                      defaultMessage: 'Staking balance',
                      description: 'Informing user of staking balance',
                    })}
                    color={colors.blue.dark}
                    amountEth={amountEth}
                    // @ts-ignore
                    amountValidators={amountEth / PRICE_PER_VALIDATOR}
                  />
                  <ProgressBarInfo
                    title={formatMessage({
                      defaultMessage: 'You added',
                      description: 'Informing user of total funds deposited',
                    })}
                    color={colors.blue.light}
                    // @ts-ignore
                    amountEth={depositKeys.length * PRICE_PER_VALIDATOR}
                    amountValidators={depositKeys.length}
                  />
                </div>
              </>
            )}
          </div>

          <ChecklistAlert>
            <Leslie />
            <div>
              <div className="flex">
                <Heading level={3} size="medium" color="white" margin="none">
                  <FormattedMessage defaultMessage="Thank you for supporting the Eth2 network!" />
                </Heading>
                <Text color="white" className="mt10">
                  <FormattedMessage
                    defaultMessage="Be sure to complete the {stakerChecklist} as soon as possible. And join the EthStaker community for support and discussion with fellow validators."
                    values={{
                      stakerChecklist: (
                        <strong>
                          {formatMessage({
                            defaultMessage: 'staker checklist',
                          })}
                        </strong>
                      ),
                    }}
                    description="{stakerChecklist} = 'Staker Checklist' bolded to draw attention"
                  />
                </Text>
                <ButtonRow>
                  <Link to={routesEnum.checklistPage} className="mt20">
                    <Button
                      label={formatMessage({ id: 'Checklist' })}
                      className="mr20"
                      rainbow
                    />
                  </Link>
                  <Link to="https://invite.gg/ethstaker" className="mt20">
                    <Button
                      fullWidth
                      label={formatMessage({ id: 'EthStaker community' })}
                    />
                  </Link>
                </ButtonRow>
              </div>
            </div>
          </ChecklistAlert>
        </Content>
      </Gutter>
    </RainbowBackground>
  );
};

const mapStateToProps = ({
  depositFile,
  workflow,
}: StoreState): StateProps => ({
  depositKeys: depositFile.keys,
  workflow,
});

export const CongratulationsPage = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  StoreState
>(mapStateToProps)(_CongratulationsPage);
