import React from 'react';
import styled from 'styled-components';
import { FormNextLink, Share } from 'grommet-icons';
import { Text } from '../../../components/Text';
import { Link } from '../../../components/Link';
import {
  DepositStatus,
  TransactionStatus,
} from '../../../store/actions/depositFileActions';
import {
  ALETHIO_URL,
  BEACONCHAIN_URL,
  BEACONSCAN_URL,
  ETHERSCAN_URL,
} from '../../../utils/envVars';
import ReactTooltip from 'react-tooltip';

const Container = styled.div`
  width: 100px;
  display: flex;
`;
const ButtonText = styled(Text)`
  line-height: inherit;
  font-size: 16px;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
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
  if (depositStatus === DepositStatus.ALREADY_DEPOSITED) {
    return (
      <Link external to={`${BEACONCHAIN_URL}/0x${pubkey}`}>
        <ButtonText className="mr5" data-tip>
          Beaconchain <Share size="small" />
        </ButtonText>
      </Link>
    );
  }
  if (transactionStatus === TransactionStatus.READY) {
    return (
      <Container onClick={onClick}>
        <ButtonText>Start</ButtonText>
        <FormNextLink />
      </Container>
    );
  }
  if (transactionStatus === TransactionStatus.PENDING) {
    return <div className="flex" />;
  }
  if (transactionStatus === TransactionStatus.STARTED) {
    return (
      <div className="flex">
        <Link external to={`${ALETHIO_URL}/${txHash}`}>
          <ButtonText className="mr5">
            Alethio <Share size="small" />
          </ButtonText>
        </Link>
        <Link external to={`${ETHERSCAN_URL}/${txHash}`}>
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
          data-tip="Note: Beaconchain may take several minutes to verify your deposit"
        >
          <Link external to={`${BEACONCHAIN_URL}/0x${pubkey}`}>
            <ButtonText className="mr5" data-tip>
              Beaconchain <Share size="small" />
            </ButtonText>
          </Link>
        </span>
        <ReactTooltip id="beaconchain-warning" place="top" effect="solid" />

        <Link external to={`${BEACONSCAN_URL}/0x${pubkey}`}>
          <ButtonText>
            Beaconscan <Share size="small" />
          </ButtonText>
        </Link>
      </div>
    );
  }

  if (
    transactionStatus === TransactionStatus.FAILED ||
    transactionStatus === TransactionStatus.REJECTED
  ) {
    return (
      <Container onClick={onClick}>
        <ButtonText>Try again</ButtonText>
        <FormNextLink />
      </Container>
    );
  }

  return <Text>An Error Occurred</Text>;
};
