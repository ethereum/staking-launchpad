import React from 'react';
import { FormNext } from 'grommet-icons';
import { Text } from 'grommet';
import { AcknowledgementSectionData } from './AcknowledgementSection';
import { acknowledgementId } from '../../store/reducers';
import { Link } from '../../components/Link';
import { PRICE_PER_VALIDATOR } from '../../utils/envVars';

export const pageContent: AcknowledgementSectionData[] = [
  {
    id: acknowledgementId.signup,
    title: 'signing up',
    content: (
      <Text size="large" className="my10">
        In order to become a validator on the eth2 beacon chain, one needs to
        deposit ${PRICE_PER_VALIDATOR} ETH (in exchange for bETH). This process
        cannot be reversed
      </Text>
    ),
    acknowledgement: {
      id: acknowledgementId.signup,
      text: `I understand that I need to deposit ${PRICE_PER_VALIDATOR} ETH to sign up as a validator. And that the transfer of ETH from eth1 to to eth2 is one-way, and non-reversible.`,
    },
  },
  {
    id: acknowledgementId.responsibilities,
    title: 'responsibilities',
    content: (
      <>
        <Text size="large" className="my10">
          Only validators that actively participate in consensus receive
          rewards. Those that are offline are penalised - where the penalties
          for being offline are equal to the rewards for actively participating.
        </Text>
        <Link external to="https://www.google.com" className="my10" primary>
          Learn More about the duties of a validator{' '}
          <FormNext color="blueDark" />
        </Link>
      </>
    ),
    acknowledgement: {
      id: acknowledgementId.responsibilities,
      text: 'I understand what validators do.',
    },
  },
  {
    id: acknowledgementId.slashing,
    title: 'slashing risks',
    content: (
      <>
        <Text size="large" className="my10">
          Validators that act maliciously, or contrary to the specification, are
          liable to be slashed (incur a large penalty)
        </Text>
        <Link external to="https://www.google.com" className="my10" primary>
          Learn More about about penalties <FormNext color="blueDark" />
        </Link>
      </>
    ),
    acknowledgement: {
      id: acknowledgementId.slashing,
      text:
        'I understand that if I act contrary to the specification, I am liable to be slashed.',
    },
  },
  {
    id: acknowledgementId.keyManagement,
    title: 'backup mnemonic',
    content: (
      <Text size="large" className="my10">
        Each validators’ keys will be derived from a unique mnemonic (or seed)
        phrase. Validators will NEED this mnemonic to be able to withdraw their
        funds. It also serves as a backup for the signing key.
      </Text>
    ),
    acknowledgement: {
      id: acknowledgementId.keyManagement,
      text:
        'I understand that my mnemonic is the ❗️ONLY WAY❗️ to withdraw my funds.',
    },
  },
  {
    id: acknowledgementId.signingKeys,
    title: 'signing keys',
    content: (
      <Text size="large" className="my10">
        This process will produce 1 key-store for each of your validators. You
        will need to give these to your validator software to begin validating.
        You will also receive one deposits file to upload to this website.
      </Text>
    ),
    acknowledgement: {
      id: acknowledgementId.signingKeys,
      text:
        'I will safeguard my signing key-stores and give them to my validator software when I am supposed to start validating.',
    },
  },
  {
    id: acknowledgementId.transferDelay,
    title: 'transfer delay',
    content: (
      <Text size="large" className="my10">
        Transfers between validators are disabled until at least phase 1. And
        validators will have to wait until phase 2 – around two years – to be
        able to withdraw to a specific shard.
      </Text>
    ),
    acknowledgement: {
      id: acknowledgementId.transferDelay,
      text:
        'I understand that I CANNOT TRANSFER my staked ETH until at least phase 1 and withdraw until phase 2.',
    },
  },
  {
    id: acknowledgementId.commitment,
    title: 'long-term commitment',
    content: (
      <Text size="large" className="my10">
        With transfers disabled until at least phase 1, there’s no way for a
        validator to voluntarily exit and then restart later. This means
        validators need to be in it for the long haul.
      </Text>
    ),
    acknowledgement: {
      id: acknowledgementId.commitment,
      text:
        'Once I exit, I cannot rejoin until at least phase 1. This is a long term commitment.',
    },
  },
  {
    id: acknowledgementId.earlyAdoptionRisks,
    title: 'early adopter risks',
    content: (
      <Text size="large" className="my10">
        Validators are participating in the initial launch of a novel network.
        As with any new piece of software, there is the potential for software
        bugs. While unlikely, potential bugs may result in slashing.
      </Text>
    ),
    acknowledgement: {
      id: acknowledgementId.earlyAdoptionRisks,
      text:
        'I am an early adopter and I accept that software and design bugs may result in me being slashed.',
    },
  },
];
