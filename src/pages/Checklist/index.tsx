import React from 'react';
import styled from 'styled-components';
// import { Link } from '../../components/Link';
import { PageTemplate } from '../../components/PageTemplate';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';

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
`;

export const Checklist = () => {
  return (
    <PageTemplate title="Eth2 Staker Checklist">
      <ChecklistPageStyles>
        <section>
          <Heading level={3}>Hardware</Heading>
          <Heading level={4}>Recommended</Heading>
          <ul>
            <li>
              We recommend you run the Validator Client (VC) on a separate
              machine from your Beacon Node (BN). This is to ensure your
              keystore(s) and password(s) are as secure as possible. Read here
              to understand more about the architecture.
            </li>
            <li>
              In order to process incoming validator deposits from the eth1
              chain, you'll need to run an eth1 client in parallel to your eth2
              client. While it is possible to use a third-party service like
              Infura, we recommend running your own client in order to ensure
              the network stays as decentralised as possible.
            </li>
            <ul>
              <li>
                For example, you need at least 140 GB SSD to run geth fast sync
                on mainnet.
              </li>
            </ul>
          </ul>
        </section>
        <section>
          <Heading level={3}>Keystore</Heading>
          <ol>
            <li>I have securely generated and saved my keystore(s).</li>
            <li>I have backed up my mnemonic.</li>
            <li>I have set a strong password for my keystore(s)</li>
            <li>I have backed up my password.</li>
          </ol>
        </section>
        <section>
          <Heading level={3}>Security</Heading>
          <ol>
            <li> I have set up a firewall on my machine(s).</li>
          </ol>
        </section>
        <section>
          <Heading level={3}>Eth1 Client</Heading>
          <ol>
            <li>
              I have installed and synced my Eth1 node on ETH1_NETWORK_NAME.
            </li>
          </ol>
        </section>
        <section>
          <Heading level={3}>Eth2 Beacon Node (BN)</Heading>
          <Heading level={4}>Required</Heading>
          <ol>
            <li>
              I have installed the latest stable software release of my client.
              <ul>
                <li>
                  Note: If you're setting up your client before phase 0 launch,
                  it is your responsibility to check for any new software
                  releases in the run up to launch. There is a good chance you
                  will need to update your software.
                </li>
              </ul>
            </li>
            <li>
              My Eth2 beacon node is able to connect to my Eth1 client via HTTP
              API(s).
            </li>
            <li>
              I have synced my Eth2 beacon node on ETH2_NETWORK_NAME.
              <ul>
                <li>
                  Note: Please check that your node has greater than 20 peers.
                </li>
              </ul>
            </li>
          </ol>
          <Heading level={4}>Recommended</Heading>

          <ol>
            <li>
              I have joined my client's discord chat.
              <ul>
                <li>Lighthouse | Nimbus | Prysm | Teku</li>
              </ul>
            </li>
          </ol>
          <ol>
            <li> I have opened the ports on my router.</li>
          </ol>
        </section>
        <section>
          <Heading level={3}>Eth2 Validator Client (VC)</Heading>
          <Heading level={4}>Required</Heading>
          <ol>
            <li>
              I have imported my keystore(s) into my Eth2 validator client.
            </li>
            <li> I have started running my validator client.</li>
          </ol>
          <Heading level={4}>Recommended</Heading>
          <ol>
            <li>
              I have set up my validator client on a separate machine and
              connected it to my Beacon Node via HTTP/gRPC API(s).
            </li>
          </ol>
        </section>

        <section>
          <Heading level={3}>[Optional] Prometheus + Grafana monitor</Heading>
          <Text>
            The Eth2 clients support Prometheus + Grafana to help you visualise
            important real-time metrics concerning your validator. You can find
            client specific instructions here:
          </Text>
          <ul>
            <li>Lighthouse | Nimbus | Prysm | Teku</li>
          </ul>
          <ol>
            <li>I have set up my Prometheus service.</li>
            <li>I have set up my Grafana service.</li>
            <li>
              I have imported the dashboard config to my Grafana server and
              double checked that my node is alive.
            </li>
          </ol>
        </section>
        <section>
          <Heading level={3}>[Optional] POAP Graffiti</Heading>
          <Text>
            You can use your validator client's graffiti flag to add a personal
            touch to your proposed blocks (some text of your choice). You'll be
            able to see it using the block explorer.
          </Text>
          <ol>
            <li> I have set my graffiti flag.</li>
          </ol>
        </section>
      </ChecklistPageStyles>
    </PageTemplate>
  );
};
