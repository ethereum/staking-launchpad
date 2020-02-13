import React, { useState } from "react";
import { WorkflowPageTemplate } from "../../components/WorkflowPage/WorkflowPageTemplate";
import { StoreState } from "../../store/reducers";
import { connect } from "react-redux";
import { Paper } from "../../components/Paper";
import { Box, Button, CheckBox, Heading, Text } from "grommet";
import styled from "styled-components";
import { InfoBox } from "../../components/InfoBox";
import { Keylist } from "./Keylist";
import { Link } from "../../components/Link";
import { AcknowledgementSection } from "./AcknowledgementSection";
import { keyFile, ProgressStep } from "../../store/actions";
import { routeToCorrectProgressStep } from "../../utils/RouteToCorrectProgressStep";

const SummarySection = styled(Box)`
  width: 30%;
`;

const _SummaryPage = ({
  validatorCount,
  keyFiles,
  progress
}: {
  validatorCount: number;
  keyFiles: keyFile[];
  progress: ProgressStep;
}): JSX.Element => {
  const [losePhrase, setLosePhrase] = useState(false);
  const [earlyAdopt, setEarlyAdopt] = useState(false);
  const [nonReverse, setNonReverse] = useState(false);
  const [noPhish, setNoPhish] = useState(false);
  const allChecked = losePhrase && earlyAdopt && nonReverse && noPhish;

  const validatorKeys = keyFiles.map(file => file.pubkey);

  const renderSummarySection = () => (
    <Paper>
      <Heading level={3} size="small" color="brand">
        Deposit Ceremony Summary
      </Heading>
      <Box className="flex flex-row">
        <SummarySection>
          <Text weight="bold">Validators</Text>
          <InfoBox>{validatorCount}</InfoBox>
        </SummarySection>
        <SummarySection className="mx20">
          <Text weight="bold">Amount</Text>
          <InfoBox>{validatorCount * 32} ETH</InfoBox>
        </SummarySection>
        <SummarySection>
          <Text weight="bold">Key Pairs Generated</Text>
          <InfoBox>{keyFiles.length}</InfoBox>
        </SummarySection>
      </Box>
    </Paper>
  );

  const renderKeyList = () => (
    <Paper className="mt20">
      <Heading level={3} size="small" color="brand">
        Keys
      </Heading>
      <Keylist validatorKeys={validatorKeys} />
    </Paper>
  );

  const renderAcknowledgements = () => (
    <div>
      <AcknowledgementSection title="Please proceed with caution">
        <CheckBox
          onChange={e => setLosePhrase(e.target.checked)}
          checked={losePhrase}
          label="I understand that if I lose my mnemonic phrase, I won't be able to withdraw my funds"
        />
        <span className="mt20">
          <CheckBox
            onChange={e => setEarlyAdopt(e.target.checked)}
            checked={earlyAdopt}
            label="I am aware of the early adopter and slashing risks"
          />
        </span>
        <span className="mt20">
          <CheckBox
            onChange={e => setNonReverse(e.target.checked)}
            checked={nonReverse}
            label="I am aware that this transaction is not reversible"
          />
        </span>
      </AcknowledgementSection>
      <AcknowledgementSection title="Please make sure you aren't being phished">
        <Text>
          You are responsible for the transaction. Fraudulent websites might
          lure you into sending the 32 ETH to them, instead of the official
          deposit contract. Please check that the address you are sending the
          transaction to is the correct address.
        </Text>
        <Link to="https://www.google.com" external className="mt10" primary>
          Learn here how to do it safely
        </Link>
        <span className="mt20">
          <CheckBox
            onChange={e => setNoPhish(e.target.checked)}
            checked={noPhish}
            label="I know how to check that I am sending my ETH into the correct deposit contract and will do so."
          />
        </span>
      </AcknowledgementSection>
    </div>
  );

  if (progress !== ProgressStep.SUMMARY) {
    return routeToCorrectProgressStep(progress);
  }

  return (
    <WorkflowPageTemplate title="Summary">
      {renderSummarySection()}
      {renderKeyList()}
      {renderAcknowledgements()}
      <Box align="center" pad="large">
        <Button
          primary
          disabled={!allChecked}
          label={`SIGN ${validatorCount} TRANSACTION AND DEPOSIT ${validatorCount *
            32} ETH`}
          onClick={() => {}}
        />
      </Box>
    </WorkflowPageTemplate>
  );
};

const mstp = ({ validatorCount, keyFiles, progress }: StoreState) => ({
  validatorCount,
  keyFiles,
  progress
});

export const SummaryPage = connect(mstp)(_SummaryPage);
