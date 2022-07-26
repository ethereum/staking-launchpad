import React, { useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { Layer } from 'grommet';
import { Network } from 'grommet-icons';
import {
  AllowedNetworks,
  fortmatic,
  metamask,
  NetworkChainId,
  portis,
} from '../../ConnectWallet/web3Utils';
import { WalletButton } from '../../ConnectWallet/WalletButton';
import { web3ReactInterface } from '../../ConnectWallet';
import metamaskLogo from '../../../static/metamask.svg';
import closeGlyph from '../../../static/close.svg';
import {
  ENABLE_RPC_FEATURES,
  IS_MAINNET,
  PORTIS_DAPP_ID,
  EL_TESTNET_NAME,
} from '../../../utils/envVars';
import portisLogo from '../../../static/portis.svg';
import fortmaticLogo from '../../../static/fortmatic.svg';
import { Heading } from '../../../components/Heading';
import { Text } from '../../../components/Text';
import { NakedButton } from '../../../components/NakedButton';
import { MetamaskHardwareButton } from '../../ConnectWallet/MetamaskHardwareButton';
import { useKeyPress } from '../../../hooks/useKeyPress';

const CloseButton = styled(NakedButton)`
  padding: 1rem;
  align-self: flex-end;
`;

const Close = styled.img`
  height: 24px;
  width: 24px;
  display: block;
`;

const WalletConnectModal: React.FC<{
  loading: boolean;
  handleModalClose: () => void;
}> = ({
  loading,
  handleModalClose,
}: {
  loading: boolean;
  handleModalClose: () => void;
}) => {
  const {
    connector,
    error,
    chainId,
    active,
  }: web3ReactInterface = useWeb3React<Web3Provider>();

  const [selectedWallet, setSelectedWallet] = useState<
    AbstractConnector | null | undefined
  >(null);

  const isInvalidNetwork = useMemo(() => {
    if (!chainId) return false;

    const network = NetworkChainId[chainId as number];

    return !Object.values(AllowedNetworks).includes(network);
  }, [chainId]);

  useKeyPress('Escape', handleModalClose);

  if (isInvalidNetwork) {
    return (
      <Layer>
        <div className="p20 flex">
          <Heading level={2} color="blueMedium" center className="mb20">
            <FormattedMessage defaultMessage="Wrong network" />
          </Heading>
          <Network
            size="xlarge"
            style={{ margin: '45 auto', display: 'block' }}
          />
          <Text center>
            <FormattedMessage
              defaultMessage="Connect to {network}"
              values={{
                network: IS_MAINNET ? (
                  <FormattedMessage defaultMessage="Ethereum Mainnet" />
                ) : (
                  <FormattedMessage
                    defaultMessage="{EL_TESTNET_NAME} testnet"
                    values={{ EL_TESTNET_NAME }}
                  />
                ),
              }}
              description="{network} is either 'Ethereum Mainnet' or '<EL_TESTNET_NAME> testnet'"
            />
          </Text>
        </div>
      </Layer>
    );
  }

  if (active || !loading) return null;

  return (
    <Layer>
      <CloseButton onClick={handleModalClose}>
        <Close src={closeGlyph} />
      </CloseButton>
      <Heading level={2} color="blueMedium" style={{ margin: '20px auto' }}>
        <FormattedMessage defaultMessage="Connect a wallet" />
      </Heading>
      <div style={{ margin: 'auto' }}>
        <WalletButton
          selectedWallet={selectedWallet}
          setSelectedWallet={setSelectedWallet}
          logoSource={metamaskLogo}
          walletProvider={metamask}
          title="Metamask"
          error={connector === metamask ? error : undefined}
        />
        <WalletButton
          invalid={PORTIS_DAPP_ID === ''}
          selectedWallet={selectedWallet}
          setSelectedWallet={setSelectedWallet}
          logoSource={portisLogo}
          walletProvider={portis}
          title="Portis"
          error={connector === portis ? error : undefined}
        />

        <WalletButton
          invalid={!ENABLE_RPC_FEATURES}
          selectedWallet={selectedWallet}
          setSelectedWallet={setSelectedWallet}
          logoSource={fortmaticLogo}
          walletProvider={fortmatic}
          title="Fortmatic"
          error={connector === fortmatic ? error : undefined}
        />

        <MetamaskHardwareButton />
      </div>
    </Layer>
  );
};

export default WalletConnectModal;
