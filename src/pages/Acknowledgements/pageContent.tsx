import React from 'react';
import { FormNext } from 'grommet-icons';
import { AcknowledgementIdsEnum } from '../../store/reducers';
import { Link } from '../../components/Link';
import { Text } from '../../components/Text';
import { PRICE_PER_VALIDATOR } from '../../utils/envVars';

export interface PageContentInterface {
  title: string;
  content: JSX.Element;
  acknowledgementText?: string;
}

export const pageContent = {
  [AcknowledgementIdsEnum.introSection]: {
    title: 'Introducing eth2 phase 0',
    content: (
      <>
        <Text size="large" className="my10">
          Ethereum 2.0 uses proof-of-stake to secure its network.
        </Text>
        <Text size="large" className="my10">
          For this, we need active participants - known as validators - to
          propose, verify, and vouch for the validity of blocks. In exchange,
          honest validators receive financial rewards.
        </Text>
        <Text size="large" className="my10">
          Importantly, validators need to post ETH as collateral - in other
          words, have some funds at stake. The only way to become a validator is
          to make a one-way ETH transaction to the deposit contract on Ethereum
          1.0.
        </Text>
        <Link external to="https://www.google.com" className="my10" primary>
          Learn More <FormNext color="blueDark" />
        </Link>
      </>
    ),
  },
  [AcknowledgementIdsEnum.signup]: {
    title: 'Signing up',
    content: (
      <Text size="large" className="my10">
        To become a validator on eth2, you need to deposit 
        {PRICE_PER_VALIDATOR}
        ETH per validator that you wish to run. This process cannot be reversed.
      </Text>
    ),
    acknowledgementText: `I understand that I need to deposit ${PRICE_PER_VALIDATOR} ETH to sign up as a validator. And that the transfer of ETH from eth1 to to eth2 is one-way, and non-reversible.`,
  },
  [AcknowledgementIdsEnum.responsibilities]: {
    title: 'Responsibilities',
    content: (
      <>
        <Text size="large" className="my10">
          Only validators that actively participate in consensus, receive
          rewards. Those that are offline are penalized. The penalties for being
          offline are equal to the rewards for actively participating.
        </Text>
        <Link
          external
          to="https://docs.google.com/spreadsheets/d/15tmPOvOgi3wKxJw7KQJKoUe-uonbYR6HF7u83LR5Mj4/edit#gid=842896204"
          className="my10"
          primary
        >
          Learn more about eth2 economics
          <FormNext color="blueDark" />
        </Link>
      </>
    ),
    acknowledgementText:
      'I understand that it is important to keep my validator online and updated.',
  },
  [AcknowledgementIdsEnum.slashing]: {
    title: 'Slashing Risks',
    content: (
      <>
        <Text size="large" className="my10">
          Validators that act maliciously, or contrary to the specification, are
          liable to be slashed (incur a large penalty).
        </Text>
        <Link external to="https://www.google.com" className="my10" primary>
          Learn More about about penalties <FormNext color="blueDark" />
        </Link>
      </>
    ),
    acknowledgementText:
      'I understand that if I act contrary to the specification, I am liable to be slashed.',
  },
  [AcknowledgementIdsEnum.keyManagement]: {
    title: 'Backup Mnemonic',
    content: (
      <Text size="large" className="my10">
        Validator keys are derived from a unique mnemonic (or seed). Your
        seed is the ONLY WAY to withdraw your funds. Above all, keep it safe!
      </Text>
    ),
    acknowledgementText:
      'I understand that my mnemonic is the ONLY WAY to withdraw my funds.',
  },
  [AcknowledgementIdsEnum.signingKeys]: {
    title: 'Signing Keys',
    content: (
      <Text size="large" className="my10">
        This Launchpad will help you create keys for each of your validators.
        These keys will be saved in key-stores and you will need to give these
        to your validator software to begin validating. You will also receive a
        deposit file to upload to this website with the public keys for your
        validator.
      </Text>
    ),
    acknowledgementText:
      'I will safeguard my key-stores and give them to my validator software in order to start validating.',
  },
  [AcknowledgementIdsEnum.transferDelay]: {
    title: 'Transfer delay',
    content: (
      <>
        <Text size="large" className="my10">
          Transfers between validators are disabled until at least phase 1.
          Validators will have to wait until phase 2 (around two years) to be
          able to withdraw to a specific shard.
        </Text>
        <Link external to="https://www.google.com" className="my10" primary>
          Learn More about eth2&apos;s phases <FormNext color="blueDark" />
        </Link>
      </>
    ),
    acknowledgementText:
      'I understand that I CAN NOT TRANSFER my staked ETH until at least phase 1, and I CAN NOT WITHDRAW until phase 2.',
  },
  [AcknowledgementIdsEnum.commitment]: {
    title: 'Long-term commitment',
    content: (
      <Text size="large" className="my10">
        With transfers disabled until at least phase 1, there’s no way for a
        validator to voluntarily exit and then restart later. This means
        validators need to be in it for the long haul.
      </Text>
    ),
    acknowledgementText:
      'Once I exit, I can not rejoin until at least phase 1. This is a long term commitment.',
  },
  [AcknowledgementIdsEnum.earlyAdoptionRisks]: {
    title: 'Early adopter risks',
    content: (
      <Text size="large" className="my10">
        Validators are participating in the initial launch of a novel network.
        As with any new piece of software, there is the potential for software
        bugs. While unlikely, potential bugs may result in slashing.
      </Text>
    ),
    acknowledgementText:
      'I am an early adopter, and I accept that software and design bugs may result in me being slashed.',
  },
  [AcknowledgementIdsEnum.confirmation]: {
    title: 'Confirmation',
    content: (
      <>
        <Text size="large" className="my10">
          In order to become a validator, you will generate your new eth2 key
          pairs. To do this and to install the validator software you need to be
          technically capable of running commands in a terminal on a computer.
        </Text>
      </>
    ),
    acknowledgementText:
      'I agree to all of the previous sections, and I am technically capable of setting up and running a validator',
  },
};
