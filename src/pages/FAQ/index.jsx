import React from 'react';
import { useIntl } from 'react-intl';
import { HashLink as Anchor } from 'react-router-hash-link';
import styled from 'styled-components';
import { Link } from '../../components/Link';
import { PageTemplate } from '../../components/PageTemplate';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';

const FAQStyles = styled.div`
  section {
    margin-top: 30px;
  }
  a {
    text-decoration: none;
  }
`;

const BlockQuote = styled.div`
  margin-top: 10px;
  padding-left: 20px;
  border-left: 5px solid lightgray;
`;

const SectionTitle = styled(Heading)`
  margin-top: 30px;
  border-bottom: 1px solid lightgray;
  padding-bottom: 10px;
`;

export const FAQ = () => {
  const intl = useIntl();
  return (
    <PageTemplate
      title={intl.formatMessage({ defaultMessage: 'Validator FAQs' })}
      description={intl.formatMessage({
        defaultMessage: 'Answers to common questions on becoming a validator.',
      })}
    >
      <FAQStyles>
        <section>
          <Anchor to="#introduction" id="introduction">
            <SectionTitle level={3}>Introduction</SectionTitle>
          </Anchor>

          <section>
            <Heading level={4}>What exactly is a validator?</Heading>
            <Text className="mt10">
              A validator is an entity that participates in the consensus of the
              Ethereum 2.0 protocol.
            </Text>
            <Text className="mt10">
              Or in plain english, a human running a computer process. This
              process proposes and vouches for new blocks to be added to the
              blockchain.
            </Text>
            <Text className="mt10">
              In other words,{' '}
              <strong>
                you can think of a validator as a voter for new blocks.
              </strong>
              The more votes a block gets, the more likely it is to be added to
              the chain.
            </Text>
            <Text className="mt10">
              Importantly, a validator’s vote is weighted by the amount it has
              at stake.
            </Text>
          </section>
          <section>
            <Heading level={4}>What is the deposit contract?</Heading>
            <Text className="mt10">
              You can think of it as a transfer of funds between Ethereum
              accounts and Eth2 validators.
            </Text>
            <Text className="mt10">
              It specifies who is staking, who is validating, how much is being
              staked, and who can withdraw the funds.
            </Text>
          </section>
          <section>
            <Heading level={4}>
              Why do validators need to have funds at stake?
            </Heading>
            <Text className="mt10">
              Validators need to have funds at stake so they can be penalized
              for behaving dishonestly.
            </Text>
            <Text className="mt10">
              In other words, to keep them honest, their actions need to have
              financial consequences.
            </Text>
          </section>
          <section>
            <Heading level={4}>
              How much ETH does a validator need to stake?
            </Heading>
            <Text className="mt10">
              Before a validator can start to secure the network, he or she
              needs to stake <strong>32 ETH.</strong> This forms the validator’s
              initial balance.
            </Text>
          </section>
          <section>
            <Heading level={4}>
              Is there any advantage to having more than 32 ETH at stake?
            </Heading>
            <Text className="mt10">
              No. There is no advantage to having more than 32 ETH staked.
            </Text>
            <Text className="mt10">
              Limiting the maximum stake to 32 ETH encourages decentralization
              of power as it prevents any single validator from having an
              excessively large vote on the state of the chain.
            </Text>
            <BlockQuote>
              <Text>
                Remember that a validator’s vote is weighted by the amount it
                has at stake.
              </Text>
            </BlockQuote>
          </section>
          <section>
            <Heading level={4}>
              Can I stop running my validator for a few days and then start it
              back up again?
            </Heading>
            <Text className="mt10">
              Yes but, under normal conditions, you will lose an amount of ETH
              roughly equivalent to the amount of ETH you would have gained in
              that period. In other words, if you stood to earn ≈0.01 ETH, you
              would instead be penalised ≈0.01 ETH.
            </Text>
          </section>
          <section>
            <Heading level={4}>
              When should I top up my validator&apos;s balance?
            </Heading>
            <Text className="mt10">
              The answer to this question very much depends on how much ETH you
              have at your disposal.
            </Text>
            <Text className="mt10">
              You should certainly top up if your balance is close to 16 ETH:
              this is to ensure you don&apos;t get kicked out of the validator
              set (which automatically happens if your balance falls below 16
              ETH).
            </Text>
            <Text className="mt10">
              At the other end of the spectrum, if your balance is closer to 31
              ETH, it&apos;s probably not worth your while adding the extra ETH
              required to get back to 32.
            </Text>
          </section>
          <section>
            <Heading level={4}>
              When can I withdraw my funds, and what&apos;s the difference
              between exiting and withdrawing?
            </Heading>
            <Text className="mt10">
              You can signal your intent to stop validating by signing a
              voluntary exit message with your validator.
            </Text>
            <Text className="mt10">
              However, bear in mind that for the foreseeable future, once
              you&apos;ve exited, there&apos;s no going back.
            </Text>
            <Text className="mt10">
              There&apos;s no way for you to activate your validator again, and
              you won&apos;t be able to transfer or withdraw your funds until
              the merge (which means your funds will remain inaccessible until
              then).
            </Text>
          </section>
        </section>
        <section>
          <Anchor to="#responsibilities" id="responsibilities">
            <SectionTitle level={3}>Responsibilities</SectionTitle>
          </Anchor>
          <section>
            <Heading level={4}>
              How are validators incentivized to stay active and honest?
            </Heading>
            <Text className="mt10">
              In addition to being penalized for being offline, validators are
              penalized for behaving maliciously – for example attesting to
              invalid or contradicting blocks.
            </Text>
            <Text className="mt10">
              On the other hand, they are rewarded for proposing / attesting to
              blocks that are included in the chain.
            </Text>
            <Text className="mt10">The key concept is the following:</Text>
            <ul>
              <li>
                Rewards are given for actions that help the network reach
                consensus
              </li>
              <li>
                Minor penalties are given for inadvertant actions (or inactions)
                that hinder consensus
              </li>
              <li>
                And major penalities – or <strong>slashings</strong> – are given
                for malicious actions
              </li>
            </ul>
            <Text className="mt10">
              In other words, validators that maximize their rewards also
              provide the greatest benefit to the network as a whole.
            </Text>
          </section>
          <section>
            <Heading level={4}>How are rewards/penalties issued?</Heading>
            <Text className="mt10">
              Remember that each validator has its own balance – with the
              initial balance outlined in the deposit contract.
            </Text>
            <Text className="mt10">
              This balance is updated periodically by the Ethereum network rules
              as the validator carries (or fails to carry) out his or her
              responsibilities.
            </Text>
            <Text className="mt10">
              Put another way, rewards and penalties are reflected in the
              validator’s balance over time.
            </Text>
          </section>
          <section>
            <Heading level={4}>How often are rewards/penalties issued?</Heading>
            <Text className="mt10">
              Approximately every six and a half minutes – a period of time
              known as an epoch.
            </Text>
            <Text className="mt10">
              Every epoch, the network measures the actions of each validator
              and issues rewards or penalties appropriately.
            </Text>
          </section>
          <section>
            <Heading level={4}>How large are the rewards/penalties?</Heading>
            <Text className="mt10">
              There is no easy answer to this question as there are many factors
              that go into this calculation.
            </Text>
            <Text className="mt10">
              Arguably the most impactful factor on rewards earned for
              validating transactions is the total amount of stake in the
              network. In other words, the total amount of validators. Depending
              on this figure the max annual return rate for a validator can be
              anywhere between 2 and 20%.
            </Text>
            <Text className="mt10">
              Given a fixed total number of validators, the rewards/penalties
              predominantly scale with the balance of the validator – attesting
              with a higher balance results in larger rewards/penalties whereas
              attesting with a lower balance results in lower rewards/penalties.
            </Text>
            <BlockQuote>
              <Text className="mt10">
                Note however that this scaling mechanism works in a non-obvious
                way. To understand the precise details of how it works requires
                understanding a concept called{' '}
                <strong> effective balance.</strong> If you’re not yet familiar
                with this concept, we recommend you read through this{' '}
                <Link
                  primary
                  inline
                  to="https://www.attestant.io/posts/understanding-validator-effective-balance/"
                >
                  excellent post.
                </Link>
              </Text>
            </BlockQuote>
          </section>
          <section>
            <Heading level={4}>
              Why do rewards depend on the total number of validators in the
              network?
            </Heading>
            <Text className="mt10">
              Block rewards are calculated using a sliding scale based on the
              total amount of ETH staked on the network.
            </Text>
            <Text className="mt10">
              In plain english: if the total amount of ETH staked is low, the
              reward (interest rate) is high, but as the total stake rises, the
              reward (interest) paid out to each validator starts to fall.
            </Text>
            <Text className="mt10">
              Why a sliding scale? While we won’t get into the gory details
              here, the basic intution is that there needs to be a minimum
              number of validators (and hence a minimum amount of ETH staked)
              for the network to function properly. So, to incentivize more
              validators to join, it’s important that the interest rate remains
              high until this minimum number is reached.
            </Text>
            <Text className="mt10">
              Afterwards, validators are still encouraged to join (the more
              validators the more decentralized the network), but it’s not
              absolutely essential that they do so (so the interest rate can
              fall).
            </Text>
          </section>
          <section>
            <Heading level={4}>
              How badly will a validator be penalized for being offline?
            </Heading>
            <Text className="mt10">
              It depends. In addition to the{' '}
              <Link
                inline
                primary
                to="https://www.attestant.io/posts/understanding-validator-effective-balance/#the-impact-of-effective-balance-on-validating"
              >
                impact of effective balance
              </Link>{' '}
              there are two important scenarios to be aware of:
            </Text>
            <ol>
              <li>
                <Text className="mt10">
                  Being offline while a supermajority (2/3) of validators is
                  still online leads to relatively small penalties as there are
                  still enough validators online for the chain to finalize.{' '}
                  <strong>This is the expected scenario.</strong>
                </Text>
              </li>
              <li>
                <Text className="mt10">
                  Being offline at the same time as more than 1/3 of the total
                  number of validators leads to harsher penalties, since blocks
                  do not finalize anymore.{' '}
                  <strong>
                    This scenario is very extreme and unlikely to happen.
                  </strong>
                </Text>
              </li>
            </ol>
            <BlockQuote>
              <Text className="mt10">
                Note that in the second (unlikely) scenario, validators stand to
                progressively lose up to 50% (16 ETH) of their stake over 21
                days. After 21 days they are ejected out of the validator pool.
                This ensures that blocks start finalizing again at some point.
              </Text>
            </BlockQuote>
          </section>
          <section>
            <Heading level={4}>
              How great does an honest validator’s uptime need to be for it to
              be net profitable?
            </Heading>
            <Text className="mt10">
              Overall, validators are expected to be net profitable as long as
              their uptime is{' '}
              <Link to="https://blog.ethereum.org/2020/01/13/validated-staking-on-eth2-1-incentives/">
                greater than 50%.
              </Link>
            </Text>
            <Text className="mt10">
              This means that validators need not go to extreme lengths with
              backup clients or redundant internet connections as the
              repercussions of being offline are not so severe.
            </Text>
          </section>
          <section>
            <Heading level={4}>
              How much will a validator be penalized for acting maliciously?
            </Heading>
            <Text className="mt10">
              Again, it depends. Behaving maliciously – for example attesting to
              invalid or contradicting blocks, will lead to a validator’s stake
              being slashed.
            </Text>
            <Text className="mt10">
              The minimum amount that can be slashed is 1 ETH, but{' '}
              <strong>
                this number increases if other validators are slashed at the
                same time.
              </strong>
            </Text>
            <Text className="mt10">
              The idea behind this is to minimize the losses from honest
              mistakes, but strongly disincentivize coordinated attacks.
            </Text>
          </section>
          <section>
            <Heading level={4}>What exactly is slashing?</Heading>
            <Text className="mt10">
              Slashing has two purposes: (1) to make it prohibitively expensive
              to attack eth2, and (2) to stop validators from being lazy by
              checking that they actually perform their duties. Slashing a
              validator is to destroy (a portion of) the validator’s stake if
              they act in a provably destructive manner.
            </Text>
            <Text className="mt10">
              Validators that are slashed are prevented from participating in
              the protocol further and are forcibly exited.
            </Text>
          </section>
        </section>
        <section>
          <Anchor to="#keys" id="keys">
            <SectionTitle level={3}>Keys</SectionTitle>
          </Anchor>
          <section>
            <Heading level={4}>What happens I lose my signing key?</Heading>
            <Text className="mt10">
              If the signing key is lost, the validator can no longer propose or
              attest.
            </Text>
            <Text className="mt10">
              Over time, the validator’s balance will decrease as he or she is
              punished for not participating in the consensus process. When the
              validator’s balance reaches 16 Eth, he or she will be
              automatically exited from the validator pool.
            </Text>
            <BlockQuote>
              <Text className="mt10">
                However, all is not lost. Assuming validators derive their keys
                using{' '}
                <Link
                  primary
                  inline
                  to="https://eips.ethereum.org/EIPS/eip-2334"
                >
                  EIP2334
                </Link>{' '}
                (as per the default onboarding flow) then{' '}
                <strong>
                  validators can always recalculate their signing key from their
                  withdrawal key.
                </strong>
              </Text>
            </BlockQuote>
            <Text className="mt10">
              The 16 Eth can then be withdrawn – with the withdrawal key – after
              a delay of around a day.
            </Text>
            <BlockQuote>
              <Text className="mt10">
                Note that this delay can be longer if many others are exiting or
                being kicked out at the same time.
              </Text>
            </BlockQuote>
          </section>
          <section>
            <Heading level={4}>
              What happens if I lose my withdrawal key?
            </Heading>
            <Text className="mt10">
              If the withdrawal key is lost, there is no way to obtain access to
              the funds held by the validator.
            </Text>
            <Text className="mt10">
              As such, it’s a good idea to create your keys from mnemonics which
              act as another backup. This will be the default for validators who
              join via this site’s onboarding process.
            </Text>
          </section>
          <section>
            <Heading level={4}>
              What happens if my withdrawal key is stolen?
            </Heading>
            <Text className="mt10">
              If the withdrawal key is stolen, the thief can transfer the
              validator’s balance, but only once the validator has exited.
            </Text>
            <Text className="mt10">
              If the signing key is not under the thief’s control, the thief
              cannot exit the validator.
            </Text>
            <Text className="mt10">
              The user with the signing key could attempt to quickly exit the
              validator and then transfer the funds – with the withdrawal key –
              before the thief.
            </Text>
          </section>
          <section>
            <Heading level={4}>Why two keys instead of one?</Heading>
            <Text className="mt10">
              In a nutshell, security. The signing key must be available at all
              times. As such, it will need to be held online. Since anything
              online is vulnerable to being hacked, it’s not a good idea to use
              the same key for withdrawals.
            </Text>
          </section>
        </section>
        <section>
          <Anchor to="#support" id="support">
            <SectionTitle level={3}>Support</SectionTitle>
          </Anchor>
          <section>
            <Heading level={4}>
              Where can I find troubleshooting support?
            </Heading>
            <Text className="mt10">
              If you have questions, EthStaker community is a good place to get
              help! You can find support on{' '}
              <Link inline to="https://invite.gg/ethstaker">
                Discord
              </Link>{' '}
              or{' '}
              <Link inline to="https://reddit.com/r/ethstaker">
                Reddit
              </Link>
              .
            </Text>
          </section>
        </section>
      </FAQStyles>
    </PageTemplate>
  );
};
