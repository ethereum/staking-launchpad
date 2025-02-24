// Import libraries
import React, { useEffect, useState, useMemo } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import BigNumber from 'bignumber.js';
import { CheckBox } from 'grommet';
import { FormattedMessage, useIntl } from 'react-intl';
import { toChecksumAddress } from 'ethereumjs-util';
// Components
import { Instructions } from './Instructions';
import { NumberInput } from '../../components/NumberInput';
import { OperatingSystemButtons } from './OperatingSystemButtons';
import { WorkflowPageTemplate } from '../../components/WorkflowPage/WorkflowPageTemplate';
import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import { Heading } from '../../components/Heading';
import { Link } from '../../components/Link';
import { Paper } from '../../components/Paper';
import { Text } from '../../components/Text';
// Store management
import {
  DispatchWorkflowUpdateType,
  updateWorkflow,
  WorkflowStep,
} from '../../store/actions/workflowActions';
import { StoreState } from '../../store/reducers';
// Utilities
import {
  IS_MAINNET,
  MAX_EFFECTIVE_BALANCE,
  MIN_ACTIVATION_BALANCE,
  TICKER_NAME,
  ETHER_TO_GWEI,
} from '../../utils/envVars';
import { routeToCorrectWorkflowStep } from '../../utils/RouteToCorrectWorkflowStep';
// Images
import instructions1 from '../../static/instructions_1.svg';
import instructions2 from '../../static/instructions_2.svg';
// Routes
import { routesEnum } from '../../Routes';
import { AccountTypeButtons } from './AccountTypeButtons';
import { Code } from '../../components/Code';

export type AccountType = '0x01' | '0x02';

export enum operatingSystem {
  'MAC',
  'LINUX',
  'WINDOWS',
}

const osMapping: { [os: number]: 'mac' | 'linux' | 'windows' } = {
  [operatingSystem.MAC]: 'mac',
  [operatingSystem.LINUX]: 'linux',
  [operatingSystem.WINDOWS]: 'windows',
};

export enum keysTool {
  'CLI',
  'GUI',
  'CLISOURCE',
}

const AddressInputContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const AddressInput = styled.input`
  height: 50px;
  flex: 1;
  font-size: 18px;
  line-height: 24px;
  color: #444444;
  padding-left: 10px;
  box-sizing: border-box;
  background-color: ${(p: any) => p.theme.gray.lightest};
  border-radius: ${(p: any) => p.theme.borderRadius};
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  appearance: textfield;
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
  border: 1px solid #ddd;
  display: inline-flex;
  :focus {
    outline: none;
  }
`;

const AddressIndicator = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 2rem;
`;

const Highlight = styled.span`
  background: ${p => p.theme.green.medium};
`;

const InstructionImgContainer = styled.div`
  height: 250px;
  margin: 64px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
`;

const NumValidatorContainer = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 50px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px;
  gap: 10px;
`;

// Prop definitions
interface OwnProps {}
interface StateProps {
  workflow: WorkflowStep;
}
interface DispatchProps {
  dispatchWorkflowUpdate: DispatchWorkflowUpdateType;
}
type Props = StateProps & DispatchProps & OwnProps;

