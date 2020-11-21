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
import { colors } from '../../styles/styledComponentsTheme';

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
`;
const ClientContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
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
  const clientInfo: Client[] = _shuffle([
    {
      header: 'Lighthouse',
      text:
        'Lighthouse is a Ethereum 2.0 implementation, written in Rust with a heavy focus on speed and security.',
      imgUrl: LighthouseBg,
      url: routesEnum.lighthouse,
      linkText: 'Configure Lighthouse →',
    },
    {
      header: 'Nimbus',
      text:
        'Nimbus is a research project and a client implementation for Ethereum 2.0 designed to perform well on embedded systems and personal mobile devices.',
      imgUrl: NimbusBg,
      url: routesEnum.nimbus,
      linkText: 'Configure Nimbus →',
    },
    {
      header: 'Prysm',
      text:
        'Prysm is a Go implementation of Ethereum 2.0 protocol with a focus on usability, security, and reliability.',
      imgUrl: PrysmaticBg,
      url: routesEnum.prysm,
      linkText: 'Configure Prysm →',
    },
    {
      header: 'Teku',
      text:
        'PegaSys Teku is a Java-based Ethereum 2.0 client built to meet institutional needs and security requirements.',
      imgUrl: TekuBg,
      url: routesEnum.teku,
      linkText: 'Configure Teku →',
    },
  ]);

  return (
    <PageTemplate title="Eth2 Staker Checklist">
      <ChecklistPageStyles>
        <section>
          <Heading level={3}>Hardware</Heading>
          <Heading level={4}>Recommended</Heading>
          <ul>
            <li className="py5">
              <Text>
                In order to process incoming validator deposits from the eth1
                chain, you will need to run an eth1 client in parallel to your
                eth2 client. While it is possible to use a third-party service
                like Infura, we recommend running your own client in order to
                ensure the network stays as decentralised as possible.
              </Text>
            </li>
            <ul>
              <li>
                <Text>
                  For example, you need at least ~300 GB SSD to run geth fast
                  sync on <i>mainnet</i> in November 2020, assuming you move the{' '}
                  <i>ancient</i> directory on a different drive. Have in mind
                  that geth <i>chaindata</i> grows with ~1 GB per day, so you
                  should account for enough space on your SSD and HDD until you
                  run maintenance on the node.
                </Text>
              </li>
            </ul>
          </ul>
        </section>
        <section>
          <Heading level={3}>Keystore</Heading>
          <CheckBox
            label={
              <Text className="checkbox-label">
                I have securely generated and saved my keystore(s).
              </Text>
            }
          />
          <CheckBox
            label={
              <Text className="checkbox-label">
                I have backed up my mnemonic.
              </Text>
            }
          />
          <CheckBox
            label={
              <Text className="checkbox-label">
                I have set a strong password for my keystore(s)
              </Text>
            }
          />
          <CheckBox
            label={
              <Text className="checkbox-label">
                I have backed up my password.
              </Text>
            }
          />
        </section>
        <section>
          <Heading level={3}>Security</Heading>
          <CheckBox
            label={
              <Text className="checkbox-label">
                I have secured the root account.
              </Text>
            }
          />
          <CheckBox
            label={
              <Text className="checkbox-label">
                I have hardened ssh on a random port.
              </Text>
            }
          />
          <CheckBox
            label={
              <Text className="checkbox-label">I have set up a firewall.</Text>
            }
          />
          <CheckBox
            label={
              <Text className="checkbox-label">
                I have forwarded the necessary ports from my router to the
                correct machine(s). Only open the ports that apply to your
                installation.
              </Text>
            }
          />
          <PortTable>
            <thead>
              <tr>
                <th>Service</th>
                <th>Default Port</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>geth</td>
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
          <Heading level={3}>Configure time sync</Heading>
          <CheckBox
            label={
              <Text className="checkbox-label" style={{ display: 'inherit' }}>
                For Ubuntu 20.04:
                <pre className="my0">
                  <span style={{ color: colors.red.medium }}>
                    {' '}
                    sudo timedatectl set-ntp on
                  </span>
                </pre>
              </Text>
            }
          />
        </section>
        <section>
          <Heading level={3}>Eth1 Client</Heading>
          <CheckBox
            label={
              <Text className="checkbox-label">
                I have installed and synced my Eth1 node on{' '}
                {IS_MAINNET ? 'mainnet' : 'goerli'}.
              </Text>
            }
          />
        </section>
        <section>
          <Heading level={3}>Configure your Eth2 client</Heading>
          <Link className="mt10" to="/faq" primary withArrow>
            Learn more about the roles and responsibilities of ETH 2 Validators
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
        </section>
        <section>
          <Heading level={3}>Eth2 Beacon Node (BN)</Heading>
          <Heading level={4}>Required</Heading>
          <CheckBox
            label={
              <Text className="checkbox-label">
                I have installed the{' '}
                <strong>latest stable software release</strong> of my client.
              </Text>
            }
          />
          <ul className="sub-checklist-item">
            <li>
              <Text>
                <strong>Note:</strong> If you are setting up your client before
                phase 0 launch, it is your responsibility to check for any new
                software releases in the run up to launch. There is a good
                chance you will need to update your software.
              </Text>
            </li>
          </ul>
          <CheckBox
            label={
              <Text className="checkbox-label">
                My Eth2 beacon node is able to connect to my Eth1 client via
                HTTP API(s).
              </Text>
            }
          />
          <CheckBox
            label={
              <Text className="checkbox-label">
                I have synced my Eth2 beacon node on {ETH2_NETWORK_NAME}.
              </Text>
            }
          />
          <ul className="sub-checklist-item">
            <li>
              <Text>
                <strong>Note:</strong> Please check that your node has greater
                than 20 peers.
              </Text>
            </li>
          </ul>
          <Heading level={4}>Recommended</Heading>
          <CheckBox
            label={
              <Text className="checkbox-label">
                I have joined my client's discord chat.
              </Text>
            }
          />
          <ul className="sub-checklist-item">
            <li>
              <Link primary inline external to="https://discord.gg/uC7TuaH">
                Lighthouse
              </Link>{' '}
              |{' '}
              <Link primary inline external to="https://discord.gg/YbTCNat">
                Nimbus
              </Link>{' '}
              |{' '}
              <Link primary inline external to="https://discord.gg/KSA7rPr">
                Prysm
              </Link>{' '}
              |{' '}
              <Link primary inline external to="Teku">
                Teku
              </Link>
            </li>
          </ul>
          <CheckBox
            label={
              <Text className="checkbox-label">
                I have opened the ports on my router.
              </Text>
            }
          />
        </section>
        <section>
          <Heading level={3}>Eth2 Validator Client (VC)</Heading>
          <Heading level={4}>Required</Heading>
          <CheckBox
            label={
              <Text className="checkbox-label">
                I have imported my keystore(s) into my Eth2 validator client.
              </Text>
            }
          />
          <CheckBox
            label={
              <Text className="checkbox-label">
                I have started running my validator client.
              </Text>
            }
          />
          <Heading level={4}>Recommended</Heading>
          <CheckBox
            label={
              <Text className="checkbox-label">
                I have set up my validator client on a separate machine and
                connected it to my Beacon Node via HTTP/gRPC API(s).
              </Text>
            }
          />
        </section>
        <section>
          <Heading level={3}>Appendix</Heading>
          <Heading level={4}>Prometheus + Grafana monitor</Heading>
          <Text>
            The Eth2 clients support Prometheus + Grafana to help you visualise
            important real-time metrics concerning your validator. You can find
            client specific instructions here:{' '}
            <Link
              primary
              inline
              external
              to="https://github.com/sigp/lighthouse-metrics"
            >
              Lighthouse
            </Link>{' '}
            |{' '}
            <Link
              primary
              inline
              external
              to="https://status-im.github.io/nimbus-eth2/metrics-pretty-pictures.html"
            >
              Nimbus
            </Link>{' '}
            |{' '}
            <Link
              primary
              inline
              external
              to="https://docs.prylabs.network/docs/prysm-usage/monitoring/grafana-dashboard/"
            >
              Prysm
            </Link>{' '}
            |{' '}
            <Link
              primary
              inline
              external
              to="https://docs.teku.consensys.net/en/latest/HowTo/Monitor/Metrics/"
            >
              Teku
            </Link>
          </Text>
          <CheckBox
            label={
              <Text className="checkbox-label">
                I have set up my{' '}
                <Link primary inline external to="https://prometheus.io/">
                  Prometheus
                </Link>{' '}
                service.
              </Text>
            }
          />
          <CheckBox
            label={
              <Text className="checkbox-label">
                I have set up my{' '}
                <Link primary inline external to="https://grafana.com/">
                  Grafana
                </Link>{' '}
                service.
              </Text>
            }
          />
          <CheckBox
            label={
              <Text className="checkbox-label">
                I have imported the dashboard config to my Grafana server and
                double checked that my node is alive.
              </Text>
            }
          />
          <Heading level={4}>
            <Link primary inline external to="https://beaconcha.in/poap">
              POAP
            </Link>{' '}
            Graffiti
          </Heading>
          <Text>
            You can use your validator client&apos;s graffiti flag to add a
            personal touch to your proposed blocks (some text of your choice).
            You will be able to see it using{' '}
            <Link primary external inline to="https://beaconcha.in/">
              Beaconcha.in
            </Link>{' '}
            or{' '}
            <Link primary external inline to="https://beaconscan.com/">
              BeaconScan
            </Link>{' '}
            blockchain explorers.
          </Text>
          <CheckBox
            label={
              <Text className="checkbox-label">
                I have set my graffiti flag.
              </Text>
            }
          />
          <Heading level={4}>Advanced system architecture</Heading>
          <ul>
            <li className="py5">
              <Text>
                To avoid exposing your validator identity to the network, you
                can use a trustworthy VPN to help reduce the risk of revealing
                your IP address.
              </Text>
            </li>
            <li className="py5">
              <Text>
                Moreover, you can set your Validator Client (VC) and Beacon Node
                (BN) on separate machines and IPs so that even if your beacon
                node is vulnerable, your keystore is stored on a different
                machine.
              </Text>
            </li>
          </ul>
        </section>
      </ChecklistPageStyles>
    </PageTemplate>
  );
};
