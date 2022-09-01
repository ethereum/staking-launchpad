import React from 'react';
import styled from 'styled-components';
import { CheckBox } from 'grommet';
import { FormNext } from 'grommet-icons';
import { FormattedMessage, useIntl } from 'react-intl';

import { Link } from '../../components/Link';
import { PageTemplate } from '../../components/PageTemplate';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import { Code } from '../../components/Code';
import { Alert } from '../../components/Alert';

import { screenSizes } from '../../styles/styledComponentsTheme';
import useMobileCheck from '../../hooks/useMobileCheck';

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

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr));
  grid-auto-rows: 1fr;
  gap: 1rem;
  @media only screen and (max-width: ${p => p.theme.screenSizes.medium}) {
    flex-direction: column;
  }
`;

const Card = styled.div`
  display: flex;
  padding: 24px;
  border: 1px solid ${p => p.theme.gray.dark};
  border-radius: 4px;
  width: 100%;
  height: 100%;
  background: white;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  @media only screen and (max-width: ${p => p.theme.screenSizes.medium}) {
    margin: 0px;
    margin-top: 16px;
  }
  transform: scale(1);
  transition: transform 0.1s;
  &:hover {
    cursor: pointer;
    box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.15);
    transition: transform 0.1s;
    transform: scale(1.02);
  }

  p.timing {
    font-size: 0.875rem;
    line-height: 140%;
    margin-bottom: 0;
  }
`;

const BoldGreen = styled.span`
  color: ${(p: { theme: any; fontSize: number }) => p.theme.green.dark};
  font-size: ${(p: { theme: any; fontSize: number }) => p.fontSize}px;
  font-weight: bold;
`;

const StyledLink = styled(Link as any)`
  width: 100%;
`;

const SectionHeader = styled.div`
  margin: 3rem 0 1rem;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 4px;
  &:before {
    content: '';
    display: block;
    height: 3rem;
    margin-top: -3rem;
    visibility: hidden;
  }
