// Import libraries
import React, { FC } from 'react';
import { Box, Tabs, Tab } from 'grommet';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
// Components
import { Heading } from './Heading';
// import { Link } from './Link';
import { Text } from './Text';
import { Code } from './Code';
import { WithdrawalCredentials } from './WithdrawalCredentials';

const HashCode = styled(Code)`
  word-break: break-all;
`;

interface IProps {}
export const WithdrawalsTabComparison: FC<IProps> = () => {
  return (
    <Tabs>
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
          <ul>
            <li>
              <FormattedMessage
                defaultMessage="{stakingDepositCli}: if you used the {eth1WithdrawalAddress} flag when generating your keys, you're good to go"
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
                defaultMessage="{wagyuKeyGenGui}: if you provided a withdrawal address when generating your keys, you're good to go (previously under “advanced mode”)"
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
          <Text className="mb10">
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
        <Box pad="medium">New val</Box>
      </Tab>
    </Tabs>
  );
};
