import React, { useState } from 'react';
import { handleTransaction } from '../transactionUtils';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { TableBody, TableCell, TableRow } from 'grommet';
import { Status } from './Status';
import { ActionButton } from './ActionButton';
import { CustomText } from './index';
import { web3ReactInterface } from '../../ConnectWallet';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import {
  KeyFileInterface,
  TransactionStatuses,
  updateTransactionStatus,
} from '../../../store/actions';
import { connect } from 'react-redux';
import { StoreState } from '../../../store/reducers';

interface TransactionTableRowProps {
  keyFiles: KeyFileInterface[];
  updateTransactionStatus: (
    pubkey: string,
    status: TransactionStatuses
  ) => void;
}

const _TransactionTableRows = ({
  keyFiles,
  updateTransactionStatus,
}: TransactionTableRowProps) => {
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

  const handleActionClick = (keyFile: KeyFileInterface) => {
    handleTransaction(
      keyFile,
      connector as AbstractConnector,
      account,
      updateTransactionStatus
    );
  };

  return (
    <TableBody>
      {keyFiles.map(keyFile => (
        <TableRow key={keyFile.pubkey}>
          <TableCell>
            <CustomText>{truncateKey(keyFile.pubkey)}</CustomText>
          </TableCell>
          <TableCell>
            <Status status={keyFile.transactionStatus} />
          </TableCell>
          <TableCell>
            <ActionButton
              onClick={() => handleActionClick(keyFile)}
              status={keyFile.transactionStatus}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

const mstp = ({ keyFiles }: StoreState) => {
  return { keyFiles };
};

const mdtp = (dispatch: any) => ({
  updateTransactionStatus: (
    pubkey: string,
    status: TransactionStatuses
  ): void => {
    dispatch(updateTransactionStatus(pubkey, status));
  },
});

export const TransactionTableRows = connect(mstp, mdtp)(_TransactionTableRows);
