import React from 'react';
import styled from 'styled-components';
import _shuffle from 'lodash/shuffle';
import _sortBy from 'lodash/sortBy';
import { CheckBox } from 'grommet';
import { FormattedDate, FormattedMessage, useIntl } from 'react-intl';
import { FormNext, FormPrevious } from 'grommet-icons';
import { Link } from '../../components/Link';
import { PageTemplate } from '../../components/PageTemplate';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import {
  BEACONCHAIN_URL,
  IS_MAINNET,
  TESTNET_LAUNCHPAD_URL,
  TESTNET_LAUNCHPAD_NAME,
  TUTORIAL_URL,
  NETWORK_NAME,
} from '../../utils/envVars';
import { ClientCard } from '../Congratulations/ClientCard';
import PrysmaticBg from '../../static/prysmatic-bg.png';
import LighthouseBg from '../../static/lighthouse-bg.png';
import NimbusBg from '../../static/nimbus-bg.png';
import TekuBg from '../../static/teku-bg.png';
import BesuBg from '../../static/besu-bg.png';
import NethermindBg from '../../static/nethermind-bg.png';
import ErigonBg from '../../static/erigon-bg.png';
import GethBg from '../../static/geth-bg.png';
import { routesEnum } from '../../Routes';
import { Code } from '../../components/Code';
import { Alert } from '../../components/Alert';
import useIntlNetworkName from '../../hooks/useIntlNetworkName';

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
    margin-inline-start: 1.5rem;
  }
  .checkbox-label {
    margin-inline-start: 0.5rem;
  }
  ul {
    padding-inline-start: 0px;
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

const CodeSnippet = styled.div`
  padding: 10px;
  font-family: Courier, sans-serif;
  font-size: 1em;
  line-height: 1.3;
  color: #fff;
  background-color: #597ea3;
  border-radius: 6px;
  margin: 10px 0;
  direction: ltr;

  code {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const ClientContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 200px), 1fr));
  gap: 1rem;
  margin: 1.5rem 0 2.5rem;
`;

const Subtitle = styled.p`
  font-size: 20px;
  margin-bottom: 32px;
`;

const PortTable = styled.table`
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
`;

const ClientLayerContainer = styled.section`
  display: flex;
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

const RainbowHeader = styled(SectionHeader as any)`
  margin: 3rem 1rem 1rem;
  background-image: ${p =>
    `linear-gradient(to right, ${p.theme.rainbowLight})`};
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr));
  gap: 1rem;
  @media only screen and (max-width: ${p => p.theme.screenSizes.medium}) {
    flex-direction: column;
  }
`;

const Card = styled.div`
  padding: 24px;
  border: 1px solid ${p => p.theme.gray.dark};
  border-radius: 4px;
  width: 100%;
  background: white;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  @media only screen and (max-width: ${p => p.theme.screenSizes.medium}) {
    margin: 0px;
    margin-top: 16px;
  }

  &:hover {
    cursor: pointer;
    box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.15);
    transition: transform 0.1s;
    transform: scale(1.02);
  }
`;

const BoldGreen = styled.span`
  color: ${(p: { theme: any }) => p.theme.green.dark};
  font-size: 1.5rem;
  font-weight: bold;
  margin-inline-end: 10px;
`;

const StyledLink = styled(Link as any)`
  width: 100%;
`;

const IndentedText = styled(Text)`
  margin-inline-start: 20px;
