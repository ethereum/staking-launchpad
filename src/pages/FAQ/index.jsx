import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { HashLink as Anchor } from 'react-router-hash-link';
import styled from 'styled-components';
import { Link } from '../../components/Link';
import { PageTemplate } from '../../components/PageTemplate';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import { PRICE_PER_VALIDATOR } from '../../utils/envVars';

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
  const { formatMessage } = useIntl();
  return (
    <PageTemplate
      title={formatMessage({ defaultMessage: 'Validator FAQs' })}
      description={formatMessage({
        defaultMessage: 'Answers to common questions on becoming a validator.',
      })}
    >
      <FAQStyles>
        <section>
          <Anchor to="#introduction" id="introduction">
            <SectionTitle level={3}>
              <FormattedMessage defaultMessage="Introduction" />
            </SectionTitle>
          </Anchor>

          <section>
            <Heading level={4}>
              <FormattedMessage defaultMessage="What exactly is a validator?" />
            </Heading>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="A {validator} is a virtual entity that lives on the Beacon Chain, represented by a balance, public key, and other properties, and participates in consensus of the Ethereum network."
                values={{
                  validator: <em>validator</em>,
                }}
              />
            </Text>
          </section>
          <section>
            <Heading level={4}>
              <FormattedMessage defaultMessage="What is a validator client?" />
            </Heading>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="A {validatorClient} is the software that acts on behalf of the validator by holding and using its private key to make attestations about the state of the chain. A single validator client can hold many key pairs, controlling many validators."
                values={{
                  validatorClient: <em>validator client</em>,
                }}
              />
            </Text>
          </section>
          <section>
            <Heading level={4}>
              <FormattedMessage defaultMessage="What is a node operator?" />
            </Heading>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="A {nodeOperator} is the human being who makes sure the client software is running appropriately, maintaining hardware as needed."
                values={{
                  nodeOperator: <em>node operator</em>,
                }}
              />
            </Text>
          </section>
          <section>
            <Heading level={4}>
              <FormattedMessage defaultMessage="How much ETH do I need to stake to become a validator?" />
            </Heading>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="Each key-pair associated with a validator requires locking {ethPerValidator} to be activated, which represents your initial balance as well as your {initialAndMaximum} voting power for any validator."
                values={{
                  ethPerValidator: <strong>{PRICE_PER_VALIDATOR} ETH</strong>,
                  initialAndMaximum: <em>initial and maximum</em>,
                }}
              />
            </Text>
          </section>
          <section>
            <Heading level={4}>
              <FormattedMessage
                defaultMessage="Is there any advantage to having more than {pricePerValidator} ETH at stake?"
                values={{
                  pricePerValidator: PRICE_PER_VALIDATOR,
                }}
              />
            </Heading>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="No. There is no advantage to having more than {pricePerValidator} ETH staked."
                values={{
                  pricePerValidator: PRICE_PER_VALIDATOR,
                }}
              />
            </Text>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="Depositing more than {pricePerValidator} ETH to a single set of keys does not increase rewards potential, nor does accumulating rewards above {pricePerValidator} ETH, as each validator is limited to an {effectiveBalance} of {pricePerValidator}. This means that staking is done in {pricePerValidator} ETH increments, each with its own set of keys and balance."
                values={{
                  pricePerValidator: PRICE_PER_VALIDATOR,
                  effectiveBalance: (
                    <Link
                      primary
                      inline
                      to="https://www.attestant.io/posts/understanding-validator-effective-balance/"
                    >
                      effective balance
                    </Link>
                  ),
                }}
              />
            </Text>
          </section>
          <section>
            <Heading level={4}>
              <FormattedMessage
                defaultMessage="Why the {pricePerValidator} ETH maximum?"
                values={{
                  pricePerValidator: PRICE_PER_VALIDATOR,
                }}
              />
            </Heading>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="Limiting the maximum stake to {pricePerValidator} ETH per validator encourages decentralization of power as it prevents any single validator from having an excessively large vote on the state of the chain. It also limits the amount of ETH that can be exited from staking at any given time, as the number of validator that can exit in a given time period is limited. This helps protect the network against certain attacks."
                values={{
                  pricePerValidator: PRICE_PER_VALIDATOR,
                }}
              />
            </Text>
            <Text className="mt20 mb20">
              <FormattedMessage
                defaultMessage="Although a validator's vote is weighted by the amount it has at stake, each validators voting weight starts at, and is capped at {pricePerValidator}. It is possible to drop below this with poor node performance, but it is not possible to raise above it."
                values={{
                  pricePerValidator: PRICE_PER_VALIDATOR,
                }}
              />
            </Text>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="Do not deposit more than {pricePerValidator} ETH for a single validator. It will not add to your rewards and will be locked until the planned {shanghai} update."
                values={{
                  pricePerValidator: PRICE_PER_VALIDATOR,
                  shanghai: (
                    <Link
                      inline
                      primary
                      to="https://github.com/ethereum/pm/issues/450"
                    >
                      Shanghai
                    </Link>
                  ),
                }}
              />
            </Text>
          </section>
          <section>
            <Heading level={4}>
              <FormattedMessage defaultMessage="What is the deposit contract?" />
            </Heading>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="You can think of the deposit contract as a transfer of funds between Ethereum accounts and
                  Beacon Chain validators."
              />
            </Text>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="It specifies who is staking, who is validating, how much is being
                  staked, and who can withdraw the funds."
              />
            </Text>
          </section>
          <section>
            <Heading level={4}>
              <FormattedMessage defaultMessage="Why do I need to have funds at stake?" />
            </Heading>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="As a validator, you'll need to have funds at stake so you can be penalized
                  for behaving dishonestly."
              />
            </Text>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="In other words, to keep you honest, your actions need to have
                  financial consequences."
              />
            </Text>
          </section>
          <section>
            <Heading level={4}>
              <FormattedMessage defaultMessage="Can I stop running my validator for a few days and then start it back up again?" />
            </Heading>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="If you go offline for a number of days under normal conditions you will lose an amount of ETH
                  roughly equivalent to the amount of ETH you would have gained in
                  that period. In other words, if you stood to earn ≈0.01 ETH, you
                  would instead be penalised ≈0.01 ETH."
              />
            </Text>
          </section>
          <section>
            <Heading level={4}>
              <FormattedMessage defaultMessage="When should I top up my validator’s balance?" />
            </Heading>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="The answer to this question very much depends on how much ETH you
                  have at your disposal."
              />
            </Text>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="You should certainly top up if your balance is close to 16 ETH.
                  This is to ensure you don’t get kicked out of the validator
                  set (which automatically happens if your balance falls below 16
                  ETH)."
              />
            </Text>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="At the other end of the spectrum, if your balance is closer to 31
                  ETH, it’s probably not worth adding the extra ETH required to get back to 32."
              />
            </Text>
          </section>
          <section>
            <Heading level={4}>
              <FormattedMessage
                defaultMessage="When can I withdraw my funds, and what’s the difference
                  between exiting and withdrawing?"
              />
            </Heading>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="You can signal your intent to stop validating by signing a
                  voluntary exit message with your validator."
              />
            </Text>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="However, bear in mind that for the foreseeable future, once
                  you’ve exited, there’s no going back."
              />
            </Text>
            <Text className="mt10">
              <FormattedMessage defaultMessage="There’s no way for you to re-activate your validator, and you won’t be able to transfer or withdraw your funds until the Shanghai upgrade planned to follow the Merge (which means your funds will remain inaccessible until then)." />
              <Link
                className="mt20"
                to="https://ethereum.org/en/upgrades/merge/"
                primary
              >
                <FormattedMessage defaultMessage="More on the Merge" />
              </Link>
            </Text>
          </section>
          <section>
            <Heading level={4}>
              <FormattedMessage defaultMessage="What happened to 'Eth2?'" />
            </Heading>
            <Text className="mt10">
              <FormattedMessage defaultMessage="The terms 'Eth1' and 'Eth2' are being deprecated in preparation for the merge." />
            </Text>
            <Text className="mt10">
              <FormattedMessage defaultMessage="After the merge, there will no longer be two distinct Ethereum networks; there will only be Ethereum." />
            </Text>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="Ethereum will consist of the {executionLayer} (handles transactions and execution, formerly 'Eth1'), and the
                  {consensusLayer} (handles proof-of-stake Beacon Chain, formerly 'Eth2' or 'Ethereum 2.0')."
                values={{
                  executionLayer: (
                    <Link
                      to="https://ethereum.org/en/glossary/#execution-layer"
                      primary
                      inline
                    >
                      <FormattedMessage defaultMessage="execution layer" />
                    </Link>
                  ),
                  consensusLayer: (
                    <Link
                      to="https://ethereum.org/en/glossary/#consensus-layer"
                      primary
                      inline
                    >
                      <FormattedMessage defaultMessage="consensus layer" />
                    </Link>
                  ),
                }}
                description="{executionLayer} is a link labeled 'execution layer'. {consensusLayer} is a link labeled 'consensus layer'"
              />
            </Text>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="These terminology updates only change naming conventions; this does not alter
                  Ethereum's goals or roadmap."
              />
              <Link
                className="mt20"
                to="https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/"
                primary
              >
                <FormattedMessage defaultMessage="Learn more about the great renaming" />
              </Link>
            </Text>
          </section>
        </section>
        <section>
          <Anchor to="#responsibilities" id="responsibilities">
            <SectionTitle level={3}>
              <FormattedMessage defaultMessage="Responsibilities" />
            </SectionTitle>
          </Anchor>
          <section>
            <Heading level={4}>
              <FormattedMessage defaultMessage="What clients do I need to run?" />
            </Heading>
            <Text className="mt10">
              <FormattedMessage defaultMessage="As a staker you are required to maintain and operate a node, running BOTH a consensus layer client AND an execution layer client." />
            </Text>
            <BlockQuote>
              <Text className="mt20 mb20">
                <FormattedMessage defaultMessage="This is a new change and becomes a requirement at time of the Merge, so be sure you're running both before the upgrade." />
              </Text>
            </BlockQuote>
            <Link primary to="/merge-readiness">
              <FormattedMessage defaultMessage="View the Merge Readiness Checklist" />
            </Link>
          </section>
          <section>
            <Heading level={4}>
              <FormattedMessage defaultMessage="Why do I need to run an execution layer client now?" />
            </Heading>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="Previously a Beacon Node (consensus layer) only had to watch the staking deposit contract on the execution layer in order to know which validator accounts had deposited {pricePerValidator} ETH. This information was easily served by and obtained from third-party providers such as Infura or Alchemy."
                values={{
                  pricePerValidator: PRICE_PER_VALIDATOR,
                }}
              />
            </Text>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="Once the transition to proof-of-stake is complete via the Merge, validators will be responsible for processing transactions and signing off on their validity. This data will {not} be available from popular third-party sources after the Merge and will result in your validator being offline. When data sharding is implemented, validators will also be at risk of slashing under the {pocGame}."
                values={{
                  not: <em>not</em>,
                  pocGame: (
                    <Link
                      inline
                      primary
                      to="https://dankradfeist.de/ethereum/2021/09/30/proofs-of-custody.html"
                    >
                      proof-of-custody game
                    </Link>
                  ),
                }}
              />
            </Text>
          </section>
          <section>
            <Heading level={4}>
              <FormattedMessage defaultMessage="How are validators incentivized to stay active and honest?" />
            </Heading>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="As a validator you are rewarded for proposing / attesting to
                blocks that are included in the chain."
              />
            </Text>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="On the other hand, you can be penalized for being offline and behaving maliciously – for example attesting to
                invalid or contradicting blocks."
              />
            </Text>
            <Text className="mt10">
              <FormattedMessage defaultMessage="The key concept is the following:" />
            </Text>
            <ul>
              <li>
                <FormattedMessage defaultMessage="Rewards are given for actions that help the network reach consensus." />
              </li>
              <li>
                <FormattedMessage defaultMessage="Minor penalties are given for inadvertant actions (or inactions) that hinder consensus." />
              </li>
              <li>
                <FormattedMessage
                  defaultMessage="And major penalities – or {slashings} – are given for malicious actions."
                  values={{
                    slashings: (
                      <strong>
                        {formatMessage({ defaultMessage: 'slashings' })}
                      </strong>
                    ),
                  }}
                  description="{slashings} shows 'slashings' in bold for emphasis"
                />
              </li>
            </ul>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="In other words, you maximize your rewards by
                  providing the greatest benefit to the network as a whole."
              />
            </Text>
          </section>
          <section>
            <Heading level={4}>
              <FormattedMessage defaultMessage="How are rewards/penalties issued?" />
            </Heading>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="Your balance is updated periodically by the Ethereum network rules
                  as you carry (or fail to carry) out your responsibilities."
              />
            </Text>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="Your validator has its own balance – with the
                initial balance outlined in the deposit contract. Your rewards and penalties are reflected in
                your validator's balance over time."
              />
            </Text>
            <BlockQuote>
              <Text className="mt20 mb20">
                <FormattedMessage defaultMessage="After the Merge, your validator will also be responsible for processing transactions, and thus be entitled to unburnt gas fees associated with those transactions in blocks your validator proposes. These fees are accounted for on the execution layer, not the consensus layer, and thus require a traditional Ethereum address to be provided to your client." />
              </Text>
            </BlockQuote>
            <Text className="mt10">
              <Link primary to="/merge-readiness">
                <FormattedMessage defaultMessage="Look over the Merge Readiness Checklist" />
              </Link>
            </Text>
          </section>
          <section>
            <Heading level={4}>
              <FormattedMessage defaultMessage="How often are rewards/penalties issued?" />
            </Heading>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="Rewards and penalties are issued roughly every six and a half minutes – a period of time
                  known as an epoch."
              />
            </Text>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="Every epoch, the network measures the actions of each validator
                  and issues your rewards or penalties appropriately."
              />
            </Text>
            <BlockQuote>
              <Text className="mt10">
                <FormattedMessage
                  defaultMessage="Your validator will also receive unburnt gas fees when proposing blocks. Validators are chosen randomly by the protocol to propose blocks, and only one validator can propose a block for each 12-second slot. There are 7200 slots each day, so each validator has 7200 chances-per-day to propose a block. If there are 360,000 validators, each validator will {average} a block proposal every 50 days. "
                  values={{
                    average: <em>average</em>,
                  }}
                />
              </Text>
            </BlockQuote>
          </section>
          <section>
            <Heading level={4}>
              <FormattedMessage defaultMessage="How large are the rewards/penalties?" />
            </Heading>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="There is no easy answer to this question as there are many factors
                  that go into this calculation."
              />
            </Text>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="Arguably the most impactful factor on rewards earned for
                  validating transactions is the total amount of stake in the
                  network. In other words, the total amount of validators. Depending
                  on this figure the max annual return rate for a validator can be
                  anywhere between 2 and 20%."
              />
            </Text>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="Given a fixed total number of validators, the rewards/penalties
                  predominantly scale with the balance of the validator – attesting
                  with a higher balance results in larger rewards/penalties whereas
                  attesting with a lower balance results in lower rewards/penalties."
              />
            </Text>
            <BlockQuote>
              <Text className="mt10">
                <FormattedMessage
                  defaultMessage="Note however that this scaling mechanism works in a non-obvious
                    way. To understand the precise details of how it works requires
                    understanding a concept called {effectiveBalance}. If you’re not yet familiar
                    with this concept, we recommend you read through {article}"
                  values={{
                    effectiveBalance: (
                      <strong>
                        {formatMessage({ defaultMessage: 'effective balance' })}
                      </strong>
                    ),
                    article: (
                      <Link
                        primary
                        inline
                        to="https://www.attestant.io/posts/understanding-validator-effective-balance/"
                      >
                        {formatMessage({
                          defaultMessage:
                            'understanding validator effective balance',
                        })}
                      </Link>
                    ),
                  }}
                  description="{effectiveBalance} shows 'effective balance' in bold. {article}
                    shows 'excellent post' and links to an article."
                />
              </Text>
            </BlockQuote>
          </section>
          <section>
            <Heading level={4}>
              <FormattedMessage defaultMessage="Why do rewards depend on the total number of validators in the network?" />
            </Heading>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="Block rewards are calculated using a sliding scale based on the
                  total amount of ETH staked on the network."
              />
            </Text>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="In other words: if the total amount of ETH staked is low, the
                  reward (interest rate) is high, but as the total stake rises, the
                  reward (interest) paid out to each validator starts to fall."
              />
            </Text>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="Why a sliding scale? While we won’t get into the gory details
                  here, the basic intution is that there needs to be a minimum
                  number of validators (and hence a minimum amount of ETH staked)
                  for the network to function properly. So, to incentivize more
                  validators to join, it’s important that the interest rate remains
                  high until this minimum number is reached."
              />
            </Text>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="Afterwards, validators are still encouraged to join (the more
                  validators the more decentralized the network), but it’s not
                  absolutely essential that they do so (so the interest rate can
                  fall)."
              />
            </Text>
          </section>
          <section>
            <Heading level={4}>
              <FormattedMessage defaultMessage="How badly will I be penalized for being offline?" />
            </Heading>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="It depends. In addition to the {impact} there are two important scenarios to be aware of:"
                values={{
                  impact: (
                    <Link
                      inline
                      primary
                      to="https://www.attestant.io/posts/understanding-validator-effective-balance/#the-impact-of-effective-balance-on-validating"
                    >
                      {formatMessage({
                        defaultMessage: 'impact of effective balance',
                      })}
                    </Link>
                  ),
                }}
                description="{impact} shows 'impact of effective balance' and links to article on 'Effective Balance'"
              />
            </Text>
            <ol>
              <li>
                <Text className="mt10">
                  <FormattedMessage
                    defaultMessage="Being offline while a supermajority (2/3) of validators is
                      still online leads to relatively small penalties as there are
                      still enough validators online for the chain to finalize. {expected}"
                    values={{
                      expected: (
                        <strong>
                          {formatMessage({
                            defaultMessage: 'This is the expected scenario.',
                          })}
                        </strong>
                      ),
                    }}
                    description="{expected} shows 'This is the expected scenario' and is bolded for emphasis"
                  />
                </Text>
              </li>
              <li>
                <Text className="mt10">
                  <FormattedMessage
                    defaultMessage="Being offline at the same time as more than 1/3 of the total
                      number of validators leads to harsher penalties, since blocks
                      do not finalize anymore. {strongText}"
                    values={{
                      strongText: (
                        <strong>
                          {formatMessage({
                            defaultMessage:
                              'This scenario is very extreme and unlikely to happen.',
                          })}
                        </strong>
                      ),
                    }}
                    description="{strongText} shows 'This scenario is very extreme and unlikely to happen' and is bolded for emphasis"
                  />
                </Text>
              </li>
            </ol>
            <BlockQuote>
              <Text className="mt10">
                <FormattedMessage
                  defaultMessage="Note that in the second (unlikely) scenario, you stand to
                    progressively lose up to 50% (16 ETH) of your stake over 21
                    days. After 21 days you are ejected out of the validator pool.
                    This ensures that blocks start finalizing again at some point."
                />
              </Text>
            </BlockQuote>
          </section>
          <section>
            <Heading level={4}>
              <FormattedMessage defaultMessage="How great does my uptime need to be for my validator to be net profitable?" />
            </Heading>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="Overall, we'd expect your validator to be net profitable as long as
                  your uptime is {greaterThan50Percent}."
                values={{
                  greaterThan50Percent: (
                    <Link
                      to="https://blog.ethereum.org/2020/01/13/validated-staking-on-eth2-1-incentives/"
                      primary
                      inline
                    >
                      {formatMessage({ defaultMessage: 'greater than 50%' })}
                    </Link>
                  ),
                }}
                description="{greater than 50%} shows 'greater than 50%' and is a link to validator incentives article"
              />
            </Text>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="This means that you don't need to go to extreme lengths with
                  backup clients or redundant internet connections as the
                  repercussions of being offline are not so severe."
              />
            </Text>
          </section>
          <section>
            <Heading level={4}>
              <FormattedMessage defaultMessage="How much will I be penalized for acting maliciously?" />
            </Heading>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="Again, it depends. Behaving maliciously – for example attesting to
                  invalid or contradicting blocks, will lead to your stake
                  being slashed."
              />
            </Text>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="The minimum amount that can be slashed is 1 ETH, but {strongText}."
                values={{
                  strongText: (
                    <strong>
                      {formatMessage({
                        defaultMessage:
                          'this number increases if other validators are slashed at the same time',
                      })}
                    </strong>
                  ),
                }}
                description="{strongText} is a warning, bolded for emphasis"
              />
            </Text>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="The idea behind this is to minimize the losses from honest
                  mistakes, but strongly disincentivize coordinated attacks."
              />
            </Text>
          </section>
          <section>
            <Heading level={4}>
              <FormattedMessage defaultMessage="What exactly is slashing?" />
            </Heading>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="Slashing has two purposes: (1) to make it prohibitively expensive
                  to attack the network, and (2) to stop validators from being lazy by
                  checking that they actually perform their duties. If you're slashed because you've acted in a provably destructive manner, a portion of your stake will be destroyed."
              />
            </Text>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="If you're slashed you're prevented from participating in
                  the protocol further and are forcibly exited."
              />
            </Text>
          </section>
        </section>
        <section>
          <Anchor to="#withdrawal-credentials" id="withdrawal-credentials">
            <SectionTitle level={3}>
              <FormattedMessage defaultMessage="Withdrawal credentials" />
            </SectionTitle>
          </Anchor>
          <section>
            <Heading level={4}>
              <FormattedMessage defaultMessage="What are withdrawal credentials?" />
            </Heading>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="{withdrawalCredentials} is a 32-byte field in the deposit, for verifying the
                  destination of valid withdrawals. Currently, there are two types of
                  withdrawals: BLS withdrawal and Ethereum address withdrawal."
                values={{
                  withdrawalCredentials: (
                    <Link
                      primary
                      inline
                      to="https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/validator.md#withdrawal-credentials"
                    >
                      Withdrawal Credentials
                    </Link>
                  ),
                }}
              />
            </Text>
            <ol>
              <li>
                <Text className="mt10">
                  <FormattedMessage
                    defaultMessage="BLS withdrawal: By default, deposit-cli would generate withdrawal credentials with the {boldWithdrawalKey} derived via mnemonics in {eip2334} format."
                    values={{
                      boldWithdrawalKey: (
                        <strong>
                          {formatMessage({
                            defaultMessage: 'withdrawal key',
                          })}
                        </strong>
                      ),
                      eip2334: (
                        <Link
                          primary
                          inline
                          to="https://eips.ethereum.org/EIPS/eip-2334"
                        >
                          EIP2334
                        </Link>
                      ),
                    }}
                  />
                </Text>
              </li>
              <li>
                <Text className="mt10">
                  <FormattedMessage
                    defaultMessage="Ethereum address withdrawal: If you want to withdraw to your Mainnet wallet address (formerly 'Eth1' address) after the post-merge cleanup upgrade, you can set {ethAddressWithdraw} when running deposit-cli. {boldWarning}"
                    values={{
                      ethAddressWithdraw: (
                        <code>
                          {' '}
                          {`--eth1_withdrawal_address <YOUR ETH ADDRESS>`}{' '}
                        </code>
                      ),
                      boldWarning: (
                        <strong>
                          {formatMessage({
                            defaultMessage:
                              'Please ensure that you have control over the keys to this address.',
                          })}
                        </strong>
                      ),
                    }}
                  />
                </Text>
              </li>
            </ol>
            <section>
              <Heading level={4}>
                <FormattedMessage defaultMessage="Can I change the withdrawal credentials of my validator after the first deposit?" />
              </Heading>
              <Text className="mt10">
                <FormattedMessage defaultMessage="No, you cannot change your withdrawal credentials in top-ups." />
              </Text>
            </section>
          </section>
        </section>
        <section>
          <Anchor to="#keys" id="keys">
            <SectionTitle level={3}>
              <FormattedMessage defaultMessage="Keys" />
            </SectionTitle>
          </Anchor>
          <section>
            <Heading level={4}>
              <FormattedMessage defaultMessage="What happens if I lose my signing key?" />
            </Heading>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="If you lose your signing key, your validator can no longer propose or
              attest."
              />
            </Text>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="Over time, your balance will decrease as you are
                  punished for not participating in the consensus process. When your balance reaches 16 ETH, you will be
                  automatically exited from the validator pool."
              />
            </Text>
            <BlockQuote>
              <Text className="mt10">
                <FormattedMessage
                  defaultMessage="However, all is not lost. Assuming you derive your keys
                    using {eip2334} (as per the default onboarding flow) then {strongText}."
                  values={{
                    eip2334: (
                      <Link
                        primary
                        inline
                        to="https://eips.ethereum.org/EIPS/eip-2334"
                      >
                        EIP2334
                      </Link>
                    ),
                    strongText: (
                      <strong>
                        {formatMessage({
                          defaultMessage:
                            'you can always recalculate your signing key from your withdrawal key',
                        })}
                      </strong>
                    ),
                  }}
                  description="{eip2334} shows 'EIP2334' and links to EIP documentation. {strongText} is important information bolded for emphasis"
                />
              </Text>
            </BlockQuote>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="After the Shanghai upgrade, your 16 ETH can then be withdrawn – with your withdrawal key – after
                  a delay of around a day."
              />
            </Text>
            <BlockQuote>
              <Text className="mt10">
                <FormattedMessage
                  defaultMessage="Note that this delay can be longer if many others are exiting or
                    being kicked out at the same time."
                />
              </Text>
            </BlockQuote>
          </section>
          <section>
            <Heading level={4}>
              <FormattedMessage defaultMessage="What happens if I use BLS withdrawal and I lose my withdrawal key?" />
            </Heading>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="If you lose your withdrawal key, there is no way to access to
              the funds held by your validator."
              />
            </Text>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="As such, it’s a good idea to create your keys from mnemonics which
                  act as another backup. This will be the default for validators who
                  join via this site’s onboarding process."
              />
            </Text>
          </section>
          <section>
            <Heading level={4}>
              <FormattedMessage defaultMessage="What happens if my withdrawal key is stolen?" />
            </Heading>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="If your withdrawal key is stolen, the thief can transfer your
                  validator’s balance, but only once the validator has exited."
              />
            </Text>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="If your signing key is not under the thief’s control, the thief
                  cannot exit your validator."
              />
            </Text>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="With your signing key, you could attempt to quickly exit the
                  validator and then transfer the funds – with the withdrawal key –
                  before the thief."
              />
            </Text>
          </section>
          <section>
            <Heading level={4}>
              <FormattedMessage defaultMessage="Why two keys instead of one?" />
            </Heading>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="Validating involves two keys for security reasons. Your signing key must be available at all
                  times. As such, it will need to be held online. Since anything
                  online is vulnerable to being hacked, it’s not a good idea to use
                  the same key for withdrawals."
              />
            </Text>
          </section>
        </section>
        <section>
          <Anchor to="#support" id="support">
            <SectionTitle level={3}>
              <FormattedMessage defaultMessage="Support" />
            </SectionTitle>
          </Anchor>
          <section>
            <Heading level={4}>
              <FormattedMessage defaultMessage="Where can I find troubleshooting support?" />
            </Heading>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="If you have questions, EthStaker community is a good place to get
                  help! You can find support on {discord} or {reddit}."
                values={{
                  discord: (
                    <Link primary inline to="https://discord.io/ethstaker">
                      Discord
                    </Link>
                  ),
                  reddit: (
                    <Link primary inline to="https://reddit.com/r/ethstaker">
                      Reddit
                    </Link>
                  ),
                }}
                description="{discord} and {reddit} are links to EthStaker forums on Discord and Reddit respectively"
              />
            </Text>
          </section>
        </section>
      </FAQStyles>
    </PageTemplate>
  );
};
