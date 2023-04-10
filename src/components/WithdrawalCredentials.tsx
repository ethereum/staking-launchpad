// Import libraries
import React, { FC, useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';
import CopyToClipboard from 'react-copy-to-clipboard';
// Components
import { Alert } from './Alert';
import { Button } from './Button';
import { Spinner } from './Spinner';
// Constants
import { BEACONCHAIN_URL, IS_MAINNET, NETWORK_NAME } from '../utils/envVars';
import { screenSizes } from '../styles/styledComponentsTheme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  * {
    color: ${(p: any) => p.theme.blue.dark};
  }
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const Input = styled.input`
  font-size: 1.25rem;
  padding: 15px;
  width: 20ch;
  @media (max-width: ${screenSizes.small}) {
    width: 100%;
  }
`;

const StyledButton = styled(Button)`
  @media (max-width: ${screenSizes.small}) {
    width: 100%;
  }
`;

const ResultsLineItem = styled.div`
  display: flex;
  gap: 0.5rem;
  @media (max-width: ${screenSizes.small}) {
    flex-direction: column;
  }
  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`;

const ResultsLineItemDesktopOnly = styled(ResultsLineItem)`
  @media (max-width: ${screenSizes.medium}) {
    display: none;
  }
`;

const ResultLabel = styled.div`
  white-space: nowrap;
  font-weight: bold;
`;

const AddressCopyContainer = styled.div`
  gap: 1rem;
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
`;

const LongAddress = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CopyContainer = styled.button`
  font-family: monospace;
  width: fit-content;
  font-size: 1rem;
  padding: 0 5px;
  cursor: pointer;
  white-space: nowrap;
  background: rgb(255 255 255 / 50%);
  letter-spacing: 1.5px;
  border: 1px solid ${p => p.theme.blue.dark};
  border-radius: 4px;
  &:hover {
    box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.15);
    background-image: linear-gradient(to right, ${p => p.theme.rainbow});
  }
  &:focus {
    outline-offset: -2px;
  }
`;

interface Validator {
  validatorIndex: number;
  withdrawalCredentials: string;
  isUpgraded: boolean;
}

interface ResultTextProps {
  isLoading: boolean;
  hasError: boolean;
  validator: Validator | null;
}

