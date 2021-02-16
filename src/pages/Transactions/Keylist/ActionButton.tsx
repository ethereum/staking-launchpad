import React from 'react';
import styled from 'styled-components';
import { FormNextLink, Share } from 'grommet-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { Text } from '../../../components/Text';
import { Link } from '../../../components/Link';
import {
  DepositStatus,
  TransactionStatus,
} from '../../../store/actions/depositFileActions';
import {
  BEACONCHAIN_URL,
  BEACONSCAN_URL,
  ETHERSCAN_URL,
} from '../../../utils/envVars';
import ReactTooltip from 'react-tooltip';

const Container = styled.div`
  display: flex;
  border: 1px solid ${p => p.theme.gray.medium};
  padding: 4px;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  :hover {
    background: ${p => p.theme.gray.light};
    box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.15);
    transition: transform 0.1s;
    transform: scale(1.02);
  }
`;

const ButtonText = styled(Text)`
  line-height: inherit;
  font-size: 16px;
  text-align: center;
`;

interface Props {
  transactionStatus: TransactionStatus;
  depositStatus: DepositStatus;
  txHash?: string;
  onClick: (e: any) => void;
  pubkey?: string;
}

export const ActionButton = ({
  transactionStatus,
  depositStatus,
  txHash,
  onClick,
  pubkey,
}: Props) => {
  const { formatMessage } = useIntl();

  if (depositStatus === DepositStatus.ALREADY_DEPOSITED) {
    return (
      <Link to={`${BEACONCHAIN_URL}/validator/0x${pubkey}`}>
        <ButtonText className="mr5" data-tip>
          Beaconcha.in <Share size="small" />
        </ButtonText>
      </Link>
    );
  }
  if (transactionStatus === TransactionStatus.READY) {
    return (
      <Container onClick={onClick}>
        <ButtonText>
          <FormattedMessage defaultMessage="Confirm deposit" />
        </ButtonText>
      </Container>
    );
  }
  if (transactionStatus === TransactionStatus.PENDING) {
    return <div className="flex" />;
  }
  if (transactionStatus === TransactionStatus.STARTED) {
    return (
      <div className="flex">
        <Link to={`${ETHERSCAN_URL}/${txHash}`}>
          <ButtonText>
            Etherscan <Share size="small" />
          </ButtonText>
        </Link>
      </div>
    );
  }
  if (transactionStatus === TransactionStatus.SUCCEEDED) {
    return (
      <div className="flex">
        <span
          data-for="beaconchain-warning"
          data-tip={formatMessage({
            defaultMessage:
              'Note: Beacon Chain may take several minutes to verify your deposit',
          })}
        >
          <Link to={`${BEACONCHAIN_URL}/validator/0x${pubkey}`}>
            <ButtonText className="mr5" data-tip>
              Beaconcha.in <Share size="small" />
            </ButtonText>
          </Link>
        </span>
        <ReactTooltip id="beaconchain-warning" place="top" effect="solid" />

        <Link to={`${BEACONSCAN_URL}/0x${pubkey}`}>
          <ButtonText>
            Beaconscan <Share size="small" />
          </ButtonText>
        </Link>
      </div>
    );
  }

  if (transactionStatus === TransactionStatus.REJECTED) {
    return (
      <Container onClick={onClick}>
        <ButtonText>
          <FormattedMessage defaultMessage="Try again" />
        </ButtonText>
        <FormNextLink />
      </Container>
    );
  }

  return (
    <Text>
      <FormattedMessage defaultMessage="An error occurred" />
    </Text>
  );
};
