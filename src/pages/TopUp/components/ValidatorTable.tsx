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
import ReactTooltip from 'react-tooltip';
import { Wifi, StatusWarning, Refresh, StatusDisabled } from 'grommet-icons';
import numeral from 'numeral';
import { useWeb3React } from '@web3-react/core';
import { styledComponentsTheme as theme } from '../../../styles/styledComponentsTheme';
import { BeaconChainValidator } from '../types';
import { Text } from '../../../components/Text';
import shortenAddress from '../../../utils/shortenAddress';
import { Button } from '../../../components/Button';
import { Paper } from '../../../components/Paper';
import { Link } from '../../../components/Link';
import { BEACONCHAIN_URL } from '../../../utils/envVars';

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

  const validatorStatus = (validator: BeaconChainValidator) => {
    const { status } = validator;

    switch (status) {
      case 'pending': {
        return (
          <div className="flex">
            <Refresh color="blueLight" />
            <Text className="ml10">Pending</Text>
          </div>
        );
      }
      case 'slashing': {
        return (
          <div className="flex">
            <StatusWarning color={theme.red.light} />
            <Text className="ml10">Slashing</Text>
          </div>
        );
      }
      case 'slashed': {
        return (
          <div className="flex">
            <StatusWarning color={theme.red.light} />
            <Text className="ml10">Slashed</Text>
          </div>
        );
      }
      case 'exiting': {
        return (
          <div className="flex">
            <StatusWarning color="yellowDark" />
            <Text className="ml10">Exiting</Text>
          </div>
        );
      }
      case 'exited': {
        return (
          <div className="flex">
            <StatusDisabled color={theme.gray.medium} />
            <Text className="ml10">Exited</Text>
          </div>
        );
      }
      case 'active_offline': {
        return (
          <div className="flex">
            <Wifi color={theme.gray.medium} />
            <Text className="ml10">Offline</Text>
          </div>
        );
      }
      case 'active_online': {
        return (
          <div className="flex">
            <Wifi color={theme.green.dark} />
            <Text className="ml10">Online</Text>
          </div>
        );
      }
      default:
        return '';
    }
  };

  const validatorRows = React.useMemo(() => {
    return validators.map(validator => {
      const alreadyToppedUp = validator.effectivebalance >= 32000000000;
      // const statusIneligible =
      //   validator.status === 'slashed' || validator.status === 'exited';

      // const disableTopUpButton = alreadyToppedUp || statusIneligible;

      const toolTipText = alreadyToppedUp
        ? 'This validator already has an effective balance of 32 ETH.'
        : 'This validator is not eligible to be topped up';

      return (
        <React.Fragment key={validator.pubkey}>
          <TableRow>
            <TableCell scope="col" border="bottom">
              <Link
                withArrow
                external
                primary
                to={`${BEACONCHAIN_URL}/${validator.pubkey}`}
              >
                {shortenAddress(validator.pubkey)}
              </Link>
            </TableCell>
            <TableCell scope="col" border="bottom">
              <Text>{validatorStatus(validator)}</Text>
            </TableCell>
            <TableCell scope="col" border="bottom">
              <Text>{validator.slashed ? 'YES' : 'NO'}</Text>
            </TableCell>
            <TableCell scope="col" border="bottom">
              <Text>
                {numeral(validator.balance / 10 ** 9).format('0.00000')} ETH
              </Text>
            </TableCell>
            <TableCell scope="col" border="bottom">
              <Text>
                {numeral(validator.effectivebalance / 10 ** 9).format(
                  '0.00000'
                )}{' '}
                ETH
              </Text>
            </TableCell>

            <TableCell data-tip={toolTipText}>
              <Button
                onClick={() => setSelectedValidator(validator)}
                label="Top Up"
                rainbow
                // disabled={disableTopUpButton}
              />
            </TableCell>
          </TableRow>
        </React.Fragment>
      );
    });
  }, [validators]);

  return validators.length > 0 ? (
    <Paper style={{ marginTop: '3rem' }}>
      <ReactTooltip />
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
              <Text>True Balance</Text>
            </TableCell>
            <TableCell scope="col" border="bottom">
              <Text>Effective Balance</Text>
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
        You can <FakeLink onClick={deactivate}>change your wallet</FakeLink> to
        load validators for a different address.
      </Text>
    </Box>
  );
};

export default ValidatorTable;
