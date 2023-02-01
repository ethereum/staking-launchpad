// Import libraries
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { HashLink as Anchor } from 'react-router-hash-link';
import styled from 'styled-components';
// Components
import { Alert } from '../../components/Alert';
import { Heading } from '../../components/Heading';
import { Link } from '../../components/Link';
import { PageTemplate } from '../../components/PageTemplate';
import { Text } from '../../components/Text';
import { Code } from '../../components/Code';
import { WithdrawalsTabComparison } from '../../components/WithdrawalsTabComparison';

const ComponentStyles = styled.div`
  * {
    scroll-behavior: smooth;
    scroll-margin-top: 6rem;
  }
  section {
    margin-top: 30px;
  }
  a {
    text-decoration: none;
  }
  ul {
    margin-bottom: 10px;
  }
  li {
    margin-top: 10px;
    font-weight: 300;
  }
  strong {
    font-weight: 500;
  }
  table {
    margin: 1rem auto;
    color: #212529;

    * {
      text-align: start;
    }

    th,
    td {
      padding: 0.75rem;
      vertical-align: top;
      border-top: 1px solid #dee2e6;
    }

    thead th {
      vertical-align: bottom;
    }

    tbody + tbody {
      border-top: 2px solid #dee2e6;
    }
  }
  section.actionable {
    background-color: white;
    padding: 2rem;
    @media only screen and (max-width: ${p => p.theme.screenSizes.medium}) {
      padding: 1rem;
    }
    margin: 2rem 0;
    border-radius: 4px;
  }
`;

const HashCode = styled(Code)`
  word-break: break-all;
`;

const SectionTitle = styled(Heading)`
  margin-top: 30px;
  border-bottom: 1px solid lightgray;
  padding-bottom: 10px;
`;

const SubSectionTitle = styled(SectionTitle)`
  border-bottom: 0;
`;

