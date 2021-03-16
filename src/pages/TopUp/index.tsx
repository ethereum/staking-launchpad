import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
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
import {
  BEACONCHAIN_URL,
  PRICE_PER_VALIDATOR,
  EJECTION_PRICE,
  TICKER_NAME,
} from '../../utils/envVars';
import { AllowedNetworks, NetworkChainId } from '../ConnectWallet/web3Utils';
import { Alert } from '../../components/Alert';
import { Link } from '../../components/Link';

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

const FakeLink = styled.span`
  color: blue;
  text-decoration: underline;
  cursor: pointer;
  display: inline;
`;

const _TopUpPage: React.FC<Props> = () => {
  const {
    account,
    active,
    chainId,
    deactivate,
  }: web3ReactInterface = useWeb3React<Web3Provider>();
  const [validators, setValidators] = useState<BeaconChainValidator[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [validatorLoadError, setValidatorLoadError] = React.useState<boolean>(
    false
  );
  const [
    showDepositVerificationWarning,
    setShowDepositVerificationWarning,
  ] = React.useState(false);

  const { formatMessage } = useIntl();

  // an effect that fetches validators from beaconchain when the user connects or changes their wallet
  React.useEffect(() => {
    const fetchValidatorsForUserAddress = async () => {
      setLoading(true);

      // beaconchain API requires two fetches - one that gets the public keys for an eth1 address, and one that
      // queries by the validators public keys

      fetch(`${BEACONCHAIN_URL}/api/v1/validator/eth1/${account}`)
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

              fetch(
                `${BEACONCHAIN_URL}/api/v1/validator/${pubKeysCommaDelineated}`
              )
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
              <FormattedMessage defaultMessage="There was an error loading your validator information from Beaconcha.in" />
            </Text>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Text className="mt20">
              <FormattedMessage
                defaultMessage="You can {reloadYourWallet} to try again, or refresh the page. If issue persists, let us know on {github}."
                values={{
                  reloadYourWallet: (
                    <FakeLink onClick={deactivate}>
                      <FormattedMessage defaultMessage="reload your wallet" />
                    </FakeLink>
                  ),
                  github: (
                    <Link
                      inline
                      primary
                      to="https://github.com/ethereum/eth2.0-deposit/issues/new"
                    >
                      GitHub
                    </Link>
                  ),
                }}
                description="{reloadYourWallet} is a link labeled 'reload your wallet'"
              />
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
                <FormattedMessage
                  defaultMessage="You may have an {TICKER_NAME} deposit that was accepted but is being
                    validated on chain. It will be available here when beaconcha.in
                    has confirmed 2048 blocks."
                  values={{ TICKER_NAME }}
                />
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
    deactivate,
  ]);

  return (
    <>
      {/* the wallet connect modal controls it's own display, so it is always rendered here */}
      <WalletConnectModal />

      <PageTemplate
        title={formatMessage({ defaultMessage: 'Top up a validator' })}
      >
        {/* render a "back button" if there's a selected validator */}
        {selectedValidator && (
          <BackText
            onClick={() => setSelectedValidator(null)}
            color="blueMedium"
          >
            <Arrow />
            <FormattedMessage defaultMessage="All validators" />
          </BackText>
        )}

        <SubTextContainer className="mt20">
          <Text className="mt10">
            <FormattedMessage
              defaultMessage="You may need to top up your validator's balance for two important reasons. If your validator's effective balance is below {PRICE_PER_VALIDATOR} {TICKER_NAME} you won't be earning your full staker rewards. And if it drops as low as {EJECTION_PRICE} {TICKER_NAME} the system will eject your validator."
              values={{ PRICE_PER_VALIDATOR, TICKER_NAME, EJECTION_PRICE }}
            />
          </Text>
          <Alert variant="info" className="my20">
            <FormattedMessage
              defaultMessage="{PRICE_PER_VALIDATOR} {TICKER_NAME} is the maximum effective validator balance. This means you won't earn more rewards if your validator's balance goes above {PRICE_PER_VALIDATOR}. However you will earn less if it dips below {PRICE_PER_VALIDATOR}."
              values={{ PRICE_PER_VALIDATOR, TICKER_NAME }}
            />{' '}
            <Link
              inline
              primary
              to="https://www.attestant.io/posts/understanding-validator-effective-balance/"
            >
              <FormattedMessage defaultMessage="More on effective balance" />
            </Link>
          </Alert>
        </SubTextContainer>

        {/* the main content for the topup page */}
        {topUpPageContent}
      </PageTemplate>
    </>
  );
};

export const TopUpPage = _TopUpPage;
