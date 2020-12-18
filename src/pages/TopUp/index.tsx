import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Box } from 'grommet';
import styled from 'styled-components';
import {
  BeaconChainValidator,
  BeaconChainValidatorResponse,
  Props,
} from './types';
import { Text } from '../../components/Text';
import { web3ReactInterface } from '../ConnectWallet';
import WalletConnectModal from './WalletConnectModal';
import ValidatorTable from './ValidatorTable';
import TopupPage from './TopupPage';
import Spinner from '../../components/Spinner';
import { PageTemplate } from '../../components/PageTemplate';
import { FormPrevious } from 'grommet-icons';
import { BEACONCHAIN_API_URL } from '../../utils/envVars';

const Arrow = styled(props => <FormPrevious {...props} />)`
  position: absolute;
  left: 0;
  color: ${p => p.theme.blue.medium};
`;
const SubTextContainer = styled.div``;
const BackText = styled(Text)`
  margin-top: -25px;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
  position: relative;
  padding-left: 25px;
`;

const _TopUpPage: React.FC<Props> = () => {
  const { account, active }: web3ReactInterface = useWeb3React<Web3Provider>();
  const [validators, setValidators] = useState<BeaconChainValidator[]>([]);
  const [showWalletModal, setShowWalletModal] = React.useState(true);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [validatorLoadError, setValidatorLoadError] = React.useState<boolean>(
    false
  );

  useEffect(() => {
    setShowWalletModal(!active);
  }, [active]);

  React.useEffect(() => {
    const fetchValidatorsForUserAddress = async () => {
      setLoading(true);
      fetch(`${BEACONCHAIN_API_URL}/eth1/${account}`)
        .then(r => r.json())
        .then(({ data }: { data: BeaconChainValidatorResponse[] }) => {
          if (data.length === 0) {
            setLoading(false);
          } else {
            const pubKeysCommaDelin = `${data
              .slice(0, 99)
              .map(validator => validator.publickey)
              .join(',')}`;
            fetch(`${BEACONCHAIN_API_URL}/${pubKeysCommaDelin}`)
              .then(r => r.json())
              .then(({ data }: { data: BeaconChainValidator[] }) => {
                setValidators([...validators, ...data]);
                setLoading(false);
              })
              .catch(() => {
                setLoading(false);
                setValidatorLoadError(true);
              });
          }
        })
        .catch(() => {
          setLoading(false);
          setValidatorLoadError(true);
        });
    };

    if (active && account) {
      fetchValidatorsForUserAddress();
    }
  }, [account, active]);

  const [
    selectedValidator,
    setSelectedValidator,
  ] = useState<BeaconChainValidator | null>(null);

  const topUpPageContent = React.useMemo(() => {
    if (loading || !active) {
      return <Spinner className="mt40" />;
    }
    if (validatorLoadError) {
      return (
        <Box align="center" justify="center" className="mt30">
          There was an issue loading your validator information from
          Beaconcha.in
        </Box>
      );
    }
    if (selectedValidator) {
      return <TopupPage validator={selectedValidator} />;
    }

    return (
      <ValidatorTable
        validators={validators}
        setSelectedValidator={setSelectedValidator}
      />
    );
  }, [loading, validatorLoadError, selectedValidator, active]);

  // Top up a validator

  return (
    <PageTemplate title="Top up a validator">
      {selectedValidator && (
        <BackText onClick={() => setSelectedValidator(null)} color="blueMedium">
          <Arrow />
          All Validators
        </BackText>
      )}
      {showWalletModal && <WalletConnectModal />}
      <SubTextContainer className="mt20">
        <Text className="mt10">
          Use this page for topping up your validators that have been slashed.
          Keeping an effective balance of 32 ETH for your validator is the best
          way to maximize your ETH2 staking rewards.
        </Text>
        <Text className="mt10">
          Slashing occurs when a validator has acted against the Ethereum
          network, yet slashing may occur to non-malicious users due to
          misconfiguration. For example, running the same validation keys on two
          different machines may result in a loss of funds. The goal of slashing
          is both to disincentive those who seek to harm the Eth2 network, and
          to bolster the security of the chain by promoting good actors.
        </Text>
      </SubTextContainer>

      {topUpPageContent}
    </PageTemplate>
  );
};

export const TopUpPage = _TopUpPage;
