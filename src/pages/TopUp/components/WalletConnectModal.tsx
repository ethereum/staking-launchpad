import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { fortmatic, metamask, portis } from '../../ConnectWallet/web3Utils';
import { WalletButton } from '../../ConnectWallet/WalletButton';
import { web3ReactInterface } from '../../ConnectWallet';
import metamaskLogo from '../../../static/metamask.svg';
import { Layer } from 'grommet';
import { ENABLE_RPC_FEATURES, PORTIS_DAPP_ID } from '../../../utils/envVars';
import portisLogo from '../../../static/portis.svg';
import fortmaticLogo from '../../../static/fortmatic.svg';
import { Heading } from '../../../components/Heading';

const WalletConnectModal: React.FC = () => {
  const { connector, error }: web3ReactInterface = useWeb3React<Web3Provider>();

  const [selectedWallet, setSelectedWallet] = useState<
    AbstractConnector | null | undefined
  >(null);

  return (
    <Layer>
      <Heading level={2} color="blueMedium" style={{ margin: '20px auto' }}>
        Connect a wallet
      </Heading>
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
    </Layer>
  );
};

export default WalletConnectModal;
