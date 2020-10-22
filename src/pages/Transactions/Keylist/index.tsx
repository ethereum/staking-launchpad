import React from 'react';
import ReactTooltip from 'react-tooltip';
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
  DepositStatus,
  DispatchTransactionStatusUpdateType,
  updateTransactionStatus,
} from '../../../store/actions/depositFileActions';

const CustomTableRow = styled(p => <TableRow {...p} />)`
  background-color: ${(p: any) => {
    if (p.header) return p.theme.purple.light;
    if (p.invalid) return p.theme.red.lightest;
    return undefined;
  }};
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

  const handleActionClick = (depositKey: DepositKeyInterface): void => {
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
            <CustomTableRow header>
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
            {depositKeys.map((depositKey, i) => {
              const {
                pubkey,
                transactionStatus,
                txHash,
                depositStatus,
              } = depositKey;
              return (
                <CustomTableRow
                  data-for={`double-deposit-${i}`}
                  data-tip="Your initial deposit has already been made for this validator public key. Please check the status of your deposit on the Beaconchain data provider."
                  key={pubkey}
                  invalid={depositStatus === DepositStatus.ALREADY_DEPOSITED}
                >
                  <TableCell>
                    <Text className="dont-break-out">
                      {`${pubkey.slice(0, 10)}...${pubkey.slice(-10)}`}
                    </Text>
                  </TableCell>
                  <TableCell>
                    {depositStatus === DepositStatus.ALREADY_DEPOSITED && (
                      <ReactTooltip
                        id={`double-deposit-${i}`}
                        place="top"
                        effect="solid"
                      />
                    )}
                    <Status
                      transactionStatus={transactionStatus}
                      depositStatus={depositStatus}
                    />
                  </TableCell>
                  <TableCell>
                    <ActionButton
                      onClick={() => handleActionClick(depositKey)}
                      transactionStatus={transactionStatus}
                      depositStatus={depositStatus}
                      txHash={txHash}
                      pubkey={pubkey}
                    />
                  </TableCell>
                </CustomTableRow>
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
