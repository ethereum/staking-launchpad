import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { AcknowledgementIdsEnum } from '../../store/reducers';
import { Link } from '../../components/Link';
import { Text } from '../../components/Text';
import {
  NETWORK_NAME,
  PRICE_PER_VALIDATOR,
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
            defaultMessage="Importantly, as a validator you'll need to post {TICKER_NAME} as
              collateral—in other words, have some funds at stake. The only way to become a
              validator is to make a one-way {TICKER_NAME} transaction to the deposit contract
              on the {NETWORK_NAME} execution layer. The Beacon Chain (consensus layer) is used
              in parallel to keep track of all validator activity."
            values={{ TICKER_NAME, NETWORK_NAME }}
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
  [AcknowledgementIdsEnum.deposit]: {
    title: <FormattedMessage defaultMessage="The deposit" />,
    content: (
      <>
        <Text size="medium" className="my10">
          <FormattedMessage
            defaultMessage="To become a validator on the Beacon Chain, you need to deposit
              {PRICE_PER_VALIDATOR} {TICKER_NAME} per validator that you wish to run."
            values={{ PRICE_PER_VALIDATOR, TICKER_NAME }}
          />
        </Text>
        <Text size="medium" className="my20">
          <FormattedMessage
            defaultMessage="Like all Ethereum transactions, deposits are non-reversible, but
            the ability to withdrawal your funds via a separate process after depositing remains
            under your control."
          />
        </Text>
      </>
    ),
    acknowledgementText: (
      <FormattedMessage
        defaultMessage="I understand that I need to deposit {PRICE_PER_VALIDATOR} {TICKER_NAME}
          onto the Beacon Chain to become a validator. Withdrawing deposited {TICKER_NAME} from the Beacon Chain is accomplished via a separate process."
        values={{ PRICE_PER_VALIDATOR, TICKER_NAME }}
      />
    ),
  },
  [AcknowledgementIdsEnum.responsibilities]: {
    title: <FormattedMessage defaultMessage="Validator uptime" />,
    content: (
      <>
        <Text size="medium" className="my10">
          <FormattedMessage
            defaultMessage="You'll only get your full rewards if your validator is online and up
              to date. This is your responsibility. If your validator goes offline you'll be
              penalized. The penalties for being offline are roughly equal to the rewards for
              actively participating."
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
        <Link
          to="https://github.com/ethereum/consensus-specs"
          className="my10"
          primary
        >
          <FormattedMessage defaultMessage="The Ethereum consensus layer specification" />
        </Link>
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
          <FormattedMessage defaultMessage="We'll help you create a signing key for every validator you want to run. You may choose to provide a withdrawal address for your validator when generating your deposit data, which will permanently set the withdrawal address. This is recommended for most users." />
        </Text>
        <Text size="medium" className="mt10">
          <FormattedMessage
            defaultMessage="If you do not provide a withdrawal address with your initial deposit data, you will need to derive your withdrawal keys from your mnemonic at a later time, so {boldWarning}—it will be the ONLY way to withdraw your {TICKER_NAME} when you chose to activate withdrawals."
            values={{
              TICKER_NAME,
              boldWarning: (
                <strong>
                  <FormattedMessage defaultMessage="store your mnemonic safely" />
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
        defaultMessage="I understand that keys are my responsibility and that my mnemonic (seed)
          will be the {onlyWay} to withdraw my funds if I don't provide a withdrawal address with initial deposit data."
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
    title: <FormattedMessage defaultMessage="Early adopter risks" />,
    content: (
      <Text size="medium" className="my10">
        <FormattedMessage
          defaultMessage="You're joining a network in its early stages. As with any new piece of software,
              there is the potential for software bugs. While unlikely, potential bugs may
              result in slashing."
        />
      </Text>
    ),
    acknowledgementText: (
      <FormattedMessage
        defaultMessage="I am an early adopter, and I accept that software and design bugs may
          result in me being slashed."
      />
    ),
  },
  [AcknowledgementIdsEnum.terminal]: {
    title: <FormattedMessage defaultMessage="Using the terminal" />,
    content: (
      <Text size="medium" className="my10">
        <FormattedMessage
          defaultMessage="To become a validator, you will need to be able to run commands in
            the terminal on your computer. Generating your new key pairs and installing
            the validator software are both done in the terminal."
        />
      </Text>
    ),
    acknowledgementText: (
      <FormattedMessage defaultMessage="I am technically capable of setting up and running a validator." />
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
