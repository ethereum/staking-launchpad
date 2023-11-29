import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { HashLink as Anchor } from 'react-router-hash-link';
import styled from 'styled-components';
import { Code } from '../../components/Code';
import { Link } from '../../components/Link';
import { PageTemplate } from '../../components/PageTemplate';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import {
  EJECTION_PRICE,
  PRICE_PER_VALIDATOR,
  TICKER_NAME,
} from '../../utils/envVars';

const FAQStyles = styled.div`
  section {
    margin-top: 30px;
  }
  a {
    text-decoration: none;
  }
  ul {
    color: ${p => p.theme.blue.dark};
    font-family: 'inherit';
  }
`;

const BlockQuote = styled.div`
  margin-top: 10px;
  padding-inline-start: 20px;
  border-inline-start: 5px solid lightgray;
`;

const SectionTitle = styled(Heading)`
  margin-top: 30px;
  border-bottom: 1px solid lightgray;
  padding-bottom: 10px;
`;

const AllCaps = styled.span`
  text-transform: uppercase;
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
                  validator: (
                    <em>
                      <FormattedMessage defaultMessage="validator" />
                    </em>
                  ),
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
                  validatorClient: (
                    <em>
                      <FormattedMessage defaultMessage="validator client" />
                    </em>
                  ),
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
                  nodeOperator: (
                    <em>
                      <FormattedMessage defaultMessage="node operator" />
                    </em>
                  ),
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
                  initialAndMaximum: (
                    <em>
                      <FormattedMessage defaultMessage="initial and maximum" />
                    </em>
                  ),
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
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="Validators with a maxed-out effective balance and a linked execution withdrawal address will have any balance over {PRICE_PER_VALIDATOR} {TICKER_NAME} automatically withdrawn as excess balance."
                values={{ PRICE_PER_VALIDATOR, TICKER_NAME }}
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
                defaultMessage="Each {pricePerValidator} ETH deposit activates one set of validator keys. These keys are used to sign off on the state of the network. The lower the ETH requirement, the more resulting signatures must be saved by the network. {pricePerValidator} ETH was chosen as a balance between enabling as many people as possible to stake without inhibiting decentralization by bloating the size of each block with signatures."
                values={{
                  pricePerValidator: PRICE_PER_VALIDATOR,
                }}
              />
            </Text>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="Limiting the maximum stake to {pricePerValidator} ETH per validator encourages decentralization of power as it prevents any single validator from having an excessively large vote on the state of the chain. It also limits the amount of ETH that can be exited from staking at any given time, as the number of validator that can exit in a given time period is limited. This helps protect the network against certain attacks."
                values={{
                  pricePerValidator: PRICE_PER_VALIDATOR,
                }}
              />
            </Text>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="Although a validator's vote is weighted by the amount it has at stake, each validators voting weight starts at, and is capped at {PRICE_PER_VALIDATOR}. It is possible to drop below this with poor node performance, but it is not possible to raise above it."
                values={{ PRICE_PER_VALIDATOR }}
              />
            </Text>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="Do not deposit more than {PRICE_PER_VALIDATOR} ETH for a single validator—it will not add to your rewards."
                values={{ PRICE_PER_VALIDATOR }}
              />
            </Text>
            <Link
              primary
              className="mt20"
              to="https://www.attestant.io/posts/understanding-validator-effective-balance/"
            >
              <FormattedMessage defaultMessage="Understanding validator effective balance" />
            </Link>
          </section>
          <section>
            <Heading level={4}>
              <FormattedMessage defaultMessage="What is the deposit contract?" />
            </Heading>
            <Text className="mt10">
              <FormattedMessage defaultMessage="You can think of the deposit contract as a transfer of funds from an Ethereum account to a proof-of-stake validator account." />
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
              <FormattedMessage defaultMessage="Yes, but with small penalties. If you go offline for a number of days under normal conditions you will lose an amount of ETH roughly equivalent to the amount of ETH you would have gained in that period. In other words, if you stood to earn ≈0.01 ETH, you would instead be penalized ≈0.01 ETH." />
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
                defaultMessage="You should certainly top up if your balance is close to {EJECTION_PRICE} ETH.
                  This is to ensure you don’t get kicked out of the validator
                  set (which automatically happens if your balance falls below {EJECTION_PRICE}
                  ETH)."
                values={{ EJECTION_PRICE }}
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
                  voluntary exit message with your validator at any time."
              />
            </Text>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="This will start the process of ending your commitments on the
                network. An “exit epoch” will be calculated based on how many other
                validators are exiting at the same time. When this epoch is reached, your validator
                account will no longer be eligible for rewards, and will no longer be at risk of
                losing funds from being offline."
              />
            </Text>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="A “withdrawable epoch” will also be calculated, which is 256 epochs
                after the calculated exit epoch (~27.3 hours later). When this epoch is reached, your
                validator will be eligible for a {fullWithdrawal} of all remaining funds."
                values={{
                  fullWithdrawal: (
                    <em>
                      <FormattedMessage defaultMessage="full withdrawal" />
                    </em>
                  ),
                }}
              />
            </Text>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="This full withdraw of funds requires that a withdrawal address be set,
                and will be automatically transferred in the next validator sweep."
              />
            </Text>
            <Link to="/withdrawals" primary className="mt20">
              <FormattedMessage defaultMessage="More on withdrawals" />
            </Link>
          </section>
          <section>
            <Heading level={4}>
              <FormattedMessage defaultMessage="What happened to 'Eth2?'" />
            </Heading>
            <Text className="mt10">
              <FormattedMessage defaultMessage="The terms 'Eth1' and 'Eth2' have been deprecated with The Merge. Since successfully transitioning to proof-of-stake via The Merge, there are no longer two distinct Ethereum networks; there is only Ethereum." />
            </Text>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="Ethereum consists of the {executionLayer} (handling transactions and execution, formerly 'Eth1'), and the
                  {consensusLayer} (handling proof-of-stake consensus tasks, formerly 'Eth2' or 'Ethereum 2.0')."
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
            </Text>
            <Link
              to="https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/"
              primary
              className="mt20"
            >
              <FormattedMessage defaultMessage="Learn more about the great renaming" />
            </Link>
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
              <FormattedMessage defaultMessage="As a staker you are required to maintain and operate a node, running BOTH a consensus client AND an execution client." />
            </Text>
            <BlockQuote>
              <Text className="my20">
                <FormattedMessage defaultMessage="This became a requirement at time of The Merge, so be sure you're running both before staking." />
              </Text>
            </BlockQuote>
            <Link primary to="/checklist">
              <FormattedMessage defaultMessage="View the Staking Checklist" />
            </Link>
          </section>
          <section>
            <Heading level={4}>
              <FormattedMessage defaultMessage="Why do I need to run an execution client now?" />
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
                defaultMessage="With the transition to proof-of-stake complete via The Merge, validators are
                now responsible for processing transactions and signing off on their validity. This data is
                {not} available from popular third-party sources as of The Merge. Using a third-party provider
                will result in your validator being offline. When Danksharding is implemented, validators may
                also be at risk of slashing under the {pocGame}."
                values={{
                  not: (
                    <em>
                      <FormattedMessage defaultMessage="not" />
                    </em>
                  ),
                  pocGame: (
                    <Link
                      inline
                      primary
                      to="https://dankradfeist.de/ethereum/2021/09/30/proofs-of-custody.html"
                    >
                      <FormattedMessage defaultMessage="proof-of-custody game" />
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
                defaultMessage="As a validator you are rewarded for proposing/attesting to
                blocks that are included in the chain."
              />
            </Text>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="On the other hand, you can be penalized for being offline and behaving maliciously—for example attesting to
                invalid or contradicting blocks."
              />
            </Text>
            <Text className="mt10">
              <FormattedMessage defaultMessage="The key concept is the following:" />
            </Text>
            <ul>
              <li>
                <FormattedMessage defaultMessage="Rewards are given for actions that help the network reach consensus" />
              </li>
              <li>
                <FormattedMessage defaultMessage="Minor penalties are given for inadvertent actions (or inactions) that hinder consensus" />
              </li>
              <li>
                <FormattedMessage
                  defaultMessage="Major penalities—or {slashings}—are given for malicious actions"
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
                defaultMessage="Your validator has its own balance, with the
                initial balance outlined in the deposit contract. Your rewards and penalties are reflected in
                your validator's balance over time."
              />
            </Text>
            <BlockQuote>
              <Text className="my20">
                <FormattedMessage defaultMessage="Since The Merge, validators will also be responsible for processing transactions, and thus be entitled to unburnt gas fees associated with included transactions when proposing blocks. These fees are accounted for on the execution layer, not the consensus layer, and thus require a traditional Ethereum address to be provided to your client." />
              </Text>
            </BlockQuote>
            <Link primary to="/checklist" className="mt20">
              <FormattedMessage defaultMessage="View the Staking Checklist" />
            </Link>
          </section>
          <section>
            <Heading level={4}>
              <FormattedMessage defaultMessage="How often are rewards/penalties issued?" />
            </Heading>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="Rewards and penalties are issued every 6.4 minutes—a period of time
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
              <Text className="my20">
                <FormattedMessage
                  defaultMessage="Your validator will also receives unburnt gas fees when proposing blocks. Validators are chosen randomly by the protocol to propose blocks, and only one validator can propose a block for each 12-second slot. There are 7200 slots each day, so each validator has 7200 chances-per-day to propose a block. If there are 500,000 validators, each validator will {average} a block proposal every 70 days. "
                  values={{
                    average: (
                      <em>
                        <FormattedMessage defaultMessage="average" />
                      </em>
                    ),
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
                  predominantly scale with the balance of the validator—attesting
                  with a higher balance results in larger rewards/penalties whereas
                  attesting with a lower balance results in lower rewards/penalties."
              />
            </Text>
            <BlockQuote>
              <Text className="my20">
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
              <Text className="my20">
                <FormattedMessage
                  defaultMessage="Note that in the second (unlikely) scenario, you stand to progressively lose up to 50%
                  ({EJECTION_PRICE} ETH) of your stake over 21 days. After 21 days you are ejected out of the validator set.
                  This ensures that blocks start finalizing again at some point."
                  values={{ EJECTION_PRICE }}
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
              <FormattedMessage defaultMessage="This means that you don't need to go to extreme lengths with backup clients or redundant internet connections as the repercussions of being offline are not so severe." />
            </Text>
          </section>
          <section>
            <Heading level={4}>
              <FormattedMessage defaultMessage="How much will I be penalized for acting maliciously?" />
            </Heading>
            <Text className="mt10">
              <FormattedMessage defaultMessage="Again, it depends. Behaving maliciously—for example attesting to invalid or contradicting blocks—will lead to your stake being slashed." />
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
                defaultMessage="The idea behind this is to minimize the losses from honest mistakes, but strongly
                disincentivize coordinated attacks."
              />
            </Text>
          </section>
          <section>
            <Heading level={4}>
              <FormattedMessage defaultMessage="What exactly is slashing?" />
            </Heading>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="Slashing has two purposes: (1) to make it prohibitively expensive to attack the network,
                and (2) to stop validators from being lazy by checking that they actually perform their duties. If you're
                slashed because you've acted in a provably destructive manner, a portion of your stake will be destroyed."
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
                defaultMessage="{withdrawalCredentials} is a 32-byte field associated with every validator,
                  initially set during deposit, for verifying the destination of valid withdrawals. Currently,
                  there are two types of withdrawal credentials: BLS credentials (Type 0, or {type0}) and execution
                  (Ethereum address) credentials (Type 1, or {type1})."
                values={{
                  withdrawalCredentials: (
                    <Link
                      primary
                      inline
                      to="https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/validator.md#withdrawal-credentials"
                    >
                      <FormattedMessage defaultMessage="Withdrawal credentials" />
                    </Link>
                  ),
                  type0: <Code>0x00</Code>,
                  type1: <Code>0x01</Code>,
                }}
              />
            </Text>
            <ul>
              <li>
                <Text className="mt10">
                  <FormattedMessage
                    defaultMessage="BLS credentials: By default, the deposit CLI would generate withdrawal credentials
                    with the {boldWithdrawalKey} derived via mnemonics in {eip2334} format. This format is not compatible
                    with Beacon Chain withdrawals and must be updated to Ethereum address credentials to enable withdrawals."
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
                    defaultMessage="Execution credentials: If you want to withdraw to your execution
                      wallet address you can set an “eth1 withdrawal address” using {ethAddressWithdraw}
                      when running the deposit CLI. {boldWarning}"
                    values={{
                      ethAddressWithdraw: (
                        <Code>
                          {' '}
                          {`--eth1_withdrawal_address <`}
                          <AllCaps>
                            <FormattedMessage defaultMessage="Your ETH address" />
                          </AllCaps>
                          {`>`}{' '}
                        </Code>
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
            </ul>
            <section>
              <Heading level={4}>
                <FormattedMessage defaultMessage="Can I change the withdrawal credentials of my validator after the first deposit?" />
              </Heading>
              <Text className="mt10">
                <FormattedMessage
                  defaultMessage="If the “eth1 withdrawal address” was not provided on initial deposit, you can
                  submit a once-only {BTEC} message signed with your BLS withdrawal keys to specific your
                  desired Ethereum withdrawal address. This address can only be provided once, and cannot be changed again."
                  values={{
                    BTEC: (
                      <em>
                        <FormattedMessage defaultMessage="BLS To Execution Change" />
                      </em>
                    ),
                  }}
                />
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
              <FormattedMessage defaultMessage="If you lose your signing key, your validator can no longer propose or attest." />
            </Text>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="Over time, your balance will decrease as you are penalized for not participating in the
                consensus process. When your balance reaches {EJECTION_PRICE} ETH, you will be automatically exited from
                the validator set."
                values={{ EJECTION_PRICE }}
              />
            </Text>
            <BlockQuote>
              <Text className="my20">
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
                            'you can always recalculate your signing key from your mnemonic',
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
                defaultMessage="If you've already provided an Ethereum withdrawal address for your withdrawal credentials, your
                entire remaining balance will be transferred to this address upon exit. If not, your mnemonic will still be
                needed to generate your withdrawal key to set your withdrawal address."
              />
            </Text>
          </section>
          <section>
            <Heading level={4}>
              <FormattedMessage defaultMessage="What happens if I have BLS withdrawal credentials and I lose my withdrawal key?" />
            </Heading>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="If you lose your withdrawal key, your mnemonic will be needed to recover. If your mnemonic is
                lost, and you have not updated your withdrawal credentials with an Ethereum (execution) withdrawal address,
                there is no way to access to the funds held by your validator. As such, it is essential to ensure your validator
                mnemonic is safely backed up."
              />
            </Text>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="Once an execution address has been provided by signing the BLS To Execution Change message, the
                withdrawal keys derived from your validator mnemonic are no longer utilized. Therefore, providing an execution
                address that you control as early as possible is the recommended option for most users, and is the default path
                for those who join via this site's onboarding process. This protects you against permanent loss of all funds in
                the event you are unable to recover your mnemonic and withdrawal keys."
              />
            </Text>
            <Text className="mt10">
              <Link primary inline to="/withdrawals/">
                <FormattedMessage defaultMessage="More on withdrawals" />
              </Link>
            </Text>
          </section>
          <section>
            <Heading level={4}>
              <FormattedMessage defaultMessage="What happens if my withdrawal key is stolen?" />
            </Heading>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="If you provided a withdrawal address when initially generating your keys, the withdrawal key no
                longer has any use. The only address that validator funds can be transferred to is this address, and it cannot be
                changed once set."
              />
            </Text>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="If this was not provided, the withdrawal key can be used to sign a message declaring a withdrawal
                address. The withdrawal key can be generated using your mnemonic. If your withdrawal key or mnemonic have been stolen,
                and a withdrawal address has not yet been set, the thief will have the ability to irreversibly designate their own
                account as the withdrawal address for your validator."
              />
            </Text>
            <Text className="my20">
              <BlockQuote>
                <em>
                  <FormattedMessage
                    defaultMessage="If your mnemonic is stolen/compromised, and you have not yet set a withdrawal address, you
                    should attempt this {immediately} to prevent permanent lose of funds, before the attacker irreversibly designates
                    their own withdrawal address for your validator."
                    values={{
                      immediately: (
                        <strong>
                          <AllCaps>
                            <FormattedMessage defaultMessage="immediately" />
                          </AllCaps>
                        </strong>
                      ),
                    }}
                  />
                </em>
              </BlockQuote>
            </Text>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="If a withdrawal address has not been set, and you have lost access to the mnemonic seed phrase
                without it being stolen/compromised, your funds will remain locked in the validator account indefinitely."
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
                  times. As such, it will need to be held online. Since anything online is vulnerable to being exposed, it’s
                  not a good idea to use the same key for withdrawals."
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
                    <Link primary inline to="https://dsc.gg/ethstaker">
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
