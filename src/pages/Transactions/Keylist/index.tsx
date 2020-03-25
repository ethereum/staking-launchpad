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
import { Paper } from '../../../components/Paper';
import { KeyFileInterface } from '../../../store/actions';
import { StoreState } from '../../../store/reducers';
import { TransactionTableRow } from './TransactionTableRow';

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
export const CustomText = styled.div`
  @media only screen and (max-width: ${p => p.theme.screenSizes.medium}) {
    font-size: 12px;
  }
`;

interface KeyListProps {
  keyFiles: KeyFileInterface[];
}
const _KeyList = ({ keyFiles }: KeyListProps) => {
  return (
    <CustomPaper>
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
            {keyFiles.map(keyFile => (
              <TransactionTableRow key={keyFile.pubkey} keyFile={keyFile} />
            ))}
          </TableBody>
        </CustomTable>
      </Box>
    </CustomPaper>
  );
};

const mstp = ({ keyFiles }: StoreState) => ({
  keyFiles,
});

export const KeyList = connect(mstp)(_KeyList);
