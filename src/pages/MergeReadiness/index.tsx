import React from 'react';
import styled from 'styled-components';
import { CheckBox } from 'grommet';
import { FormattedMessage, useIntl } from 'react-intl';

import { Link } from '../../components/Link';
import { PageTemplate } from '../../components/PageTemplate';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import { Code } from '../../components/Code';
import { Alert } from '../../components/Alert';

const ChecklistPageStyles = styled.div`
  section {
    background-color: white;
    padding: 1rem;
    margin: 1rem;
    border-radius: 4px;
    > h3 {
      border-bottom: 1px solid lightgray;
      margin-bottom: 5px;
    }
  }
  label {
    padding: 1rem;
  }
  .sub-checklist-item {
    margin-top: -0.5rem;
    margin-left: 1.5rem;
  }
  .checkbox-label {
    margin-left: 0.5rem;
  }
  ul {
    padding-left: 0px;
    padding-top: 16px;
  }
  @media screen and (max-width: 1080px) {
    section {
      background-color: white;
      margin: 0px;
      padding: 16px;
      flex-wrap: wrap;
    }
  }
`;

const Subtitle = styled.p`
  font-size: 20px;
  margin-bottom: 32px;
`;

export const MergeReadiness = () => {
  const { formatMessage } = useIntl();

  return (
    <PageTemplate
      title={formatMessage({ defaultMessage: 'Merge readiness checklist' })}
    >
      <div id="top" />
      <Subtitle>
        <Text className="mt20">
          <FormattedMessage defaultMessage="The long awaited transition to proof-of-stake via the Merge is rapidly approaching, bringing Ethereum one step closer to a more sustainable ecosystem." />
        </Text>
        <Text className="mt20">
          <FormattedMessage defaultMessage="Before the switch, there are a couple things solo stakers and validator services need to be aware of." />
        </Text>
      </Subtitle>
      <ChecklistPageStyles>
        <section>
          <Heading level={3} id="el-plus-cl">
            <FormattedMessage defaultMessage="EL + CL = Ethereum" />
          </Heading>
          <Text className="mt20">
            <FormattedMessage defaultMessage="Since the genesis of the Beacon Chain, many validators running their own consensus layer (CL) client have opted to use third-party services for their execution layer (EL) connection. This has been acceptable since the only thing being listened to has been the staking deposit contract." />
          </Text>
          <Text className="mt20">
            <FormattedMessage defaultMessage="With the Merge, the burden of processing transactions will fall on validators, as proof-of-work is deprecated. To sign off on the validity of these transactions, a validator must have access to the events of the execution layer." />
          </Text>
          <Alert variant="error" className="my40">
            <Text>
              <FormattedMessage defaultMessage="At time of the Merge, Infura and Alchemy will no longer be viable options to outsource execution layer responsibilities." />
            </Text>
            <Text className="mt20">
              <FormattedMessage defaultMessage="To prevent downtime at time of the Merge, be sure your node is running both an EL client, as well as a CL client." />
            </Text>
          </Alert>
          <Text className="mb10">
            <FormattedMessage defaultMessage="Stakers running their own execution layer is necessary for the decentralization of the network." />
          </Text>
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage defaultMessage="I am running my own execution layer client." />
              </Text>
            }
          />
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage defaultMessage="I am running my own consensus layer client." />
              </Text>
            }
          />
        </section>
        <section>
          <Heading level={3} id="engine-api-jwt">
            <FormattedMessage defaultMessage="Engine API and JWT" />
          </Heading>
          <Text className="mt20">
            <FormattedMessage defaultMessage="Communication between the execution layer and consensus layer will occur using the Engine API. This is a new set of JSON RPC methods that can be used to communicate between the two client layers." />
          </Text>
          <Text className="mt20">
            <FormattedMessage
              defaultMessage="This communication is secured using a {jwt} secret, which is a secret key that is shared only between the two clients to authenticate one another. This shared JWT secret must be made available to each client (both EL and CL) to properly authenticate the Engine API, allowing them to properly communicate between one another."
              values={{
                jwt: (
                  <Link
                    inline
                    primary
                    to="https://en.wikipedia.org/wiki/JSON_Web_Token"
                  >
                    <FormattedMessage defaultMessage="JWT" />
                  </Link>
                ),
              }}
            />
          </Text>
          <Alert variant="error" className="my40">
            <Text>
              <FormattedMessage defaultMessage="Two-way communication between the EL client and CL client requires a JWT secret for authentication, and is essential for your node to be functional." />
            </Text>
          </Alert>
          <Text className="my10">
            <FormattedMessage defaultMessage="Instructions for how to set this JWT secret vary depending on the client—node operators should refer to their clients' documentation for instructions about how to generate and configure these." />
          </Text>
          <ul className="sub-checklist-item">
            <li className="py5">
              <Link
                primary
                inline
                to="https://besu.hyperledger.org/en/stable/Reference/CLI/CLI-Syntax/#engine-jwt-secret"
              >
                Besu:{' '}
                <FormattedMessage
                  defaultMessage="CLI Syntax {engineJwtSecret}"
                  values={{ engineJwtSecret: <code>engine-jwt-secret</code> }}
                />
              </Link>
            </li>
            <li className="py5">
              <Link
                primary
                inline
                to="https://geth.ethereum.org/docs/interface/merge#el---cl-communication"
              >
                Geth:{' '}
                <FormattedMessage defaultMessage="The Merge, EL - CL communication" />
              </Link>
            </li>
            <li className="py5">
              <Link
                primary
                inline
                to="https://github.com/ledgerwatch/erigon#authentication-api"
              >
                Erigon: <FormattedMessage defaultMessage="Authentication API" />
              </Link>
            </li>
            <li className="py5">
              <Link primary inline to="https://lighthouse-book.sigmaprime.io/">
                Lighthouse:{' '}
                <FormattedMessage defaultMessage="Lighthouse Book" />
              </Link>
            </li>
            <li className="py5">
              <Link
                primary
                inline
                to="https://docs.nethermind.io/nethermind/first-steps-with-nethermind/running-nethermind-post-merge#jwtsecretfile"
              >
                Nethermind:{' '}
                <FormattedMessage
                  defaultMessage="Running Nethermind Post Merge {jwtSecretFile}"
                  values={{ jwtSecretFile: <code>JwtSecretFile</code> }}
                />
              </Link>
            </li>
            <li className="py5">
              <Link primary inline to="https://nimbus.guide/">
                Nimbus: <FormattedMessage defaultMessage="The Nimbus book" />
              </Link>
            </li>
            <li className="py5">
              <Link
                primary
                inline
                to="https://docs.prylabs.network/docs/execution-node/authentication"
              >
                Prysm:{' '}
                <FormattedMessage defaultMessage="Authenticating Execution Node Connections" />
              </Link>
            </li>
            <li className="py5">
              <Link
                primary
                inline
                to="https://docs.teku.consensys.net/en/latest/HowTo/Prepare-for-The-Merge/#3-configure-the-java-web-token"
              >
                Teku:{' '}
                <FormattedMessage defaultMessage="Configure the Java Web" />
              </Link>
            </li>
          </ul>
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage
                  defaultMessage="I have set up a shared JWT secret and made it available to {both} my execution layer client, and my consensus layer client (beacon node)"
                  values={{ both: <strong>both</strong> }}
                />
              </Text>
            }
          />
        </section>
        <section>
          <Heading level={3} id="fee-recipient">
            <FormattedMessage defaultMessage="Fee recipient" />
          </Heading>
          <Text className="mt20">
            <FormattedMessage defaultMessage="Now that transactions must be processed by validators, the validators that propose blocks including these transactions are eligible to receive the transaction fee tips. These are also known as priority fees, and are the unburnt portion of gas fees." />
          </Text>
          <Text className="mt20">
            <FormattedMessage defaultMessage="These fees are paid by whoever submitted the transaction and come in the form of ETH on the execution layer (Mainnet). These rewards are not accounted for in your validator balance which is maintained on the consensus layer." />
          </Text>
          <Alert variant="warning" className="my40">
            <Text>
              <FormattedMessage
                defaultMessage="As such, stakers must provide a {feeRecipient} address to their consensus client in order to receive these rewards. This is a normal Ethereum address that you're used to."
                values={{
                  feeRecipient: (
                    <strong>
                      <FormattedMessage defaultMessage="fee recipient" />
                    </strong>
                  ),
                }}
              />
            </Text>
            <Text className="mt20">
              <FormattedMessage defaultMessage="If you do not provide an address to your client, you will not receive transaction fees when your validator proposes blocks." />
            </Text>
          </Alert>
          <Text className="mt20">
            <FormattedMessage defaultMessage="See your consensus layer client documentation for client-specific instructions on how to set this." />
          </Text>
          <ul className="sub-checklist-item">
            <li className="py5">
              <Link
                primary
                inline
                to="https://lighthouse-book.sigmaprime.io/suggested-fee-recipient.html"
              >
                Lighthouse:{' '}
                <FormattedMessage defaultMessage="Suggested Fee Recipient" />
              </Link>
            </li>
            <li className="py5">
              <Link primary inline to="https://nimbus.guide/">
                Nimbus: <FormattedMessage defaultMessage="The Nimbus book" />
              </Link>
            </li>
            <li className="py5">
              <Link
                primary
                inline
                to="https://docs.prylabs.network/docs/execution-node/fee-recipient/"
              >
                Prysm:{' '}
                <FormattedMessage defaultMessage="Configuring a Fee Recipient Address" />
              </Link>
            </li>
            <li className="py5">
              <Link
                primary
                inline
                to="https://docs.teku.consensys.net/en/latest/HowTo/Prepare-for-The-Merge/#configure-the-fee-recipient"
              >
                Teku:{' '}
                <FormattedMessage defaultMessage="Configure the fee recipient" />
              </Link>
            </li>
          </ul>
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage defaultMessage="I understand that I will earn the unburnt transaction fees (tips/priority fees) when I propose a block, and this is accounted for on the execution layer, not my validator balance." />
              </Text>
            }
          />
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage defaultMessage="I have provided an Ethereum address to my validator where I would like my fee rewards to be deposited." />
              </Text>
            }
          />
        </section>
        <Heading level={3} className="mt50 mb30" id="additional-reminders">
          <FormattedMessage defaultMessage="Additional reminders" />
        </Heading>
        <section>
          <Heading level={3}>
            <FormattedMessage defaultMessage="When Merge?" />
          </Heading>
          <Text className="mt20">
            <FormattedMessage
              defaultMessage="Public testnet progress is underway. When everything is safe and ready, the core developer teams will make this known, so stay tuned to the {blogLink} or other client team communication channels for the latest information."
              values={{
                blogLink: (
                  <Link inline primary to="https://blog.ethereum.org">
                    <FormattedMessage defaultMessage="Ethereum Foundation Blog" />
                  </Link>
                ),
              }}
            />
          </Text>
        </section>
        <section>
          <Heading level={3} id="testing-the-merge">
            <FormattedMessage defaultMessage="#TestingTheMerge" />
          </Heading>
          <Text className="mt20">
            <FormattedMessage
              defaultMessage="While waiting for the Mainnet transition to proof-of-stake, stakers are encouraged to participate in {testingTheMerge}. This is a great way to learn more about the Merge, practice going through it before Mainnet, and gain confidence in your setup."
              values={{ testingTheMerge: <code>#TestingTheMerge</code> }}
            />
          </Text>
          <Text className="mt20">
            <FormattedMessage
              defaultMessage="{networkBold} will be the first longstanding public testnet to undergo The Merge. Historically a proof-of-work testnet, {network} now has its own proof-of-stake beacon chain which will be merged with the execution layer in the near future (if it hasn't happened already)."
              values={{
                networkBold: <strong>Ropsten</strong>,
                network: 'Ropsten',
              }}
            />
          </Text>
          <Text className="mt20">
            <FormattedMessage
              defaultMessage="{network} is open for anyone to interact with. Try sending some transactions, running a validator on its new beacon chain, or see if you can get slashed!"
              values={{ network: 'Ropsten' }}
            />
          </Text>
          <ul className="sub-checklist-item">
            <li className="py5">
              <Text>
                <Link primary inline to="https://discord.io/ethstaker">
                  <FormattedMessage
                    defaultMessage="{community} Discord (faucet)"
                    values={{ community: 'EthStaker' }}
                  />
                </Link>
                {' - '}
                <FormattedMessage
                  defaultMessage="The {network} faucets have been abused, and are limited, but the folks at EthStaker will do their best to help you out"
                  values={{ network: 'Ropsten' }}
                />
              </Text>
            </li>
            <li className="py5">
              <Text className="inline">
                <Link
                  primary
                  inline
                  to="https://github.com/eth-educators/eth-docker/blob/merge-getready/MERGE-READY.md"
                >
                  <FormattedMessage
                    defaultMessage="{community} merge testnet guide"
                    values={{ community: 'EthStaker' }}
                  />
                </Link>
                {' - '}
                <FormattedMessage defaultMessage="Step-by-step guide for how to spin up a node and validator on merge testnets" />
              </Text>
            </li>
            <li className="py5">
              <Text>
                <Link
                  primary
                  inline
                  to="https://notes.ethereum.org/@launchpad/ropsten"
                >
                  <FormattedMessage
                    defaultMessage="How to run a node on {network}"
                    values={{ network: 'Ropsten' }}
                  />
                </Link>
                {' - '}
                <FormattedMessage defaultMessage="For those who want more control and less hand-holding" />
              </Text>
            </li>
            <li className="py5">
              <Text>
                <Link
                  primary
                  inline
                  to="https://ropsten.launchpad.ethereum.org"
                >
                  <FormattedMessage
                    defaultMessage="{network} Staking Launchpad"
                    values={{ network: 'Ropsten' }}
                  />
                </Link>
                {' - '}
                <FormattedMessage
                  defaultMessage="{network} version of this page"
                  values={{ network: 'Ropsten' }}
                />
              </Text>
            </li>
            <li className="py5">
              <Text>
                <Link
                  primary
                  inline
                  to="https://blog.ethereum.org/2022/05/30/ropsten-merge-announcement/"
                >
                  <FormattedMessage
                    defaultMessage="{site} {network} announcement"
                    values={{
                      site: 'EF Blog',
                      network: 'Ropsten',
                    }}
                  />
                </Link>
              </Text>
            </li>
          </ul>
          <Text className="mt20">
            <FormattedMessage
              defaultMessage="{networkBold} is a younger public testnet that has already undergone its transition to proof-of-stake after undergoing a successful merge upgrade in March 2022. Kiln is open for anyone to interact with. Try sending some ETH, interacting with some contracts, or deploying your own."
              values={{ networkBold: <strong>Kiln</strong> }}
            />
          </Text>
          <ul className="sub-checklist-item">
            <li className="py5">
              <Text>
                <Link primary inline to="https://kiln.themerge.dev/">
                  <FormattedMessage
                    defaultMessage="{network} homepage"
                    values={{ network: 'Kiln' }}
                  />
                </Link>
                {' - '}
                <FormattedMessage defaultMessage="Everything you need to get started with the network, including a faucet" />
              </Text>
            </li>
            <li className="py5">
              <Text className="inline">
                <Link
                  primary
                  inline
                  to="https://github.com/remyroy/ethstaker/blob/main/merge-devnet.md"
                >
                  <FormattedMessage
                    defaultMessage="{community} {network} guide"
                    values={{
                      community: 'EthStaker',
                      network: 'Kiln',
                    }}
                  />
                </Link>
                {' - '}
                <FormattedMessage
                  defaultMessage="Step-by-step guide for how to spin up a {network} node and validator"
                  values={{ network: 'Kiln' }}
                />
              </Text>
            </li>
            <li className="py5">
              <Text>
                <Link
                  primary
                  inline
                  to="https://notes.ethereum.org/@launchpad/kiln"
                >
                  <FormattedMessage
                    defaultMessage="How to run a node on {network}"
                    values={{ network: 'Kiln' }}
                  />
                </Link>
                {' - '}
                <FormattedMessage defaultMessage="For those who want more control and less hand-holding" />
              </Text>
            </li>
            <li className="py5">
              <Text>
                <Link primary inline to="https://kiln.launchpad.ethereum.org">
                  <FormattedMessage
                    defaultMessage="{network} Staking Launchpad"
                    values={{ network: 'Kiln' }}
                  />
                </Link>
                {' - '}
                <FormattedMessage
                  defaultMessage="{network} version of this page"
                  values={{ network: 'Kiln' }}
                />
              </Text>
            </li>
            <li className="py5">
              <Text>
                <Link
                  primary
                  inline
                  to="https://blog.ethereum.org/2022/03/14/kiln-merge-testnet/"
                >
                  <FormattedMessage
                    defaultMessage="{site} {network} announcement"
                    values={{
                      site: 'EF Blog',
                      network: 'Kiln',
                    }}
                  />
                </Link>
              </Text>
            </li>
          </ul>
          <Text className="mt20">
            <FormattedMessage
              defaultMessage="You can also check out GitHub for {allConfigs}."
              values={{
                allConfigs: (
                  <Link
                    inline
                    primary
                    to="https://github.com/eth-clients/merge-testnets"
                  >
                    <FormattedMessage defaultMessage="all of the merge testnet configurations" />
                  </Link>
                ),
              }}
            />
          </Text>
          <Alert variant="info" className="my40">
            <Text>
              <FormattedMessage
                defaultMessage="Don't forget to head over to the {discord} where you'll find a {testingTheMerge} channel loaded with discussion on how you can get more involved and make sure you're prepared."
                values={{
                  discord: (
                    <Link inline primary to="https://discord.io/ethstaker">
                      <FormattedMessage defaultMessage="EthStaker Discord" />
                    </Link>
                  ),
                  testingTheMerge: (
                    <Code>
                      #TestingTheMerge
                      <span
                        role="img"
                        aria-label={formatMessage({
                          defaultMessage: 'Merge panda emoji',
                        })}
                      >
                        🐼
                      </span>
                    </Code>
                  ),
                }}
              />
            </Text>
            <Text className="mt20">
              <FormattedMessage
                defaultMessage="Visit here to get the latest information on how to get involved with {testingTheMerge} on other public testnets as details unfold."
                values={{
                  discord: (
                    <Link inline primary to="https://discord.io/ethstaker">
                      <FormattedMessage defaultMessage="EthStaker Discord" />
                    </Link>
                  ),
                  testingTheMerge: <code>#TestingTheMerge</code>,
                }}
              />
            </Text>
          </Alert>
        </section>
        <section>
          <Heading level={3} id="withdrawals">
            <FormattedMessage defaultMessage="When withdrawals?" />
          </Heading>
          <Text className="mt20">
            <FormattedMessage
              defaultMessage="Reminder, the Merge upgrade will {not} implement withdrawing or transferring of staked ETH. This feature will be included in the Shanghai upgrade planned to follow the Merge."
              values={{ not: <em>not</em> }}
            />
          </Text>
          <Text className="mt20">
            <FormattedMessage
              defaultMessage="For more information, see the {shanghaiPlanning}."
              values={{
                shanghaiPlanning: (
                  <Link
                    inline
                    primary
                    to="https://github.com/ethereum/pm/issues/450"
                  >
                    <FormattedMessage defaultMessage="Shanghai Planning issue on GitHub" />
                  </Link>
                ),
              }}
            />
          </Text>
        </section>
        <section>
          <Heading level={3} id="further-reading">
            <FormattedMessage defaultMessage="Further reading" />
          </Heading>
          <ul className="sub-checklist-item">
            <li className="py5">
              <Link
                primary
                inline
                to="https://notes.ethereum.org/@MarioHavel/merge-resources"
              >
                <FormattedMessage defaultMessage="Mega Merge Resource List" />{' '}
                <span
                  role="img"
                  aria-label={formatMessage({
                    defaultMessage: 'Merge panda emoji',
                  })}
                >
                  🐼
                </span>
              </Link>
              {' - '}
              <em>Mario Havel</em>
            </li>
            <li className="py5">
              <Link
                primary
                inline
                to="https://twitter.com/trent_vanepps/status/1508478499325202435"
              >
                <FormattedMessage defaultMessage="Ongoing thread of Ethereum Merge info" />
              </Link>
              {' - '}
              <em>trent.eth</em>
            </li>
            <li className="py5">
              <Link
                primary
                inline
                to="https://github.com/timbeiko/eth-roadmap-faq"
              >
                <FormattedMessage defaultMessage="Ethereum Roadmap FAQ" />
              </Link>
              {' - '}
              <em>Tim Beiko</em>
            </li>
            <li className="py5">
              <Link primary inline to="https://ethereum.org/en/upgrades/merge/">
                <FormattedMessage defaultMessage="Ethereum.org - The Merge" />
              </Link>
            </li>
          </ul>
        </section>
      </ChecklistPageStyles>
    </PageTemplate>
  );
};
