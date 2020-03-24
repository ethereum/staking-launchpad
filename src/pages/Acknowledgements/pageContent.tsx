import React from 'react';
import { FormNext } from 'grommet-icons';
import { AcknowledgementIdsEnum } from '../../store/reducers';
import { pricePerValidator } from '../../enums';
import { Link } from '../../components/Link';
import { Text } from '../../components/Text';
import { AcknowledgementSection } from './AcknowledgementSection';
import { Paper, PaperGroup } from '../../components/Paper';
import { Box } from 'grommet';
import { Button } from '../../components/Button';
import { routesEnum } from '../../Routes';
import { Heading } from '../../components/Heading';

export const pageContent = {
  [AcknowledgementIdsEnum.introSection]: ({
    handleContinueClick,
    handleGoBackClick,
  }: any) => (
    <AcknowledgementSection
      handleContinueClick={handleContinueClick}
      handleGoBackClick={handleGoBackClick}
      title="Introducing eth2 phase 0"
      content={
        <>
          <Text size="large" className="my10">
            Ethereum 2.0 uses proof-of-stake to secure its network.
          </Text>
          <Text size="large" className="my10">
            For this, we need active participants - known as validators - to
            propose, verify, and vouch for the validity of blocks. In exchange,
            honest validators receive financial rewards
          </Text>
          <Text size="large" className="my10">
            Importantly, validators need to post ETH as collateral - in other
            words, have some funds at stake. The only way to become a validator
            is to make a one-way ETH transaction to a deposit contract on
            Ethereum 1.0
          </Text>
          <Link external to="https://www.google.com" className="my10" primary>
            Learn More <FormNext color="blueDark" />
          </Link>
        </>
      }
      acknowledgement={{
        id: AcknowledgementIdsEnum.introSection,
      }}
    />
  ),
  [AcknowledgementIdsEnum.signup]: ({
    handleContinueClick,
    handleGoBackClick,
  }: any) => (
    <AcknowledgementSection
      handleContinueClick={handleContinueClick}
      handleGoBackClick={handleGoBackClick}
      title="Signing up"
      content={
        <Text size="large" className="my10">
          In order to become a validator on the eth2 beacon chain, one needs to
          deposit {pricePerValidator}
          ETH (in exchange for bETH). This process cannot be reversed
        </Text>
      }
      acknowledgement={{
        id: AcknowledgementIdsEnum.signup,
        text: `I understand that I need to deposit ${pricePerValidator} ETH to sign up as a validator. And that the transfer of ETH from eth1 to to eth2 is one-way, and non-reversible.`,
      }}
    />
  ),
  [AcknowledgementIdsEnum.responsibilities]: ({
    handleContinueClick,
    handleGoBackClick,
  }: any) => (
    <AcknowledgementSection
      handleContinueClick={handleContinueClick}
      handleGoBackClick={handleGoBackClick}
      title="Responsibilities"
      content={
        <>
          <Text size="large" className="my10">
            Only validators that actively participate in consensus receive
            rewards. Those that are offline are penalised - where the penalties
            for being offline are equal to the rewards for actively
            participating.
          </Text>
          <Link external to="https://www.google.com" className="my10" primary>
            Learn More about the duties of a validator
            <FormNext color="blueDark" />
          </Link>
        </>
      }
      acknowledgement={{
        id: AcknowledgementIdsEnum.responsibilities,
        text: 'I understand what validators do.',
      }}
    />
  ),
  [AcknowledgementIdsEnum.slashing]: ({
    handleContinueClick,
    handleGoBackClick,
  }: any) => (
    <AcknowledgementSection
      handleContinueClick={handleContinueClick}
      handleGoBackClick={handleGoBackClick}
      title="Slashing Risks"
      content={
        <>
          <Text size="large" className="my10">
            Validators that act maliciously, or contrary to the specification,
            are liable to be slashed (incur a large penalty)
          </Text>
          <Link external to="https://www.google.com" className="my10" primary>
            Learn More about about penalties <FormNext color="blueDark" />
          </Link>
        </>
      }
      acknowledgement={{
        id: AcknowledgementIdsEnum.slashing,
        text:
          'I understand that if I act contrary to the specification, I am liable to be slashed.',
      }}
    />
  ),
  [AcknowledgementIdsEnum.keyManagement]: ({
    handleContinueClick,
    handleGoBackClick,
  }: any) => (
    <AcknowledgementSection
      handleContinueClick={handleContinueClick}
      handleGoBackClick={handleGoBackClick}
      title="Backup Mnemonic"
      content={
        <Text size="large" className="my10">
          Each validators’ keys will be derived from a unique mnemonic (or seed)
          phrase. Validators will NEED this mnemonic to be able to withdraw
          their funds. It also serves as a backup for the signing key.
        </Text>
      }
      acknowledgement={{
        id: AcknowledgementIdsEnum.keyManagement,
        text:
          'I understand that my mnemonic is the ❗️ONLY WAY❗️ to withdraw my funds.',
      }}
    />
  ),

  [AcknowledgementIdsEnum.signingKeys]: ({
    handleContinueClick,
    handleGoBackClick,
  }: any) => (
    <AcknowledgementSection
      handleContinueClick={handleContinueClick}
      handleGoBackClick={handleGoBackClick}
      title="Signing Keys"
      content={
        <Text size="large" className="my10">
          This process will produce 1 key-store for each of your validators. You
          will need to give these to your validator software to begin
          validating. You will also receive one deposits file to upload to this
          website.
        </Text>
      }
      acknowledgement={{
        id: AcknowledgementIdsEnum.signingKeys,
        text:
          'I will safeguard my signing key-stores and give them to my validator software when I am supposed to start validating.',
      }}
    />
  ),

  [AcknowledgementIdsEnum.transferDelay]: ({
    handleContinueClick,
    handleGoBackClick,
  }: any) => (
    <AcknowledgementSection
      handleContinueClick={handleContinueClick}
      handleGoBackClick={handleGoBackClick}
      title="Transfer delay"
      content={
        <Text size="large" className="my10">
          Transfers between validators are disabled until at least phase 1. And
          validators will have to wait until phase 2 – around two years – to be
          able to withdraw to a specific shard.
        </Text>
      }
      acknowledgement={{
        id: AcknowledgementIdsEnum.transferDelay,
        text:
          'I understand that I CANNOT TRANSFER my staked ETH until at least phase 1 and withdraw until phase 2.',
      }}
    />
  ),

  [AcknowledgementIdsEnum.commitment]: ({
    handleContinueClick,
    handleGoBackClick,
  }: any) => (
    <AcknowledgementSection
      handleContinueClick={handleContinueClick}
      handleGoBackClick={handleGoBackClick}
      title="Long-term commitment"
      content={
        <Text size="large" className="my10">
          With transfers disabled until at least phase 1, there’s no way for a
          validator to voluntarily exit and then restart later. This means
          validators need to be in it for the long haul.
        </Text>
      }
      acknowledgement={{
        id: AcknowledgementIdsEnum.commitment,
        text:
          'Once I exit, I cannot rejoin until at least phase 1. This is a long term commitment.',
      }}
    />
  ),

  [AcknowledgementIdsEnum.earlyAdoptionRisks]: ({
    handleContinueClick,
    handleGoBackClick,
  }: any) => (
    <AcknowledgementSection
      handleContinueClick={handleContinueClick}
      handleGoBackClick={handleGoBackClick}
      title="Early adopter risks"
      content={
        <Text size="large" className="my10">
          Validators are participating in the initial launch of a novel network.
          As with any new piece of software, there is the potential for software
          bugs. While unlikely, potential bugs may result in slashing.
        </Text>
      }
      acknowledgement={{
        id: AcknowledgementIdsEnum.earlyAdoptionRisks,
        text:
          'I am an early adopter and I accept that software and design bugs may result in me being slashed.',
      }}
    />
  ),
  [AcknowledgementIdsEnum.confirmation]: ({
    handleContinueClick,
    handleGoBackClick,
    handleSubmit,
    allAgreedTo,
  }: any) => (
    <PaperGroup>
      <Paper>
        <Heading level={3} size="small" color="blueDark">
          Do you agree to everything?
        </Heading>
        <Text>Some more text about what you are agreeing to.</Text>
      </Paper>
      <Paper className="rm-double-border">
        <Text>Perhaps some more text?</Text>
        <Box
          align="center"
          pad="xsmall"
          className="flex flex-row space-evenly mt20"
        >
          <Button
            onClick={() =>
              handleGoBackClick(AcknowledgementIdsEnum.confirmation)
            }
            width={300}
            label="Back"
          />
          <Link
            to={routesEnum.validatorSettingsPage}
            onClick={() => {
              handleContinueClick(AcknowledgementIdsEnum.confirmation);
              handleSubmit();
            }}
          >
            <Button
              rainbow
              width={300}
              disabled={!allAgreedTo}
              label="Continue"
            />
          </Link>
        </Box>
      </Paper>
    </PaperGroup>
  ),
};
