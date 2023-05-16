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
// Constants
import { NETWORK_NAME } from '../../utils/envVars';

const ComponentStyles = styled.div`
  * {
    scroll-behavior: smooth;
    scroll-margin-top: 2rem;
  }
  a {
    text-decoration: none;
  }
  p,
  ol,
  ul {
    color: ${(p: any) => p.theme.blue.dark};
  }
  li {
    font-weight: 300;
  }
  strong {
    font-weight: 500;
  }
`;

const CodeBlock = styled.code`
  display: block;
  padding: 20px;
  font-family: Courier, sans-serif;
  font-size: 1em;
  line-height: 1.3;
  color: ${(p: any) => p.theme.blue.dark};
  background-color: #d0ddee;
  border-radius: 6px;
  margin-block: 20px;
  overflow: auto;
  &.indent > *:not(:first-child) {
    margin-inline-start: 2ex;
  }

  span {
    white-space: nowrap;
  }
  .dimmed {
    opacity: 0.75;
  }
  .custom {
    color: ${(p: any) => p.theme.red.medium};
    text-transform: uppercase;
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

export const BtecGuide = () => {
  const { formatMessage } = useIntl();

  return (
    <PageTemplate
      title={formatMessage({ defaultMessage: 'BLS To Execution Change' })}
      description={formatMessage({
        defaultMessage:
          'Instructions on how to use the staking-deposit-cli tool to generate and broadcast a SignedBLSToExecutionChange message to update validator withdrawal credentials.',
      })}
    >
      <ComponentStyles>
        <section>
          <ul>
            <li>
              <Link inline primary to="#introduction">
                <FormattedMessage defaultMessage="Introduction" />
              </Link>
            </li>
            <li>
              <Link inline primary to="#installation">
                <FormattedMessage defaultMessage="Installation" />
              </Link>
              <ul>
                <li>
                  <Link inline primary to="#installation-option-1">
                    <FormattedMessage defaultMessage="Option 1: binary files" />
                  </Link>
                </li>
                <li>
                  <Link inline primary to="#installation-option-2">
                    <FormattedMessage defaultMessage="Option 2: source code + virtualenv" />
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link inline primary to="#generate-json">
                <FormattedMessage
                  defaultMessage="Generate {json} file"
                  values={{ json: <code>bls_to_execution_change-*.json</code> }}
                />
              </Link>
              <ul>
                <li>
                  <Link inline primary to="#execute-with-params">
                    <FormattedMessage defaultMessage="Execute with params" />
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link inline primary to="#expected-outputs">
                <FormattedMessage defaultMessage="Expected outputs" />
              </Link>
            </li>
            <li>
              <Link inline primary to="#broadcast-message">
                <FormattedMessage defaultMessage="Upload to Beacon Node BLSToExecutionChange pool" />
              </Link>
            </li>
          </ul>
        </section>
        <section>
          <Anchor to="#introduction" id="introduction">
            <SectionTitle level={2} className="mb10">
              <FormattedMessage defaultMessage="Introduction" />
            </SectionTitle>
          </Anchor>
          <Text className="mb10">
            <FormattedMessage
              defaultMessage="To enable your Beacon Chain validator(s) to automatically withdraw balances to your
              {executionAddress}, you can use the staking deposit CLI tool to generate the signed “BLS To Execution
              Change” ({signed}) message JSON file. This message includes the request to change your old BLS
              withdrawal credentials to the new withdrawal credentials in execution address format."
              values={{
                executionAddress: (
                  <strong>
                    <FormattedMessage defaultMessage="execution layer (Eth1) address" />
                  </strong>
                ),
                signed: <Code>SignedBLSToExecutionChange</Code>,
              }}
            />
          </Text>
          <Text className="mb10">
            <FormattedMessage
              defaultMessage="To include this message on Mainnet, you will need to upload this message to
              a beacon node’s message “Signed BLS To Execution Change” pool."
            />
          </Text>
        </section>
        <section>
          <Anchor to="#installation" id="installation">
            <SectionTitle level={2} className="mb10">
              <FormattedMessage defaultMessage="Installation" />
            </SectionTitle>
          </Anchor>
          <section>
            <Anchor to="#installation-option-1" id="installation-option-1">
              <SubSectionTitle level={3} className="mb10">
                <FormattedMessage defaultMessage="Option 1: binary files" />
              </SubSectionTitle>
            </Anchor>
            <Text className="mb10">
              <FormattedMessage
                defaultMessage="You can find the binary files in {pr}"
                values={{
                  pr: (
                    <Link
                      primary
                      inline
                      to="https://github.com/ethereum/staking-deposit-cli/releases"
                    >
                      <FormattedMessage defaultMessage="Staking Deposit CLI releases" />
                    </Link>
                  ),
                }}
              />
            </Text>
          </section>
          <section>
            <Anchor to="#installation-option-2" id="installation-option-2">
              <SubSectionTitle level={3} className="mb10">
                <FormattedMessage defaultMessage="Option 2: source code + virtualenv" />
              </SubSectionTitle>
            </Anchor>
            <Text className="mb10">
              <FormattedMessage
                defaultMessage="Download {master} branch:"
                values={{ master: <Code>master</Code> }}
              />
            </Text>
            <CodeBlock>
              git clone https://github.com/ethereum/staking-deposit-cli.git
            </CodeBlock>
            <Text className="mb10">
              <FormattedMessage defaultMessage="Install and set virtualenv:" />
            </Text>
            <CodeBlock>
              pip3 install virtualenv
              <br />
              virtualenv venv
              <br />
              source venv/bin/activate
            </CodeBlock>
            <Text className="mb10">
              <FormattedMessage defaultMessage="Install dependencies:" />
            </Text>
            <CodeBlock>
              python3 setup.py install
              <br />
              pip3 install -r requirements.txt
            </CodeBlock>
          </section>
        </section>
        <section>
          <Anchor to="#generate-json" id="generate-json">
            <SectionTitle level={2} className="mb10">
              <FormattedMessage
                defaultMessage="Generate {json} file"
                values={{ json: <code>bls_to_execution_change-*.json</code> }}
              />
            </SectionTitle>
          </Anchor>
          <Alert variant="primary">
            <Text>
              <FormattedMessage
                defaultMessage="Assume you have generated deposit in {eip2334} format and have BLS withdrawal credentials.
                If not, you can generate it by following {docs}."
                values={{
                  eip2334: (
                    <Link
                      primary
                      inline
                      to="https://eips.ethereum.org/EIPS/eip-2334#eth2-specific-parameters"
                    >
                      <FormattedMessage defaultMessage="EIP-2334" />
                    </Link>
                  ),
                  docs: (
                    <Link
                      primary
                      inline
                      to="https://github.com/ethereum/staking-deposit-cli#step-2-create-keys-and-deposit_data-json-2"
                    >
                      <FormattedMessage defaultMessage="docs" />
                    </Link>
                  ),
                }}
              />
            </Text>
          </Alert>
          <section>
            <Anchor to="#execute-with-params" id="execute-with-params">
              <SubSectionTitle level={3} className="mb10">
                <FormattedMessage defaultMessage="Execute with params" />
              </SubSectionTitle>
            </Anchor>
            <Alert variant="success">
              <Text>
                <FormattedMessage
                  defaultMessage="You can find {docsHere}."
                  values={{
                    docsHere: (
                      <Link
                        primary
                        inline
                        to="https://github.com/ethereum/staking-deposit-cli/blob/bls-to-execution-change/README.md#generate-bls-to-execution-change-arguments"
                      >
                        <FormattedMessage defaultMessage="docs of full arguments here" />
                      </Link>
                    ),
                  }}
                />
              </Text>
            </Alert>
            <section>
              <Anchor
                to="#execute-with-params-option-1"
                id="execute-with-params-option-1"
              >
                <SubSectionTitle level={4} className="mb10">
                  <FormattedMessage defaultMessage="Option 1: binary files" />
                </SubSectionTitle>
              </Anchor>
              <Text className="mb10">
                <strong>
                  <FormattedMessage defaultMessage="Interactive mode" />
                </strong>
              </Text>
              <CodeBlock>./deposit generate-bls-to-execution-change</CodeBlock>
              <Text className="mb10">
                <strong>
                  <FormattedMessage defaultMessage="Command line with flags" />
                </strong>
              </Text>
              <CodeBlock className="indent">
                <span>
                  ./deposit <span className="dimmed">--language=english</span>{' '}
                  generate-bls-to-execution-change \
                </span>
                <br />
                <span className="dimmed">--chain=mainnet \</span>
                <br />
                <span className="dimmed">
                  --mnemonic="
                  <span className="custom">
                    {`<`}
                    <FormattedMessage defaultMessage="Your mnemonic" />
                    {`>`}
                  </span>
                  " \
                </span>
                <br />
                <span className="dimmed">
                  --bls_withdrawal_credentials_list="
                  <span className="custom">
                    {`<`}
                    <FormattedMessage defaultMessage="Your old BLS withdrawal credentials" />
                    {`>`}
                  </span>
                  " \
                </span>
                <br />
                <span className="dimmed">
                  --validator_start_index=
                  <span className="custom">
                    {`<`}
                    <FormattedMessage defaultMessage="The key start index in EIP-2334" />
                    {`>`}
                  </span>{' '}
                  \
                </span>
                <br />
                <span className="dimmed">
                  --validator_indices="
                  <span className="custom">
                    {`<`}
                    <FormattedMessage defaultMessage="Your validator indices" />
                    {`>`}
                  </span>
                  " \
                </span>
                <br />
                <span className="dimmed">
                  --execution_address="
                  <span className="custom">
                    {`<`}
                    <FormattedMessage defaultMessage="The execution address for withdrawals" />
                    {`>`}
                  </span>
                  "
                </span>
                <br />
              </CodeBlock>
              <Text className="mb10">
                [<FormattedMessage defaultMessage="Example" />]
              </Text>
              <CodeBlock className="indent">
                <span>
                  ./deposit{` `}
                  <span className="dimmed">--language=english</span>
                  {` `}
                  generate-bls-to-execution-change \
                </span>
                <br />
                <span className="dimmed">--chain=mainnet \</span>
                <br />
                <span className="dimmed">
                  --mnemonic="sister protect peanut hill ready work profit fit
                  wish want small inflict flip member tail between sick setup
                  bright duck morning sell paper worry" \
                </span>
                <br />
                <span className="dimmed">
                  --bls_withdrawal_credentials_list="0x00bd0b5a34de5fb17df08410b5e615dda87caf4fb72d0aac91ce5e52fc6aa8de,0x00a75d83f169fa6923f3dd78386d9608fab710d8f7fcf71ba9985893675d5382"
                  \
                </span>
                <br />
                <span className="dimmed">--validator_start_index=0 \</span>
                <br />
                <span className="dimmed">
                  --validator_indices="50000, 50001" \
                </span>
                <br />
                <span className="dimmed">
                  --execution_address="0x3434343434343434343434343434343434343434"
                </span>
                <br />
              </CodeBlock>
            </section>

            <section>
              <Anchor
                to="#execute-with-params-option-2"
                id="execute-with-params-option-2"
              >
                <SubSectionTitle level={4} className="mb10">
                  <FormattedMessage defaultMessage="Option 2: source code + virtualenv" />
                </SubSectionTitle>
              </Anchor>
              <Text className="mb10">
                <strong>
                  <FormattedMessage defaultMessage="Interactive mode" />
                </strong>
              </Text>
              <CodeBlock>
                python ./staking_deposit/deposit.py
                generate-bls-to-execution-change
              </CodeBlock>
              <Text className="mb10">
                <strong>
                  <FormattedMessage defaultMessage="Command line with flags" />
                </strong>
              </Text>
              <CodeBlock className="indent">
                <span>
                  python ./staking_deposit/deposit.py{` `}
                  <span className="dimmed">--language=english</span>
                  {` `}
                  generate-bls-to-execution-change \
                </span>
                <br />
                <span className="dimmed">--chain=mainnet \</span>
                <br />
                <span className="dimmed">
                  --mnemonic="
                  <span className="custom">
                    {`<`}
                    <FormattedMessage defaultMessage="Your mnemonic" />
                    {`>`}
                  </span>
                  " \
                </span>
                <br />
                <span className="dimmed">
                  --bls_withdrawal_credentials_list="
                  <span className="custom">
                    {`<`}
                    <FormattedMessage defaultMessage="Your old BLS withdrawal credentials" />
                    {`>`}
                  </span>
                  " \
                </span>
                <br />
                <span className="dimmed">
                  --validator_start_index=
                  <span className="custom">
                    {`<`}
                    <FormattedMessage defaultMessage="The key start index in EIP-2334" />
                    {`>`}
                  </span>{' '}
                  \
                </span>
                <br />
                <span className="dimmed">
                  --validator_indices="
                  <span className="custom">
                    {`<`}
                    <FormattedMessage defaultMessage="Your validator indices" />
                    {`>`}
                  </span>
                  " \
                </span>
                <br />
                <span className="dimmed">
                  --execution_address="
                  <span className="custom">
                    {`<`}
                    <FormattedMessage defaultMessage="The execution address for withdrawals" />
                    {`>`}
                  </span>
                  "
                </span>
                <br />
              </CodeBlock>
              <Text className="mb10">
                [<FormattedMessage defaultMessage="Example" />]
              </Text>
              <CodeBlock className="indent">
                <span>
                  python ./staking_deposit/deposit.py{` `}
                  <span className="dimmed">--language=english</span>
                  {` `}
                  generate-bls-to-execution-change \
                </span>
                <br />
                <span className="dimmed">--chain=mainnet \</span>
                <br />
                <span className="dimmed">
                  --mnemonic="sister protect peanut hill ready work profit fit
                  wish want small inflict flip member tail between sick setup
                  bright duck morning sell paper worry" \
                </span>
                <br />
                <span className="dimmed">
                  --bls_withdrawal_credentials_list="0x00bd0b5a34de5fb17df08410b5e615dda87caf4fb72d0aac91ce5e52fc6aa8de,0x00a75d83f169fa6923f3dd78386d9608fab710d8f7fcf71ba9985893675d5382"
                  \
                </span>
                <br />
                <span className="dimmed">--validator_start_index=0 \</span>
                <br />
                <span className="dimmed">
                  --validator_indices="50000, 50001" \
                </span>
                <br />
                <span className="dimmed">
                  --execution_address="0x3434343434343434343434343434343434343434"
                </span>
                <br />
              </CodeBlock>

              <Alert variant="primary">
                <Text className="mb10">
                  <FormattedMessage defaultMessage="For devnet, you can add a param:" />
                </Text>
                <CodeBlock>
                  <span>
                    {`--devnet_chain_setting='{ "network_name": "`}
                    <span className="custom">
                      {`<`}
                      <FormattedMessage defaultMessage="Network name" />
                      {`>`}
                    </span>
                    ", "genesis_fork_version": "
                    <span className="custom">
                      {`<`}
                      <FormattedMessage defaultMessage="Genesis fork version" />
                      {`>`}
                    </span>
                    ", "genesis_validator_root": "
                    <span className="custom">
                      {`<`}
                      <FormattedMessage defaultMessage="Genesis validator root" />
                      {`>`}
                    </span>
                    {`" }'`}
                  </span>
                </CodeBlock>
                <Text className="mb10">
                  <FormattedMessage
                    defaultMessage="[Example: {fork}]"
                    values={{
                      fork: <Code>withdrawal-mainnet-shadowfork-1</Code>,
                    }}
                  />
                </Text>
                <CodeBlock>
                  <span>
                    {`--devnet_chain_setting='{
                      "network_name": "withdrawal-msf-1",
                      "genesis_fork_version": "0x10000043",
                      "genesis_validator_root": "0xe9ec351d158fd3b89b6afd2e6033bcae8d8adc2dd4c560c4bbf852d47ed0410e"
                    }'`}
                  </span>
                </CodeBlock>
              </Alert>
            </section>
          </section>
        </section>
        <section>
          <Anchor to="#expected-outputs" id="expected-outputs">
            <SectionTitle level={2} className="mb10">
              <FormattedMessage defaultMessage="Expected outputs" />
            </SectionTitle>
          </Anchor>
          <CodeBlock>
            <span>
              **[Warning] you are setting an Eth1 address as your withdrawal
              address. Please ensure that you have control over this address.**
            </span>
            <br />
            <br />
            <span>
              Verifying your BLSToExecutionChange file:
              [####################################] N/N
            </span>
            <br />
            <br />
            <span>Success!</span>
            <br />
            <span>
              Your SignedBLSToExecutionChange JSON file can be found at:
              /.../staking-deposit-cli/bls_to_execution_changes
            </span>
            <br />
            <br />
            <span>Press any key.</span>
          </CodeBlock>
          <Text className="mb10">
            <FormattedMessage
              defaultMessage="You can find the {file} file in the {folder} folder by default."
              values={{
                file: <Code>bls_to_execution_changes-*.json</Code>,
                folder: <Code>./bls_to_execution_changes</Code>,
              }}
            />
          </Text>
        </section>
        <section>
          <Anchor to="#broadcast-message" id="broadcast-message">
            <SectionTitle level={2} className="mb10">
              <FormattedMessage
                defaultMessage="Upload to Beacon Node {btec} pool"
                values={{ btec: <code>BLSToExecutionChange</code> }}
              />
            </SectionTitle>
          </Anchor>
          <Text className="my20">
            <FormattedMessage
              defaultMessage="You can broadcast your signed message from the command line using the {curl} command:"
              values={{
                curl: <Code>curl</Code>,
              }}
            />
          </Text>
          <CodeBlock className="indent">
            <span>
              curl -X POST -H “Content-type: application/json” -d @
              <span className="custom">
                {`<@${formatMessage({
                  defaultMessage: 'Filename destination',
                })}>`}
              </span>
              {` `}\
            </span>
            <br />
            <span>{`http://<BEACON_NODE_HTTP_API_URL>/eth/v1/beacon/pool/bls_to_execution_changes`}</span>
          </CodeBlock>
          <Text className="my20">
            <FormattedMessage defaultMessage="You can also use the Beaconcha.in broadcasting tool to upload your message using a web user interface:" />
          </Text>
          <Link
            primary
            to={`https://${NETWORK_NAME.toLowerCase()}.beaconcha.in/tools/broadcast`}
            className="cta-button"
          >
            <FormattedMessage defaultMessage="Beaconcha.in Broadcast Tool" />
          </Link>
        </section>
      </ComponentStyles>
    </PageTemplate>
  );
};
