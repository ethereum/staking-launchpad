import React from 'react';
import styled from 'styled-components';
import { FormNextLink, Share } from 'grommet-icons';
import { Text } from '../../../components/Text';
import { Link } from '../../../components/Link';
import { TransactionStatus } from '../../../store/actions/depositFileActions';
import {
  ALETHIO_URL,
  ETHERSCAN_URL,
  BEACONSCAN_URL,
  BEACONCHAIN_URL,
} from '../../../utils/envVars';

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
  status: TransactionStatus;
  txHash?: string;
  onClick: (e: any) => void;
  pubkey?: string;
}

export const ActionButton = ({ status, txHash, onClick, pubkey }: Props) => {
  if (status === TransactionStatus.READY) {
    return (
      <Container onClick={onClick}>
        <ButtonText>Start</ButtonText>
        <FormNextLink />
      </Container>
    );
  }
  if (status === TransactionStatus.PENDING) {
    return (
      <Container onClick={onClick}>
        <ButtonText>Retry</ButtonText>
        <FormNextLink />
      </Container>
    );
  }
  if (status === TransactionStatus.STARTED) {
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
  if (status === TransactionStatus.SUCCEEDED) {
    return (
      <div className="flex">
        <Link external to={`${BEACONCHAIN_URL}/${pubkey}`}>
          <ButtonText className="mr5">
            Beaconchain <Share size="small" />
          </ButtonText>
        </Link>
        <Link external to={`${BEACONSCAN_URL}/${pubkey}#deposits`}>
          <ButtonText>
            Beaconscan <Share size="small" />
          </ButtonText>
        </Link>
      </div>
    );
  }

  if (
    status === TransactionStatus.FAILED ||
    status === TransactionStatus.REJECTED
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
