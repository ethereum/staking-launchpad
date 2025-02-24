import { useCallback, useState, useEffect } from 'react';

import Web3 from 'web3';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { useWeb3React } from '@web3-react/core';

import { Queue, getWithdrawalQueue } from '../pages/Actions/utils';

export const useWithdrawalQueue = (activate: boolean) => {
  const [queue, setQueue] = useState<Queue | null>(null);
  const { connector } = useWeb3React();

  const updateQueue = useCallback(async () => {
    if (!connector) return;

    console.log('Updating withdrawal queue');
    const walletProvider = await (connector as AbstractConnector).getProvider();
    const web3 = new Web3(walletProvider);

    const withdrawalQueue = await getWithdrawalQueue(web3);
    console.log('Withdrawal queue updated:', withdrawalQueue);
    setQueue(withdrawalQueue);
  }, [connector]);

  useEffect(() => {
    if (!activate) return;

    console.log('Activating withdrawal queue updates');
    updateQueue();
    // Run fetchQueue every 10s to update queue state, while showModal open
    const interval = setInterval(updateQueue, 10_000);
    // eslint-disable-next-line consistent-return
    return () => clearInterval(interval);
  }, [activate, updateQueue]);

  return { queue, setQueue };
};
