import React, { useState } from 'react';
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
import { keyFile } from '../../../store/actions';
import { StoreState } from '../../../store/reducers';
import { ActionButton } from './ActionButton';
import { Status } from './Status';

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
  keyFiles: keyFile[];
}
const _KeyList = ({ keyFiles }: KeyListProps) => {
  const [truncateDigits, setTruncateDigits] = useState(
    window.innerWidth > 840 ? 8 : 5
  );
  window.addEventListener('resize', event => {
    // @ts-ignore
    setTruncateDigits(event.target.innerWidth > 840 ? 8 : 5);
  });

  const truncateKey = (key: string) =>
    `${key.slice(0, truncateDigits)}...${key.slice(truncateDigits * -1)}`;

  return (
    <CustomPaper>
      <Box pad="small" basis="small">
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
            {keyFiles.map(({ pubkey }) => (
              <TableRow key={pubkey}>
                <TableCell>
                  <CustomText>{truncateKey(pubkey)}</CustomText>
                </TableCell>
                <TableCell>
                  <Status />
                </TableCell>
                <TableCell>
                  <ActionButton />
                </TableCell>
              </TableRow>
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
