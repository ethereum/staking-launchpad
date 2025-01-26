import React from 'react';
import styled from 'styled-components';
import { Text } from '../../../components/Text';
import { FormattedMessage } from 'react-intl';
import {
  BLS_CREDENTIALS,
  COMPOUNDING_CREDENTIALS,
  EXECUTION_CREDENTIALS,
} from '../../../utils/envVars';
import { Alert } from '../../../components/Alert';
import { Link } from '../../../components/Link';
import { routesEnum } from '../../../Routes';
import UpgradeCompounding from './UpgradeCompounding';
import ForceExit from './ForceExit';
import PartialWithdraw from './PartialWithdraw';
import { Validator } from '../types';

interface Props {
  validator: Validator;
}

const InlineLink = styled(Link)`
  display: inline;
`;

const ValidatorDetails = styled.div`
  background-color: white;
  padding: 1rem;
  margin: 1rem;
  border-radius: 4px;

  span {
    margin-bottom: 5px;
  }
`;

const Actions = styled.div`
  margin-top: 10px;
`;

const ValidatorActions: React.FC<Props> = ({ validator }) => {
  return (
    <>
      <ValidatorDetails>
        <Text>
          <FormattedMessage
            defaultMessage="Validator Index: {index}"
            values={{ index: validator.validatorindex }}
          />
        </Text>
        <Text>
          <FormattedMessage
            defaultMessage="Public Key: {pubkey}"
            values={{
              pubkey: `${validator.pubkey.slice(
                0,
                10
              )}...${validator.pubkey.slice(-10)}`,
            }}
          />
        </Text>
        <Text>
          <FormattedMessage
            defaultMessage="Balance: {balance}"
            values={{ balance: validator.balanceDisplay }}
          />
        </Text>
        <Text>
          <FormattedMessage
            defaultMessage="Activation Epoch: {epoch}"
            values={{ epoch: validator.activationepoch }}
          />
        </Text>
        <Text>
          <FormattedMessage
            defaultMessage="Withdrawal Credentails: {credentials}"
            values={{
              credentials: `${validator.withdrawalcredentials.slice(
                0,
                10
              )}...${validator.withdrawalcredentials.slice(-10)}`,
            }}
          />
        </Text>
      </ValidatorDetails>

      {validator.withdrawalcredentials.substring(0, 4) === BLS_CREDENTIALS ? (
        <Alert className="mt-20">
          <Text>
            <FormattedMessage defaultMessage="This validator has Type 0 (0x00) credentials and must be updated in order to perform validator actions." />
          </Text>

          <Text>
            <FormattedMessage
              defaultMessage="You can learn how to perform this update by viewing the {LINK} section."
              values={{
                LINK: (
                  <InlineLink to={routesEnum.withdrawals}>
                    <FormattedMessage defaultMessage="Withdrawals" />
                  </InlineLink>
                ),
              }}
            />
          </Text>
        </Alert>
      ) : (
        <Actions className="flex space-between">
          <div>
            {validator.withdrawalcredentials.substring(0, 4) ===
              EXECUTION_CREDENTIALS && (
              <UpgradeCompounding validator={validator} />
            )}
            {validator.withdrawalcredentials.substring(0, 4) ===
              COMPOUNDING_CREDENTIALS && (
              <PartialWithdraw validator={validator} />
            )}
          </div>
          <ForceExit validator={validator} />
        </Actions>
      )}
    </>
  );
};

export default ValidatorActions;
