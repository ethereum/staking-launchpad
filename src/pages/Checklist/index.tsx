import React from 'react';
import styled from 'styled-components';
import { Link } from '../../components/Link';
import { PageTemplate } from '../../components/PageTemplate';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import { CheckBox } from 'grommet';
import { ETH2_NETWORK_NAME, IS_MAINNET } from '../../utils/envVars';

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

export const Checklist = () => {
  return (
    <PageTemplate title="Eth2 Staker Checklist">
      <ChecklistPageStyles>
        <section>
          <Heading level={3}>Hardware</Heading>
          <Heading level={4}>Recommended</Heading>
          <ul>
            <li className="py5">
              <Text>
                We recommend you run the Validator Client (VC) on a separate
                machine from your Beacon Node (BN). This is to ensure your
                keystore(s) and password(s) are as secure as possible. Read{' '}
                <Link
                  primary
                  external
                  inline
                  to="https://blog.ethereum.org/2019/11/27/validated-staking-on-eth2-0/"
                >
                  here
                </Link>{' '}
                to understand more about the architecture.
              </Text>
            </li>
            <li className="py5">
              <Text>
                In order to process incoming validator deposits from the eth1
                chain, you'll need to run an eth1 client in parallel to your
                eth2 client. While it is possible to use a third-party service
                like Infura, we recommend running your own client in order to
                ensure the network stays as decentralised as possible.
              </Text>
            </li>
            <ul>
              <li>
                <Text>
                  For example, you need at least 140 GB SSD to run geth fast
                  sync on <i>mainnet</i>.
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
                I have set up a firewall on my machine(s).{' '}
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
                <strong>Note:</strong> If you're setting up your client before
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
          <Heading level={3}>[Optional] Prometheus + Grafana monitor</Heading>
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
              to="https://status-im.github.io/nim-beacon-chain/metrics-pretty-pictures.html"
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
        </section>
        <section>
          <Heading level={3}>
            [Optional]{' '}
            <Link primary inline external to="https://beaconcha.in/poap">
              POAP
            </Link>{' '}
            Graffiti
          </Heading>
          <Text>
            You can use your validator client's graffiti flag to add a personal
            touch to your proposed blocks (some text of your choice). You'll be
            able to see it using the{' '}
            <Link primary external inline to="block explorer">
              block explorer
            </Link>
            .
          </Text>
          <CheckBox
            label={
              <Text className="checkbox-label">
                I have set my graffiti flag.
              </Text>
            }
          />
        </section>
      </ChecklistPageStyles>
    </PageTemplate>
  );
};
