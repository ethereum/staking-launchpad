import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { AppBar } from '../../components/AppBar';
import { Heading } from '../../components/Heading';
import { colors } from '../../styles/styledComponentsTheme';
import { ProgressBar } from './ProgresBar';
import { queryContract } from '../../utils/queryContract';
import { ProgressBarInfo } from './ProgressBarInfo';
import { DepositKeyInterface, StoreState } from '../../store/reducers';
import { routeToCorrectWorkflowStep } from '../../utils/RouteToCorrectWorkflowStep';
import { WorkflowStep } from '../../store/actions/workflowActions';
import {
  INFURA_PROJECT_ID,
  MAINNET_ETH_REQUIREMENT,
  PRICE_PER_VALIDATOR,
} from '../../utils/envVars';

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

interface OwnProps {}
interface StateProps {
  depositKeys: DepositKeyInterface[];
  workflow: WorkflowStep;
}
interface DispatchProps {}
type Props = StateProps & DispatchProps & OwnProps;

const _CongratulationsPage = ({
  depositKeys,
  workflow,
}: Props): JSX.Element => {
  const shouldRenderProgressBar = INFURA_PROJECT_ID !== '';
  const [amountEth, setAmountEth] = useState(0);

  useEffect(() => {
    if (shouldRenderProgressBar) {
      const getBalance = async () => {
        const ethBalance = await queryContract();
        setAmountEth(ethBalance);
      };

      getBalance();
    }
  });

  const stakingBalancePercent = (() => {
    const percent = (amountEth / MAINNET_ETH_REQUIREMENT) * 100;
    if (percent === 0) return 0;
    if (percent < 1) return 0.25;
    return percent;
  })();
  const amountAddedPercent = (() => {
    const percent =
      ((depositKeys.length * PRICE_PER_VALIDATOR) / MAINNET_ETH_REQUIREMENT) *
      100;
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
          <Heading level={2} size="medium" color="blueDark" margin="none">
            Congratulations!
          </Heading>
          <Heading
            level={3}
            size="medium"
            color="blueDark"
            margin="none"
            className="mt10"
          >
            Thank you for supporting the eth2 network!
          </Heading>
          <div>
            {shouldRenderProgressBar && (
              <>
                <ProgressBar
                  complete={stakingBalancePercent}
                  newlyAdded={amountAddedPercent}
                  incomplete={thresholdPercent}
                />
                <div className="flex space-between mt20">
                  <ProgressBarInfo
                    title="Staking balance:"
                    color={colors.blue.dark}
                    amountEth={amountEth}
                    amountValidators={amountEth / PRICE_PER_VALIDATOR}
                  />
                  <ProgressBarInfo
                    title="You added:"
                    color={colors.blue.light}
                    amountEth={depositKeys.length * PRICE_PER_VALIDATOR}
                    amountValidators={depositKeys.length}
                  />
                  <ProgressBarInfo
                    title="Launch threshold:"
                    color={colors.blue.lightest}
                    amountEth={MAINNET_ETH_REQUIREMENT}
                    amountValidators={
                      MAINNET_ETH_REQUIREMENT / PRICE_PER_VALIDATOR
                    }
                  />
                </div>
              </>
            )}
          </div>
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
