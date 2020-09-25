import React from 'react';
import { Paper } from '../../components/Paper';
import { TextSelectionBox } from '../../components/TextSelectionBox';
import { Option1 } from './Option1';
import { Option2 } from './Option2';
import { Heading } from '../../components/Heading';

interface Props {
  validatorCount: number | string;
  os: 'mac' | 'linux' | 'windows';
}

export const Instructions = ({ validatorCount, os }: Props) => {
  const [selectedOption, setSelectedOption] = React.useState<1 | 2>(1);
  return (
    <Paper style={{ animation: 'fadeIn 1s' }}>
      <Heading level={2} size="small" color="blueMedium">
        How do you want to run the CLI?
      </Heading>
      <div className="my20" style={{ display: 'flex' }}>
        <TextSelectionBox
          isActive={selectedOption === 1}
          onClick={() => setSelectedOption(1)}
          style={{ marginRight: '20px' }}
        >
          Download pre-built binary
        </TextSelectionBox>
        <TextSelectionBox
          isActive={selectedOption === 2}
          onClick={() => setSelectedOption(2)}
        >
          Build from source
        </TextSelectionBox>
      </div>
      <div>
        {selectedOption === 1 ? (
          <Option1 {...{ validatorCount, os }} />
        ) : (
          <Option2 {...{ validatorCount, os }} />
        )}
      </div>
    </Paper>
  );
};
