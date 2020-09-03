import React from 'react';
import { Dispatch } from 'redux';
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
import { DepositKeyInterface, StoreState } from '../../../store/reducers';
import { handleMultipleTransactions } from '../transactionUtils';
import { web3ReactInterface } from '../../ConnectWallet';
import {
  DispatchTransactionStatusUpdateType,
  updateTransactionStatus,
} from '../../../store/actions/depositFileActions';

const CustomTableRow = styled(TableRow)`
  background-color: ${(p: { theme: any }) => p.theme.purple.light};
`;
const CustomPaper = styled(Paper)`
  display: block;
  height: 280px;
  overflow: auto;
`;
const CustomTable = styled(Table)`
  width: 100%;
  @media only screen and (max-width: ${p => p.theme.screenSizes.medium}) {
    td {
      padding: 5px;
    }
  }
`;

// Prop definitions
interface OwnProps {}
interface StateProps {
  depositKeys: DepositKeyInterface[];
}
interface DispatchProps {
  dispatchTransactionStatusUpdate: DispatchTransactionStatusUpdateType;
}
type Props = StateProps & DispatchProps & OwnProps;

const _KeyList = ({ depositKeys, dispatchTransactionStatusUpdate }: Props) => {
  const { account, connector }: web3ReactInterface = useWeb3React<
    Web3Provider
  >();
  const handleActionClick = (depositKey: DepositKeyInterface) => {
    handleMultipleTransactions(
      [depositKey],
      connector as AbstractConnector,
      account,
      dispatchTransactionStatusUpdate
    );
  };

  return (
    <CustomPaper className="mt20">
      <Box pad="small">
        <CustomTable>
          <TableHeader>
            <CustomTableRow>
              <TableCell scope="col" border="bottom">
                Validator Public Key
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
            {depositKeys.map(depositKey => {
              const { pubkey, transactionStatus, txHash } = depositKey;
              return (
                <TableRow key={pubkey}>
                  <TableCell>
                    <Text className="dont-break-out">
                      {`${pubkey.slice(0, 10)}...${pubkey.slice(-10)}`}
                    </Text>
                  </TableCell>
                  <TableCell>
                    <Status status={transactionStatus} />
                  </TableCell>
                  <TableCell>
                    <ActionButton
                      onClick={() => handleActionClick(depositKey)}
                      status={transactionStatus}
                      txHash={txHash}
                      pubkey={pubkey}
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

const mapStateToProps = ({ depositFile }: StoreState): StateProps => {
  return { depositKeys: depositFile.keys };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatchTransactionStatusUpdate: (pubkey, status, txHash) =>
    dispatch(updateTransactionStatus(pubkey, status, txHash)),
});

export const KeyList = connect<StateProps, DispatchProps, OwnProps, StoreState>(
  mapStateToProps,
  mapDispatchToProps
)(_KeyList);
