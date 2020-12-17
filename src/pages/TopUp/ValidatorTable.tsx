import React from 'react';
import styled from 'styled-components';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from 'grommet';
import numeral from 'numeral';
import { useWeb3React } from '@web3-react/core';
import { BeaconChainValidator } from './types';
import { Text } from '../../components/Text';
import shortenAddress from '../../utils/shortenAddress';
import { Button } from '../../components/Button';
import { Paper } from '../../components/Paper';

const FakeLink = styled.span`
  color: blue;
  text-decoration: underline;
  cursor: pointer;
  display: inline;
`;

const ValidatorTable: React.FC<{
  validators: BeaconChainValidator[];
  setSelectedValidator: (validator: BeaconChainValidator) => void;
}> = ({ validators, setSelectedValidator }) => {
  const { deactivate } = useWeb3React();
  const validatorRows = React.useMemo(() => {
    return validators.map(validator => (
      <React.Fragment key={validator.pubkey}>
        <TableRow>
          <TableCell scope="col" border="bottom">
            <Text>{shortenAddress(validator.pubkey)}</Text>
          </TableCell>
          <TableCell scope="col" border="bottom">
            <Text>{validator.status}</Text>
          </TableCell>
          <TableCell scope="col" border="bottom">
            <Text>{validator.slashed ? 'YES' : 'NO'}</Text>
          </TableCell>
          <TableCell scope="col" border="bottom">
            <Text>
              {numeral(validator.effectivebalance / 10 ** 9).format('0.00000')}{' '}
              ETH
            </Text>
          </TableCell>
          {/* {validator.effectivebalance < 32000000000 && ( */}
          <TableCell>
            <Button
              onClick={() => setSelectedValidator(validator)}
              label="Top Up"
              rainbow
            />
          </TableCell>
          {/* )} */}
        </TableRow>
      </React.Fragment>
    ));
  }, [validators]);

  return validators.length > 0 ? (
    <Paper style={{ marginTop: '3rem' }}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell scope="col" border="bottom">
              <Text>Public Key</Text>
            </TableCell>
            <TableCell scope="col" border="bottom">
              <Text>Status</Text>
            </TableCell>
            <TableCell scope="col" border="bottom">
              <Text>Slashed?</Text>
            </TableCell>
            <TableCell scope="col" border="bottom">
              <Text>Balance</Text>
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>{validatorRows}</TableBody>
      </Table>
    </Paper>
  ) : (
    <Box align="center" justify="center" className="mt40">
      <Text weight={600}>No Validators found.</Text>
      <Text className="mt20">
        You can <FakeLink onClick={deactivate}>Change your wallet</FakeLink> to
        load validators for a different address.
      </Text>
    </Box>
  );
};

export default ValidatorTable;
