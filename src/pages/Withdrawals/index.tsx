import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { HashLink as Anchor } from 'react-router-hash-link';
import styled from 'styled-components';
import { Alert } from '../../components/Alert';
import { Heading } from '../../components/Heading';
import { Link } from '../../components/Link';
import { PageTemplate } from '../../components/PageTemplate';
import { Text } from '../../components/Text';
import { Code } from '../../components/Code';
import { WithdrawalsTabComparison } from '../../components/WithdrawalsTabComparison';
import {
  NETWORK_NAME,
  PRICE_PER_VALIDATOR,
  TICKER_NAME,
} from '../../utils/envVars';

const ComponentStyles = styled.div`
  * {
    scroll-behavior: smooth;
    scroll-margin-top: 2rem;
  }
  section {
    margin-top: 30px;
  }
  a {
    text-decoration: none;
  }
  p,
  ol,
  ul {
    color: ${(p: any) => p.theme.blue.dark};
  }
  ul {
    margin-bottom: 10px;
    &.key-types {
      padding-inline-start: 1em;
      li > span {
        margin-inline-start: 0.5em;
      }
      li:nth-of-type(1) {
        list-style: '⚠️';
      }
      li:nth-of-type(2) {
        list-style: '✅';
      }
    }
  }
  li {
    margin-top: 10px;
    font-weight: 300;
  }
  strong {
    font-weight: 500;
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
  .inline {
    display: inline;
  }
`;

const SectionTitle = styled(Heading)`
  margin-top: 30px;
  border-bottom: 1px solid lightgray;
  padding-bottom: 10px;
`;

const SubSectionTitle = styled(SectionTitle)`
  border-bottom: 0;
`;

const TableContainer = styled.div`
  width: fit-content;
  margin-inline: 0;
  @media (max-width: ${p => p.theme.screenSizes.medium}) {
    margin-inline: auto;
  }
  table {
    margin: 1rem auto;
    * {
      color: ${(p: any) => p.theme.blue.dark};
      text-align: center;
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
`;

const EmojiPrefix = styled.span`
  margin-inline-end: 10px;
`;

