import React, { useState } from 'react';
import { handleTransaction, TransactionStatuses } from '../transactionUtils';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { TableCell, TableRow } from 'grommet';
import { Status } from './Status';
import { ActionButton } from './ActionButton';
import { CustomText } from './index';
import { web3ReactInterface } from '../../ConnectWallet';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { keyFile } from '../../../store/actions';

interface TransactionTableRowProps {
  keyFile: keyFile;
}

export const TransactionTableRow = ({ keyFile }: TransactionTableRowProps) => {
  const { account, connector }: web3ReactInterface = useWeb3React<
    Web3Provider
  >();
  const [truncateDigits, setTruncateDigits] = useState(
    window.innerWidth > 840 ? 8 : 5
  );

  window.addEventListener('resize', event =>
    // @ts-ignore
    setTruncateDigits(event.target.innerWidth > 840 ? 8 : 5)
  );
  const truncateKey = (key: string) =>
    `${key.slice(0, truncateDigits)}...${key.slice(truncateDigits * -1)}`;

  const [status, setStatus] = useState<TransactionStatuses>(
    TransactionStatuses.READY
  );

  const handleActionClick = () => {
    handleTransaction(
      keyFile,
      connector as AbstractConnector,
      account,
      setStatus
    );
  };

  return (
    <TableRow>
      <TableCell>
        <CustomText>{truncateKey(keyFile.pubkey)}</CustomText>
      </TableCell>
      <TableCell>
        <Status status={status} />
      </TableCell>
      <TableCell>
        <ActionButton onClick={handleActionClick} status={status} />
      </TableCell>
    </TableRow>
  );
};
