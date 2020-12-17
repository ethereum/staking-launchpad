import React, { useMemo, useState } from 'react';
import { CheckBox } from 'grommet';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SendOptions } from 'web3-eth-contract';
import { ByteVectorType, ContainerType, NumberUintType } from '@chainsafe/ssz';
import { useWeb3React } from '@web3-react/core';
import { AbstractConnector } from '@web3-react/abstract-connector';
import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import { Alert as AlertIcon } from 'grommet-icons';
import styled from 'styled-components';
import { contractAbi } from '../../contractAbi';
import { CONTRACT_ADDRESS } from '../../utils/envVars';
import { BeaconChainValidator } from './types';
import { bufferHex } from '../../utils/SSZ';
import { buf2hex } from '../../utils/buf2hex';
import { Text } from '../../components/Text';
import { Button } from '../../components/Button';
import { Paper } from '../../components/Paper';
import { Heading } from '../../components/Heading';
import { NumberInput } from '../GenerateKeys/NumberInput';
import shortenAddress from '../../utils/shortenAddress';
import { Alert } from '../../components/Alert';

interface Props {
  validator: BeaconChainValidator;
}

const depositDataContainer = new ContainerType({
  fields: {
    pubkey: new ByteVectorType({
      length: 48,
    }),
    withdrawalCredentials: new ByteVectorType({
      length: 32,
    }),
    amount: new NumberUintType({
      byteLength: 8,
    }),
    signature: new ByteVectorType({
      length: 96,
    }),
  },
});

const InputContainer = styled.div`
  max-width: 300px;
  margin: 0 auto;
`;

const TopUpDetailsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 10px;
  border: 1px solid lightblue;
  background: #eaf6f9;
  border-radius: 5px;
  padding: 10px 20px;
  flex-wrap: wrap;
`;

const TopupPage: React.FC<Props> = ({ validator }) => {
  const { connector, account } = useWeb3React();
  const [value, setValue] = React.useState(0);

  const balance = useMemo(() => validator.effectivebalance / 10 ** 9, [
    validator,
  ]);

  const newBalance = useMemo(() => balance + value, [balance, value]);

  const maxTopUpVal = useMemo(() => 32 - balance, [balance]);

  const topUp = async () => {
    const walletProvider: any = await (connector as AbstractConnector).getProvider();
    const web3: any = new Web3(walletProvider);
    const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
    const bnInput = new BigNumber(value);
    const transactionAmount = bnInput.multipliedBy(1e18).toNumber();
    const reconstructedRootAmount = bnInput.multipliedBy(1e9).toNumber();

    const transactionParameters: SendOptions = {
      gasPrice: web3.utils.toHex(await web3.eth.getGasPrice()),
      from: account as string,
      value: transactionAmount,
    };

    const reconstructedKeyFile = {
      pubkey: bufferHex(validator.pubkey.substring(2)),
      withdrawalCredentials: Buffer.alloc(32),
      amount: reconstructedRootAmount,
      signature: Buffer.alloc(96),
    };

    const byteRoot = depositDataContainer.hashTreeRoot(reconstructedKeyFile);
    const reconstructedDepositDataRoot = `0x${buf2hex(byteRoot)}`;

    contract.methods
      .deposit(
        reconstructedKeyFile.pubkey,
        reconstructedKeyFile.withdrawalCredentials,
        reconstructedKeyFile.signature,
        reconstructedDepositDataRoot
      )
      .send(transactionParameters)
      .on('transactionHash', (hash: string): void => {
        console.log('tx hash : ', hash);
      })
      .on('receipt', () => {
        // do something?
      })
      .on(
        'confirmation',
        (confirmation: number, receipt: { status: {} }): any => {
          if (confirmation === 0) {
            if (receipt.status) {
              console.log('FINISHED!');
            } else {
              console.log('FAILED!');
            }
          }
        }
      )
      .on('error', (error: any) => {
        console.log(error);
      });
  };

  const [termA, setTermA] = useState(false);
  const [termB, setTermB] = useState(false);
  const [termC, setTermC] = useState(false);

  return (
    <div>
      <Paper className="mt20">
        <Heading level={3} color="blueDark">
          Risks & Acknowledgements:
        </Heading>
        <CheckBox
          checked={termA}
          onChange={() => setTermA(!termA)}
          label={
            <Text className="checkbox-label mt20">
              Although TRON mining some dormant proof of stake of a ICO, Tether
              looked at many hash. Maker was lots of whale until some
              decentralised application.
            </Text>
          }
        />
        <CheckBox
          checked={termB}
          onChange={() => setTermB(!termB)}
          label={
            <Text className="checkbox-label mt20">
              Satoshi Nakamoto detected few considerable escrow after some
              hardware wallet.
            </Text>
          }
        />
        <CheckBox
          checked={termC}
          onChange={() => setTermC(!termC)}
          label={
            <Text className="checkbox-label mt20">
              Stellar halving the safe proof of work, therefore, Litecoin
              required a trusted turing-complete after lots of stablecoin. They
              cooperated many do your own research although Cardano based on
              some whitepaper for few initial coin offering, for although they
              chose the efficient cryptocurrency, blockchain expected the
              oracle.
            </Text>
          }
        />
      </Paper>
      <Paper className="mt30">
        <Heading level={3} color="blueDark">
          Top Up Details
        </Heading>
        <TopUpDetailsContainer>
          <div>
            <Text weight={600} color="blueDark">
              Public Key
            </Text>
            <Text>{shortenAddress(validator.pubkey, 6)}</Text>
          </div>
          <div>
            <Text weight={600} color="blueDark">
              Current Balance
            </Text>
            <Text>{balance} ETH</Text>
          </div>
          <div>
            <Text weight={600} color="blueDark">
              Balance after topup
            </Text>
            <Text>{newBalance} ETH</Text>
          </div>
        </TopUpDetailsContainer>

        <div style={{ visibility: newBalance > 32 ? 'visible' : 'hidden' }}>
          <Alert variant="warning" className="my10">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <AlertIcon color="redLight" />
              <Text className="ml10">
                Submitting a topup for more than {maxTopUpVal} will result in a
                balance higher than the maximum balance of 32.
              </Text>
            </div>
          </Alert>
        </div>

        <InputContainer>
          <NumberInput value={value} setValue={setValue} allowDecimals />
          <Button
            className="mt10"
            label="Submit"
            rainbow
            onClick={topUp}
            disabled={value === 0}
          />
        </InputContainer>
      </Paper>
    </div>
  );
};

export default TopupPage;
