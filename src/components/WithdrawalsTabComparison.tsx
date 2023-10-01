// Import libraries
import React, { FC } from 'react';
import { Tabs, Tab } from 'grommet';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
// Components
import { Heading } from './Heading';
import { Text } from './Text';
import { Code } from './Code';
import { WithdrawalCredentials } from './WithdrawalCredentials';

const HashCode = styled(Code)`
  word-break: break-all;
`;

const StyledTabs = styled(Tabs)`
  margin-top: 30px;
  button:focus {
    outline: 2px solid ${p => p.theme.red.light};
  }
  div {
    border: 0px;
  }
  div[class*='StyledTabsHeader'] {
    border-bottom: 1px solid #d6d7d6;
    max-width: fit-content;
    flex-wrap: nowrap;
    text-align: center;
  }
  div[class*='StyledTab'][class*='StyledBox'] {
    font-weight: 400;
    letter-spacing: 0.01em;
    font-size: 1rem;
  }
  button[role='tab'] {
    border-radius: 4px 4px 0 0;
  }
  button[aria-expanded='true'] {
    background-image: ${p => `linear-gradient(to right, ${p.theme.rainbow})`};
    * {
      font-weight: 600 !important;
    }
  }
  button div {
    padding: 0;
  }
  section {
    margin-top: 10px !important;
    border-radius: 4px;
    border: 1px solid ${p => p.theme.gray.light};
    background: white;
    padding: 20px;
  }
`;

interface IProps {}
export const WithdrawalsTabComparison: FC<IProps> = () => {
  return (
    <StyledTabs>
      <Tab title={<FormattedMessage defaultMessage="Current validators" />}>
        <section>
          <Heading level={3} className="mb10">
            <FormattedMessage defaultMessage="Current validators" />
          </Heading>
          <Text className="mb10">
            <FormattedMessage
              defaultMessage="Depending how you set up your initial deposit, your account may or
              may not be ready for withdrawals already:"
            />
          </Text>
          <ul className="mb20">
            <li>
              <FormattedMessage
                defaultMessage="{stakingDepositCli}: if you used the “eth1 withdrawal address” ({eth1WithdrawalAddress})
                flag when generating your keys, you're good to go"
                values={{
                  stakingDepositCli: (
                    <strong>
                      <FormattedMessage defaultMessage="Staking Deposit CLI" />
                    </strong>
                  ),
                  eth1WithdrawalAddress: (
                    <HashCode>--eth1_withdrawal_address</HashCode>
                  ),
                }}
              />
            </li>
            <li>
              <FormattedMessage
                defaultMessage="{wagyuKeyGenGui}: if you provided a withdrawal address when generating your keys, you're good to go"
                values={{
                  wagyuKeyGenGui: (
                    <strong>
                      <FormattedMessage defaultMessage="Wagyu Key Gen GUI" />
                    </strong>
                  ),
                }}
              />
            </li>
          </ul>
          <Text className="my20">
            <FormattedMessage defaultMessage="Enter your validator index here to check if you're account is ready for withdrawals or not:" />
          </Text>

          <WithdrawalCredentials />
        </section>
      </Tab>
      <Tab
        title={
          <FormattedMessage defaultMessage="New validators (not yet deposited)" />
        }
      >
        <section>
          <Heading level={3} className="mb10">
            <FormattedMessage defaultMessage="New validators (not yet deposited)" />
          </Heading>
          <Text className="mb10">
            <FormattedMessage
              defaultMessage="If you’re preparing to make a deposit to activate a new
              validator, you can (and should) provide a withdrawal address with your initial deposit. This is
              done at time of key generation, and is then included in your deposit data json file {depositData}
              which is submitted with your 32 ETH deposit transaction."
              values={{
                depositData: (
                  <Code>
                    {'deposit_data-<'}
                    <FormattedMessage defaultMessage="timestamp" />
                    {'>.json'}
                  </Code>
                ),
              }}
            />
          </Text>
          <Text className="mb10">
            <FormattedMessage defaultMessage="Depending which method you use to generate your keys:" />
          </Text>
          <ul>
            <li>
              <FormattedMessage
                defaultMessage="{stakingDepositCli}: This is done by using the “eth1 withdrawal address”
                ({eth1WithdrawalAddress}) flag when generating your keys with the Staking Deposit CLI."
                values={{
                  stakingDepositCli: (
                    <strong>
                      <FormattedMessage defaultMessage="Staking Deposit CLI" />
                    </strong>
                  ),
                  eth1WithdrawalAddress: <Code>--eth1_withdrawal_address</Code>,
                }}
              />
            </li>
            <li>
              <FormattedMessage
                defaultMessage="{wagyuKeyGenGui}: This software is being updated to require users to provide a withdrawal address during key generation. In the meantime, you may have to check “Advanced” during setup to enter a withdrawal address."
                values={{
                  wagyuKeyGenGui: (
                    <strong>
                      <FormattedMessage defaultMessage="Wagyu Key Gen GUI" />
                    </strong>
                  ),
                }}
              />
            </li>
            <Text>
              <FormattedMessage
                defaultMessage="By providing this flag, your withdrawal credentials will contain the {type1} prefix and
                your withdrawal address, signaling that your account is ready for withdrawals."
                values={{ type1: <Code>0x01</Code> }}
              />
            </Text>
          </ul>
        </section>
      </Tab>
    </StyledTabs>
  );
};
