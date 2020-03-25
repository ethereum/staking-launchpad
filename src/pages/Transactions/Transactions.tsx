import React from 'react';
import { Spinning } from 'grommet-controls';
import { Box } from 'grommet';
import { WorkflowPageTemplate } from '../../components/WorkflowPage/WorkflowPageTemplate';
import { rainbowMutedColors } from '../../styles/styledComponentsTheme';
import { Paper } from '../../components/Paper';
import { Text } from '../../components/Text';

export const TransactionsPage = () => (
  <WorkflowPageTemplate
    title="Deposit Summary"
    backgroundColor={rainbowMutedColors[5]}
  >
    <Paper>
      <Box align="center">
        <Text size="large" className="my10">
          Your transactions have started processing
        </Text>
        <Text size="medium" className="my20">
          Please confirm your transaction for each validator key you have
          generated
        </Text>
        <Spinning size="large" />
      </Box>
    </Paper>
  </WorkflowPageTemplate>
);
