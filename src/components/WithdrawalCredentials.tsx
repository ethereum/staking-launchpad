// Import libraries
import React, { FC, useState, useMemo, ChangeEvent } from 'react';
import styled from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';
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
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  button {
    border-radius: 4px;
    color: white;
    background: ${p => p.theme.blue.medium};
    text-transform: none;
    :hover {
      background: ${p => p.theme.blue.light};
      color: black;
    }
    :active {
      background: ${p => p.theme.blue.lightest};
      color: black;
    }
    :disabled {
      background: ${p => p.theme.gray.medium};
      color: black;
    }
  }
`;

const Input = styled.input`
  font-size: 1.25rem;
  padding: 15px;
  width: 20ch;
  @media (max-width: ${screenSizes.smaller}) {
    width: 100%;
  }
`;

interface Validator {
  validatorIndex: number;
  withdrawalCredentials: string;
  isUpgraded: boolean;
}

interface IProps {}
export const WithdrawalCredentials: FC<IProps> = () => {
  const { locale } = useIntl();
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
      const withdrawalCredentials = data.withdrawalcredentials;
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

  const longAddress = useMemo<string>(
    () => (validator ? `0x${validator.withdrawalCredentials.slice(-40)}` : ''),
    [validator]
  );
  const shortAddress = useMemo<string>(
    () =>
      longAddress ? `${longAddress.slice(0, 6)}…${longAddress.slice(-4)}` : '',
    [longAddress]
  );
  const resultText = useMemo<string | JSX.Element>(() => {
    if (isLoading) return <Spinner />;
    if (hasError)
      return (
        <Alert variant="error">
          <FormattedMessage defaultMessage="Oops! Double check validator index number and try again." />
        </Alert>
      );
    if (!validator) return ' ';
    if (validator.isUpgraded)
      return (
        <Alert variant="success">
          <FormattedMessage
            defaultMessage="Validator index {validatorIndex} is ready to start
            receiving rewards to their execution layer address at {address}"
            values={{
              validatorIndex: (
                <strong>
                  {new Intl.NumberFormat(locale).format(
                    validator.validatorIndex
                  )}
                </strong>
              ),
              address: <strong title={longAddress}>{shortAddress}</strong>,
            }}
          />
        </Alert>
      );
    return (
      <Alert variant="error">
        <FormattedMessage
          defaultMessage="This {network} validator needs to be configured for withdrawals."
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
      </Alert>
    );
  }, [isLoading, hasError, validator, longAddress, shortAddress, locale]);

  return (
    <Container>
      <FlexRow>
        <Input
          id="validatorIndex"
          value={inputValue}
          onChange={handleChange}
          placeholder="Validator index"
        />
        <Button
          label={<FormattedMessage defaultMessage="Verify" />}
          onClick={checkWithdrawalCredentials}
          disabled={!inputValue.length}
          fullWidth={isMobile}
        />
      </FlexRow>
      <FlexRow>{resultText}</FlexRow>
    </Container>
  );
};
