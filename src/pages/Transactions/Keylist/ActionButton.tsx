import React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { FormNextLink, FormPreviousLink } from 'grommet-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { Text } from '../../../components/Text';
import { Link } from '../../../components/Link';
import {
  DepositStatus,
  TransactionStatus,
} from '../../../store/actions/depositFileActions';
import { BEACONCHAIN_URL, EL_TRANSACTION_URL } from '../../../utils/envVars';
import { errorStatuses } from '../../../utils/txStatus';

const Button = styled.button`
  display: flex;
  border: 1px solid ${p => p.theme.gray.medium};
  padding: 4px 24px;
  justify-content: center;
  border-radius: 4px;
  background: transparent;
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

const ButtonLink = styled(Link)`
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
  const { locale, formatMessage } = useIntl();
  const formArrowLink = React.useMemo(
    () => (locale === 'ar' ? <FormPreviousLink /> : <FormNextLink />),
    [locale]
  );

  if (depositStatus === DepositStatus.ALREADY_DEPOSITED) {
    return (
      <ButtonLink
        to={`${BEACONCHAIN_URL}/validator/0x${pubkey}`}
        className="mr5"
        data-tip
      >
        Beaconcha.in
      </ButtonLink>
    );
  }
  if (transactionStatus === TransactionStatus.READY) {
    return (
      <Button onClick={onClick}>
        <ButtonText>
          <FormattedMessage defaultMessage="Confirm deposit" />
        </ButtonText>
      </Button>
    );
  }
  if (transactionStatus === TransactionStatus.PENDING) {
    return <div className="flex" />;
  }
  if (transactionStatus === TransactionStatus.STARTED) {
    return (
      <div className="flex">
        <ButtonLink to={`${EL_TRANSACTION_URL}/${txHash}`}>
          EL Explorer
        </ButtonLink>
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
              'Note: the Beacon Chain may take several minutes to verify your deposit',
          })}
        >
          <ButtonLink
            to={`${BEACONCHAIN_URL}/validator/0x${pubkey}`}
            className="mr5"
            data-tip
          >
            Beaconcha.in
          </ButtonLink>
        </span>
        <ReactTooltip id="beaconchain-warning" place="top" effect="solid" />
      </div>
    );
  }

  if (errorStatuses.includes(transactionStatus)) {
    return (
      <Button onClick={onClick}>
        <ButtonText>
          <FormattedMessage defaultMessage="Try again" />
        </ButtonText>
        {formArrowLink}
      </Button>
    );
  }

  return (
    <Text>
      <FormattedMessage defaultMessage="An error occurred" />
    </Text>
  );
};
