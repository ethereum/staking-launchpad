import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FormNext, FlagFill } from 'grommet-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { AppBar } from '../../components/AppBar';
import { Heading } from '../../components/Heading';
import _every from 'lodash/every';
import { Text } from '../../components/Text';
import { Alert } from '../../components/Alert';
import { Link } from '../../components/Link';
import { KeyList } from '../../pages/Transactions/Keylist';
import { DepositKeyInterface, StoreState } from '../../store/reducers';
import { WorkflowStep } from '../../store/actions/workflowActions';
import calculateEth2Rewards from '../../utils/calculateEth2Rewards';
import {
  ENABLE_RPC_FEATURES,
  PRICE_PER_VALIDATOR,
  TESTNET_LAUNCHPAD_NAME,
  IS_MAINNET,
  MAINNET_LAUNCHPAD_URL,
  TESTNET_LAUNCHPAD_URL,
  TICKER_NAME,
} from '../../utils/envVars';
import { routesEnum } from '../../Routes';
import LeslieTheRhinoPNG from '../../static/eth2-leslie-rhino.png';
import { Button } from '../../components/Button';
import { routeToCorrectWorkflowStep } from '../../utils/RouteToCorrectWorkflowStep';
import {
  DepositStatus,
  TransactionStatus,
} from '../../store/actions/depositFileActions';

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

const WarningRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  color: ${p => p.theme.red.medium};
  margin-top: 1rem;
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  @media only screen and (max-width: ${p => p.theme.screenSizes.medium}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const WarningText = styled(Text)`
  color: ${p => p.theme.red.medium};
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
  const { formatMessage } = useIntl();

  const totalTxCount = depositKeys.filter(
    key => key.depositStatus !== DepositStatus.ALREADY_DEPOSITED
  ).length;

  const remainingTxCount = depositKeys.filter(
    file =>
      file.depositStatus !== DepositStatus.ALREADY_DEPOSITED &&
      (file.transactionStatus === TransactionStatus.READY ||
        file.transactionStatus === TransactionStatus.REJECTED)
  ).length;

  const allTxConfirmed = _every(
    depositKeys.map(
      file => file.transactionStatus === TransactionStatus.SUCCEEDED
    )
  );

  const actualTxConfirmed = totalTxCount - remainingTxCount;

  const currentAPR = calculateEth2Rewards({ totalAtStake: actualTxConfirmed });
  const formattedAPR = (Math.round(currentAPR * 1000) / 10).toLocaleString();

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
            <span
              role="img"
              aria-label={formatMessage({ defaultMessage: 'congratulations' })}
            >
              {' '}
              🎉
            </span>
          </Heading>
          <Alert variant="info" className="mt30" pad="medium">
            {IS_MAINNET && (
              <>
                <FormattedMessage
                  defaultMessage="There is a short wait before your validator becomes active on the Beacon Chain. Use this time to complete the checklist and spend some time validating the {testnet}"
                  values={{
                    testnet: (
                      <Link primary inline to={TESTNET_LAUNCHPAD_URL}>
                        {TESTNET_LAUNCHPAD_NAME} Testnet
                      </Link>
                    ),
                  }}
                />{' '}
                <Link
                  primary
                  to="https://kb.beaconcha.in/ethereum-2.0-depositing"
                  className="mt10"
                >
                  <FormattedMessage defaultMessage="Why is there a wait?" />
                </Link>
              </>
            )}
            {!IS_MAINNET && (
              <FormattedMessage
                defaultMessage="You've successfully set up a testnet validator! We recommend you complete the checklist before validating on {mainnet}"
                values={{
                  mainnet: (
                    <Link primary inline to={MAINNET_LAUNCHPAD_URL}>
                      mainnet
                    </Link>
                  ),
                }}
              />
            )}
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
                        {actualTxConfirmed * +PRICE_PER_VALIDATOR} {TICKER_NAME}
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
                          defaultMessage="{totalTxCount} validators"
                          values={{
                            totalTxCount: <span>{actualTxConfirmed}</span>,
                          }}
                        />
                      </BoldGreen>
                    </Text>
                    {!allTxConfirmed && (
                      <WarningRow>
                        <FlagFill color="red" />
                        <WarningText className="ml20">
                          <FormattedMessage
                            defaultMessage="You have {remainingTxCount} outstanding deposits"
                            values={{ remainingTxCount: remainingTxCount }}
                          />
                        </WarningText>
                      </WarningRow>
                    )}
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
                  {!allTxConfirmed ? (
                    <CardLink to={routesEnum.checklistPage}>
                      <Row>
                        <div>
                          <Heading
                            level={3}
                            size="medium"
                            color="blueDark"
                            margin="none"
                          >
                            <span
                              role="img"
                              aria-label={formatMessage({
                                defaultMessage: 'clipboard',
                              })}
                            >
                              📋{' '}
                            </span>
                            <FormattedMessage defaultMessage="Next" />
                          </Heading>
                          <Text size="x-large" className="mt20">
                            <FormattedMessage
                              defaultMessage="Complete remaining {remainingTxCount} deposits"
                              values={{ remainingTxCount: remainingTxCount }}
                            />
                          </Text>
                          <Text size="small">
                            <FormattedMessage defaultMessage="You can also confirm the deposits individually below..." />
                          </Text>
                        </div>
                        <FormNext size="large" />
                      </Row>
                    </CardLink>
                  ) : (
                    <CardLink to={routesEnum.checklistPage}>
                      <Row>
                        <div>
                          <Heading
                            level={3}
                            size="medium"
                            color="blueDark"
                            margin="none"
                          >
                            <span
                              role="img"
                              aria-label={formatMessage({
                                defaultMessage: 'clipboard',
                              })}
                            >
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
                  )}
                </CardContainer>
              </>
            )}
          </div>
          {!allTxConfirmed && (
            <>
              <Heading level={3} className="mt20">
                <FormattedMessage defaultMessage="Outstanding deposits" />(
                {remainingTxCount})
              </Heading>
              <Text className="mt20">
                <FormattedMessage defaultMessage="Your deposit_data.json suggests you wanted to set up more validators. These deposits are still outstanding. If you think you've already made these deposits, wait an hour before trying again to avoid duplicate deposits." />
              </Text>
              <KeyList />
            </>
          )}
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
                      label={formatMessage({ defaultMessage: 'Checklist' })}
                      className="mr20"
                      rainbow
                    />
                  </Link>
                  <Link
                    isTextLink={false}
                    to="https://invite.gg/ethstaker"
                    className="mt20"
                  >
                    <Button
                      fullWidth
                      label={formatMessage({
                        defaultMessage: 'EthStaker community',
                      })}
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
