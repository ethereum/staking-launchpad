import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from 'grommet';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Paper } from '../../../components/Paper';
import { Text } from '../../../components/Text';
import { Status } from './Status';
import { ActionButton } from './ActionButton';
import { StoreState } from '../../../store/reducers';
import {
  KeyFileInterface,
  TransactionStatuses,
  updateTransactionStatus,
} from '../../../store/actions';
import { handleTransaction } from '../transactionUtils';
import { web3ReactInterface } from '../../ConnectWallet';

const CustomTableRow = styled(TableRow)`
  background-color: ${(p: { theme: any }) => p.theme.blue.light};
`;
const CustomPaper = styled(Paper)`
  display: block;
`;
const CustomTable = styled(Table)`
  @media only screen and (max-width: ${p => p.theme.screenSizes.medium}) {
    td {
      padding: 5px;
    }
  }
`;

interface KeyListProps {
  keyFiles: KeyFileInterface[];
  updateTransactionStatus: (
    pubkey: string,
    status: TransactionStatuses
  ) => void;
}

const _KeyList = ({ keyFiles, updateTransactionStatus }: KeyListProps) => {
  const { account, connector }: web3ReactInterface = useWeb3React<
    Web3Provider
  >();
  const handleActionClick = (keyFile: KeyFileInterface) => {
    handleTransaction(
      keyFile,
      connector as AbstractConnector,
      account,
      updateTransactionStatus
    );
  };

  return (
    <CustomPaper className="mt20">
      <Box pad="small">
        <CustomTable>
          <TableHeader>
            <CustomTableRow>
              <TableCell scope="col" border="bottom">
                Key
              </TableCell>
              <TableCell scope="col" border="bottom">
                Status
              </TableCell>
              <TableCell scope="col" border="bottom">
                Action
              </TableCell>
            </CustomTableRow>
          </TableHeader>
          <TableBody>
            {keyFiles.map(keyFile => {
              const { pubkey, transactionStatus, txHash } = keyFile;
              return (
                <TableRow key={pubkey}>
                  <TableCell>
                    <Text className="dont-break-out">{`${pubkey.slice(
                      0,
                      10
                    )}...${pubkey.slice(-10)}`}</Text>
                  </TableCell>
                  <TableCell>
                    <Status status={transactionStatus} />
                  </TableCell>
                  <TableCell>
                    <ActionButton
                      onClick={() => handleActionClick(keyFile)}
                      status={transactionStatus}
                      txHash={txHash}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </CustomTable>
      </Box>
    </CustomPaper>
  );
};

const mstp = ({ keyFiles }: StoreState) => {
  return { keyFiles };
};

const mdtp = (dispatch: any) => ({
  updateTransactionStatus: (
    pubkey: string,
    status: TransactionStatuses,
    txHash?: string
  ): void => {
    dispatch(updateTransactionStatus(pubkey, status, txHash));
  },
});

export const KeyList = connect(mstp, mdtp)(_KeyList);