export const Withdrawals = () => {
  const { formatMessage } = useIntl();
  return (
    <PageTemplate
      title={formatMessage({ defaultMessage: 'Staking withdrawals' })}
      description={formatMessage({
        defaultMessage:
          'Information for validator operators regarding staking withdrawals.',
      })}
    >
      <ComponentStyles>
        <section>
          <Text>
            <FormattedMessage
              defaultMessage="The Shanghai/Capella upgrade enabled Beacon Chain staking
              withdrawals, with the inclusion of EIP-4895. This Ethereum improvement proposal
              provides a mechanism of continuously distributing rewards to stakers, and also
              providing a way for exited validators to unlock their entire balance—no gas
              required."
            />
          </Text>

          <section>
            <Anchor to="#enabling-withdrawals" id="enabling-withdrawals">
              <SectionTitle level={2} className="mb10">
                <FormattedMessage defaultMessage="Enabling withdrawals" />
              </SectionTitle>
            </Anchor>
            <Text className="mb10">
              <FormattedMessage
                defaultMessage="For your validator account to be capable of withdrawals of any
                kind, a withdrawal address must be provided and registered to your account on the
                Beacon Chain. This should be an address you control, and cannot be changed once set."
              />
            </Text>

            <WithdrawalsTabComparison />
          </section>

          <section>
            <Anchor to="#update-your-keys" id="update-your-keys">
              <SubSectionTitle level={3} className="mb10">
                <FormattedMessage defaultMessage="How to update validator keys" />
              </SubSectionTitle>
            </Anchor>
            <Text className="mb10">
              <FormattedMessage
                defaultMessage="If your validator account still has BLS withdrawal credentials ({type0}),
                a one-time message must be broadcast signaling which execution layer account should be
                used for all withdrawals."
                values={{ type0: <Code>0x00</Code> }}
              />
            </Text>

            <section className="actionable">
              <Heading level={4} className="mb10">
                <FormattedMessage defaultMessage="Tools available" />
              </Heading>
              <ul>
                <li>
                  <strong>ethdo</strong> -{' '}
                  <Link
                    inline
                    primary
                    to="https://github.com/wealdtech/ethdo/blob/master/docs/changingwithdrawalcredentials.md"
                  >
                    Changing withdrawal credentials
                  </Link>
                </li>
                <li>
                  <strong>Staking Deposit CLI</strong> -{' '}
                  <Link
                    inline
                    primary
                    to="https://notes.ethereum.org/@launchpad/btec"
                  >
                    Walkthrough tutorial
                  </Link>
                </li>
              </ul>
              <section>
                <Heading level={4} className="mb10">
                  <FormattedMessage defaultMessage="BLS To Execution Change (BTEC) queue" />
                </Heading>
                <Text className="mb10">
                  <FormattedMessage
                    defaultMessage="One of the queues worth noting is a queue that limits how many BLS ({type0})
                    withdrawal addresses can be upgraded to an execution address ({type1}) during a given block."
                    values={{
                      type0: <Code>0x00</Code>,
                      type1: <Code>0x01</Code>,
                    }}
                  />
                </Text>
                <Text className="mb10">
                  <FormattedMessage
                    defaultMessage="As noted above, this step is completed by signing a message known as {message}.
                    These will start being accepted into blocks as of the first slot after the Shanghai/Capella
                    upgrade."
                    values={{ message: <Code>BLS_To_Execution_Change</Code> }}
                  />
                </Text>
                <Text className="mb10">
                  <FormattedMessage
                    defaultMessage="These messages are limited to 16 per block ({message}), so if more than 16
                    requests are being made at one time, a queue will be formed and these will be processed in
                    subsequent blocks. This means that immediately following the Shanghai/Capella upgrade, users
                    submitting this message are likely to see delays up to an estimated 2-3 days before this request
                    is processed."
                    values={{
                      message: <Code>MAX_BLS_TO_EXECUTION_CHANGES</Code>,
                    }}
                  />
                </Text>
                <Text className="mb10">
                  <FormattedMessage
                    defaultMessage="Fortunately, this is only a one-time message that needs to be processed, and
                    validators who provided withdrawal credentials at time of deposit are exempt from this step. Once
                    completed, your validator is permanently enabled for withdrawals, and will be eligible for payouts
                    during the next sweep."
                  />
                </Text>
              </section>
            </section>
          </section>

          <section>
            <Anchor to="#reward-payments" id="reward-payments">
              <SubSectionTitle level={3} className="mb10">
                <FormattedMessage defaultMessage="Reward payments (partial withdrawals)" />
              </SubSectionTitle>
            </Anchor>
            <Text className="mb10">
              <FormattedMessage
                defaultMessage="A {rewardPayment} is processed when an active validator has a maxed out
                effective balance of 32, and has a total balance over 32. A single validator account cannot
                utilize more than 32 ETH to contribute towards its stake, and thus these accounts will have
                any extra balance skimmed off in the form of a withdrawal operation."
                values={{ rewardPayment: <strong>reward payment</strong> }}
              />
            </Text>
            <Text className="mb10">
              <FormattedMessage defaultMessage="These are also referred to as “partial withdrawals” as the remaining 32 ETH stays locked and staked." />
            </Text>
            <Alert variant="warning" className="mt30">
              <span role="img" aria-label="note">
                📝
              </span>{' '}
              <FormattedMessage defaultMessage="It is not possible to manually request specific amounts of ETH to be withdrawn" />
            </Alert>
          </section>

          <section>
            <Anchor to="#how-to-exit" id="how-to-exit">
              <SubSectionTitle level={3} className="mb10">
                <FormattedMessage defaultMessage="How to exit from staking (full withdrawals)" />
              </SubSectionTitle>
            </Anchor>
            <Text className="mb10">
              <FormattedMessage
                defaultMessage="A {fullWithdrawal} is processed for any inactivated accounts that are no longer considered to be staking. that has fully exited from its validator responsibilities. For an account to be processed as a full withdrawal, it must first complete the process of exiting from its validator responsibilities. "
                values={{ fullWithdrawal: <strong>full withdrawal</strong> }}
              />
            </Text>

            <section className="actionable">
              <Heading level={4} className="mb10">
                <FormattedMessage defaultMessage="To exit staking and fully withdrawal your entire remaining balance, you must do two things:" />
              </Heading>
              <ol>
                <li>
                  <FormattedMessage
                    defaultMessage="Make sure you’ve updated your withdrawal credentials and have a withdrawal
                    address registered to this account"
                  />
                </li>
                <li>
                  <FormattedMessage
                    defaultMessage="Signal your intent to exit staking by signing and broadcasting a voluntary
                    exit message to the network using your validator keys and validator client"
                  />
                </li>
              </ol>
              <Text className="mb10">
                <FormattedMessage
                  defaultMessage="By completing step one, you’ll enable withdrawals from your validator account.
                  This will automatically trigger reward payments (partial withdrawals) to be processed, but this
                  does not automatically unlock the rest of your funds, or trigger an exit from the network."
                />
              </Text>
              <Text className="mb10">
                <FormattedMessage
                  defaultMessage="Those looking to exit their validator from staking and withdrawal their ETH should
                  check out the guide below that matches your setup:"
                />
              </Text>
              <Text className="mb10">
                <strong>
                  <FormattedMessage defaultMessage="Consensus clients:" />
                </strong>
              </Text>
              <ul>
                <li>
                  <Link
                    primary
                    inline
                    to="https://lighthouse-book.sigmaprime.io/voluntary-exit.html"
                  >
                    Exiting a Lighthouse validator
                  </Link>
                </li>
                <li>
                  <Link
                    primary
                    inline
                    to="https://nimbus.guide/voluntary-exit.html"
                  >
                    Exiting a Nimbus validator
                  </Link>
                </li>
                <li>
                  <Link
                    primary
                    inline
                    to="https://docs.prylabs.network/docs/wallet/exiting-a-validator"
                  >
                    Exiting a Prysm validator
                  </Link>
                </li>
                <li>
                  <Link
                    primary
                    inline
                    to="https://docs.teku.consensys.net/en/latest/HowTo/Voluntary-Exit/"
                  >
                    Exiting a Teku validator
                  </Link>
                </li>
              </ul>
              <Text className="mb10">
                <strong>
                  <FormattedMessage defaultMessage="Alternative node tooling:" />
                </strong>
              </Text>
              <ul>
                <li>
                  <Link
                    primary
                    inline
                    to="https://forum.dappnode.io/t/how-to-exit-an-eth2-validator/786"
                  >
                    Exiting a DAppNode validator
                  </Link>
                </li>
                <li>
                  <Link
                    primary
                    inline
                    to="https://eth-docker.net/Support/Exit/"
                  >
                    Exiting an eth-docker validator
                  </Link>
                </li>
                <li>
                  <Link
                    primary
                    inline
                    to="https://docs.rocketpool.net/guides/node/cli-intro.html#minipool-commands"
                  >
                    Exiting a Rocket Pool minipool
                  </Link>
                </li>
              </ul>
            </section>

            <Text className="mb10">
              <FormattedMessage
                defaultMessage="To make an account eligible for a full withdrawal, the validator account must
                first be exited. Validator accounts can be exited from staking in two main ways: voluntarily or
                forcefully."
              />
            </Text>
            <ul>
              <li>
                <FormattedMessage
                  defaultMessage="Anyone wishing to conclude their staking obligations can sign a “voluntary exit”
                  message which is then broadcast to the Beacon Chain to start the process. This is a manual step."
                />
              </li>
              <li>
                <FormattedMessage
                  defaultMessage="Accounts that have been slashed, or have insufficient balance, will be forced to
                  exit according to the network rules. This is automatic and cannot be stopped once initiated."
                />
              </li>
            </ul>
            <Text className="mb10">
              <FormattedMessage
                defaultMessage="Any exit, voluntary or not, must be processed through the exit queue. This is not
                instantaneous, and depends on how many other accounts are exiting at the same time."
              />
            </Text>
          </section>
        </section>

        <section>
          <Anchor to="#mechanics-of-withdrawals" id="mechanics-of-withdrawals">
            <SectionTitle level={2} className="mb10">
              <FormattedMessage defaultMessage="Mechanics of withdrawals: How they work" />
            </SectionTitle>
          </Anchor>

          <section>
            <Anchor to="#operations" id="operations">
              <SubSectionTitle level={3} className="mb10">
                <FormattedMessage defaultMessage="Withdrawals as an operation, not a new transaction type" />
              </SubSectionTitle>
            </Anchor>
            <Text className="mb10">
              <FormattedMessage
                defaultMessage="Ethereum users are used to transactions being executed in a manual way—if
                you want to transfer funds, you have to sign a transaction and pay the gas."
              />
            </Text>
            <Text className="mb10">
              <FormattedMessage
                defaultMessage="EIP-4895, titled {eip4895}, implements a design that simplified this whole process for stakers."
                values={{
                  eip4895: (
                    <Link
                      primary
                      inline
                      to="https://eips.ethereum.org/EIPS/eip-4895"
                    >
                      <FormattedMessage defaultMessage="Beacon chain push withdrawals as operations" />
                    </Link>
                  ),
                }}
              />
            </Text>
            <Text className="mb10">
              <FormattedMessage
                defaultMessage="Instead of a new transaction type being used for stakers to manually request
                withdrawals, accounts are automatically checked for eligible payouts every few days. All validators
                are checked on an endless loop, and any available rewards or exited funds are automatically “pushed”
                into a provided withdrawal accounts."
              />
            </Text>
          </section>

          <section>
            <Anchor to="#withdrawal-queue" id="withdrawal-queue">
              <SubSectionTitle level={3} className="mb10">
                <FormattedMessage defaultMessage="Withdrawal queue" />
              </SubSectionTitle>
            </Anchor>
            <Text className="mb10">
              <FormattedMessage
                defaultMessage="The withdrawal queue is automatically filled and processed by block proposers, who
                automatically check for any available payouts via a sweeping mechanism."
              />
            </Text>
            <Text className="mb10">
              <FormattedMessage
                defaultMessage="On a never-ending loop, every single validator account is continuously evaluated for
                eligible ETH withdrawals (of which there are two types, more on this below). Validators are processed
                in order by index number, originally starting at 0, with each subsequent proposer picking up where the last one left off."
              />
            </Text>
            <Text className="mb10">
              <FormattedMessage
                defaultMessage="When a validator is scheduled to propose the next block, it performs a sweep of validator accounts looking for eligible withdrawals.
                During the sweep, the validator will check a max of 16,384 accounts, attempting to find 16 available withdrawals to be processed in
                the next block."
              />
            </Text>
            <Text className="mb10">
              <FormattedMessage
                defaultMessage="Like a clock hand, this process progresses in one direction, and when the last validator is reached, the sweep starts over
                again from the beginning. At each validator along the way, the account is evaluated for potential withdrawals."
              />
            </Text>
            <Alert variant="warning" className="mt30 mb10">
              <Text className="mb10">
                <span role="img" aria-label="note" className="mr10">
                  📝
                </span>
                <FormattedMessage defaultMessage="Note the “withdrawal” and “BLS-to-execution” queues are independent and do not compete. Each are limited on a per-block basis." />
              </Text>
            </Alert>
          </section>

          <section>
            <Anchor to="#exit-queue" id="exit-queue">
              <SubSectionTitle level={3} className="mb10">
                <FormattedMessage defaultMessage="Exit queue and activation queue" />
              </SubSectionTitle>
            </Anchor>
            <Text className="mb10">
              <FormattedMessage
                defaultMessage="As anyone who has already gone through the process of activating a validator knows,
                this process is not automatic, especially if there are a lot of other users trying to join at the
                same time. This is because the consensus layer uses an {activationQueue} to limit how quickly new
                validator accounts can {join} the network."
                values={{
                  activationQueue: (
                    <strong>
                      <FormattedMessage defaultMessage="activation queue" />
                    </strong>
                  ),
                  join: (
                    <em>
                      <FormattedMessage defaultMessage="join" />
                    </em>
                  ),
                }}
              />
            </Text>
            <Text className="mb10">
              <FormattedMessage
                defaultMessage="Similarly, there is also an {exitQueue}, which limits how quickly validators can
                {leave} the network. This is for security reasons. Given each validator is limited to a max effective
                balance of 32 ETH, this prevents large portions of the ETH from potentially being used in an attack
                and then quickly exiting from the network all at once."
                values={{
                  exitQueue: (
                    <strong>
                      <FormattedMessage defaultMessage="exit queue" />
                    </strong>
                  ),
                  leave: (
                    <em>
                      <FormattedMessage defaultMessage="leave" />
                    </em>
                  ),
                }}
              />
            </Text>
            <Text className="mb10">
              <FormattedMessage
                defaultMessage="The number of validators that can be activated or exited in a given epoch (6.4 minutes)
                is determined by how many active validators are currently on the network:"
              />
            </Text>
            <Alert variant="warning" className="mt30 mb10">
              <Text className="mb10">
                <span role="img" aria-label="note" className="mr10">
                  📝
                </span>{' '}
                <FormattedMessage defaultMessage="Note the “activation” and “exit” queues are independent and do not compete. Each are limited on a per-epoch basis." />
              </Text>
            </Alert>
          </section>

          <section>
            <Anchor to="#validator-evaluation" id="validator-evaluation">
              <SubSectionTitle level={3} className="mb10">
                <FormattedMessage defaultMessage="How each validator is evaluated for withdrawals" />
              </SubSectionTitle>
            </Anchor>
            <Text className="mb10">
              <FormattedMessage
                defaultMessage="The status of the validator at time of evaluation is what will determine if, and what type of withdrawal will be initiated.
                A decision tree is followed, and if the validator being checked has ETH that is
                eligible to be withdrawn, it is added to the withdrawal queue. If there isn’t, the account is skipped."
              />
            </Text>
            <ol className="mb10">
              <li>
                <FormattedMessage defaultMessage="Has a withdrawal address been provided?" />
                <ul>
                  <li>
                    <FormattedMessage defaultMessage="If not, stop. No withdrawal will be processed and account skipped" />
                  </li>
                  <li>
                    <FormattedMessage defaultMessage="If so, move to next question" />
                  </li>
                </ul>
              </li>
              <li>
                <FormattedMessage defaultMessage="Is the validator still active?" />
                <ul>
                  <li>
                    <FormattedMessage
                      defaultMessage="If not, stop. {fullWithdrawal} processed for any remaining balance"
                      values={{
                        fullWithdrawal: (
                          <strong>
                            <FormattedMessage defaultMessage="Full withdrawal" />
                          </strong>
                        ),
                      }}
                    />
                  </li>
                  <li>
                    <FormattedMessage defaultMessage="If so, move to next question" />
                  </li>
                </ul>
              </li>
              <li>
                <FormattedMessage defaultMessage="Is the effective balance maxed out at 32?" />
                <ul>
                  <li>
                    <FormattedMessage defaultMessage="If not, no withdrawal will be processed and account skipped" />
                  </li>
                  <li>
                    <FormattedMessage
                      defaultMessage="If so, {rewardPayment} processed"
                      values={{
                        rewardPayment: (
                          <strong>
                            <FormattedMessage defaultMessage="reward payment" />
                          </strong>
                        ),
                      }}
                    />
                  </li>
                </ul>
              </li>
            </ol>
            <Text className="mb10">
              <FormattedMessage
                defaultMessage="The block producer then checks the next validator in line, and once again
                determines if a withdrawal needs to be processed or not. This process is repeated until either
                16 eligible withdrawals have been found, or until 16,384 validators have been checked, whichever
                comes first. At that point, the withdrawal queue is sent to the execution layer to be included in
                a block."
              />
            </Text>
          </section>

          <section>
            <Anchor to="#payout-frequency" id="payout-frequency">
              <SubSectionTitle level={3} className="mb10">
                <FormattedMessage defaultMessage="What factors affect the frequency of payouts?" />
              </SubSectionTitle>
            </Anchor>
            <Text className="mb10">
              <FormattedMessage defaultMessage="How long the cycle takes to check every account depends on:" />
            </Text>
          </section>
          <ol>
            <li>
              <FormattedMessage defaultMessage="Rate-limits set on withdrawal queue (could change through testing before Shanghai)" />
              <ul>
                <li>
                  <HashCode>MAX_WITHDRAWALS_PER_PAYLOAD: 16 (2⁴)</HashCode>
                  <br />
                  <FormattedMessage defaultMessage="Maximum number of withdrawals that can be processed in a single block" />
                </li>
                <li>
                  <HashCode>
                    MAX_VALIDATORS_PER_WITHDRAWALS_SWEEP: 16,384 (2¹⁴)
                  </HashCode>
                  <br />
                  <FormattedMessage
                    defaultMessage="Maximum number of accounts that can be checked in a block. Stops when 16
                    withdrawals are found. If 16 eligible rewards are not found in the first 16,384 accounts checked,
                    the withdrawal queue for that block will be submitted as is, and the following proposer will pick
                    up where this left off."
                  />
                </li>
              </ul>
            </li>
            <li>
              <FormattedMessage defaultMessage="Total number of validator accounts (index count, every validator account ever registered, up-only over time)" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Total number of validator accounts that have eligible withdrawals (variable)" />
              <ul>
                <li>
                  <FormattedMessage defaultMessage="Accounts without upgrades withdrawal credentials will be skipped" />
                </li>
                <li>
                  <FormattedMessage defaultMessage="Accounts that have fully withdrawn and have a zero balance will be skipped" />
                </li>
                <li>
                  <FormattedMessage defaultMessage="Active accounts with an effective balance or total balance less than 32 will be skipped" />
                </li>
              </ul>
            </li>
            <li>
              <FormattedMessage defaultMessage="Number of empty slots (missed block opportunities, variable, typically minimal)" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Consensus layer slot timing: 12 seconds (no plans to change)" />
            </li>
          </ol>
        </section>

        <section>
          <Anchor to="#further-reading" id="further-reading">
            <SectionTitle level={2} className="mb10">
              <FormattedMessage defaultMessage="Further reading" />
            </SectionTitle>
          </Anchor>

          <ul>
            <li>
              <Link
                primary
                inline
                to="https://github.com/ethereum/consensus-specs/blob/dev/specs/capella/"
              >
                <FormattedMessage defaultMessage="Capella - Formal specification" />
              </Link>
            </li>
            <li>
              <Link
                primary
                inline
                to="https://notes.ethereum.org/@launchpad/withdrawals-guide"
              >
                <FormattedMessage defaultMessage="How to trigger withdrawals, credential change" />
              </Link>
            </li>
            <li>
              <Link
                primary
                inline
                to="https://notes.ethereum.org/@launchpad/zhejiang"
              >
                <FormattedMessage defaultMessage="How to join the public withdrawals testnet" />
              </Link>
            </li>
            <li>
              <Link primary inline to="https://github.com/ethereum/pm/issues">
                <FormattedMessage defaultMessage="Community calls - announced in the PM repo" />
              </Link>
            </li>
            <li>
              <Link
                primary
                inline
                to="https://ethstaker.gitbook.io/ethstaker-knowledge-base/"
              >
                <FormattedMessage defaultMessage="EthStaker Knowledge Base" />
              </Link>
            </li>
            <li>
              <Link
                primary
                inline
                to="https://github.com/benjaminchodroff/ConsensusLayerWithdrawalProtection"
              >
                <FormattedMessage defaultMessage="Consensus Layer Withdrawal Protection" />
              </Link>
            </li>
          </ul>
        </section>
      </ComponentStyles>
    </PageTemplate>
  );
};
