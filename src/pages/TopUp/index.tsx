import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Box } from 'grommet';
import styled from 'styled-components';
import { FormPrevious } from 'grommet-icons';
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

  return (
    <PageTemplate title="Top up a validator">
      {selectedValidator && (
        <BackText onClick={() => setSelectedValidator(null)} color="blueMedium">
          <Arrow />
          All Validators
        </BackText>
      )}
      <WalletConnectModal />
      <SubTextContainer className="mt20">
        <Text className="mt10">
          If your validator’s balance is getting low because you haven’t been
          active for a while, you may wish to top-up you balance to ensure your
          validator isn’t ejected from the validator set for having a balance
          that is too low. Low-balance ejections occur when a validator’s
          effective balance drops below 16 ETH. The Launchpad only facilitates
          top-ups that get validators’ balances to 32 ETH, as validator rewards
          are based on effective balance which is capped at 32 ETH.
        </Text>
      </SubTextContainer>

      {topUpPageContent}
    </PageTemplate>
  );
};

export const TopUpPage = _TopUpPage;