const _GenerateKeysPage = ({
  dispatchWorkflowUpdate,
  workflow,
}: Props): JSX.Element => {
  const { formatMessage } = useIntl();
  const [ethAmount, setStateEthAmount] = useState<number>(
    MIN_ACTIVATION_BALANCE
  );
  const [validatorCount, setStateValidatorCount] = useState<number>(1);

  const [
    mnemonicAcknowledgementChecked,
    setMnemonicAcknowledgementChecked,
  ] = useState<boolean>(workflow > WorkflowStep.GENERATE_KEY_PAIRS);

  const [chosenType, setChosenType] = useState<AccountType>('0x02');

  const [chosenOs, setChosenOs] = useState<operatingSystem>(
    operatingSystem.LINUX
  );

  const [withdrawalAddress, setWithdrawalAddress] = useState<string>('');

  // Default to CLI on mainnet for now, once we have more confidence in it, switch to GUI as default.
  const defaultKeysTool = IS_MAINNET ? keysTool.CLI : keysTool.GUI;
  const [chosenTool, setChosenTool] = useState<keysTool>(defaultKeysTool);

  const onCheckboxClick = (e: any) => {
    setMnemonicAcknowledgementChecked(e.target.checked);
  };

  const handleAddressChange = (e: any) => {
    // Only allow hexadecimal characters and 'x' (for 0x prefix)
    const re = /[^0-9a-fx]/gi;
    const value = e.target.value.replace(re, '');
    setWithdrawalAddress(value);
  };

  const isValidWithdrawalAddress = useMemo<boolean>(
    () => /^0x[0-9a-f]{40}$/i.test(withdrawalAddress),
    [withdrawalAddress]
  );

  useEffect(() => {
    if (!isValidWithdrawalAddress) return;
    setWithdrawalAddress(toChecksumAddress(withdrawalAddress));
  }, [isValidWithdrawalAddress, withdrawalAddress]);

  const addressIndicatorEmoji = useMemo<string>(() => {
    if (!withdrawalAddress) return '⬅';
    if (isValidWithdrawalAddress) return '✅';
    return '❌';
  }, [withdrawalAddress, isValidWithdrawalAddress]);

  const setValidatorCount = (count: number) => {
    const newCount = Math.max(count, 1);
    setStateValidatorCount(newCount);
    setStateEthAmount(
      Math.min(newCount * MIN_ACTIVATION_BALANCE, MAX_EFFECTIVE_BALANCE)
    );
  };

  const setEthAmount = (amount: number) => {
    const roundedToGwei = Math.floor(amount * ETHER_TO_GWEI) / ETHER_TO_GWEI;
    const newAmount = Math.min(
      MAX_EFFECTIVE_BALANCE,
      Math.max(1, roundedToGwei)
    );
    setStateEthAmount(newAmount);
    setStateValidatorCount(Math.floor(newAmount / MIN_ACTIVATION_BALANCE));
  };

  const handleSubmit = () => {
    if (workflow === WorkflowStep.GENERATE_KEY_PAIRS) {
      dispatchWorkflowUpdate(WorkflowStep.UPLOAD_VALIDATOR_FILE);
    }
  };

  if (workflow < WorkflowStep.GENERATE_KEY_PAIRS) {
    return routeToCorrectWorkflowStep(workflow);
  }

  return (
    <WorkflowPageTemplate
      title={formatMessage({ defaultMessage: 'Generate key pairs' })}
    >
      <Paper className="mb20">
        <Heading level={2} size="small" color="blueMedium" className="mb20">
          <FormattedMessage defaultMessage="Withdrawal address" />
        </Heading>
        <Text className="mb20">
          <FormattedMessage
            defaultMessage="Your withdrawal address should be a regular Ethereum account that {youControl}, ideally using {coldStorage} techniques."
            values={{
              youControl: (
                <strong>
                  <FormattedMessage defaultMessage="you control" />
                </strong>
              ),
              coldStorage: (
                <em>
                  <FormattedMessage defaultMessage="cold storage" />
                </em>
              ),
            }}
          />
        </Text>
        <Text className="mb20">
          <FormattedMessage
            defaultMessage="Setting this address establishes your validator {withdrawalCredentials}, and permanently links the chosen execution address to your validator.
              This account will be the only account that can receive withdrawn funds from your validator."
            values={{
              withdrawalCredentials: (
                <em>
                  <FormattedMessage defaultMessage="withdrawal credentials" />
                </em>
              ),
            }}
          />
        </Text>
        <Text className="mb20">
          <FormattedMessage defaultMessage="It can also be used to authorize certain validator actions, such as requesting partial withdrawals, or exiting the validator account entirely." />
        </Text>
        <Text className="mb20">
          <FormattedMessage
            defaultMessage="Paste your chosen address here to include it in the copy/paste CLI
            command below:"
          />
        </Text>
        <AddressInputContainer className="mb40">
          <AddressInput
            onChange={handleAddressChange}
            value={withdrawalAddress}
            placeholder="0x..."
            maxLength={42}
          />
          <AddressIndicator>{addressIndicatorEmoji}</AddressIndicator>
        </AddressInputContainer>
        <Alert variant="error">
          {isValidWithdrawalAddress ? (
            <FormattedMessage
              defaultMessage="Make sure you have control over this address as this cannot be changed.
              Providing an account from a centralized exchange is not recommended. Cold storage is strongly recommended."
            />
          ) : (
            <FormattedMessage
              defaultMessage="Setting a withdrawal address is considered best security practice.
                If this is not provided now, your deposited funds will remain locked on the Beacon Chain until an address is provided.
                Unlocking will require signing a message with your BLS withdrawal keys, generated from your mnemonic seed phrase (so keep it safe)."
            />
          )}
        </Alert>
      </Paper>

      <Paper className="mb20">
        <Heading level={2} size="small" color="blueMedium">
          <FormattedMessage defaultMessage="What type of staking account?" />
        </Heading>

        <AccountTypeButtons
          chosenType={chosenType}
          setChosenType={setChosenType}
        />
      </Paper>

      {chosenType === '0x02' && (
        <Paper className="mb20">
          <Heading level={2} size="small" color="blueMedium" className="mb10">
            <FormattedMessage
              defaultMessage="How much {TICKER_NAME} would you like to stake?"
              values={{ TICKER_NAME }}
            />
          </Heading>
          <Text className="mb10">
            <FormattedMessage
              defaultMessage="This approach creates a single compounding account. Requires at least {MIN_ACTIVATION_BALANCE} {TICKER_NAME}, and can hold up to {MAX_EFFECTIVE_BALANCE}."
              values={{
                MAX_EFFECTIVE_BALANCE,
                MIN_ACTIVATION_BALANCE,
                TICKER_NAME,
              }}
            />
          </Text>

          <NumValidatorContainer>
            <div>
              <Text className="mb5">
                <FormattedMessage
                  defaultMessage="Amount of {TICKER_NAME}"
                  values={{ TICKER_NAME }}
                />
              </Text>
              <NumberInput
                value={ethAmount}
                setValue={setEthAmount}
                allowDecimals
              />
            </div>
            <div>
              <Text className="mb5">
                <FormattedMessage defaultMessage="Cost" />
              </Text>
              <Text>
                {ethAmount} {TICKER_NAME}
              </Text>
            </div>
          </NumValidatorContainer>
        </Paper>
      )}

      {chosenType === '0x01' && (
        <Paper className="mb20">
          <Heading level={2} size="small" color="blueMedium" className="mb10">
            <FormattedMessage defaultMessage="How many accounts would you like to run?" />
          </Heading>
          <Text className="mb10">
            <FormattedMessage
              defaultMessage="Each validator of this account type requires exactly {MIN_ACTIVATION_BALANCE} {TICKER_NAME}."
              values={{ MIN_ACTIVATION_BALANCE, TICKER_NAME }}
            />
          </Text>

          <NumValidatorContainer>
            <div>
              <Text className="mb5">
                <FormattedMessage defaultMessage="Validators" />
              </Text>
              <NumberInput
                value={validatorCount}
                setValue={setValidatorCount}
              />
            </div>
            <div>
              <Text className="mb5">
                <FormattedMessage defaultMessage="Cost" />
              </Text>
              <Text>
                {validatorCount === 0
                  ? validatorCount
                  : new BigNumber(validatorCount)
                      .times(new BigNumber(MIN_ACTIVATION_BALANCE))
                      .toFixed(0)
                      .toString()}{' '}
                {TICKER_NAME}
              </Text>
            </div>
          </NumValidatorContainer>
        </Paper>
      )}

      <Paper className="mb20">
        <Heading level={2} size="small" color="blueMedium">
          <FormattedMessage defaultMessage="What is your current operating system?" />
        </Heading>
        <Text className="mt20 mb40">
          <FormattedMessage
            defaultMessage="Choose the OS of the computer you're currently using. This will be the
              computer you use to generate your keys. It doesn't need to be the OS
              you want to use for your node."
          />
        </Text>
        <OperatingSystemButtons chosenOs={chosenOs} setChosenOs={setChosenOs} />
      </Paper>

      <Instructions
        validatorCount={validatorCount}
        withdrawalAddress={isValidWithdrawalAddress ? withdrawalAddress : ''}
        os={osMapping[chosenOs]}
        chosenTool={chosenTool}
        setChosenTool={setChosenTool}
        accountType={chosenType}
        ethAmount={ethAmount}
      />

      <Paper className="mb20">
        <Heading level={2} size="small" color="blueMedium">
          <FormattedMessage defaultMessage="Save the key files and get the validator file ready" />
        </Heading>
        <Text className="mt20">
          {chosenTool === keysTool.GUI ? (
            <FormattedMessage
              defaultMessage="You should now have your mnemonic written down in a safe place and a keystore saved for {yourValidators}.
                Please make sure you keep these safe, preferably offline.
                Your validator keystores should be available in the selected directory."
              values={{
                yourValidators:
                  validatorCount < 2 ? (
                    <FormattedMessage defaultMessage="your validator" />
                  ) : (
                    <FormattedMessage
                      defaultMessage="each of your {validatorCount} validators"
                      values={{ validatorCount }}
                    />
                  ),
              }}
            />
          ) : (
            <FormattedMessage
              defaultMessage="You should now have your mnemonic written down in a safe place and a keystore saved for {yourValidators}.
                Please make sure you keep these safe, preferably offline.
                Your validator keystores should be available in the newly created {validatorKeys} directory."
              values={{
                yourValidators:
                  validatorCount < 2 ? (
                    <FormattedMessage defaultMessage="your validator" />
                  ) : (
                    <FormattedMessage
                      defaultMessage="each of your {validatorCount} validators"
                      values={{ validatorCount }}
                    />
                  ),
                validatorKeys: (
                  <Code>/ethstaker-deposit-cli/validator_keys</Code>
                ),
              }}
            />
          )}
        </Text>
        <Alert variant="info" className="mt40 mb20">
          <FormattedMessage
            defaultMessage="You should see that you have one keystore per validator. This keystore
            contains your signing key, encrypted with your password."
          />
        </Alert>
        <InstructionImgContainer>
          <img src={instructions1} alt="" />
        </InstructionImgContainer>
        <Text>
          <FormattedMessage
            defaultMessage="The other file you just generated is
            {depositDataJson}. This file contains the
            public key(s) associated with your validator(s); You will need to
            upload this in the next step."
            values={{
              depositDataJson: <Highlight>deposit_data.json</Highlight>,
            }}
          />
        </Text>
        <InstructionImgContainer>
          <img src={instructions2} alt="" />
        </InstructionImgContainer>
        <Alert variant="error">
          <FormattedMessage
            defaultMessage="Warning: Do not store keys on multiple (backup) validator clients at once"
            description="Warns users to not run backup validators that have a live copy of their signing keys. Keys should only be on one validator machine at once."
          />
          <Link
            className="mt10"
            primary
            to="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50"
          >
            <FormattedMessage defaultMessage="More on slashing prevention" />
          </Link>
        </Alert>
      </Paper>
      <Paper>
        <CheckBox
          onChange={onCheckboxClick}
          checked={mnemonicAcknowledgementChecked}
          label={
            <Text>
              <FormattedMessage defaultMessage="I am keeping my key(s) safe and have written down my mnemonic phrase." />
            </Text>
          }
        />
      </Paper>

      <ButtonContainer>
        <Link to={routesEnum.selectClient}>
          <Button
            width={100}
            label={formatMessage({ defaultMessage: 'Back' })}
          />
        </Link>
        <Link to={routesEnum.uploadValidatorPage} onClick={handleSubmit}>
          <Button
            width={300}
            rainbow
            disabled={!mnemonicAcknowledgementChecked}
            label={formatMessage({ defaultMessage: 'Continue' })}
          />
        </Link>
      </ButtonContainer>
    </WorkflowPageTemplate>
  );
};

const mapStateToProps = ({ workflow }: StoreState): StateProps => ({
  workflow,
});
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatchWorkflowUpdate: (workflowStep: WorkflowStep) => {
    dispatch(updateWorkflow(workflowStep));
  },
});

export const GenerateKeysPage = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  StoreState
>(
  mapStateToProps,
  mapDispatchToProps
)(_GenerateKeysPage);
