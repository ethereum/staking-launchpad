import React from 'react';
import styled from 'styled-components';
import _shuffle from 'lodash/shuffle';
import { CheckBox } from 'grommet';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from '../../components/Link';
import { PageTemplate } from '../../components/PageTemplate';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import { ETH2_NETWORK_NAME, IS_MAINNET } from '../../utils/envVars';
import { ClientCard } from '../Congratulations/ClientCard';
import PrysmaticBg from '../../static/prysmatic-bg.png';
import LighthouseBg from '../../static/lighthouse-bg.png';
import NimbusBg from '../../static/nimbus-bg.png';
import TekuBg from '../../static/teku-bg.png';
import { routesEnum } from '../../Routes';
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

const CodeSnippet = styled.div`
  padding: 10px;
  font-family: Courier, sans-serif;
  font-size: 1em;
  line-height: 1.3;
  color: #fff;
  background-color: #597ea3;
  border-radius: 6px;
  margin: 10px 0;

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
  color: ${(p: { theme: any; fontSize: number }) => p.theme.green.dark};
  font-size: ${(p: { theme: any; fontSize: number }) => p.fontSize}px;
  font-weight: bold;
`;

const StyledLink = styled(Link as any)`
  width: 100%;
`;

interface Client {
  header: string;
  text: string;
  imgUrl: any;
  url: routesEnum;
  linkText: string;
}

