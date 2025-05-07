import React from 'react';
import styled from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';
import { PageTemplate } from '../../components/PageTemplate';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import { Link } from '../../components/Link';
import { MIN_ACTIVATION_BALANCE } from '../../utils/envVars';

const SectionTitle = styled(Heading)`
  margin-top: 30px;
  border-bottom: 1px solid lightgray;
  padding-bottom: 10px;
`;

export const Phishing = () => {
  const { formatMessage } = useIntl();
  return (
    <PageTemplate title={formatMessage({ defaultMessage: 'Avoid phishing' })}>
      <Text className="mt10">
        <FormattedMessage
          defaultMessage="Phishing is a very real risk for Ethereum validators and, unfortunately,
        many people will lose funds due to these attacks."
        />
      </Text>
      <section>
        <SectionTitle level={3} className="mb5">
          <FormattedMessage defaultMessage="Double check the URL" />
        </SectionTitle>
        <ul>
          <li>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="Does the site asking you for your deposit have a URL you
                expect?"
              />
            </Text>
          </li>
          <li>
            <Text className="mt10">
              <FormattedMessage defaultMessage="Does the URL match what you’ve seen on other websites?" />
            </Text>
          </li>
          <li>
            <Text className="mt10">
              <FormattedMessage defaultMessage="Are there spelling mistakes?" />
            </Text>
          </li>
        </ul>
      </section>
      <section>
        <SectionTitle level={3} className="mb5">
          <FormattedMessage defaultMessage="Check deposit contract details" />
        </SectionTitle>
        <Heading level={4} className="mt20">
          <FormattedMessage defaultMessage="What should the address be?" />
        </Heading>
        <ul>
          <li>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="Cross check the deposit contract address against other websites – for example: Reddit,
                Twitter, and GitHub. There's also a list of trusted sources on {ethereumorg}"
                values={{
                  ethereumorg: (
                    <Link
                      inline
                      to="https://ethereum.org/en/staking/deposit-contract/"
                    >
                      ethereum.org
                    </Link>
                  ),
                }}
                description="{ethereumorg} is a link to deposit contract page on ethereum.org"
              />
            </Text>
          </li>
          <li>
            <Text className="mt10">
              <FormattedMessage defaultMessage="Check the deposit contract on your favorite Ethereum block explorer:" />
            </Text>
            <ul>
              <li>
                <Text className="mt10">
                  <FormattedMessage
                    defaultMessage="Are there recent deposits of at least {ethAmount}?"
                    values={{
                      ethAmount: `${MIN_ACTIVATION_BALANCE} ETH`,
                    }}
                    description="Asks users to check deposit contract address against a block explorer and confirm 32 ETH deposits are present"
                  />
                </Text>
              </li>
              <li>
                <Text className="mt10">
                  <FormattedMessage defaultMessage="Does the contract have a large balance?" />
                </Text>
              </li>
              <li>
                <Text className="mt10">
                  <FormattedMessage defaultMessage="Has the smart contract code been verified?" />
                </Text>
              </li>
              <li>
                <Text className="mt10">
                  <FormattedMessage defaultMessage="Has the block explorer named the contract?" />
                </Text>
              </li>
            </ul>
          </li>
          <li>
            <Text className="mt10">
              <FormattedMessage defaultMessage="Check your favorite Beacon Chain block explorer:" />
            </Text>
            <ul>
              <li>
                <Text className="mt10">
                  <FormattedMessage defaultMessage="Does the contract address listed on the website match?" />
                </Text>
              </li>
            </ul>
          </li>
        </ul>
        <Heading level={4} className="mb5">
          <FormattedMessage defaultMessage="Verify the contract address" />
        </Heading>
        <ul>
          <li>
            <Text className="mt10">
              <FormattedMessage defaultMessage="Don’t just trust the contract address listed on this website." />
            </Text>
          </li>
          <li>
            <Text className="mt10">
              <FormattedMessage defaultMessage="Verify the contract address in your wallet before you sign." />
            </Text>
          </li>
          <li>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="Check the whole address, not just a portion of it. There could be
              just a few bytes different."
              />
            </Text>
          </li>
        </ul>
      </section>
    </PageTemplate>
  );
};
