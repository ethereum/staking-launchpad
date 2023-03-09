import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { keysTool } from './index';
import { Paper } from '../../components/Paper';
import { TextSelectionBox } from '../../components/TextSelectionBox';
import { Option1 } from './Option1';
import { Option2 } from './Option2';
import { Option3 } from './Option3';
import { Heading } from '../../components/Heading';

interface Props {
  validatorCount: number | string;
  withdrawalAddress: string;
  os: 'mac' | 'linux' | 'windows';
  chosenTool: keysTool;
  setChosenTool: (tool: keysTool) => void;
}

export const Instructions = ({
  validatorCount,
  withdrawalAddress,
  os,
  chosenTool,
  setChosenTool,
}: Props) => {
  const { formatMessage } = useIntl();
  return (
    <Paper className="mt20" style={{ animation: 'fadeIn 1s' }}>
      <Heading level={2} size="small" color="blueMedium">
        <FormattedMessage defaultMessage="How do you want to generate your keys?" />
      </Heading>
      <div className="my20" style={{ display: 'flex' }}>
        <TextSelectionBox
          isActive={chosenTool === keysTool.CLI}
          onClick={() => setChosenTool(keysTool.CLI)}
          style={{ marginEnd: '20px' }}
        >
          {formatMessage({ defaultMessage: 'Download CLI app' })}
        </TextSelectionBox>
        <TextSelectionBox
          isActive={chosenTool === keysTool.GUI}
          onClick={() => setChosenTool(keysTool.GUI)}
          style={{ marginEnd: '20px' }}
        >
          {formatMessage({ defaultMessage: 'Download Key Gen GUI app' })}
        </TextSelectionBox>
        <TextSelectionBox
          isActive={chosenTool === keysTool.CLISOURCE}
          onClick={() => setChosenTool(keysTool.CLISOURCE)}
        >
          {formatMessage({ defaultMessage: 'Build from source' })}
        </TextSelectionBox>
      </div>
      <div>
        {chosenTool === keysTool.CLI && (
          <Option1 {...{ validatorCount, withdrawalAddress, os }} />
        )}
        {chosenTool === keysTool.GUI && <Option2 {...{ os }} />}
        {chosenTool === keysTool.CLISOURCE && (
          <Option3 {...{ validatorCount, withdrawalAddress, os }} />
        )}
      </div>
    </Paper>
  );
};
