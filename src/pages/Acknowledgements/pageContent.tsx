import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { AcknowledgementIdsEnum } from '../../store/reducers';
import { Link } from '../../components/Link';
import { Text } from '../../components/Text';
import { PRICE_PER_VALIDATOR, TICKER_NAME } from '../../utils/envVars';

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
          <FormattedMessage defaultMessage="The Beacon Chain upgrade brings proof-of-stake consensus to Ethereum." />
        </Text>
        <Text size="medium" className="my10">
          <FormattedMessage
            defaultMessage="For this, we need active participants - known as validators - to
              propose, verify, and vouch for the validity of blocks. In exchange, honest
              validators receive financial rewards."
          />
        </Text>
        <Text size="medium" className="my10">
          <FormattedMessage
            defaultMessage="Importantly, as a validator you'll need to post {TICKER_NAME} as
              collateral - in other words, have some funds at stake. The only way to become a
              validator is to make a one-way {TICKER_NAME} transaction to the deposit contract
              on the current Ethereum chain."
            values={{ TICKER_NAME }}
          />
        </Text>
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
          <FormattedMessage defaultMessage="This is a non-reversible transaction." />
        </Text>
        <Text size="medium" className="my20">
          <FormattedMessage
            defaultMessage="Withdrawing your deposit won't be possible until mainnet merges
              with the Beacon Chain."
          />
        </Text>
        <Link to="https://ethereum.org/eth2/docking/" className="my10" primary>
          <FormattedMessage defaultMessage="More on the merge" />
        </Link>
      </>
    ),
    acknowledgementText: (
      <FormattedMessage
        defaultMessage="I understand that I need to deposit {PRICE_PER_VALIDATOR} {TICKER_NAME}
          to become a validator, and that the transfer of {TICKER_NAME} to the Beacon Chain is
          one-way, and non-reversible."
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
          <FormattedMessage defaultMessage="More on Eth2 economics" />
        </Link>
      </>
    ),
    acknowledgementText: (
      <FormattedMessage defaultMessage="I understand that it is important to keep my validator online and updated." />
    ),
  },
  [AcknowledgementIdsEnum.slashing]: {
    title: <FormattedMessage defaultMessage="Bad validator behaviour" />,
    content: (
      <>
        <Text size="medium" className="my10">
          <FormattedMessage
            defaultMessage="If you try to cheat the system, or act contrary to the specification,
              you will be liable to incur a penalty, known as slashing. Running your validator keys simultaneously on two or more machines will result in slashing."
          />
        </Text>
        <Link
          to="https://github.com/ethereum/eth2.0-specs"
          className="my10"
          primary
        >
          <FormattedMessage defaultMessage="The Eth2 specification" />
        </Link>
        <Link to="/faq" className="my10" primary>
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
          <FormattedMessage
            defaultMessage="To become a validator you'll need to know about managing keys and
              protecting a mnemonic. If you are not yet familiar with keys and mnemomics, please
              do not proceed. Note that during this process you will not derive the keys needed to
              withdraw later, so store your mnemonic safely in order to be able to withdraw later."
          />
        </Text>
        <Text size="medium" className="mt20">
          <FormattedMessage defaultMessage="We'll help you create a signing key for every validator you want to run. Because there are no withdrawals until The Merge, you will not create your withdrawal keys now. When it is possible to withdraw you funds, you can derive your withdrawal keys from your mnemonic." />
        </Text>
        <Text size="medium" className="mt20">
          <FormattedMessage
            defaultMessage="Your mnemonic is the backup for your signing keys and will be the ONLY way to
              withdraw your {TICKER_NAME} when the time comes and no one can help you recover your mnemonic if
              you lose it."
            values={{ TICKER_NAME }}
          />
        </Text>
      </>
    ),
    acknowledgementText: (
      <FormattedMessage
        defaultMessage="I understand that keys are my responsibility and that my mnemonic (seed)
          will be the {onlyWay} to withdraw my funds."
        values={{ onlyWay: <BoldCaps>only way</BoldCaps> }}
      />
    ),
  },
  [AcknowledgementIdsEnum.commitment]: {
    title: (
      <FormattedMessage defaultMessage="Validating is a long-term commitment" />
    ),
    content: (
      <>
        <Text size="medium" className="my10">
          <FormattedMessage
            defaultMessage={`Transfers between validators aren't possible yet. You will have to
              wait until mainnet merges with the Beacon Chain (around two years) before you can
              withdraw or transfer your {TICKER_NAME}.`}
            values={{ TICKER_NAME }}
          />
        </Text>
        <Link
          to="https://ethereum.org/en/eth2/docking"
          className="my10"
          primary
        >
          <FormattedMessage defaultMessage="More on the merge" />
        </Link>
        <Text size="medium" className="my10">
          <FormattedMessage
            defaultMessage="With transfers disabled for now, you won't be able to voluntarily exit
            and then restart later. This means you need to be in it for the long haul."
          />
        </Text>
      </>
    ),
    acknowledgementText: (
      <FormattedMessage
        defaultMessage="I understand that I {cannotTransfer} my stake for a while, and I
          {cannotWithdraw} until the merge. I understand that if I exit, I will not be able
          to rejoin until much later. This is a long term commitment."
        values={{
          cannotTransfer: <BoldCaps>cannot transfer</BoldCaps>,
          cannotWithdraw: <BoldCaps>cannot withdraw</BoldCaps>,
        }}
      />
    ),
  },
  [AcknowledgementIdsEnum.earlyAdoptionRisks]: {
    title: <FormattedMessage defaultMessage="Early adopter risks" />,
    content: (
      <Text size="medium" className="my10">
        <FormattedMessage
          defaultMessage="You're joining an emerging, growing network. As with any new piece of software,
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
            the terminal on your computer. Generating your new Eth2 key pairs and installing
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
        <Link
          inline
          shouldOpenNewTab={true}
          to="/checklist"
          className="my10"
          primary
        >
          <FormattedMessage defaultMessage="Eth2 validator checklist" />
        </Link>
      </>
    ),
    acknowledgementText: (
      <FormattedMessage defaultMessage="I have reviewed the checklist." />
    ),
  },
  [AcknowledgementIdsEnum.confirmation]: {
    title: <FormattedMessage defaultMessage="Confirmation" />,
    content: (
      <>
        <Text size="medium" className="my10">
          <FormattedMessage defaultMessage="I have read and agree to the Launchpad terms of service." />
        </Text>
        <Link inline to="/terms-of-service" className="my10" primary>
          <FormattedMessage defaultMessage="Terms of service" />
        </Link>
      </>
    ),
    acknowledgementText: (
      <FormattedMessage defaultMessage="I understand and agree to the terms-of-service and everything stated in the previous sections." />
    ),
  },
};