const ResultText: React.FC<ResultTextProps> = ({
  isLoading,
  hasError,
  validator,
}) => {
  const [copied, setCopied] = useState<{ [key: string]: boolean }>({});
  const onCopy = (key: string) => {
    setCopied(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopied(prev => ({ ...prev, [key]: false }));
    }, 2000);
  };
  const longAddress = validator
    ? `0x${validator.withdrawalCredentials.slice(-40)}`
    : '';

  if (isLoading) return <Spinner />;
  if (hasError)
    return (
      <Alert variant="error">
        <FormattedMessage defaultMessage="Oops! Double check validator index number and try again." />
      </Alert>
    );
  if (!validator) return <span> </span>;
  if (validator.isUpgraded)
    return (
      <Alert variant="success">
        <strong>
          <FormattedMessage defaultMessage="Withdrawals enabled" />
        </strong>
        <p>
          <FormattedMessage
            defaultMessage="This validator is ready to start receiving rewards to the
            withdrawal address below. No further action is needed."
          />
        </p>
        <ResultsLineItem>
          <ResultLabel>
            <FormattedMessage defaultMessage="Validator index:" />{' '}
          </ResultLabel>
          <AddressCopyContainer>
            <LongAddress>{validator.validatorIndex}</LongAddress>
            <CopyToClipboard
              text={validator.validatorIndex.toString()}
              onCopy={() => onCopy('validatorIndex')}
            >
              <CopyContainer>
                {copied.validatorIndex ? (
                  <FormattedMessage defaultMessage="Copied ✓" />
                ) : (
                  <FormattedMessage defaultMessage="Copy" />
                )}
              </CopyContainer>
            </CopyToClipboard>
          </AddressCopyContainer>
        </ResultsLineItem>
        <ResultsLineItemDesktopOnly>
          <ResultLabel>
            <FormattedMessage defaultMessage="Withdrawal credentials:" />{' '}
          </ResultLabel>
          <AddressCopyContainer>
            <LongAddress>{validator.withdrawalCredentials}</LongAddress>
            <CopyToClipboard
              text={validator.withdrawalCredentials}
              onCopy={() => onCopy('withdrawalCredentials')}
            >
              <CopyContainer>
                {copied.withdrawalCredentials ? (
                  <FormattedMessage defaultMessage="Copied ✓" />
                ) : (
                  <FormattedMessage defaultMessage="Copy" />
                )}
              </CopyContainer>
            </CopyToClipboard>
          </AddressCopyContainer>
        </ResultsLineItemDesktopOnly>
        <ResultsLineItem>
          <ResultLabel>
            <FormattedMessage defaultMessage="Withdrawal address:" />{' '}
          </ResultLabel>
          <AddressCopyContainer>
            <LongAddress>{longAddress}</LongAddress>
            <CopyToClipboard
              text={longAddress}
              onCopy={() => onCopy('longAddress')}
            >
              <CopyContainer>
                {copied.longAddress ? (
                  <FormattedMessage defaultMessage="Copied ✓" />
                ) : (
                  <FormattedMessage defaultMessage="Copy" />
                )}
              </CopyContainer>
            </CopyToClipboard>
          </AddressCopyContainer>
        </ResultsLineItem>
      </Alert>
    );
  return (
    <Alert variant="error">
      <strong>
        <FormattedMessage defaultMessage="Withdrawals not enabled" />
      </strong>
      <p>
        <FormattedMessage
          defaultMessage="This {network} validator needs to be configured for withdrawals. Take note of your withdrawal credentials as you'll need this to update your keys."
          values={{
            network: IS_MAINNET ? (
              ''
            ) : (
              <FormattedMessage
                defaultMessage="{NETWORK_NAME} testnet"
                values={{ NETWORK_NAME }}
              />
            ),
          }}
        />
      </p>
      <ResultsLineItem>
        <ResultLabel>
          <FormattedMessage defaultMessage="Validator index:" />{' '}
        </ResultLabel>
        <AddressCopyContainer>
          <LongAddress>{validator.validatorIndex}</LongAddress>
          <CopyToClipboard
            text={validator.validatorIndex.toString()}
            onCopy={() => onCopy('validatorIndex')}
          >
            <CopyContainer>
              {copied.validatorIndex ? (
                <FormattedMessage defaultMessage="Copied ✓" />
              ) : (
                <FormattedMessage defaultMessage="Copy" />
              )}
            </CopyContainer>
          </CopyToClipboard>
        </AddressCopyContainer>
      </ResultsLineItem>
      <ResultsLineItem>
        <ResultLabel>
          <FormattedMessage defaultMessage="Withdrawal credentials:" />{' '}
        </ResultLabel>
        <AddressCopyContainer>
          <LongAddress>{validator.withdrawalCredentials}</LongAddress>
          <CopyToClipboard
            text={validator.withdrawalCredentials}
            onCopy={() => onCopy('withdrawalCredentials')}
          >
            <CopyContainer>
              {copied.withdrawalCredentials ? (
                <FormattedMessage defaultMessage="Copied ✓" />
              ) : (
                <FormattedMessage defaultMessage="Copy" />
              )}
            </CopyContainer>
          </CopyToClipboard>
        </AddressCopyContainer>
      </ResultsLineItem>
    </Alert>
  );
};

interface IProps {}
export const WithdrawalCredentials: FC<IProps> = () => {
  const { formatMessage } = useIntl();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [validator, setValidator] = useState<Validator | null>(null);
  const isMobile: boolean = (window as any).mobileCheck();

  const checkWithdrawalCredentials = async () => {
    setHasError(false);
    setIsLoading(true);
    const endpoint = `${BEACONCHAIN_URL}/api/v1/validator/${inputValue}`;
    try {
      const response = await fetch(endpoint);
      const { data } = await response.json();
      const withdrawalCredentials = data.length
        ? data[0].withdrawalcredentials
        : data.withdrawalcredentials;
      setValidator({
        validatorIndex: parseInt(inputValue, 10),
        withdrawalCredentials,
        isUpgraded: withdrawalCredentials.startsWith('0x01'),
      });
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value.replace(/\D/g, ''));

  return (
    <Container>
      <FlexRow>
        <Input
          id="validatorIndex"
          value={inputValue}
          onChange={handleChange}
          placeholder={formatMessage({ defaultMessage: 'Validator index' })}
        />
        <StyledButton
          label={
            <FormattedMessage
              defaultMessage="Verify on {NETWORK_NAME}"
              values={{ NETWORK_NAME }}
            />
          }
          onClick={checkWithdrawalCredentials}
          disabled={!inputValue.length}
          fullWidth={isMobile}
        />
      </FlexRow>
      <FlexRow>
        <ResultText
          isLoading={isLoading}
          hasError={hasError}
          validator={validator}
        />
      </FlexRow>
    </Container>
  );
};
