import { useEffect, useState } from 'react';

import { useWeb3React } from '@web3-react/core';
import { formatEther } from '@ethersproject/units';
import { Web3Provider } from '@ethersproject/providers';
import { web3ReactInterface } from '../pages/ConnectWallet';

export const useExecutionBalance = () => {
  const { account, library }: web3ReactInterface = useWeb3React<Web3Provider>();
  const [etherBalance, setEtherBalance] = useState<number | null>(null);

  useEffect((): any => {
    if (!account || !library) return;

    const updateBalance = async () => {
      try {
        const wei = await library.getBalance(account);
        const ether = Number(parseFloat(formatEther(wei)).toPrecision(9));
        setEtherBalance(ether);
      } catch (error) {
        setEtherBalance(null);
      }
    };

    library.on('block', updateBalance);

    // eslint-disable-next-line consistent-return
    return () => {
      library.removeListener('block', updateBalance);
    };
  }, [library, account]);

  return etherBalance;
};
