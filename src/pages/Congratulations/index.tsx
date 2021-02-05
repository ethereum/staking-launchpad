import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { AppBar } from '../../components/AppBar';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import { Link } from '../../components/Link';
import { colors } from '../../styles/styledComponentsTheme';
import { ProgressBar } from './ProgresBar';
import { queryContract } from '../../utils/queryContract';
import { ProgressBarInfo } from './ProgressBarInfo';
import { DepositKeyInterface, StoreState } from '../../store/reducers';
import { WorkflowStep } from '../../store/actions/workflowActions';
import {
  ENABLE_RPC_FEATURES,
  ETH_REQUIREMENT,
  PRICE_PER_VALIDATOR,
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

const ChecklistAlert = styled.div`
  display: flex;
  margin-top: 3rem;
  background: #5da2b2;
  border-radius: 5px;
  > div {
    margin-left: 5rem;
  }
  .flex {
    height: 100%;
    flex-direction: column;
    justify-content: center;
  }
  @media only screen and (max-width: 720px) {
    padding: 2rem 0;
  }
`;
const Leslie = styled.img.attrs({ src: LeslieTheRhinoPNG })`
  width: 200px;
  transform: scale(-1.2, 1.2);
  margin: 3rem 0 5rem 4rem;
  @media only screen and (max-width: 720px) {
    display: none;
  }
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
          <Heading level={2} size="medium" color="blueDark" margin="none">
            <span role="img" aria-label="congratulations">
              🎉{' '}
            </span>
            <FormattedMessage defaultMessage="Congratulations!" />
          </Heading>
          <Heading
            level={3}
            size="medium"
            color="blueDark"
            margin="none"
            className="mt10"
          >
            <FormattedMessage defaultMessage="Thank you for supporting the Eth2 network!" />
          </Heading>
          <div>
            {ENABLE_RPC_FEATURES && (
              <>
                <ProgressBar
                  complete={stakingBalancePercent}
                  newlyAdded={amountAddedPercent}
                  incomplete={thresholdPercent}
                />
                <div className="flex space-between mt20">
                  <ProgressBarInfo
                    title={formatMessage({
                      defaultMessage: 'Staking balance:',
                      description: 'Informing user of staking balance',
                    })}
                    color={colors.blue.dark}
                    amountEth={amountEth}
                    // @ts-ignore
                    amountValidators={amountEth / PRICE_PER_VALIDATOR}
                  />
                  <ProgressBarInfo
                    title={formatMessage({
                      defaultMessage: 'You added:',
                      description: 'Informing user of total funds deposited',
                    })}
                    color={colors.blue.light}
                    // @ts-ignore
                    amountEth={depositKeys.length * PRICE_PER_VALIDATOR}
                    amountValidators={depositKeys.length}
                  />
                  <ProgressBarInfo
                    title={formatMessage({
                      defaultMessage: 'Launch threshold:',
                      description:
                        'Refers to threshold of ETH needed to launch the beacon chain',
                    })} /* TODO: remove this reference? */
                    color={colors.blue.lightest}
                    // @ts-ignore
                    amountEth={ETH_REQUIREMENT}
                    // @ts-ignore
                    amountValidators={ETH_REQUIREMENT / PRICE_PER_VALIDATOR}
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
                  <FormattedMessage defaultMessage="Complete the checklist" />
                </Heading>
                <Text color="white" className="mt10">
                  <FormattedMessage
                    defaultMessage="Be sure to complete any remaining items on the {stakerChecklist}
                      before your deposit is activated on the Beacon Chain."
                    values={{
                      stakerChecklist: (
                        <strong>
                          {formatMessage({
                            defaultMessage: 'Staker Checklist',
                          })}
                        </strong>
                      ),
                    }}
                    description="{stakerChecklist} = 'Staker Checklist' bolded to draw attention"
                  />
                </Text>
                <Link to={routesEnum.checklistPage} className="mt10">
                  <Button
                    width={260}
                    label="View the checklist"
                    className="mt20"
                  />
                </Link>
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
