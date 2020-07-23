import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import _shuffle from 'lodash/shuffle';
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
import { ClientCard } from './ClientCard';
import PrysmaticBg from '../../static/prysmatic-bg.png';
import LighthouseBg from '../../static/lighthouse-bg.png';
import NimbusBg from '../../static/nimbus-bg.png';
import TekuBg from '../../static/teku-bg.png';
import { routesEnum } from '../../Routes';
import { routeToCorrectWorkflowStep } from '../../utils/RouteToCorrectWorkflowStep';

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

const ClientContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 30px;
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

  const clientInfo: Client[] = _shuffle([
    {
      header: 'Lighthouse',
      text:
        'Lighthouse is a Ethereum 2.0 implementation, written in Rust with a heavy focus on speed and security.',
      imgUrl: LighthouseBg,
      url: routesEnum.lighthouse,
      linkText: 'Configure Lighthouse →',
    },
    {
      header: 'Nimbus',
      text:
        'Nimbus is a research project and a client implementation for Ethereum 2.0 designed to perform well on embedded systems and personal mobile devices.',
      imgUrl: NimbusBg,
      url: routesEnum.nimbus,
      linkText: 'Configure Nimbus →',
    },
    {
      header: 'Prysm',
      text:
        'Prysm is a Go implementation of Ethereum 2.0 protocol with a focus on usability, security, and reliability.',
      imgUrl: PrysmaticBg,
      url: routesEnum.prysm,
      linkText: 'Configure Prysm →',
    },
    {
      header: 'Teku',
      text:
        'PegaSys Teku is a Java-based Ethereum 2.0 client built to meet institutional needs and security requirements.',
      imgUrl: TekuBg,
      url: routesEnum.teku,
      linkText: 'Configure Teku →',
    },
  ]);

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
            {ENABLE_RPC_FEATURES && (
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
                    // @ts-ignore
                    amountValidators={amountEth / PRICE_PER_VALIDATOR}
                  />
                  <ProgressBarInfo
                    title="You added:"
                    color={colors.blue.light}
                    // @ts-ignore
                    amountEth={depositKeys.length * PRICE_PER_VALIDATOR}
                    amountValidators={depositKeys.length}
                  />
                  <ProgressBarInfo
                    title="Launch threshold:"
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
          <Heading
            level={3}
            size="medium"
            color="blueDark"
            margin="none"
            className="mt30"
          >
            Choose your client
          </Heading>
          <Text>
            Now that you’ve have made your deposit, it’s time to set up your
            Beacon Node, import your keystores, and run your Validator. Do some
            research into your client options:
          </Text>
          <Link className="mt10" to="/faq" primary withArrow>
            Learn more about the roles and responsibilities of ETH 2 Validators
          </Link>
          <ClientContainer>
            {clientInfo.map(client => (
              <ClientCard
                className="mt10"
                header={client.header}
                imgUrl={client.imgUrl}
                text={client.text}
                key={client.header}
                url={client.url}
                linkText={client.linkText}
              />
            ))}
          </ClientContainer>
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