`;

enum layerEnum {
  execution = 'execution',
  consensus = 'consensus',
}

interface Client {
  header: string;
  text: string;
  imgUrl: any;
  url: routesEnum;
  linkText: string;
  layer: layerEnum;
  discord: string;
  defaultTcp: number;
  defaultUdp: number;
  jwtUrl: string;
  feeRecipientUrl?: string;
  metricsUrl?: string;
}

const tutorialLinkBox = () => {
  if (TUTORIAL_URL !== null) {
    return (
      <Alert variant="warning" className="my40 mx15">
        <Heading level={4}>
          <FormattedMessage defaultMessage="Node Setup Tutorial" />
        </Heading>
        <Link to={TUTORIAL_URL} primary>
          <FormattedMessage
            defaultMessage="Check this document to learn how to run a node on {networkName}"
            values={{
              networkName: NETWORK_NAME,
            }}
          />
        </Link>
      </Alert>
    );
  }
  return null;
};

export const Checklist = () => {
  const { locale, formatMessage } = useIntl();
  const { consensusLayerName } = useIntlNetworkName();

  const defaultExecutionPorts: {
    defaultTcp: number;
    defaultUdp: number;
  } = {
    defaultTcp: 30303,
    defaultUdp: 30303,
  };

  const defaultConsensusPorts: {
    defaultTcp: number;
    defaultUdp: number;
  } = {
    defaultTcp: 9000,
    defaultUdp: 9000,
  };

  const clientInfo: Client[] = _shuffle([
    {
      header: 'Besu',
      text: formatMessage({
        defaultMessage:
          'Hyperledger Besu is an open-source Ethereum client developed under the Apache 2.0 license and written in Java.',
      }),
      imgUrl: BesuBg,
      url: routesEnum.besu,
      linkText: formatMessage({
        defaultMessage: 'Configure Besu',
      }),
      layer: layerEnum.execution,
      discord: 'https://discord.gg/hyperledger',
      ...defaultExecutionPorts,
      jwtUrl:
        'https://besu.hyperledger.org/en/stable/public-networks/reference/cli/options/#engine-jwt-secret',
    },
    {
      header: 'Nethermind',
      text: formatMessage({
        defaultMessage:
          'Nethermind is a robust client built on .NET core designed for performance, versatility and customizability.',
      }),
      imgUrl: NethermindBg,
      url: routesEnum.nethermind,
      linkText: formatMessage({
        defaultMessage: 'Configure Nethermind',
      }),
      layer: layerEnum.execution,
      discord: 'https://discord.gg/PaCMRFdvWT',
      ...defaultExecutionPorts,
      jwtUrl:
        'https://docs.nethermind.io/nethermind/first-steps-with-nethermind/running-nethermind-post-merge#jwt-secrets',
    },
    {
      header: 'Erigon',
      text: formatMessage({
        defaultMessage:
          'Erigon is an execution client on the efficiency frontier, written in Go.',
      }),
      imgUrl: ErigonBg,
      url: routesEnum.erigon,
      linkText: formatMessage({
        defaultMessage: 'Configure Erigon',
      }),
      layer: layerEnum.execution,
      discord: 'https://github.com/ledgerwatch/erigon#erigon-discord-server',
      ...defaultExecutionPorts,
      jwtUrl:
        'https://github.com/ledgerwatch/erigon#beacon-chain-consensus-layer',
    },
    {
      header: 'Geth',
      text: formatMessage({
        defaultMessage:
          'Geth is one of the three original implementations of the Ethereum protocol, written in Go.',
      }),
      imgUrl: GethBg,
      url: routesEnum.geth,
      linkText: formatMessage({
        defaultMessage: 'Configure Geth',
      }),
      layer: layerEnum.execution,
      discord: 'https://discord.gg/nthXNEv',
      ...defaultExecutionPorts,
      jwtUrl: 'https://geth.ethereum.org/docs/interface/consensus-clients',
    },
    {
      header: 'Lighthouse',
      text: formatMessage({
        defaultMessage:
          'Lighthouse is a consensus client implementation, written in Rust with a heavy focus on speed and security.',
      }),
      imgUrl: LighthouseBg,
      url: routesEnum.lighthouse,
      linkText: formatMessage({
        defaultMessage: 'Configure Lighthouse',
      }),
      layer: layerEnum.consensus,
      discord: 'https://discord.gg/uC7TuaH',
      ...defaultConsensusPorts,
      jwtUrl:
        'https://lighthouse-book.sigmaprime.io/merge-migration.html#connecting-to-an-execution-engine',
      feeRecipientUrl:
        'https://lighthouse-book.sigmaprime.io/suggested-fee-recipient.html',
      metricsUrl: 'https://github.com/sigp/lighthouse-metrics',
    },
    {
      header: 'Nimbus',
      text: formatMessage({
        defaultMessage:
          'Nimbus is a research project and a consensus client implementation for Ethereum designed to perform well on embedded systems and personal mobile devices.',
      }),
      imgUrl: NimbusBg,
      url: routesEnum.nimbus,
      linkText: formatMessage({
        defaultMessage: 'Configure Nimbus',
      }),
      layer: layerEnum.consensus,
      discord: 'https://discord.gg/YbTCNat',
      ...defaultConsensusPorts,
      jwtUrl:
        'https://nimbus.guide/eth1.html#3-pass-the-url-and-jwt-secret-to-nimbus',
      feeRecipientUrl: 'https://nimbus.guide/suggested-fee-recipient.html',
      metricsUrl: 'https://nimbus.guide/metrics-pretty-pictures.html',
    },
    {
      header: 'Prysm',
      text: formatMessage({
        defaultMessage:
          'Prysm is a Go consensus client implementation of the Ethereum protocol with a focus on usability, security, and reliability.',
      }),
      imgUrl: PrysmaticBg,
      url: routesEnum.prysm,
      linkText: formatMessage({
        defaultMessage: 'Configure Prysm',
      }),
      layer: layerEnum.consensus,
      discord: 'https://discord.gg/z9efH7e',
      defaultTcp: 13000,
      defaultUdp: 12000,
      jwtUrl: 'https://docs.prylabs.network/docs/execution-node/authentication',
      feeRecipientUrl:
        'https://docs.prylabs.network/docs/execution-node/fee-recipient',
      metricsUrl:
        'https://docs.prylabs.network/docs/prysm-usage/monitoring/grafana-dashboard/',
    },
    {
      header: 'Teku',
      text: formatMessage({
        defaultMessage:
          'PegaSys Teku is a Java-based Ethereum consensus client built to meet institutional needs and security requirements.',
      }),
      imgUrl: TekuBg,
      url: routesEnum.teku,
      linkText: formatMessage({
        defaultMessage: 'Configure Teku',
      }),
      layer: layerEnum.consensus,
      discord: 'https://discord.gg/7hPv2T6',
      ...defaultConsensusPorts,
      jwtUrl:
        'https://docs.teku.consensys.net/get-started/connect/mainnet#1-generate-the-shared-secret',
      feeRecipientUrl:
        'https://docs.teku.consensys.net/reference/cli#validators-proposer-default-fee-recipient',
      metricsUrl:
        'https://docs.teku.consensys.net/how-to/monitor/use-metrics',
    },
  ]);

  const formArrow = React.useMemo(
    () =>
      locale === 'ar' ? (
        <FormPrevious size="large" />
      ) : (
        <FormNext size="large" />
      ),
    [locale]
  );
  return (
    <PageTemplate
      title={formatMessage({ defaultMessage: 'Validator checklist' })}
    >
      <div id="top" />
      <Subtitle>
        <FormattedMessage defaultMessage="This checklist will help you understand the role of a validator and prepare you for the role." />
        <Text className="mt10">
          <FormattedMessage
            defaultMessage="Visit EthStaker on {discord} or {reddit} at any time during your setup for some friendly help!"
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
            description="{variables} are social media platform links to Discord and Reddit (do not translate names)"
          />
        </Text>
      </Subtitle>
      <CardContainer>
        <StyledLink to="#section-one" inline isTextLink={false}>
          <Card>
            <div>
              <Heading level={4} className="mb10">
                <FormattedMessage defaultMessage="Section 1" />
              </Heading>
              <BoldGreen>
                <FormattedMessage defaultMessage="Before you start" />
              </BoldGreen>
            </div>
            {formArrow}
          </Card>
        </StyledLink>
        <StyledLink to="#section-two" inline isTextLink={false}>
          <Card>
            <div>
              <Heading level={4} className="mb10">
                <FormattedMessage defaultMessage="Section 2" />
              </Heading>
              <BoldGreen>
                <FormattedMessage defaultMessage="During setup" />
              </BoldGreen>
            </div>
            {formArrow}
          </Card>
        </StyledLink>
        <StyledLink to="#section-three" inline isTextLink={false}>
          <Card>
            <div>
              <Heading level={4} className="mb10">
                <FormattedMessage defaultMessage="Section 3" />
              </Heading>
              <BoldGreen>
                <FormattedMessage defaultMessage="After depositing" />
              </BoldGreen>
            </div>
            {formArrow}
          </Card>
        </StyledLink>
      </CardContainer>
      <ChecklistPageStyles>
        <SectionHeader id="section-one">
          <Heading level={3}>
            <FormattedMessage defaultMessage="Section 1 - Before you start" />
          </Heading>
          <Text className="mt10">
            <FormattedMessage defaultMessage="Review this section before deciding to proceed with validator setup." />
          </Text>
        </SectionHeader>
        <Alert variant="warning" className="my40 mx15">
          <Heading level={4}>
            <FormattedMessage defaultMessage="Recommendation disclaimer" />
          </Heading>
          <Text className="mt20">
            <FormattedMessage defaultMessage="Hardware suggestions are an ever-evolving target. Current minimum requirements are likely to increase by an order of magnitude after the introduction of Danksharding. Do your own research before depositing funds." />
          </Text>
        </Alert>
        <section>
          <Heading level={3}>
            <FormattedMessage defaultMessage="Hard drive" />
          </Heading>
          <ul className="sub-checklist-item">
            <li className="py5">
              <Text>
                <FormattedMessage
                  defaultMessage="You need to run an {executionClient} as well as your
                  {consensusClient}."
                  values={{
                    executionClient: (
                      <Link
                        to="https://ethereum.org/en/glossary/#execution-client"
                        inline
                      >
                        <FormattedMessage defaultMessage="execution client" />
                      </Link>
                    ),
                    consensusClient: (
                      <Link
                        to="https://ethereum.org/en/glossary/#consensus-client"
                        inline
                      >
                        <FormattedMessage defaultMessage="consensus client" />
                      </Link>
                    ),
                  }}
                  description="{executionLayer} is a link labeled 'execution client'. {consensusLayer} is a link labeled 'consensus client'"
                />
              </Text>
            </li>
            <li className="py5">
              <Text>
                <FormattedMessage defaultMessage="Since the Merge, third-party providers (such as Infura and Alchemy) are no longer viable options to outsource execution layer responsibilities. All stakers must run both an execution and a consensus client to properly attest to the network." />
              </Text>
            </li>
            <li className="py5">
              <Text>
                <FormattedMessage
                  defaultMessage="As of {date}, you'll need ~1TB for the Mainnet execution chain data alone (growing at >1GB/day)."
                  values={{
                    date: (
                      <FormattedDate
                        value={new Date(2022, 4)}
                        year="numeric"
                        month="long"
                      />
                    ),
                  }}
                />
              </Text>
            </li>
            <li className="py5">
              <Text>
                <FormattedMessage
                  defaultMessage="Ethereum had its genesis on July 30, 2015. It is growing in size over time, and the introduction of Danksharding will also increase storage, memory, and bandwidth requirements."
                  values={{
                    date: (
                      <FormattedDate
                        value={new Date(Date.UTC(2015, 6, 30, 3, 26, 13))}
                        year="numeric"
                        month="long"
                        day="2-digit"
                      />
                    ),
                  }}
                />
              </Text>
            </li>
            <li className="py5">
              <Text>
                <FormattedMessage defaultMessage="You'll need SSD storage to consistently handle necessary read/write speeds." />
              </Text>
            </li>
            <li className="py5">
              <Text>
                <FormattedMessage defaultMessage="Be sure to account for enough space on your drive until you run maintenance on your node." />
              </Text>
            </li>
          </ul>
        </section>
        <section>
          <Heading level={3}>
            <FormattedMessage defaultMessage="CPU and RAM" />
          </Heading>
          <ul className="sub-checklist-item">
            <li className="py5">
              <Text>
                <FormattedMessage defaultMessage="Check with client documentation to ensure the hardware you want to use is sufficient and supported." />
              </Text>
            </li>
            <li className="py5">
              <Text>
                <FormattedMessage defaultMessage="Resource usage can vary significantly between clients. Research the different clients if you're working with resource constraints." />
              </Text>
            </li>
          </ul>
        </section>
        <section>
          <Heading level={3}>
            <FormattedMessage defaultMessage="Internet" />
          </Heading>
          <ul className="sub-checklist-item">
            <li className="py5">
              <Text>
                <FormattedMessage defaultMessage="Ideally your internet connection should be reliable and as close to 24/7 as possible without interruption." />
              </Text>
            </li>
            <li className="py5">
              <Text>
                <FormattedMessage defaultMessage="Ensure your bandwidth can't be throttled and isn't capped so your node stays in sync and will be ready to validate when called." />
              </Text>
            </li>
            <li className="py5">
              <Text>
                <FormattedMessage
                  defaultMessage="You need enough upload bandwidth too. As of {date} this is ~1.2-1.3 GB download and ~0.9-1 GB upload per hour, and is likely to increase."
                  values={{
                    date: (
                      <FormattedDate
                        value={new Date(2022, 4)}
                        year="numeric"
                        month="long"
                      />
                    ),
                  }}
                />
              </Text>
            </li>
          </ul>
          <Heading level={4} className="mt10">
            <FormattedMessage defaultMessage="Notes" />
          </Heading>
          <ul className="sub-checklist-item">
            <li className="py5">
              <Text>
                <FormattedMessage defaultMessage="Avoid overly-complicated setups and be aware of trade offs. Being offline for brief periods of time will result in small inactivity penalities, but will be recouped easily after being online again for about the same amount of time. Complicated power backups can add to the expense of your setup, and redundant backup validators can lead to a more serious penalty known as slashing." />{' '}
                <Link primary to="/faq#responsibilities" className="mt10">
                  <FormattedMessage defaultMessage="More on slashing risks" />
                </Link>
              </Text>
            </li>
            <li className="py5">
              <Text>
                <FormattedMessage defaultMessage="Syncing your execution client may take a few days in the worst-case scenario." />
              </Text>
            </li>
          </ul>
        </section>
        <SectionHeader id="section-two">
          <Heading level={3}>
            <FormattedMessage defaultMessage="Section 2 - During setup" />
            <Text className="mt10">
              <FormattedMessage defaultMessage="Use this as a reference during client setup to check off important steps." />
            </Text>
          </Heading>
        </SectionHeader>
        <section>
          <Heading level={3}>
            <FormattedMessage defaultMessage="Initial setup" />
          </Heading>
          <ul className="sub-checklist-item">
            <li className="py5">
              <Text>
                <FormattedMessage defaultMessage="Start by setting up your chosen hardware and operating system." />
              </Text>
            </li>
            <li className="py5">
              <Text>
                <FormattedMessage
                  defaultMessage="To maximize security and efficiency of your node, use dedicated
                    hardware to run your clients. This reduces risk of malware exposure and minimizes competition
                    for computing resources, ensuring your node handles the network load and its validator
                    responsibilities at all times."
                />
              </Text>
            </li>
          </ul>
        </section>
        <section>
          <Heading level={3}>
            <FormattedMessage defaultMessage="Node security" />
          </Heading>

          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage defaultMessage="I've secured the root account." />
              </Text>
            }
          />
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage defaultMessage="I've set up a firewall." />
              </Text>
            }
          />
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage defaultMessage="I've forwarded the necessary ports to the correct machine(s) from my router for both my EL and CL client (only open the ports that apply to your installations)." />
              </Text>
            }
          />
          <ClientLayerContainer>
            <PortTable>
              <thead>
                <tr>
                  <th>
                    <FormattedMessage defaultMessage="Execution Client" />
                  </th>
                  <th>
                    <FormattedMessage defaultMessage="Default Port" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {clientInfo
                  .filter(({ layer }) => layer === layerEnum.execution)
                  .sort((a, b) => b.defaultTcp - a.defaultTcp)
                  .map(({ header, defaultTcp, defaultUdp }) => (
                    <tr key={header}>
                      <td>{header}</td>
                      <td>
                        {defaultTcp === defaultUdp
                          ? `${defaultUdp} TCP/UDP`
                          : `${defaultTcp} TCP, ${defaultUdp} UDP`}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </PortTable>
            <PortTable>
              <thead>
                <tr>
                  <th>
                    <FormattedMessage defaultMessage="Consensus Client" />
                  </th>
                  <th>
                    <FormattedMessage defaultMessage="Default Port" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {clientInfo
                  .filter(({ layer }) => layer === layerEnum.consensus)
                  .map(({ header, defaultTcp, defaultUdp }) => (
                    <tr key={header}>
                      <td>{header}</td>
                      <td>
                        {defaultTcp === defaultUdp
                          ? `${defaultUdp} TCP/UDP`
                          : `${defaultTcp} TCP, ${defaultUdp} UDP`}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </PortTable>
          </ClientLayerContainer>
          <IndentedText>
            <Link
              primary
              to="https://www.cloudflare.com/learning/network-layer/what-is-a-computer-port/"
              className="mt10"
            >
              <FormattedMessage defaultMessage="Learn about ports in networking" />
            </Link>
          </IndentedText>
        </section>
        <section>
          <Heading level={3}>
            <FormattedMessage defaultMessage="Configure time sync" />
          </Heading>
          <Text className="mt20">
            <FormattedMessage
              defaultMessage="For {operatingSystem}"
              values={{
                operatingSystem: 'Ubuntu 20.04',
              }}
              description="Indicates which operating system the instructions are for"
            />
          </Text>
          <ul className="sub-checklist-item">
            <li className="py5">
              <Text>
                <FormattedMessage defaultMessage="Run the following command:" />
              </Text>
              <CodeSnippet>
                <code>timedatectl</code>
              </CodeSnippet>
            </li>
            <li className="py5">
              <Text>
                <FormattedMessage
                  defaultMessage="Check if {code1} is {code2}."
                  values={{
                    code1: <Code>NTP Service</Code>,
                    code2: <Code>active</Code>,
                  }}
                  description="{code} values are terminal outputs to look for, should not translate"
                />
              </Text>
            </li>
            <li className="py5">
              <Text>
                <FormattedMessage
                  defaultMessage="Check if {code1}, {code2}, and {code3} are all correct."
                  values={{
                    code1: <Code>Local time</Code>,
                    code2: <Code>Time zone</Code>,
                    code3: <Code>Universal time</Code>,
                  }}
                  description="{code} values are terminal outputs to look for to confirm system time"
                />
              </Text>
            </li>
            <li className="py5">
              <Text>
                <FormattedMessage
                  defaultMessage="If {code1} is not {code2}, run: {code3}"
                  values={{
                    code1: <Code>NTP Service</Code>,
                    code2: <Code>active</Code>,
                    code3: (
                      <CodeSnippet>
                        <code>sudo timedatectl set-ntp on</code>
                      </CodeSnippet>
                    ),
                  }}
                  description="{code} values are terminal outputs and commands."
                />
              </Text>
            </li>
            <li className="py5">
              <Text>
                <FormattedMessage
                  defaultMessage="If you see error message {code1}, you may need to install {code2} or {code3} package."
                  values={{
                    code1: <Code>Failed to set ntp: NTP not supported</Code>,
                    code2: <Code>chrony</Code>,
                    code3: <Code>ntp</Code>,
                  }}
                  description="{code} values are terminal outputs and commands."
                />
              </Text>
            </li>
            <li className="py5">
              <Text>
                <FormattedMessage defaultMessage="Note: by default, VMs may disable NTP so you may need to find a work-around for your environment." />
              </Text>
            </li>
          </ul>
          <CheckBox
            label={
              <Text className="checkbox-label" style={{ display: 'inherit' }}>
                <FormattedMessage defaultMessage="I've verified my server time matches the wall clock." />
              </Text>
            }
          />
          <ul className="sub-checklist-item">
            <li className="py5">
              <Text>
                <FormattedMessage
                  defaultMessage="Note: the RTC (Real-Time Clock) time may be set to your local timezone
                    instead of UTC, especially in a VM which has its clock configured on Windows."
                />
              </Text>
            </li>
          </ul>
        </section>
        <Alert variant="error" className="my40 mx15">
          <Heading level={4}>
            <FormattedMessage defaultMessage="Testnet practice" />
          </Heading>
          <Text className="mt20">
            <FormattedMessage defaultMessage="We strongly recommended you complete these steps on the current testnet before Mainnet." />
            {'  '}
            <Link inline primary to={TESTNET_LAUNCHPAD_URL}>
              {TESTNET_LAUNCHPAD_NAME}
            </Link>
          </Text>
        </Alert>
        <section>
          <Heading level={3} id="el-client">
            <FormattedMessage defaultMessage="Configure your execution client" />
          </Heading>
          <Link className="mt10" to="/faq" primary>
            <FormattedMessage defaultMessage="Review validator roles and responsibilities" />
          </Link>
          <ClientContainer>
            {clientInfo
              .filter(({ layer }) => layer === layerEnum.execution)
              .map(client => (
                <ClientCard
                  className="mt10"
                  header={client.header}
                  imgUrl={client.imgUrl}
                  text={client.text}
                  key={client.header}
                  url={client.url}
                  linkText={client.linkText}
                />
              ))}
          </ClientContainer>
          <Alert variant="warning" className="mt30 mb20">
            <Heading level={4}>
              <FormattedMessage defaultMessage="Remember" />
            </Heading>
            <Text className="mt20">
              <FormattedMessage defaultMessage="All stakers must operate an execution client with their consensus client." />
            </Text>
          </Alert>
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage
                  defaultMessage="I've installed and synced my {network} execution client (do not wait on this as it can take several days)."
                  values={{
                    network: IS_MAINNET ? (
                      <FormattedMessage defaultMessage="Mainnet" />
                    ) : (
                      TESTNET_LAUNCHPAD_NAME
                    ),
                  }}
                />
              </Text>
            }
          />
          {tutorialLinkBox()}
          <Heading level={4} className="mt10">
            <FormattedMessage defaultMessage="Recommended" />
          </Heading>
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage defaultMessage="I've joined my execution client's Discord server." />
              </Text>
            }
          />
          <Text>
            <b>
              <FormattedMessage defaultMessage="Discord:" />
            </b>{' '}
            {clientInfo
              .filter(
                ({ discord, layer }) =>
                  !!discord && layer === layerEnum.execution
              )
              .map(({ header, discord }, idx) => (
                <span key={header}>
                  {idx !== 0 && ' | '}
                  <Link primary inline to={discord!}>
                    {header}
                  </Link>
                </span>
              ))}
          </Text>
        </section>
        <section>
          <Heading level={3} id="cl-client">
            <FormattedMessage defaultMessage="Configure your consensus client" />
          </Heading>
          <ClientContainer>
            {clientInfo
              .filter(({ layer }) => layer === layerEnum.consensus)
              .map(client => (
                <ClientCard
                  className="mt10"
                  header={client.header}
                  imgUrl={client.imgUrl}
                  text={client.text}
                  key={client.header}
                  url={client.url}
                  linkText={client.linkText}
                />
              ))}
          </ClientContainer>
          {tutorialLinkBox()}
          <Alert variant="error" className="my40 mx15">
            <Heading level={4}>
              <FormattedMessage defaultMessage="Warning!" />
            </Heading>
            <Text className="mt20">
              <FormattedMessage
                defaultMessage="It is high risk to run your validator in multiple places. It will lead to a slashable event and ejection from the network. {learnMore}"
                values={{
                  learnMore: (
                    <Link primary inline to="/faq#responsibilities">
                      {formatMessage({
                        defaultMessage: 'More on slashing risks',
                      })}
                    </Link>
                  ),
                }}
              />
            </Text>
          </Alert>
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage
                  defaultMessage="I've installed the {latestRelease} of my consensus client."
                  values={{
                    latestRelease: (
                      <strong>
                        {formatMessage({
                          defaultMessage: 'latest stable software release',
                        })}
                      </strong>
                    ),
                  }}
                  description="{latestReleased} = 'latest stable software release', being styled in bold"
                />
              </Text>
            }
          />
          <Heading level={4} className="mt10">
            <FormattedMessage defaultMessage="Recommended" />
          </Heading>
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage defaultMessage="I've joined my consensus client's Discord server." />
              </Text>
            }
          />
          <Text>
            <b>
              <FormattedMessage defaultMessage="Discord:" />
            </b>{' '}
            {clientInfo
              .filter(
                ({ discord, layer }) =>
                  !!discord && layer === layerEnum.consensus
              )
              .map(({ header, discord }, idx) => (
                <span key={header}>
                  {idx !== 0 && ' | '}
                  <Link primary inline to={discord!}>
                    {header}
                  </Link>
                </span>
              ))}
          </Text>
        </section>
        <section>
          <Heading level={3}>
            <FormattedMessage defaultMessage="JWT Authentication" />
          </Heading>
          <Text className="mt20">
            <FormattedMessage
              defaultMessage="Communication between the execution layer and consensus layer occurs using the {engineApi}. This is a set of JSON RPC methods that can be used to communicate between the two client layers."
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
              defaultMessage="This communication is secured using a {jwt} secret, which is a secret key that is shared only between the two clients to authenticate one another. This shared JWT secret must be made available to each client (both execution and consensus clients) to allow them to communicate with one another properly."
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
          <Text className="mt20">
            <b>
              <FormattedMessage defaultMessage="Consensus JWT docs:" />
            </b>{' '}
            {_sortBy(clientInfo, 'header')
              .filter(({ layer }) => layer === layerEnum.consensus)
              .map(({ header, jwtUrl }, idx) => (
                <span key={header}>
                  {idx !== 0 && ' | '}
                  <Link to={jwtUrl} inline primary>
                    {header}
                  </Link>
                </span>
              ))}
          </Text>
          <Text className="mt20">
            <b>
              <FormattedMessage defaultMessage="Execution JWT docs:" />
            </b>{' '}
            {_sortBy(clientInfo, 'header')
              .filter(({ layer }) => layer === layerEnum.execution)
              .map(({ header, jwtUrl }, idx) => (
                <span key={header}>
                  {idx !== 0 && ' | '}
                  <Link to={jwtUrl} inline primary>
                    {header}
                  </Link>
                </span>
              ))}
          </Text>
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage defaultMessage="I've set up a shared JWT secret and made it available to both my execution client, and my consensus client (beacon node)" />
              </Text>
            }
          />
        </section>
        <section>
          <Heading level={3}>
            <FormattedMessage defaultMessage="Set withdrawal address" />
          </Heading>
          <Text className="mt20">
            <FormattedMessage
              defaultMessage="Stakers must set a withdrawal address to unlock reward payments from the consensus layer.
              This is set when generating your validator keys."
              values={{
                eth1WithdrawalAddress: <Code>--eth1-withdrawal-address</Code>,
              }}
            />
          </Text>
          <Alert variant="warning" className="my30">
            <Text>
              <FormattedMessage
                defaultMessage="If you do not provide a withdrawal address prior to depositing, you will have to perform an
                additional step to update your keys and enable withdrawals. Funds will be locked in the meantime."
              />
            </Text>
          </Alert>
          <Text className="mt20">
            <Link inline primary to="/withdrawals">
              <FormattedMessage defaultMessage="More on staking withdrawals" />
            </Link>
          </Text>
          <CheckBox
            label={
              <div className="flex flex-column">
                <Text className="checkbox-label mb10">
                  <FormattedMessage
                    defaultMessage="I provided an Ethereum address when generating my {depositData} file before depositing where I would
                    like all validator rewards and withdrawals to be deposited into."
                    values={{
                      depositData: (
                        <Code>{`deposit_data<timestamp>.json`}</Code>
                      ),
                    }}
                  />
                </Text>
                <Text className="checkbox-label mb10">
                  <FormattedMessage
                    defaultMessage="If not, I've submitted a {btec} message signed with my BLS withdrawal keys to update my withdrawal credentials."
                    values={{ btec: <Code>BLSToExecutionChange</Code> }}
                  />
                </Text>
              </div>
            }
          />
        </section>
        <section>
          <Heading level={3}>
            <FormattedMessage defaultMessage="Set fee recipient" />
          </Heading>
          <Text className="mt20">
            <FormattedMessage defaultMessage="Stakers must provide a fee recipient address to their consensus client in order to receive transaction fee rewards. This is a normal Ethereum address that you're used to." />
          </Text>
          <Alert variant="warning" className="my30">
            <Text>
              <FormattedMessage defaultMessage="If you do not provide an address to your client, you will not receive transaction fees when your validator proposes blocks." />
            </Text>
          </Alert>
          <Text className="mt20">
            <FormattedMessage defaultMessage="See your consensus client documentation for client-specific instructions on how to set this." />
          </Text>
          <Text className="mt20">
            <b>
              <FormattedMessage defaultMessage="Fee recipient docs:" />
            </b>{' '}
            {_sortBy(clientInfo, 'header')
              .filter(
                ({ layer, feeRecipientUrl }) =>
                  layer === layerEnum.consensus && !!feeRecipientUrl
              )
              .map(({ header, feeRecipientUrl }, idx) => (
                <>
                  <span key={header}>
                    {idx !== 0 && ' | '}
                    <Link to={feeRecipientUrl!} inline primary>
                      {header}
                    </Link>
                  </span>
                </>
              ))}
          </Text>
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage defaultMessage="I've provided an Ethereum address to my validator where I would like my fee rewards to be deposited." />
              </Text>
            }
          />
        </section>
        <section>
          <Heading level={3}>
            <FormattedMessage defaultMessage="Consensus Layer Beacon Node (BN)" />
          </Heading>
          <Heading level={4} className="mt10">
            <FormattedMessage defaultMessage="Required" />
          </Heading>
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage defaultMessage="I'm able to connect my consensus client to my execution client via HTTP API(s)." />
              </Text>
            }
          />
          <ul className="sub-checklist-item">
            <li className="py5">
              <Text>
                <FormattedMessage defaultMessage="Verify it with the following command to check if it returns the client version correctly:" />
              </Text>
              <CodeSnippet>
                <code>
                  {`curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' http://<YourServerLocation>:8545`}
                </code>
              </CodeSnippet>
            </li>
          </ul>
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage
                  defaultMessage="I've synced my beacon node on {consensusLayerName}."
                  values={{ consensusLayerName }}
                />
              </Text>
            }
          />
          <ul className="sub-checklist-item">
            <li className="py5">
              <Text>
                <FormattedMessage defaultMessage="Make sure that your node has more than 20 peers." />
              </Text>
            </li>
          </ul>
        </section>
        <section>
          <Heading level={3}>
            <FormattedMessage defaultMessage="Consensus Layer Validator Client (VC)" />
          </Heading>
          <Heading level={4} className="mt10">
            <FormattedMessage defaultMessage="Required" />
          </Heading>
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage defaultMessage="I've imported my keystore(s) into my validator client." />
              </Text>
            }
          />
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage
                  defaultMessage="I've ensured my keystore(s) is/are {boldCaution}."
                  values={{
                    boldCaution: (
                      <strong>
                        {formatMessage({
                          defaultMessage:
                            'only stored on one validator machine',
                        })}
                      </strong>
                    ),
                  }}
                  description="{boldCaution} is states 'only stored on one validator machine', a bolded caution statement to users"
                />
              </Text>
            }
          />
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage defaultMessage="I've started running my validator client." />
              </Text>
            }
          />
        </section>
        <SectionHeader id="section-three">
          <Heading level={3}>
            <FormattedMessage defaultMessage="Section 3 - After depositing" />
            <Text className="mt10">
              <FormattedMessage defaultMessage="Protect your funds using monitoring software, and learn how to handle different real world scenarios." />
            </Text>
          </Heading>
          <Alert variant="info" className="mt20">
            <FormattedMessage defaultMessage="These steps are optional but are recommended to optimize your node." />
          </Alert>
        </SectionHeader>
        <section>
          <Heading level={3}>
            <FormattedMessage defaultMessage="Monitoring" />
          </Heading>
          <Heading level={4} className="my10">
            <FormattedMessage defaultMessage="Prometheus and Grafana monitor" />
          </Heading>
          <Text>
            <FormattedMessage
              defaultMessage="The clients support Prometheus and Grafana to help you
                visualize important real-time metrics about your validator."
            />
            <Text className="my10">
              <b>
                <FormattedMessage defaultMessage="Monitoring docs:" />
              </b>{' '}
              {_sortBy(clientInfo, 'header')
                .filter(({ metricsUrl }) => !!metricsUrl)
                .map(({ header, metricsUrl }, idx) => (
                  <span key={header}>
                    {idx !== 0 && ' | '}
                    <Link to={metricsUrl!} inline primary>
                      {header}
                    </Link>
                  </span>
                ))}
            </Text>
          </Text>
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage
                  defaultMessage="I've set up my {prometheus} service."
                  values={{
                    prometheus: (
                      <Link primary inline to="https://prometheus.io/">
                        Prometheus
                      </Link>
                    ),
                  }}
                  description="{prometheus} is 'Prometheus' service, with link to its homepage (do not translate name)"
                />
              </Text>
            }
          />
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage
                  defaultMessage="I've set up my {grafana} service."
                  values={{
                    grafana: (
                      <Link primary inline to="https://grafana.com/">
                        Grafana
                      </Link>
                    ),
                  }}
                  description="{grafana} is 'Grafana' service, with link to its homepage (do not translate name)"
                />
              </Text>
            }
          />
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage
                  defaultMessage="I've imported the dashboard config to my Grafana server
                    and double checked that my node is alive."
                />
              </Text>
            }
          />
        </section>
        <section>
          <Heading level={3}>
            <FormattedMessage defaultMessage="Testnet simulations" />
          </Heading>
          <Text className="my10">
            <FormattedMessage
              defaultMessage="While validating on the testnet, perform these simulations to learn more about your
                node, and better prepare yourself for Mainnet:"
            />
          </Text>
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage
                  defaultMessage="I've simulated how to manually stop and restart my Beacon Node (BN)
                    and Validator Client (VC) gracefully."
                />
              </Text>
            }
          />
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage defaultMessage="I've simulated power loss (server and internet) and automatic resumption." />
              </Text>
            }
          />
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage defaultMessage="I've simulated how to safely migrate from one consensus client to another." />
              </Text>
            }
          />
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage defaultMessage="I've simulated how to safely migrate from one execution client to another." />
              </Text>
            }
          />
        </section>
        <section>
          <Heading level={3}>
            <FormattedMessage defaultMessage="Advanced system architecture" />
          </Heading>
          <ul className="sub-checklist-item">
            <li className="py5">
              <Text>
                <FormattedMessage
                  defaultMessage="To avoid exposing your validator identity to the network, you can use
                    a trustworthy VPN to help reduce the risk of revealing your IP address."
                />
              </Text>
            </li>
            <li className="py5">
              <Text>
                <FormattedMessage
                  defaultMessage="Moreover, you can set your Validator Client (VC) and Beacon Node (BN)
                    on separate machines and IPs so that even if your beacon node is vulnerable, your 
                    keystore is stored on a different machine."
                />
              </Text>
            </li>
          </ul>
        </section>
        <section>
          <Heading level={3} className="mt10">
            <FormattedMessage defaultMessage="Graffiti" />
          </Heading>{' '}
          <Text className="mt10">
            <FormattedMessage
              defaultMessage="You can use your validator client's graffiti flag to add a personal
                touch to your proposed blocks (some text of your choice). You will be able to see
                it using {beaconchain} or {beaconscan} blockchain explorers."
              values={{
                beaconchain: (
                  <Link primary inline to={BEACONCHAIN_URL}>
                    Beaconcha.in
                  </Link>
                ),
                beaconscan: (
                  <Link primary inline to="https://beaconscan.com/">
                    BeaconScan
                  </Link>
                ),
              }}
              description="{variables} are Beacon Chain block explorers, with links to each (do not translate names)"
            />
          </Text>
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage defaultMessage="I've set my graffiti flag." />
              </Text>
            }
          />
        </section>
        <RainbowHeader>
          <FormattedMessage
            defaultMessage="If you have questions, EthStaker community is a good place to get help!
                You can find support on {discord} or {reddit}."
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
            description="{variables} social media platform links to Discord and Reddit (do not translate names)"
          />
        </RainbowHeader>
      </ChecklistPageStyles>
    </PageTemplate>
  );
};
