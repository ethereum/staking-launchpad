import React from 'react';
import styled from 'styled-components';
import { FormNextLink, Share } from 'grommet-icons';
import { Text } from '../../../components/Text';
import { Link } from '../../../components/Link';
import { TransactionStatus } from '../../../store/actions/keyFileActions';

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
}

export const ActionButton = ({ status, txHash, onClick }: Props) => {
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
  if (
    status === TransactionStatus.STARTED ||
    status === TransactionStatus.SUCCEEDED
  ) {
    return (
      <div className="flex">
        <Link external to={`${process.env.REACT_APP_ALETHIO_URL}/${txHash}`}>
          <ButtonText className="mr5">
            Alethio <Share size="small" />
          </ButtonText>
        </Link>
        <Link external to={`${process.env.REACT_APP_ETHERSCAN_URL}/${txHash}`}>
          <ButtonText>
            Etherscan <Share size="small" />
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
