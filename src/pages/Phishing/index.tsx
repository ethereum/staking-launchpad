import React from 'react';
import styled from 'styled-components';
import { PageTemplate } from '../../components/PageTemplate';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';

const SectionTitle = styled(Heading)`
  margin-top: 30px;
  border-bottom: 1px solid lightgray;
  padding-bottom: 10px;
`;

export const Phishing = () => {
  return (
    <PageTemplate title="Phishing">
      <Text className="mt10">
        Phishing is a very real risk for eth2 validators and, unfortunately,
        many people will lose funds due to these attacks.
      </Text>
      <section>
        <SectionTitle level={3} className="mb5">
          Double check the URL
        </SectionTitle>
        <ul>
          <li>
            <Text className="mt10">
              Is the URL of the site you are making the deposit the one you
              expect?
            </Text>
          </li>
          <li>
            <Text className="mt10">
              Does it match what you’ve seen on other websites?
            </Text>
          </li>
          <li>
            <Text className="mt10">Are there spelling mistakes?</Text>
          </li>
        </ul>
      </section>
      <section>
        <SectionTitle level={3} className="mb5">
          The deposit contract
        </SectionTitle>
        <Heading level={4} className="mb5">
          What should the address be?
        </Heading>
        <ul>
          <li>
            <Text className="mt10">
              Cross check the address against other websites (eg. Reddit,
              Twitter, GitHub, etc).
            </Text>
          </li>
          <li>
            <Text className="mt10">On your favorite eth1 block explorer:</Text>
            <ul>
              <li>
                <Text className="mt10">Are there recent 32ETH deposits?</Text>
              </li>
              <li>
                <Text className="mt10">
                  Does the contract have a large balance?
                </Text>
              </li>
              <li>
                <Text className="mt10">
                  Has the smart contract code been verified?
                </Text>
              </li>
              <li>
                <Text className="mt10">
                  Has the block explorer named the contract?
                </Text>
              </li>
            </ul>
          </li>
          <li>
            <Text className="mt10">On your favorite eth2 block explorer:</Text>
            <ul>
              <li>
                <Text className="mt10">
                  Does the address listed on the website match?
                </Text>
              </li>
            </ul>
          </li>
        </ul>
        <Heading level={4} className="mb5">
          Verifying the contract address
        </Heading>
        <ul>
          <li>
            <Text className="mt10">
              Don’t just trust the contract address listed in this website.
            </Text>
          </li>
          <li>
            <Text className="mt10">
              Verify the contract address in your wallet before you sign.
            </Text>
          </li>
          <li>
            <Text className="mt10">
              Check the whole address, not just a portion of it. There could be
              just a few bytes different.
            </Text>
          </li>
        </ul>
      </section>
    </PageTemplate>
  );
};
