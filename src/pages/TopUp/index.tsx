import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import styled from 'styled-components';
import { FormPrevious } from 'grommet-icons';
import { Alert as AlertIcon } from 'grommet-icons/icons';
import {
  BeaconChainValidator,
  BeaconChainValidatorResponse,
  Props,
} from './types';
import { Text } from '../../components/Text';
import { web3ReactInterface } from '../ConnectWallet';
import WalletConnectModal from './components/WalletConnectModal';
import ValidatorTable from './components/ValidatorTable';
import TopupPage from './components/TopupPage';
import Spinner from '../../components/Spinner';
import { PageTemplate } from '../../components/PageTemplate';
import { BEACONCHAIN_API_URL } from '../../utils/envVars';
import { AllowedNetworks, NetworkChainId } from '../ConnectWallet/web3Utils';
import { Alert } from '../../components/Alert';

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
  const { account, active, chainId }: web3ReactInterface = useWeb3React<
    Web3Provider
  >();
  const [validators, setValidators] = useState<BeaconChainValidator[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [validatorLoadError, setValidatorLoadError] = React.useState<boolean>(
    false
  );
  const [
    showDepositVerificationWarning,
    setShowDepositVerificationWarning,
  ] = React.useState(false);

  // an effect that fetches validators from beaconchain when the user connects or changes their wallet
  React.useEffect(() => {
    const fetchValidatorsForUserAddress = async () => {
      setLoading(true);

      // beaconchain API requires two fetches - one that gets the public keys for an eth1 address, and one that
      // queries by the validators public keys

      fetch(`${BEACONCHAIN_API_URL}/eth1/${account}`)
        .then(r => r.json())
        .then(
          ({
            data,
          }: {
            data: BeaconChainValidatorResponse[] | BeaconChainValidatorResponse;
          }) => {
            setShowDepositVerificationWarning(false);
            const response = Array.isArray(data) ? data : [data];
            // no validators for that user's wallet address
            if (response.length === 0) {
              setValidators([]);
              setLoading(false);
              return;
            }

            if (response.length === 0) {
              setValidators([]);
              setLoading(false);
            } else {
              // query by public keys
              const pubKeysCommaDelineated = `${response
                .slice(0, 50)
                .map(validator => validator.publickey)
                .join(',')}`;

              fetch(`${BEACONCHAIN_API_URL}/${pubKeysCommaDelineated}`)
                .then(r => r.json())
                .then(({ data }: { data: BeaconChainValidator[] }) => {
                  if (data.length === 0) {
                    setShowDepositVerificationWarning(true);
                  }
                  setValidators(data);
                  setLoading(false);
                })
                .catch(error => {
                  console.log(error);
                  setLoading(false);
                  setValidatorLoadError(true);
                });
            }
          }
        )
        .catch(error => {
          console.log(error);
          setLoading(false);
          setValidatorLoadError(true);
        });
    };

    const network = NetworkChainId[chainId as number];

    const isValidNetwork = Object.values(AllowedNetworks).includes(network);

    if (active && account && isValidNetwork) {
      fetchValidatorsForUserAddress();
    }
  }, [account, active, chainId]);

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
        <Alert variant="warning" className="my10">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <AlertIcon color="redLight" />
            <Text className="ml10">
              There was an issue loading your validator information from
              Beaconcha.in
            </Text>
          </div>
        </Alert>
      );
    }

    if (selectedValidator) {
      return <TopupPage validator={selectedValidator} />;
    }

    return (
      <>
        {showDepositVerificationWarning && (
          <Alert variant="warning" className="my10">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <AlertIcon color="redLight" />
              <Text className="ml10">
                You may have an ETH deposit that was accepted but is being
                validated on chain. It will be available here when beaconcha.in
                has confirmed 2048 blocks.
              </Text>
            </div>
          </Alert>
        )}
        <ValidatorTable
          validators={validators}
          setSelectedValidator={setSelectedValidator}
        />
      </>
    );
  }, [
    loading,
    validatorLoadError,
    selectedValidator,
    active,
    validators,
    showDepositVerificationWarning,
  ]);

  return (
    <>
      {/* the wallet connect modal controls it's own display, so it is always rendered here */}
      <WalletConnectModal />

      <PageTemplate title="Top up a validator">
        {/* render a "back button" if there's a selected validator */}
        {selectedValidator && (
          <BackText
            onClick={() => setSelectedValidator(null)}
            color="blueMedium"
          >
            <Arrow />
            All Validators
          </BackText>
        )}

        <SubTextContainer className="mt20">
          <Text className="mt10">
            If your validator’s balance is getting low because you haven’t been
            active for a while, you may wish to top-up you balance to ensure
            your validator isn’t ejected from the validator set for having a
            balance that is too low. Low-balance ejections occur when a
            validator’s effective balance drops below 16 ETH. The Launchpad only
            facilitates top-ups that get validators’ balances to 32 ETH, as
            validator rewards are based on effective balance which is capped at
            32 ETH.
          </Text>
        </SubTextContainer>

        {/* the main content for the topup page */}
        {topUpPageContent}
      </PageTemplate>
    </>
  );
};

export const TopUpPage = _TopUpPage;
