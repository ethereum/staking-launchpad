import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { AppBar } from '../../components/AppBar';
import { Heading } from '../../components/Heading';
import { colors } from '../../styles/styledComponentsTheme';
import { ProgressBar } from './ProgresBar';
import { queryContract } from '../../utils/queryContract';
import { ProgressBarInfo } from './ProgressBarInfo';
import { mainnetEthRequirement, pricePerValidator } from '../../enums';
import { StoreState } from '../../store/reducers';
import { KeyFileInterface, ProgressStep } from '../../store/actions';
import { routeToCorrectProgressStep } from '../../utils/RouteToCorrectProgressStep';

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

const _CongratulationsPage = ({
  keyFiles,
  progress,
}: {
  keyFiles: KeyFileInterface[];
  progress: ProgressStep;
}): JSX.Element => {
  const [amountEth, setAmountEth] = useState(0);
  useEffect(() => {
    const getBalance = async () => {
      const ethBalance = await queryContract();
      setAmountEth(ethBalance);
    };

    getBalance();
  });

  const stakingBalancePercent = (() => {
    const percent = (amountEth / mainnetEthRequirement) * 100;
    if (percent === 0) return 0;
    if (percent < 1) return 0.25;
    return percent;
  })();
  const amountAddedPercent = (() => {
    const percent =
      ((keyFiles.length * pricePerValidator) / mainnetEthRequirement) * 100;
    if (percent === 0) return 0;
    if (percent < 1) return 0.25;
    return percent;
  })();
  const thresholdPercent = 100 - stakingBalancePercent - amountAddedPercent;

  if (progress > ProgressStep.CONGRATULATIONS) {
    return routeToCorrectProgressStep(progress);
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
                amountValidators={amountEth / pricePerValidator}
              />
              <ProgressBarInfo
                title="You added:"
                color={colors.blue.light}
                amountEth={keyFiles.length * pricePerValidator}
                amountValidators={keyFiles.length}
              />
              <ProgressBarInfo
                title="Launch threshold:"
                color={colors.blue.lightest}
                amountEth={mainnetEthRequirement}
                amountValidators={mainnetEthRequirement / pricePerValidator}
              />
            </div>
          </div>
        </Content>
      </Gutter>
    </RainbowBackground>
  );
};

const mstp = ({ keyFiles, progress }: StoreState) => ({
  keyFiles,
  progress,
});

export const CongratulationsPage = connect(mstp)(_CongratulationsPage);
