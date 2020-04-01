import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { AppBar } from '../../components/AppBar';
import { Heading } from '../../components/Heading';
import { colors } from '../../styles/styledComponentsTheme';
import { ProgressBar } from './ProgresBar';
import { queryContract } from '../../utils/queryContract';
import { ProgressBarInfo } from './ProgressBarInfo';
import { StoreState } from '../../store/reducers';
import { KeyFileInterface } from '../../store/actions/keyFileActions';
import { routeToCorrectWorkflowStep } from '../../utils/RouteToCorrectWorkflowStep';
import { WorkflowStep } from '../../store/actions/workflowActions';
import {
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
  keyFiles: KeyFileInterface[];
  workflow: WorkflowStep;
}
interface DispatchProps {}
type Props = StateProps & DispatchProps & OwnProps;

const _CongratulationsPage = ({ keyFiles, workflow }: Props): JSX.Element => {
  const [amountEth, setAmountEth] = useState(0);
  useEffect(() => {
    const getBalance = async () => {
      const ethBalance = await queryContract();
      setAmountEth(ethBalance);
    };

    getBalance();
  });

  const stakingBalancePercent = (() => {
    const percent = (amountEth / MAINNET_ETH_REQUIREMENT) * 100;
    if (percent === 0) return 0;
    if (percent < 1) return 0.25;
    return percent;
  })();
  const amountAddedPercent = (() => {
    const percent =
      ((keyFiles.length * PRICE_PER_VALIDATOR) / MAINNET_ETH_REQUIREMENT) * 100;
    if (percent === 0) return 0;
    if (percent < 1) return 0.25;
    return percent;
  })();
  const thresholdPercent = 100 - stakingBalancePercent - amountAddedPercent;

  if (workflow > WorkflowStep.CONGRATULATIONS) {
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
                amountEth={keyFiles.length * PRICE_PER_VALIDATOR}
                amountValidators={keyFiles.length}
              />
              <ProgressBarInfo
                title="Launch threshold:"
                color={colors.blue.lightest}
                amountEth={MAINNET_ETH_REQUIREMENT}
                amountValidators={MAINNET_ETH_REQUIREMENT / PRICE_PER_VALIDATOR}
              />
            </div>
          </div>
        </Content>
      </Gutter>
    </RainbowBackground>
  );
};

const mapStateToProps = ({ keyFiles, workflow }: StoreState): StateProps => ({
  keyFiles,
  workflow,
});

export const CongratulationsPage = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  StoreState
>(mapStateToProps)(_CongratulationsPage);
