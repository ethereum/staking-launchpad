import React from 'react';
import styled from 'styled-components';
import _shuffle from 'lodash/shuffle';
import { Link } from '../../components/Link';
import { PageTemplate } from '../../components/PageTemplate';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import { CheckBox } from 'grommet';
import { ETH2_NETWORK_NAME, IS_MAINNET } from '../../utils/envVars';
import { ClientCard } from '../Congratulations/ClientCard';
import PrysmaticBg from '../../static/prysmatic-bg.png';
import LighthouseBg from '../../static/lighthouse-bg.png';
import NimbusBg from '../../static/nimbus-bg.png';
import TekuBg from '../../static/teku-bg.png';
import { routesEnum } from '../../Routes';
import { Code } from '../../components/Code';
import { FormattedMessage, useIntl } from 'react-intl';

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
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
  padding: 1rem;
  @media screen and (max-width: 1080px) {
    flex-direction: column;
  }
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
    <PageTemplate title="Eth2 validator checklist">
      <Subtitle>
        <FormattedMessage defaultMessage="This checklist will help you understand the role of a validator and prepare you for the role." />
      </Subtitle>
      <ChecklistPageStyles>
        <section>
          <Heading level={3}>Hardware</Heading>
          <Heading level={4}>Recommended</Heading>
          <ul className="sub-checklist-item">
            <li className="py5">
              <Text>
                <FormattedMessage
                  defaultMessage="In order to process incoming validator deposits from the eth1
                    chain, you will need to run an eth1 client in parallel to your
                    Eth2 client. While it is possible to use a third-party service
                    like Infura, we recommend running your own client in order to
                    ensure the network stays as decentralised as possible."
                />
              </Text>
            </li>
            <li className="py5">
              <Text>
                <FormattedMessage
                  defaultMessage="For example, you need at least ~400 GB SSD to run Geth sync on
                    {mainnet} in February 2021, assuming you move the {ancient} directory on a
                    different drive. Have in mind that Geth {chaindata} grows with ~1 GB per day,
                    so you should account for enough space on your SSD and HDD until you run
                    maintenance on the node."
                  values={{
                    mainnet: <em>mainnet</em>,
                    ancient: <em>ancient</em>,
                    chaindata: <em>chaindata</em>,
                  }}
                  description="The {mainnet}, {ancient} and {chaindata} values are those same words but with emphasis styling"
                />
              </Text>
            </li>
            <li className="py5">
              <Text>
                <FormattedMessage
                  defaultMessage="{note}: it may take day(s) to sync the Eth1 client in the worst-case scenario."
                  values={{
                    note: <strong>Note</strong>,
                  }}
                  description="{note} is just 'Note' in bold to start the line"
                />
              </Text>
            </li>
          </ul>
        </section>
        <section>
          <Heading level={3}>
            <FormattedMessage defaultMessage="Security" />
          </Heading>
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage defaultMessage="I have secured the root account." />
              </Text>
            }
          />
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage defaultMessage="I have hardened ssh on a random port." />
              </Text>
            }
          />
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage defaultMessage="I have set up a firewall." />
              </Text>
            }
          />
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage
                  defaultMessage="I have forwarded the necessary ports from my router to the
                    correct machine(s). Only open the ports that apply to your installation."
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
                <FormattedMessage defaultMessage="Run the following command" />
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
                  defaultMessage="If {code1} is not {code2}, run {code3}"
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
                <FormattedMessage
                  defaultMessage="{note}: by default, VMs may disable NTP so you may need to find a work-around for your environment."
                  values={{
                    note: <strong>Note</strong>,
                  }}
                  description="{note} is just 'Note' in bold to start the line"
                />
              </Text>
            </li>
          </ul>
          <CheckBox
            label={
              <Text className="checkbox-label" style={{ display: 'inherit' }}>
                <FormattedMessage defaultMessage="I've verified my server's time matches the wall clock." />
              </Text>
            }
          />
          <ul className="sub-checklist-item">
            <li className="py5">
              <Text>
                <FormattedMessage
                  defaultMessage="{note}: the RTC (Real-Time Clock) time may be set to your local timezone
                    instead of UTC, especially in a VM which has clock configured on Windows."
                  values={{
                    note: <strong>Note</strong>,
                  }}
                  description="{note} is just 'Note' in bold to start the line"
                />
              </Text>
            </li>
          </ul>
        </section>
        <section>
          <Heading level={3}>
            <FormattedMessage defaultMessage="Eth1 Client" />
          </Heading>
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage
                  defaultMessage="I have installed and synced my Eth1 node on {network}. (Do not wait on this as it can take several days)"
                  values={{
                    network: IS_MAINNET ? 'mainnet' : 'goerli',
                  }}
                />
              </Text>
            }
          />
        </section>
        <section>
          <Heading level={3}>Configure your Eth2 client</Heading>
          <Link className="mt10" to="/faq" primary withArrow>
            <FormattedMessage defaultMessage="Learn more about the roles and responsibilities of ETH 2 Validators" />
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
          <ul className="sub-checklist-item">
            <li className="py5">
              <Text>
                <FormattedMessage
                  defaultMessage="{warning}: it's high risk to run your Eth2 validator in multiple places. It will lead to a slashable event and ejection from the network. {learnMore}"
                  values={{
                    warning: <strong>Warning: </strong>,
                    learnMore: (
                      <Link primary inline to="/faq#responsibilities">
                        Learn more about slashing →
                      </Link>
                    ),
                  }}
                />
              </Text>
            </li>
          </ul>
        </section>
        <section>
          <Heading level={3}>
            <FormattedMessage defaultMessage="Eth2 Beacon Node (BN)" />
          </Heading>
          <Heading level={4}>
            <FormattedMessage defaultMessage="Required" />
          </Heading>
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage
                  defaultMessage="I have installed the {latestRelease} of my client."
                  values={{
                    latestRelease: (
                      <strong>latest stable software release</strong>
                    ),
                  }}
                />
              </Text>
            }
          />
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage defaultMessage="My Eth2 beacon node is able to connect to my Eth1 client via HTTP API(s)." />
              </Text>
            }
          />
          <ul className="sub-checklist-item">
            <li className="py5">
              <Text>
                <FormattedMessage
                  defaultMessage="{note}: you can verify it with the following command to check if it returns the client version correctly."
                  values={{
                    note: <strong>Note</strong>,
                  }}
                  description="{note} is just 'Note' in bold to start the line"
                />
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
                  defaultMessage="I have synced my Eth2 beacon node on {ETH2_NETWORK_NAME}."
                  values={{ ETH2_NETWORK_NAME }}
                />
              </Text>
            }
          />
          <ul className="sub-checklist-item">
            <li className="py5">
              <Text>
                <FormattedMessage
                  defaultMessage="{note}: please check that your node has greater than 20 peers."
                  values={{
                    note: <strong>Note</strong>,
                  }}
                  description="{note} is just 'Note' in bold to start the line"
                />
              </Text>
            </li>
          </ul>
          <Heading level={4}>
            <FormattedMessage defaultMessage="Recommended" />
          </Heading>
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage defaultMessage="I have joined my client's discord chat." />
              </Text>
            }
          />
          <ul className="sub-checklist-item">
            <li className="py5">
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
            </li>
          </ul>
        </section>
        <section>
          <Heading level={3}>
            <FormattedMessage defaultMessage="Eth2 Validator Client (VC)" />
          </Heading>
          <Heading level={4}>
            <FormattedMessage defaultMessage="Required" />
          </Heading>
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage defaultMessage="I have imported my keystore(s) into my Eth2 validator client." />
              </Text>
            }
          />
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage defaultMessage="I have started running my validator client." />
              </Text>
            }
          />
          <Heading level={4}>
            <FormattedMessage defaultMessage="Recommended" />
          </Heading>
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage
                  defaultMessage="I have set up my validator client on a separate machine and
                    connected it to my Beacon Node via HTTP/gRPC API(s)."
                />
              </Text>
            }
          />
        </section>
        <section>
          <Heading level={3}>
            <FormattedMessage defaultMessage="Appendix" />
          </Heading>
          <Heading level={4}>
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
              description="{variables} are client names, each linking to documentation"
            />
          </Text>
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage
                  defaultMessage="I have set up my {prometheus} service."
                  values={{
                    prometheus: (
                      <Link primary inline to="https://prometheus.io/">
                        Prometheus
                      </Link>
                    ),
                  }}
                  description="{prometheus} is 'Prometheus' service, with link to its homepage"
                />
              </Text>
            }
          />
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage
                  defaultMessage="I have set up my {grafana} service."
                  values={{
                    grafana: (
                      <Link primary inline to="https://grafana.com/">
                        Grafana
                      </Link>
                    ),
                  }}
                  description="{grafana} is 'Grafana' service, with link to its homepage"
                />
              </Text>
            }
          />
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage
                  defaultMessage="I have imported the dashboard config to my Grafana server
                    and double checked that my node is alive."
                />
              </Text>
            }
          />
          <Heading level={4}>Graffiti</Heading> {/* Translate? */}
          <Text>
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
              description="{variables} are beacon chain block explorers, with links to each"
            />
          </Text>
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage defaultMessage="I have set my graffiti flag." />
              </Text>
            }
          />
          <Heading level={4}>Advanced system architecture</Heading>
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
          <Heading level={3}>
            <FormattedMessage defaultMessage="Simulations" />
          </Heading>
          <Heading level={4}>
            <FormattedMessage defaultMessage="The following are recommended simulations for ensuring your validation setup is robust:" />
          </Heading>
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage
                  defaultMessage="I have simulated how to manually stop and restart my Beacon Node (BN)
                    and Validator Client (VC) gracefully."
                />
              </Text>
            }
          />
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage defaultMessage="I have simulated power loss (server and internet) and automatic resumption." />
              </Text>
            }
          />
          <CheckBox
            label={
              <Text className="checkbox-label">
                <FormattedMessage defaultMessage="I have simulated how to migrate from one Eth2 client to another Eth2 client." />
              </Text>
            }
          />
        </section>
        <section>
          <Heading level={3}>Tips</Heading>
          <ul className="sub-checklist-item">
            <li className="py5">
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
                  description="{variables} social media platform links to Discord and Reddit"
                />
              </Text>
            </li>
          </ul>
        </section>
      </ChecklistPageStyles>
    </PageTemplate>
  );
};