`;

export const MergeReadiness = () => {
  const { locale, formatMessage } = useIntl();
  const isMobile = useMobileCheck(screenSizes.small);
  const sections = [
    {
      heading: <FormattedMessage defaultMessage="Task 1" />,
      timing: <FormattedMessage defaultMessage="Do this now" />,
      title: <FormattedMessage defaultMessage="Both layers required" />,
      id: 'el-plus-cl',
    },
    {
      heading: <FormattedMessage defaultMessage="Task 2" />,
      timing: <FormattedMessage defaultMessage="Do this now" />,
      title: <FormattedMessage defaultMessage="Authenticate Engine API" />,
      id: 'authenticate',
    },
    {
      heading: <FormattedMessage defaultMessage="Task 3" />,
      timing: <FormattedMessage defaultMessage="Do this now" />,
      title: <FormattedMessage defaultMessage="Set fee recipient" />,
      id: 'fee-recipient',
    },
    {
      heading: <FormattedMessage defaultMessage="Bonus" />,
      title: <FormattedMessage defaultMessage="Additional reminders" />,
      id: 'additional-reminders',
    },
  ];

  // Set up relevant dates with Intl
  interface DateTimeFormatOptions {
    formatMatcher?: 'basic' | 'best fit' | 'best fit' | undefined;
    dateStyle?: 'full' | 'long' | 'medium' | 'short' | undefined;
    timeStyle?: 'full' | 'long' | 'medium' | 'short' | undefined;
  }
  const bellatrixDate = new Date('2022-09-06T11:34:47.000Z');
  const bellatrixDateTimeOptions: DateTimeFormatOptions = {
    dateStyle: 'medium',
    timeStyle: 'medium',
  };
  const bellatrixDateTime = new Intl.DateTimeFormat(
    locale,
    bellatrixDateTimeOptions
  ).format(bellatrixDate);
  const bellatrixDateOnlyOptions: DateTimeFormatOptions = {
    dateStyle: 'medium',
  };
  const bellatrixDateOnly = new Intl.DateTimeFormat(
    locale,
    bellatrixDateOnlyOptions
  ).format(bellatrixDate);
  const ttdDateLow = new Date('2022-09-10T12:00:00.000Z');
  const ttdDateHigh = new Date('2022-09-20T12:00:00.000Z');
  const ttdOptionsLow: DateTimeFormatOptions = { dateStyle: 'medium' };
  const ttdOptionsHigh: DateTimeFormatOptions = { dateStyle: 'medium' };
  const ttdDateOnlyLow = new Intl.DateTimeFormat(locale, ttdOptionsLow).format(
    ttdDateLow
  );
  const ttdDateOnlyHigh = new Intl.DateTimeFormat(
    locale,
    ttdOptionsHigh
  ).format(ttdDateHigh);

  const WhenMerge = () => (
    <>
      <Text className="my20">
        <FormattedMessage
          defaultMessage="The Bellatrix upgrade to the Beacon Chain is scheduled for epoch 144896, set to occur at {bellatrixDateTime}."
          values={{ bellatrixDateTime }}
        />
      </Text>
      <Text className="mb20">
        <FormattedMessage
          defaultMessage="Mainnet total terminal difficulty (TTD) has been set to {difficulty}. Ethereum is estimated to reach this TTD between {ttdDateLow} and {ttdDateHigh}, depending on hash rate (follow {linkBordel} and {link797} for latest estimates)."
          values={{
            difficulty: isMobile ? (
              <FormattedMessage
                defaultMessage="5.875e22"
                description="Total terminal difficulty written in scientific notation"
              />
            ) : (
              <FormattedMessage
                defaultMessage="58750000000000000000000"
                description="Total terminal difficulty written out fully, without commas, so it can be copied easily. "
              />
            ),
            ttdDateLow: ttdDateOnlyLow,
            ttdDateHigh: ttdDateOnlyHigh,
            linkBordel: (
              <Link to="https://bordel.wtf" inline primary>
                <FormattedMessage defaultMessage="bordel.wtf" />
              </Link>
            ),
            link797: (
              <Link to="https://797.io/themerge/" inline primary>
                <FormattedMessage defaultMessage="797.io/themerge" />
              </Link>
            ),
          }}
        />
      </Text>
    </>
  );

  const ActNow = () => {
    return (
      <SectionHeader className="m0 pt0">
        <Alert variant="error" className="mt40">
          <Text className="mb20">
            <strong>
              <FormattedMessage defaultMessage="Attention:" />
            </strong>
          </Text>
          <WhenMerge />
          <Text className="mb20">
            <FormattedMessage defaultMessage="Act now to update your node with the latest client releases." />{' '}
            <strong>
              <FormattedMessage
                defaultMessage="Complete the steps below before {bellatrixDateOnly} to make sure you're prepared."
                values={{ bellatrixDateOnly }}
              />
            </strong>
          </Text>
          <Link
            primary
            to="https://blog.ethereum.org/2022/08/24/mainnet-merge-announcement/"
          >
            <FormattedMessage defaultMessage="View EF blog mainnet merge announcement" />
          </Link>
        </Alert>
      </SectionHeader>
    );
  };

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
          <FormattedMessage defaultMessage="Before the switch, there are a couple things solo stakers and validator services need to be aware of, and a few tasks you may need to attend to." />
        </Text>
      </Subtitle>

      <CardContainer>
        {sections.map(({ heading, title, timing, id }) => (
          <StyledLink to={`#${id}`} inline isTextLink={false} key={id}>
            <Card>
              <div>
                <Heading level={4} className="mb10">
                  {heading}
                </Heading>
                <BoldGreen className="mr10" fontSize={24}>
                  {title}
                </BoldGreen>
                {timing && (
                  <p className="timing">
                    <FormattedMessage defaultMessage="Timing:" /> {timing}
                  </p>
                )}
              </div>
              <FormNext size="large" />
            </Card>
          </StyledLink>
        ))}
      </CardContainer>
      <ActNow />
      <ChecklistPageStyles>
        <SectionHeader id={sections[0].id}>
          <Heading level={3}>
            {sections[0].heading}
            {' - '}
            {sections[0].title}
          </Heading>
          <Text className="mt10">
            <FormattedMessage defaultMessage="Post-merge, an Ethereum node will be comprised of both an execution client, and a consensus client." />
          </Text>
        </SectionHeader>
        <section>
          <Text className="mt20">
            <FormattedMessage defaultMessage="Since the genesis of the Beacon Chain, many validators running their own consensus client have opted to use third-party services for their execution layer connection. This has been acceptable since the only thing being listened to has been the staking deposit contract." />
          </Text>
          <Text className="mt20">
            <FormattedMessage defaultMessage="With the Merge, the burden of processing transactions will fall on validators, as proof-of-work is deprecated. To sign off on the validity of these transactions, a validator must have trusted access to the events of the execution layer. Trust only your own node." />
          </Text>
          <Alert variant="error" className="my30">
            <Text>
              <FormattedMessage defaultMessage="At time of the Merge, Infura and Alchemy will no longer be viable options to outsource execution layer responsibilities." />
            </Text>
            <Text className="mt20">
              <FormattedMessage defaultMessage="If you have not yet done so, be sure your node is running both an EL client, as well as a CL client, to prevent downtime at time of the Merge." />
            </Text>
            <Text className="mt20">
              <FormattedMessage defaultMessage="Stakers running their own execution layer is necessary for the decentralization of the network." />
            </Text>
          </Alert>
          <Text className="mb10">
            <FormattedMessage defaultMessage="All execution and consensus clients have recently released updates including this TTD to be merge-ready. Be sure to update your clients." />
          </Text>
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage defaultMessage="I am running my own execution client, and have updated to a merge-ready release." />
              </Text>
            }
          />
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage defaultMessage="I am running my own consensus client, and have updated to a merge-ready release" />
              </Text>
            }
          />
        </section>
        <SectionHeader id={sections[1].id}>
          <Heading level={3}>
            {sections[1].heading}
            {' - '}
            {sections[1].title}
          </Heading>
          <Text className="mt10">
            <FormattedMessage defaultMessage="The execution and consensus layers work together tightly, and require authentication to stay safe. " />
          </Text>
        </SectionHeader>
        <section>
          <Text className="mt20">
            <FormattedMessage
              defaultMessage="Communication between the execution layer and consensus layer will occur using the {engineApi}. This is a new set of JSON RPC methods that can be used to communicate between the two client layers."
              values={{
                engineApi: (
                  <Link
                    inline
                    primary
                    to="https://github.com/ethereum/execution-apis/blob/main/src/engine/specification.md"
                  >
                    <FormattedMessage defaultMessage="Engine API" />
                  </Link>
                ),
              }}
            />
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
          <Alert variant="error" className="my30">
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
                  defaultMessage="I have set up a shared JWT secret and made it available to {both} my execution client, and my consensus client (beacon node)"
                  values={{
                    both: (
                      <strong>
                        <FormattedMessage defaultMessage="both" />
                      </strong>
                    ),
                  }}
                />
              </Text>
            }
          />
        </section>
        <SectionHeader id={sections[2].id}>
          <Heading level={3}>
            {sections[2].heading}
            {' - '}
            {sections[2].title}
          </Heading>
          <Text className="mt10">
            <FormattedMessage defaultMessage="Fees rewards are coming to validators, don't miss out!" />
          </Text>
        </SectionHeader>
        <section>
          <Text className="mt20">
            <FormattedMessage defaultMessage="Now that transactions must be processed by validators, the validators that propose blocks including these transactions are eligible to receive the transaction fee tips. These are also known as priority fees, and are the unburnt portion of gas fees." />
          </Text>
          <Text className="mt20">
            <FormattedMessage defaultMessage="These fees are paid by whoever submitted the transaction and come in the form of ETH on the execution layer (Mainnet). These rewards are not accounted for in your validator balance which is maintained on the consensus layer." />
          </Text>
          <Alert variant="warning" className="my30">
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
            <FormattedMessage defaultMessage="See your consensus client documentation for client-specific instructions on how to set this." />
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
        <SectionHeader id={sections[3].id}>
          <Heading level={3}>{sections[3].title}</Heading>
        </SectionHeader>
        <section>
          <Heading level={3}>
            <FormattedMessage defaultMessage="When Merge?" />
          </Heading>
          <WhenMerge />
          <Link
            primary
            to="https://blog.ethereum.org/2022/08/24/mainnet-merge-announcement/"
          >
            <FormattedMessage defaultMessage="View EF blog mainnet merge announcement" />
          </Link>
        </section>
        <section>
          <Heading level={3} id="testing-the-merge">
            <FormattedMessage defaultMessage="#TestingTheMerge" />
          </Heading>
          <Text className="mt20">
            <FormattedMessage
              defaultMessage="While waiting for the Mainnet transition to proof-of-stake, stakers are encouraged to participate in {testingTheMerge}. Goerli was recently the final public Ethereum testnet to successfully undergo The Merge, and will persist as a longstanding PoS testnet. Setting up a Goerli node can be a great way to learn more about operating a post-merge Ethereum node, and gain confidence in your setup."
              values={{
                testingTheMerge: (
                  <code>
                    #<FormattedMessage defaultMessage="TestingTheMerge" />
                  </code>
                ),
              }}
            />
          </Text>
          <Text className="mt20">
            <FormattedMessage
              defaultMessage="{networkBold} is a long-standing public testnet that began as a proof-of-authority chain, and has now undergone its transition to proof-of-stake via a successful Merge in August 2022. {network} is open for anyone to interact with, and will continue to be maintained after the Mainnet merge. Try interacting with some contracts or operating a validating node."
              values={{
                networkBold: <strong>Goerli</strong>,
                network: 'Goerli',
              }}
            />
          </Text>
          <ul className="sub-checklist-item">
            <li className="py5">
              <Text>
                <Link primary inline to="https://goerli.net/">
                  <FormattedMessage
                    defaultMessage="{network} homepage"
                    values={{ network: 'Goerli' }}
                  />
                </Link>
                {' - '}
                <FormattedMessage defaultMessage="Everything you need to get started with the network, including faucets" />
              </Text>
            </li>
            <li className="py5">
              <Text>
                <Link
                  primary
                  inline
                  to="https://notes.ethereum.org/@launchpad/goerli"
                >
                  <FormattedMessage
                    defaultMessage="How to run a node on {network}"
                    values={{ network: 'Goerli' }}
                  />
                </Link>
                {' - '}
                <FormattedMessage defaultMessage="Thorough guide to setting up a testnet node" />
              </Text>
            </li>
            <li className="py5">
              <Text>
                <Link primary inline to="https://goerli.launchpad.ethereum.org">
                  <FormattedMessage
                    defaultMessage="{network} Staking Launchpad"
                    values={{ network: 'Goerli' }}
                  />
                </Link>
                {' - '}
                <FormattedMessage
                  defaultMessage="{network} version of this page"
                  values={{ network: 'Goerli' }}
                />
              </Text>
            </li>
            <li className="py5">
              <Text>
                <Link
                  primary
                  inline
                  to="https://blog.ethereum.org/2022/07/27/goerli-prater-merge-announcement/"
                >
                  <FormattedMessage
                    defaultMessage="{site} {network} announcement"
                    values={{
                      site: <FormattedMessage defaultMessage="EF Blog" />,
                      network: 'Goerli',
                    }}
                  />
                </Link>
              </Text>
            </li>
          </ul>
          <Text className="mt20">
            <FormattedMessage
              defaultMessage="{networkBold} is a younger public testnet that has already undergone its transition to proof-of-stake after undergoing a successful merge upgrade in March 2022. {network} is open for anyone to interact with, and will continue to be maintained after the Mainnet merge. Try sending some ETH, interacting with some contracts, or deploying your own."
              values={{ networkBold: <strong>Kiln</strong>, network: 'Kiln' }}
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
                <FormattedMessage defaultMessage="Thorough guide For those who want more control and less hand-holding" />
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
                      site: <FormattedMessage defaultMessage="EF Blog" />,
                      network: 'Kiln',
                    }}
                  />
                </Link>
              </Text>
            </li>
          </ul>
          <Text className="mt20">
            <FormattedMessage
              defaultMessage="{networkBold} was the first longstanding public testnet to undergo The Merge, which occurred on June 8, 2022. Historically a proof-of-work testnet, {network} has now transitioned to proof-of-stake by merging its historical execution layer with a new beacon chain."
              values={{
                networkBold: <strong>Ropsten</strong>,
                network: 'Ropsten',
              }}
            />
          </Text>
          <Text className="mt20">
            <FormattedMessage
              defaultMessage="{network} is open for anyone to interact with, but is being deprecated moving forward and will not undergo any further network updates."
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
                      site: <FormattedMessage defaultMessage="EF Blog" />,
                      network: 'Ropsten',
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
          <Alert variant="info" className="mt40">
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
              values={{
                not: (
                  <em>
                    <FormattedMessage defaultMessage="not" />
                  </em>
                ),
              }}
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
              <Link
                primary
                inline
                to="https://geth.ethereum.org/docs/interface/merge"
              >
                <FormattedMessage defaultMessage="Go Ethereum - The Merge" />
              </Link>
            </li>
            <li className="py5">
              <Link
                primary
                inline
                to="https://docs.teku.consensys.net/en/latest/Concepts/Merge/"
              >
                <FormattedMessage defaultMessage="Teku - The Merge" />
              </Link>
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
