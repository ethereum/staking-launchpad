import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { AcknowledgementIdsEnum } from '../../store/reducers';
import { Link } from '../../components/Link';
import { Text } from '../../components/Text';
import {
  NETWORK_NAME,
  MIN_ACTIVATION_BALANCE,
  TICKER_NAME,
} from '../../utils/envVars';

const BoldCaps = styled.strong`
  text-transform: uppercase;
`;

export interface PageContentInterface {
  title: JSX.Element;
  content: JSX.Element;
  acknowledgementText?: JSX.Element;
}

export const pageContent = {
  [AcknowledgementIdsEnum.introSection]: {
    title: <FormattedMessage defaultMessage="Proof of stake" />,
    content: (
      <>
        <Text size="medium" className="my10">
          <FormattedMessage defaultMessage="Ethereum uses proof-of-stake to reach consensus." />
        </Text>
        <Text size="medium" className="my10">
          <FormattedMessage
            defaultMessage="For this, we need active participants—known as validators—to
              propose, verify, and vouch for the validity of blocks. In exchange, honest
              validators receive financial rewards."
          />
        </Text>
        <Text size="medium" className="my10">
          <FormattedMessage
            defaultMessage="Importantly, as a validator you'll need to post a minimum of {MIN_ACTIVATION_BALANCE} {TICKER_NAME} as
              collateral—in other words, have some funds at stake. The only way to become a
              validator is to make a one-way {TICKER_NAME} transaction to the {DEPOSIT_CONTRACT}
              on the {NETWORK_NAME} execution layer. The Beacon Chain (consensus layer) is used
              in parallel to keep track of all validator activity."
            values={{
              MIN_ACTIVATION_BALANCE,
              TICKER_NAME,
              NETWORK_NAME,
              DEPOSIT_CONTRACT: (
                <em>
                  <FormattedMessage defaultMessage="deposit contract" />
                </em>
              ),
            }}
          />
        </Text>
        <Link
          to="https://ethereum.org/en/roadmap/beacon-chain/"
          className="my10"
          primary
        >
          <FormattedMessage defaultMessage="More on the Beacon Chain" />
        </Link>
        <Link
          to="https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/"
          className="my10"
          primary
        >
          <FormattedMessage defaultMessage="More on proof of stake" />
        </Link>
      </>
    ),
    acknowledgementText: (
      <FormattedMessage defaultMessage="I understand proof-of-stake and why validators are needed." />
    ),
  },
  [AcknowledgementIdsEnum.terminal]: {
    title: <FormattedMessage defaultMessage="Using the terminal" />,
    content: (
      <Text size="medium" className="my10">
        <FormattedMessage defaultMessage="It is helpful to know how to run commands in the terminal on your computer. Generating your new key pairs and installing the validator software can be done using graphical interfaces (GUIs) with some software, but by default the terminal is typically used for full control." />
      </Text>
    ),
    acknowledgementText: (
      <FormattedMessage defaultMessage="I am technically capable of setting up and running a validator." />
    ),
  },
  [AcknowledgementIdsEnum.responsibilities]: {
    title: <FormattedMessage defaultMessage="Validator uptime" />,
    content: (
      <>
        <Text size="medium" className="my10">
          <FormattedMessage
            defaultMessage="To maximize your rewards, you need to keep your validator online and up to date.
              This is your responsibility, and your account will be penalized if it goes offline.
              The penalties for being offline are roughly equal to the rewards for actively participating."
          />
        </Text>
        <Link
          to="https://docs.google.com/spreadsheets/d/15tmPOvOgi3wKxJw7KQJKoUe-uonbYR6HF7u83LR5Mj4/edit#gid=842896204"
          className="my10"
          primary
          inline
        >
          <FormattedMessage defaultMessage="More on Ethereum staking economics" />
        </Link>
      </>
    ),
    acknowledgementText: (
      <FormattedMessage defaultMessage="I understand that it is important to keep my validator online and updated." />
    ),
  },
  [AcknowledgementIdsEnum.slashing]: {
    title: <FormattedMessage defaultMessage="Bad validator behavior" />,
    content: (
      <>
        <Text size="medium" className="my10">
          <FormattedMessage
            defaultMessage="If you try to cheat the system, or act contrary to the specification,
              you will be liable to incur a penalty known as slashing*. Running your validator keys simultaneously on two or more machines will result in slashing."
          />
        </Text>
        <Text size="medium" className="my10">
          <FormattedMessage defaultMessage="*Simply being offline with an otherwise healthy network does not result in slashing, but will result in small inactivity penalties." />
        </Text>
        <Link shouldOpenNewTab to="/faq" className="my10" primary>
          <FormattedMessage defaultMessage="More on slashing risks" />
        </Link>
      </>
    ),
    acknowledgementText: (
      <FormattedMessage
        defaultMessage="I understand that if I act contrary to the specification,
          I am liable to be slashed."
      />
    ),
  },
  [AcknowledgementIdsEnum.keyManagement]: {
    title: <FormattedMessage defaultMessage="Key management" />,
    content: (
      <>
        <Text size="medium" className="mt10">
          <FormattedMessage defaultMessage="To become a validator you'll need to know about managing keys and protecting a mnemonic. If you are not yet familiar with keys and mnemonics, please do not proceed." />
        </Text>
        <Text size="medium" className="mt10">
          <FormattedMessage
            defaultMessage="We'll help you generate a signing key for every validator you want to run.
              During which you'll set a withdrawal address that will be permanently tied to each validator account."
          />
        </Text>
      </>
    ),
    acknowledgementText: (
      <FormattedMessage
        defaultMessage="I understand that keys along with my mnemonic (seed) are my responsibility."
        values={{
          onlyWay: (
            <BoldCaps>
              <FormattedMessage defaultMessage="only way" />
            </BoldCaps>
          ),
        }}
      />
    ),
  },
  [AcknowledgementIdsEnum.withdrawalAddress]: {
    title: <FormattedMessage defaultMessage="Withdrawal address" />,
    content: (
      <>
        <Text size="medium" className="mt10">
          <FormattedMessage defaultMessage="We'll guide you through setting a withdrawal address for your validator. This is considered best-practice, and strongly recommended for safety and security reasons." />
        </Text>
        <Text size="medium" className="mt10">
          <FormattedMessage
            defaultMessage="If a withdrawal address is not set at time of deposit, your funds will be locked until one is provided.
              Your default withdrawal keys can be generated from your mnemonic to authenticate a one-time change to add a withdrawal address.
              Remember to {boldWarning}."
            values={{
              boldWarning: (
                <strong>
                  <FormattedMessage defaultMessage="always store your mnemonic safely" />
                </strong>
              ),
            }}
          />
        </Text>
        <Link to="/withdrawals" className="mt10" primary>
          <FormattedMessage defaultMessage="More on withdrawals" />
        </Link>
      </>
    ),
    acknowledgementText: (
      <FormattedMessage
        defaultMessage="I understand that not providing a withdrawal address with my initial deposit leaves my funds locked and the {onlyWay} to withdraw my funds requires my mnemonic."
        values={{
          onlyWay: (
            <BoldCaps>
              <FormattedMessage defaultMessage="only way" />
            </BoldCaps>
          ),
        }}
      />
    ),
  },
  [AcknowledgementIdsEnum.earlyAdoptionRisks]: {
    title: <FormattedMessage defaultMessage="Software risks" />,
    content: (
      <Text size="medium" className="my10">
        <FormattedMessage
          defaultMessage="You're joining a network that functions via software. As with any software,
              there is the potential for accidental bugs. While unlikely, potential bugs may
              result in slashing."
        />
      </Text>
    ),
    acknowledgementText: (
      <FormattedMessage defaultMessage="I accept that software and design bugs may result in me being slashed." />
    ),
  },
  [AcknowledgementIdsEnum.checklist]: {
    title: <FormattedMessage defaultMessage="Staking checklist" />,
    content: (
      <>
        <Text size="medium" className="my10">
          <FormattedMessage defaultMessage="Please review the staking checklist prior to proceeding. Use this as a guide to check off tasks as you complete validator setup." />
        </Text>
        <Link inline shouldOpenNewTab to="/checklist" className="my10" primary>
          <FormattedMessage defaultMessage="Validator checklist" />
        </Link>
        <Text size="medium" className="my20">
          <FormattedMessage defaultMessage="Also be sure you understand how staking withdrawals work before setting up your keys and deposit data." />
        </Text>
        <Link
          inline
          shouldOpenNewTab
          to="/withdrawals"
          className="my10"
          primary
        >
          <FormattedMessage defaultMessage="Staking withdrawals" />
        </Link>
      </>
    ),
    acknowledgementText: (
      <FormattedMessage defaultMessage="I have reviewed the checklist and understand how withdrawals work." />
    ),
  },
  [AcknowledgementIdsEnum.confirmation]: {
    title: <FormattedMessage defaultMessage="Confirmation" />,
    content: (
      <>
        <Text size="medium" className="my10">
          <FormattedMessage defaultMessage="I have read and agree to the Launchpad terms of service." />
        </Text>
        <Link
          inline
          shouldOpenNewTab
          to="/terms-of-service"
          className="my10"
          primary
        >
          <FormattedMessage defaultMessage="Terms of service" />
        </Link>
      </>
    ),
    acknowledgementText: (
      <FormattedMessage defaultMessage="I understand and agree to the terms-of-service and everything stated in the previous sections." />
    ),
  },
};