export const Checklist = () => {
  const { formatMessage } = useIntl();
  const clientInfo: Client[] = _shuffle([
    {
      header: 'Lighthouse',
      text: formatMessage({
        defaultMessage:
          'Lighthouse is a Ethereum 2.0 implementation, written in Rust with a heavy focus on speed and security.',
      }),
      imgUrl: LighthouseBg,
      url: routesEnum.lighthouse,
      linkText: formatMessage({
        defaultMessage: 'Configure Lighthouse →',
      }),
    },
    {
      header: 'Nimbus',
      text: formatMessage({
        defaultMessage:
          'Nimbus is a research project and a client implementation for Ethereum 2.0 designed to perform well on embedded systems and personal mobile devices.',
      }),
      imgUrl: NimbusBg,
      url: routesEnum.nimbus,
      linkText: formatMessage({
        defaultMessage: 'Configure Nimbus →',
      }),
    },
    {
      header: 'Prysm',
      text: formatMessage({
        defaultMessage:
          'Prysm is a Go implementation of Ethereum 2.0 protocol with a focus on usability, security, and reliability.',
      }),
      imgUrl: PrysmaticBg,
      url: routesEnum.prysm,
      linkText: formatMessage({
        defaultMessage: 'Configure Prysm →',
      }),
    },
    {
      header: 'Teku',
      text: formatMessage({
        defaultMessage:
          'PegaSys Teku is a Java-based Ethereum 2.0 client built to meet institutional needs and security requirements.',
      }),
      imgUrl: TekuBg,
      url: routesEnum.teku,
      linkText: formatMessage({
        defaultMessage: 'Configure Teku →',
      }),
    },
  ]);

  return (
    <PageTemplate
      title={formatMessage({ defaultMessage: 'Eth2 validator checklist' })}
    >
      <div id="top" />
      <Subtitle>
        <FormattedMessage defaultMessage="This checklist will help you understand the role of a validator and prepare you for the role." />
        <Text className="mt10">
          <FormattedMessage
            defaultMessage="Visit EthStaker on {discord} or {reddit} at any time during your setup for some friendly help!"
            values={{
              discord: (
                <Link primary inline to="https://invite.gg/ethstaker">
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
            <Heading level={4} className="mb10">
              <FormattedMessage defaultMessage="Section 1" />
            </Heading>
            <BoldGreen className="mr10" fontSize={24}>
              <FormattedMessage defaultMessage="Before you start" />
            </BoldGreen>
          </Card>
        </StyledLink>
        <StyledLink to="#section-two" inline isTextLink={false}>
          <Card>
            <Heading level={4} className="mb10">
              <FormattedMessage defaultMessage="Section 2" />
            </Heading>
            <BoldGreen className="mr10" fontSize={24}>
              <FormattedMessage defaultMessage="During setup" />
            </BoldGreen>
          </Card>
        </StyledLink>
        <StyledLink to="#section-three" inline isTextLink={false}>
          <Card>
            <Heading level={4} className="mb10">
              <FormattedMessage defaultMessage="Section 3" />
            </Heading>
            <BoldGreen className="mr10" fontSize={24}>
              <FormattedMessage defaultMessage="After depositing" />
            </BoldGreen>
          </Card>
        </StyledLink>
      </CardContainer>
      <ChecklistPageStyles>
        <SectionHeader id="section-one">
          <Heading level={3}>
            <FormattedMessage defaultMessage="Section 1 - Before you start" />
          </Heading>
          <Text className="mt10">
            <FormattedMessage defaultMessage="Review this section before deciding to proceed with validator setup" />
          </Text>
        </SectionHeader>
        <section>
          <Heading level={4}>
            <FormattedMessage defaultMessage="Recommendation disclaimer" />
          </Heading>
          <ul className="sub-checklist-item">
            <li className="py5">
              <Text>
                <FormattedMessage
                  defaultMessage="Hardware suggestions are an ever evolving target. Current
                    minimum requirements are likely to increase by an order of magnitude after the merge and 
                    introduction of shard chains. Do your own research before depositing funds."
                />
              </Text>
            </li>
          </ul>
        </section>
        <section>
          <Heading level={3}>
            <FormattedMessage defaultMessage="Hard drive" />
          </Heading>
          <ul className="sub-checklist-item">
            <li className="py5">
              <Text>
                <FormattedMessage
                  defaultMessage="In order to process incoming validator deposits from the Eth1
                    chain, you will need to run an Eth1 client in parallel to your
                    Eth2 client. While it is possible to use a third-party service
                    like Infura, we recommend running your own client in order to
                    ensure the network stays as decentralised as possible."
                />
              </Text>
            </li>
            <li className="py5">
              <Text>
                <FormattedMessage defaultMessage="As of February 2021, ~400GB is needed for the Eth1 mainnet chaindata alone (growing at ~1GB/day)." />
              </Text>
            </li>
            <li className="py5">
              <Text>
                <FormattedMessage
                  defaultMessage="The Beacon chain had its genesis on 01-Dec-2021. It is growing in size over time, and the
                    introduction of sharding will also increase storage, memory and bandwidth requirements."
                />
              </Text>
            </li>
            <li className="py5">
              <Text>
                <FormattedMessage defaultMessage="SSD storage is required to consistently handle necessary read/write speeds." />
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
                <FormattedMessage defaultMessage="Check with client documentation to ensure the hardware you anticipate using is sufficient and supported." />
              </Text>
            </li>
            <li className="py5">
              <Text>
                <FormattedMessage defaultMessage="Resource usage can vary significantly between clients. It is worth researching the different clients if you're working with resource constraints." />
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
                <FormattedMessage defaultMessage="Bandwidth should not be throttled or capped to ensure node stays in sync and ready to validate when called." />
              </Text>
            </li>
            <li className="py5">
              <Text>
                <FormattedMessage defaultMessage="Upload bandwidth is also important, and as of February 2021 this is ~700-800 MB/hour, and anticipated to increase." />
              </Text>
            </li>
          </ul>
          <Heading level={4} className="mt10">
            <FormattedMessage defaultMessage="Notes" />
          </Heading>
          <ul className="sub-checklist-item">
            <li className="py5">
              <Text>
                <FormattedMessage
                  defaultMessage="Avoid overly complicated setups and be aware of trade offs. Being offline for brief periods of time will result in small
                    inactivity penalities, but will be recouped easily after being online again for about the same amount of time. Complicated power backups
                    can add to the expense of your setup, and redundant backup validators can lead to slashing."
                />
              </Text>
            </li>
            <li className="py5">
              <Text>
                <FormattedMessage defaultMessage="Syncing your Eth1 client may take a few days in the worst-case scenario." />
              </Text>
            </li>
          </ul>
        </section>
        <SectionHeader id="section-two">
          <Heading level={3}>
            <FormattedMessage defaultMessage="Section 2 - During setup" />
            <Text className="mt10">
              <FormattedMessage defaultMessage="Use this as a reference during client setup to check off important steps" />
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
                  defaultMessage="To maximize security and efficiency of your node, it is best to use dedicated
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
                <FormattedMessage defaultMessage="I have secured the root account" />
              </Text>
            }
          />
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage defaultMessage="I have set up a firewall" />
              </Text>
            }
          />
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage
                  defaultMessage="I have forwarded the necessary ports to the correct machine(s)
                    from my router (Only open the ports that apply to your installation)"
                />
              </Text>
            }
          />
          <PortTable>
            <thead>
              <tr>
                <th>
                  <FormattedMessage defaultMessage="Service" />
                </th>
                <th>
                  <FormattedMessage defaultMessage="Default Port" />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Geth</td>
                <td>30303 TCP/UDP</td>
              </tr>
              <tr>
                <td>Lighthouse</td>
                <td>9000 TCP/UDP</td>
              </tr>
              <tr>
                <td>Nimbus</td>
                <td>9000 UDP/TCP</td>
              </tr>
              <tr>
                <td>Prysm</td>
                <td>12000 UDP, 13000 TCP</td>
              </tr>
              <tr>
                <td>Teku</td>
                <td>9000 TCP/UDP</td>
              </tr>
            </tbody>
          </PortTable>
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
                  defaultMessage="If you see error message {code1} , you may need to install {code2} or {code3} package."
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
                <FormattedMessage defaultMessage="Note: by default, VMs may disable NTP so you may need to find a work-around for your environment" />
              </Text>
            </li>
          </ul>
          <CheckBox
            label={
              <Text className="checkbox-label" style={{ display: 'inherit' }}>
                <FormattedMessage defaultMessage="I have verified my server time matches the wall clock" />
              </Text>
            }
          />
          <ul className="sub-checklist-item">
            <li className="py5">
              <Text>
                <FormattedMessage
                  defaultMessage="Note: the RTC (Real-Time Clock) time may be set to your local timezone
                    instead of UTC, especially in a VM which has clock configured on Windows"
                />
              </Text>
            </li>
          </ul>
        </section>
        <Alert variant="error" className="my40 mx15">
          <Heading level={3}>
            <FormattedMessage defaultMessage="Testnet practice" />
          </Heading>
          <Text className="mt20">
            <FormattedMessage
              defaultMessage="Strongly recommended these steps be completed on the current testnet
                prior to advancing to mainnet"
            />
          </Text>
        </Alert>
        <section>
          <Heading level={3}>
            <FormattedMessage defaultMessage="Configure your Eth1 Client" />
          </Heading>
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage
                  defaultMessage="I have installed and synced my Eth1 node on {network} (do not wait on this as it can take several days)"
                  values={{
                    network: IS_MAINNET ? 'mainnet' : 'goerli',
                  }}
                />
              </Text>
            }
          />
        </section>
        <section>
          <Heading level={3}>
            <FormattedMessage defaultMessage="Configure your Eth2 client" />
          </Heading>
          <Link className="mt10" to="/faq" primary>
            <FormattedMessage defaultMessage="Learn more about the roles and responsibilities of Eth2 Validators" />
          </Link>
          <ClientContainer>
            {clientInfo.map(client => (
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
          <Alert variant="error" className="mt30 mb20">
            <Heading level={3}>
              <FormattedMessage defaultMessage="Warning!" />
            </Heading>
            <Text className="mt20">
              <FormattedMessage
                defaultMessage="It is high risk to run your Eth2 validator in multiple places. It will lead to a slashable event and ejection from the network. {learnMore}"
                values={{
                  learnMore: (
                    <Link primary inline to="/faq#responsibilities">
                      {formatMessage({
                        defaultMessage: 'Learn more about slashing →',
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
                  defaultMessage="I have installed the {latestRelease} of my Eth2 client"
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
        </section>
        <section>
          <Heading level={3}>
            <FormattedMessage defaultMessage="Eth2 Beacon Node (BN)" />
          </Heading>
          <Heading level={4} className="mt10">
            <FormattedMessage defaultMessage="Required" />
          </Heading>
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage defaultMessage="My Eth2 beacon node is able to connect to my Eth1 client via HTTP API(s)" />
              </Text>
            }
          />
          <ul className="sub-checklist-item">
            <li className="py5">
              <Text>
                <FormattedMessage defaultMessage="Note: you can verify it with the following command to check if it returns the client version correctly" />
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
                  defaultMessage="I have synced my Eth2 beacon node on {ETH2_NETWORK_NAME}"
                  values={{ ETH2_NETWORK_NAME }}
                  description="{ETH2_NETWORK_NAME} is name of network, do not translate"
                />
              </Text>
            }
          />
          <ul className="sub-checklist-item">
            <li className="py5">
              <Text>
                <FormattedMessage defaultMessage="Note: check that your node has greater than 20 peers" />
              </Text>
            </li>
          </ul>
          <Heading level={4} className="mt10">
            <FormattedMessage defaultMessage="Recommended" />
          </Heading>
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage defaultMessage="I have joined my client's Discord chat" />
              </Text>
            }
          />
          <Text className="ml20">
            <Link primary inline to="https://discord.gg/uC7TuaH">
              Lighthouse
            </Link>{' '}
            |{' '}
            <Link primary inline to="https://discord.gg/YbTCNat">
              Nimbus
            </Link>{' '}
            |{' '}
            <Link primary inline to="https://discord.gg/z9efH7e">
              Prysm
            </Link>{' '}
            |{' '}
            <Link primary inline to="https://discord.gg/7hPv2T6">
              Teku
            </Link>
          </Text>
        </section>
        <section>
          <Heading level={3}>
            <FormattedMessage defaultMessage="Eth2 Validator Client (VC)" />
          </Heading>
          <Heading level={4} className="mt10">
            <FormattedMessage defaultMessage="Required" />
          </Heading>
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage defaultMessage="I have imported my keystore(s) into my Eth2 validator client" />
              </Text>
            }
          />
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage
                  defaultMessage="I have ensured my keystore(s) is/are {boldCaution}"
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
                <FormattedMessage defaultMessage="I have started running my validator client" />
              </Text>
            }
          />
        </section>
        <SectionHeader id="section-three">
          <Heading level={3}>
            <FormattedMessage defaultMessage="Section 3 - After depositing" />
            <Text className="mt10">
              <FormattedMessage defaultMessage="Protect your funds using monitoring software, and learn how to handle different real world scenarios" />
            </Text>
          </Heading>
          <Alert variant="info" className="mt20">
            <FormattedMessage defaultMessage="The last items, though not required for your validator to function, are recommended to optimize your node" />
          </Alert>
        </SectionHeader>
        <section>
          <Heading level={3}>
            <FormattedMessage defaultMessage="Monitoring" />
          </Heading>
          <Heading level={4} className="my10">
            <FormattedMessage defaultMessage="Prometheus + Grafana monitor" />
          </Heading>
          <Text>
            <FormattedMessage
              defaultMessage="The Eth2 clients support Prometheus + Grafana to help you
                visualise important real-time metrics concerning your validator. You can
                find client specific instructions here: {lighthouse} | {nimbus} | {prysm} | {teku}"
              values={{
                lighthouse: (
                  <Link
                    primary
                    inline
                    to="https://github.com/sigp/lighthouse-metrics"
                  >
                    Lighthouse
                  </Link>
                ),
                nimbus: (
                  <Link
                    primary
                    inline
                    to="https://status-im.github.io/nimbus-eth2/metrics-pretty-pictures.html"
                  >
                    Nimbus
                  </Link>
                ),
                prysm: (
                  <Link
                    primary
                    inline
                    to="https://docs.prylabs.network/docs/prysm-usage/monitoring/grafana-dashboard/"
                  >
                    Prysm
                  </Link>
                ),
                teku: (
                  <Link
                    primary
                    inline
                    to="https://docs.teku.consensys.net/en/latest/HowTo/Monitor/Metrics/"
                  >
                    Teku
                  </Link>
                ),
              }}
              description="{variables} are client names, each linking to documentation (do not translate names)"
            />
          </Text>
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage
                  defaultMessage="I have set up my {prometheus} service"
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
                  defaultMessage="I have set up my {grafana} service"
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
                  defaultMessage="I have imported the dashboard config to my Grafana server
                    and double checked that my node is alive"
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
                node, and better prepare yourself for mainnet:"
            />
          </Text>
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage
                  defaultMessage="I have simulated how to manually stop and restart my Beacon Node (BN)
                    and Validator Client (VC) gracefully"
                />
              </Text>
            }
          />
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage defaultMessage="I have simulated power loss (server and internet) and automatic resumption" />
              </Text>
            }
          />
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage defaultMessage="I have simulated how to migrate from one Eth2 client to another Eth2 client" />
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
          {/* Translate "Graffiti"? */}
          <Heading level={4} className="mt10">
            Graffiti
          </Heading>{' '}
          <Text className="mt10">
            <FormattedMessage
              defaultMessage="You can use your validator client's graffiti flag to add a personal
                touch to your proposed blocks (some text of your choice). You will be able to see
                it using {beaconchain} or {beaconscan} blockchain explorers."
              values={{
                beaconchain: (
                  <Link primary inline to="https://beaconcha.in/">
                    Beaconcha.in
                  </Link>
                ),
                beaconscan: (
                  <Link primary inline to="https://beaconscan.com/">
                    BeaconScan
                  </Link>
                ),
              }}
              description="{variables} are beacon chain block explorers, with links to each (do not translate names)"
            />
          </Text>
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage defaultMessage="I have set my graffiti flag" />
              </Text>
            }
          />
        </section>
        <RainbowHeader>
          <Text>
            <FormattedMessage
              defaultMessage="If you have questions, EthStaker community is a good place to get help!
                You can find support on {discord} or {reddit}."
              values={{
                discord: (
                  <Link primary inline to="https://invite.gg/ethstaker">
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
          </Text>
        </RainbowHeader>
      </ChecklistPageStyles>
    </PageTemplate>
  );
};