export const Withdrawals = () => {
  const { locale, formatMessage } = useIntl();

  const withdrawalRateData = [
    { num: 400000, days: 3.5 },
    { num: 500000, days: 4.3 },
    { num: 600000, days: 5.2 },
    { num: 700000, days: 6.1 },
    { num: 800000, days: 7.0 },
  ];
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
              defaultMessage="As of the Shanghai/Capella upgrade withdrawals have been enabled on
              the Beacon Chain, with the inclusion of {eip}. This Ethereum Improvement Proposal
              enables rewards to be automatically withdrawn to the execution layer, and also
              provides a way for exited validators to unlock their entire balance—no gas
              required."
              values={{
                eip: (
                  <Link
                    primary
                    inline
                    to="https://eips.ethereum.org/EIPS/eip-4895"
                  >
                    <FormattedMessage defaultMessage="EIP-4895" />
                  </Link>
                ),
              }}
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
                defaultMessage="For your validator to be capable of withdrawals of any
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
            <section>
              <ul className="key-types">
                <li>
                  <FormattedMessage
                    defaultMessage='{type0} = "Type 0" = BLS keys = Old withdrawal credentials: {withdrawalsDisabled}'
                    values={{
                      type0: <Code>0x00</Code>,
                      withdrawalsDisabled: (
                        <em>
                          <FormattedMessage defaultMessage="Not eligible for withdrawals" />
                        </em>
                      ),
                    }}
                  />
                </li>
                <li>
                  <FormattedMessage
                    defaultMessage='{type1} = "Type 1" = Execution keys = New withdrawal credentials: {withdrawalsEnabled}'
                    values={{
                      type1: <Code>0x01</Code>,
                      withdrawalsEnabled: (
                        <em>
                          <FormattedMessage defaultMessage="Withdrawals enabled" />
                        </em>
                      ),
                    }}
                  />
                </li>
              </ul>
              <Text className="mt20">
                <FormattedMessage
                  defaultMessage="Note that your {withdrawalCredentials} are not the same as your {feeRecipient}, which receives transaction fees from proposed blocks. These can both be set to the same address, but must each be set separately."
                  values={{
                    withdrawalCredentials: (
                      <strong>
                        <FormattedMessage defaultMessage="withdrawal credentials" />
                      </strong>
                    ),
                    feeRecipient: (
                      <strong>
                        <FormattedMessage defaultMessage="fee recipient" />
                      </strong>
                    ),
                  }}
                />
              </Text>
            </section>

            <section className="actionable">
              <Heading level={4} className="mb10">
                <FormattedMessage defaultMessage="Tools available for generating key change message" />
              </Heading>
              <ul>
                <li>
                  <strong>Staking Deposit CLI</strong> -{' '}
                  <Link inline primary to="/btec/">
                    <FormattedMessage defaultMessage="Launchpad walkthrough tutorial" />
                  </Link>
                </li>
                <li>
                  <strong>Wagyu Key Gen GUI</strong> -{' '}
                  <Link
                    inline
                    primary
                    to="https://www.youtube.com/watch?v=EMQoVtxNaxo"
                  >
                    <FormattedMessage defaultMessage="Adding a withdrawal address with Wagyu Key Gen" />
                  </Link>
                </li>
                <li>
                  <strong>ethdo</strong> -{' '}
                  <Link
                    inline
                    primary
                    to="https://github.com/wealdtech/ethdo/blob/master/docs/changingwithdrawalcredentials.md"
                  >
                    <FormattedMessage defaultMessage="Changing withdrawal credentials" />
                  </Link>
                </li>
              </ul>
              <Text className="my20">
                <FormattedMessage
                  defaultMessage="These tools will assist you in generating the necessary keys and message to sign.
                  Signed messages can then be {broadcastLink} into blocks."
                  values={{
                    broadcastLink: (
                      <Link
                        primary
                        inline
                        to={`https://${NETWORK_NAME.toLowerCase()}.beaconcha.in/tools/broadcast`}
                      >
                        broadcast for inclusion
                      </Link>
                    ),
                  }}
                />
              </Text>
              <Alert variant="error">
                <Text>
                  <FormattedMessage
                    defaultMessage="This requires use of your mnemonic seed phrase, and should be performed on an {offline} air-gapped machine."
                    values={{
                      offline: (
                        <strong>
                          <FormattedMessage defaultMessage="offline" />
                        </strong>
                      ),
                    }}
                  />
                </Text>
              </Alert>
            </section>
            <section>
              <section>
                <Heading level={4} className="mb10">
                  <FormattedMessage defaultMessage="BLS To Execution Change (BTEC) queue" />
                </Heading>
                <Text className="mb10">
                  <FormattedMessage
                    defaultMessage="BLS withdrawal credentials ({type0}) can be updated to an execution address ({type1})
                    by broadcasting a BLS To Execution Change (BTEC) message, signed with your BLS withdrawal key. These
                    messages are included in blocks at a max rate of 16 per block."
                    values={{
                      type0: <Code>0x00</Code>,
                      type1: <Code>0x01</Code>,
                    }}
                  />
                </Text>
                <Text className="mb10">
                  <FormattedMessage
                    defaultMessage="If more than 16 requests are being made at one time, a
                    queue will be formed and these will be processed in subsequent blocks. Once completed, your validator
                    is permanently enabled for withdrawals, and will be eligible for payouts during the next sweep."
                  />
                </Text>
              </section>
            </section>
          </section>

          <section>
            <Anchor
              to="#excess-balance-withdrawals"
              id="excess-balance-withdrawals"
            >
              <SubSectionTitle level={3} className="mb10">
                <FormattedMessage defaultMessage="Excess balance withdrawals (partial withdrawals)" />
              </SubSectionTitle>
            </Anchor>
            <Text className="mb10">
              <FormattedMessage
                defaultMessage="An {excessBalanceWithdrawal} is processed when an active validator has a maxed out
                effective balance of {PRICE_PER_VALIDATOR} {TICKER_NAME}, and has a total balance over {PRICE_PER_VALIDATOR} {TICKER_NAME}.
                A single validator cannot get rewards on excess balance over {PRICE_PER_VALIDATOR} {TICKER_NAME}, and thus these accounts will have
                any extra balance automatically withdrawn to their Ethereum address."
                values={{
                  excessBalanceWithdrawal: (
                    <strong>
                      <FormattedMessage defaultMessage="excess balance withdrawal" />
                    </strong>
                  ),
                  PRICE_PER_VALIDATOR,
                  TICKER_NAME,
                }}
              />
            </Text>
            <Text className="mb10">
              <FormattedMessage
                defaultMessage="These are also referred to as “partial withdrawals” or “reward payments” as the remaining
                {PRICE_PER_VALIDATOR} {TICKER_NAME} stays locked and staked."
                values={{
                  PRICE_PER_VALIDATOR,
                  TICKER_NAME,
                }}
              />
            </Text>
            <Alert variant="warning" className="mt30">
              <span role="img" aria-label="note">
                📝
              </span>{' '}
              <Text className="inline">
                <FormattedMessage defaultMessage="It is not possible to manually request specific amounts of ETH to be withdrawn" />
              </Text>
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
                defaultMessage="A {fullWithdrawal} is processed for any inactivated validators that are no longer considered to be staking, that have fully exited from their validation responsibilities. Thus for a validator to fully withdraw its balance, it must first complete the process of exiting."
                values={{
                  fullWithdrawal: (
                    <strong>
                      <FormattedMessage defaultMessage="full withdrawal" />
                    </strong>
                  ),
                }}
              />
            </Text>

            <section className="actionable">
              <Heading level={4} className="mb10">
                <FormattedMessage defaultMessage="To exit staking and fully withdrawal your entire remaining balance, you must do two things:" />
              </Heading>
              <ol>
                <li>
                  <FormattedMessage defaultMessage="Make sure you’ve updated your withdrawal credentials with an execution withdrawal address" />
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
                  This will automatically trigger excess balance payments (partial withdrawals) to be processed, but this
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
                    <FormattedMessage
                      defaultMessage="Exiting a {client} validator"
                      values={{ client: 'Lighthouse' }}
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    primary
                    inline
                    to="https://chainsafe.github.io/lodestar/reference/cli/#validator-voluntary-exit"
                  >
                    <FormattedMessage
                      defaultMessage="Exiting a {client} validator"
                      values={{ client: 'Lodestar' }}
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    primary
                    inline
                    to="https://nimbus.guide/voluntary-exit.html"
                  >
                    <FormattedMessage
                      defaultMessage="Exiting a {client} validator"
                      values={{ client: 'Nimbus' }}
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    primary
                    inline
                    to="https://docs.prylabs.network/docs/wallet/exiting-a-validator"
                  >
                    <FormattedMessage
                      defaultMessage="Exiting a {client} validator"
                      values={{ client: 'Prysm' }}
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    primary
                    inline
                    to="https://docs.teku.consensys.net/Reference/CLI/Subcommands/Voluntary-Exit"
                  >
                    <FormattedMessage
                      defaultMessage="Exiting a {client} validator"
                      values={{ client: 'Teku' }}
                    />
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
                    <FormattedMessage
                      defaultMessage="Exiting a {software} validator"
                      values={{ software: 'DAppNode' }}
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    primary
                    inline
                    to="https://eth-docker.net/Support/Exit/"
                  >
                    <FormattedMessage
                      defaultMessage="Exiting a {software} validator"
                      values={{ software: 'eth-docker' }}
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    primary
                    inline
                    to="https://docs.rocketpool.net/guides/node/cli-intro.html#minipool-commands"
                  >
                    <FormattedMessage
                      defaultMessage="Exiting a {software} minipool"
                      values={{ software: 'Rocket Pool' }}
                      description="A minipool is a Rocket Pool-specific term for a validator that shares stake with others"
                    />
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
            <Alert variant="warning" className="my30">
              <span role="img" aria-label="note">
                📝
              </span>{' '}
              <Text className="inline">
                <FormattedMessage defaultMessage="Validators still need to complete their validation duties until they are exited" />
              </Text>
            </Alert>
            <Text className="mb10">
              <FormattedMessage defaultMessage="Once a validator has exited and its full balance has been withdrawn, any additional funds deposited to that validator will automatically be transferred to the withdrawal address during the next validator sweep. To re-stake ETH, a new validator must be activated." />
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
                withdrawals, accounts are automatically checked for eligible excess balance every few days. All validators
                are checked on an endless loop, and any available rewards or exited funds are automatically “pushed”
                into a provided withdrawal account."
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
            <Alert variant="warning" className="my30">
              <Text className="mb10">
                <EmojiPrefix>
                  <span role="img" aria-label="note">
                    📝
                  </span>
                </EmojiPrefix>
                <FormattedMessage
                  defaultMessage="Note the “withdrawal” and “BLS To Execution Change” queues are independent and
                  do not compete. Each are limited on a per-block basis."
                />
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
                balance of {PRICE_PER_VALIDATOR} {TICKER_NAME}, this prevents large portions of the ETH from potentially
                being used in an attack and then quickly exiting from the network all at once."
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
                  PRICE_PER_VALIDATOR,
                  TICKER_NAME,
                }}
              />
            </Text>
            <Text className="mb10">
              <FormattedMessage
                defaultMessage="The number of validators that can be activated or exited in a given epoch (6.4 minutes)
                is determined by how many active validators are currently on the network."
              />
            </Text>
            <Text className="mb10">
              <FormattedMessage
                defaultMessage="Four (4) validator exits are allowed per epoch, plus one (1) more for every 65,536 total active validators
                over 327,680. As of April 2023 this limit is eight (8), and will increase to nine (9) if/when the active validator count
                reaches 655,360."
              />
            </Text>
            <Alert variant="warning" className="my30">
              <Text className="mb10">
                <EmojiPrefix>
                  <span role="img" aria-label="note">
                    📝
                  </span>
                </EmojiPrefix>
                <FormattedMessage defaultMessage="Note the “activation” and “exit” queues are independent and do not compete. Each are limited on a per-epoch basis." />
              </Text>
            </Alert>
            <section>
              <Heading level={4} className="mb10">
                <FormattedMessage defaultMessage="Exit epoch and withdrawable epoch" />
              </Heading>
              <Text className="mb10">
                <FormattedMessage
                  defaultMessage="Immediately upon broadcasting a signed voluntary exit message, the {exitEpoch} and {withdrawableEpoch} values
                  are calculated based off the current epoch number. These values determine exactly when the validator will no longer be required
                  to be online performing validation, and when the validator is eligible for a full withdrawal respectively."
                  values={{
                    exitEpoch: (
                      <strong>
                        <FormattedMessage defaultMessage="exit epoch" />
                      </strong>
                    ),
                    withdrawableEpoch: (
                      <strong>
                        <FormattedMessage defaultMessage="withdrawable epoch" />
                      </strong>
                    ),
                  }}
                />
              </Text>
              <section className="ml20">
                <Text className="mb10">
                  <FormattedMessage
                    defaultMessage="{exitEpochLabel} - epoch at which your validator is no longer active, no longer earning rewards, and is no longer subject to slashing rules."
                    values={{
                      exitEpochLabel: (
                        <strong>
                          <FormattedMessage defaultMessage="Exit epoch" />
                        </strong>
                      ),
                    }}
                  />
                </Text>
                <Text className="mb10">
                  <FormattedMessage
                    defaultMessage="This epoch is determined by the first available epoch that isn't already maxed out with other validators
                    exiting (rate limit depends on total validators on the network), and must be at least four (4) epochs after the exit was initiated."
                  />
                </Text>
                <Text>
                  <FormattedMessage
                    defaultMessage='Up until this epoch (while "in the queue") your validator is expected to be online and is held to the same
                    slashing rules as always.'
                  />{' '}
                  <em>
                    <FormattedMessage defaultMessage="Do not turn your validator off until this epoch is reached." />
                  </em>
                </Text>
              </section>
              <section className="ml20 mb30">
                <Text className="mb10">
                  <FormattedMessage
                    defaultMessage="{withdrawableEpochLabel} - epoch at which your validator funds are eligible for a full withdrawal during the next validator sweep."
                    values={{
                      withdrawableEpochLabel: (
                        <strong>
                          <FormattedMessage defaultMessage="Withdrawable epoch" />
                        </strong>
                      ),
                    }}
                  />
                </Text>
                <Text>
                  <FormattedMessage defaultMessage="This occurs 256 epochs after the exit epoch, which takes ~27.3 hours." />
                </Text>
              </section>
              <Text className="mb10">
                <strong>
                  <FormattedMessage defaultMessage="Exit queue summary" />
                </strong>
              </Text>
              <Text className="mb10">
                <FormattedMessage defaultMessage="Once a signed voluntary exit message is broadcast, it takes:" />
              </Text>
              <ul>
                <li>
                  <FormattedMessage
                    defaultMessage="At least {time} (four epochs) from the current epoch before reaching the exit
                    epoch (with no others in the queue, {highlyVariable})"
                    values={{
                      time: (
                        <strong>
                          <FormattedMessage defaultMessage="~25 minutes" />
                        </strong>
                      ),
                      highlyVariable: (
                        <em>
                          <FormattedMessage defaultMessage="highly variable" />
                        </em>
                      ),
                    }}
                  />
                </li>
                <li>
                  <FormattedMessage
                    defaultMessage="Then another {time} (256 epochs) before those funds are flagged as withdrawable"
                    values={{
                      time: (
                        <strong>
                          <FormattedMessage defaultMessage="~27 hours" />
                        </strong>
                      ),
                    }}
                  />
                </li>
                <li>
                  <FormattedMessage
                    defaultMessage="Then up to {time} for the next validator sweep to execute the full withdrawal
                    (assumes {type1} withdrawal credentials)"
                    values={{
                      type1: <Code>0x01</Code>,
                      time: (
                        <strong>
                          <FormattedMessage defaultMessage="a few more days" />
                        </strong>
                      ),
                    }}
                  />
                </li>
              </ul>
              <Text className="mb10">
                <FormattedMessage defaultMessage="This timing of this last step is variable depending on validator index, current sweep position, and number of validators." />{' '}
                <Link inline primary to="#payout-frequency">
                  <FormattedMessage defaultMessage="More on frequency of payouts below." />
                </Link>
              </Text>
              <Alert variant="success">
                <Text>
                  <FormattedMessage
                    defaultMessage="Note that once a user has {type1} withdrawal credentials and has broadcast a voluntary exit,
                    there is no further action required until the processing is complete."
                    values={{ type1: <Code>0x01</Code> }}
                  />
                </Text>
              </Alert>
            </section>
          </section>

          <section>
            <Anchor to="#validator-evaluation" id="validator-evaluation">
              <SubSectionTitle level={3} className="mb10">
                <FormattedMessage defaultMessage="How each validator is evaluated for withdrawals" />
              </SubSectionTitle>
            </Anchor>
            <Text className="mb10">
              <FormattedMessage
                defaultMessage="A decision tree is followed to determine what type of withdrawal will be initiated.
                If the validator being checked has ETH that is eligible to be withdrawn, it is added to the withdrawal
                queue. If there isn’t, the account is skipped."
              />
            </Text>
            <ol className="mb10">
              <li>
                <FormattedMessage defaultMessage="Has a withdrawal address been provided?" />
                <ul>
                  <li>
                    <FormattedMessage defaultMessage="If so, move to next question" />
                  </li>
                  <li>
                    <FormattedMessage defaultMessage="If not, stop. No withdrawal will be processed and account skipped" />
                  </li>
                </ul>
              </li>
              <li>
                <FormattedMessage defaultMessage="Has the validator completed the exiting process?" />
                <ul>
                  <li>
                    <FormattedMessage
                      defaultMessage="If so, stop. {fullWithdrawal} processed for any remaining balance"
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
                    <FormattedMessage defaultMessage="If not, move to next question" />
                  </li>
                </ul>
              </li>
              <li>
                <FormattedMessage
                  defaultMessage="Is the effective balance maxed out at {PRICE_PER_VALIDATOR} {TICKER_NAME}?"
                  values={{ PRICE_PER_VALIDATOR, TICKER_NAME }}
                />
                <ul>
                  <li>
                    <FormattedMessage
                      defaultMessage="If so, {excessBalanceWithdrawal} processed"
                      values={{
                        excessBalanceWithdrawal: (
                          <strong>
                            <FormattedMessage defaultMessage="excess balance withdrawal" />
                          </strong>
                        ),
                      }}
                    />
                  </li>
                  <li>
                    <FormattedMessage defaultMessage="If not, no withdrawal will be processed and account skipped" />
                  </li>
                </ul>
              </li>
            </ol>
            <Text className="mb10">
              <FormattedMessage
                defaultMessage="The block producer then checks the next validator in line, and once again
                determines if a withdrawal needs to be processed or not. This process is repeated until either
                16 eligible withdrawals have been found, or until 16,384 validators have been checked, whichever
                comes first. At that point, the withdrawal queue is sent to the execution layer to be included at
                the end of the next block."
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
              <FormattedMessage defaultMessage="Rate-limits set on withdrawal queue" />
              <ul>
                <li>
                  <FormattedMessage
                    defaultMessage="Max withdrawals per payload: 16 (2{exp})"
                    values={{ exp: <sup>4</sup> }}
                  />
                  <br />
                  <FormattedMessage defaultMessage="Maximum number of withdrawals that can be processed in a single block" />
                </li>
                <li>
                  <FormattedMessage
                    defaultMessage="Max validators per withdrawals sweep: 16,384 (2{exp})"
                    values={{ exp: <sup>14</sup> }}
                  />
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
                  <FormattedMessage defaultMessage="Accounts without updated withdrawal credentials will be skipped" />
                </li>
                <li>
                  <FormattedMessage defaultMessage="Accounts that have fully withdrawn and have a zero balance will be skipped" />
                </li>
                <li>
                  <FormattedMessage
                    defaultMessage="Active accounts with an effective balance or total balance less than {PRICE_PER_VALIDATOR} {TICKER_NAME} will be skipped"
                    values={{ PRICE_PER_VALIDATOR, TICKER_NAME }}
                  />
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
          <Text className="mt20">
            <FormattedMessage
              defaultMessage="This can be summarized to estimate the upper limit of how long a complete sweep
            takes depending on how many withdrawals need processing:"
            />
          </Text>
          <TableContainer>
            <table>
              <thead>
                <tr>
                  <th>
                    <FormattedMessage defaultMessage="Number of withdrawals" />
                  </th>
                  <th>
                    <FormattedMessage defaultMessage="Time to complete" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {withdrawalRateData.map(({ num, days }) => (
                  <tr>
                    <td>{Intl.NumberFormat(locale).format(num)}</td>
                    <td>
                      {Intl.NumberFormat(locale).format(days)}{' '}
                      <FormattedMessage defaultMessage="days" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableContainer>
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
                to="https://notes.ethereum.org/@launchpad/holesky"
              >
                <FormattedMessage defaultMessage="How to join the public testnet" />
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
          </ul>
        </section>
      </ComponentStyles>
    </PageTemplate>
  );
};
