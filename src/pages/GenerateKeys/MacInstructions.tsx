import React from 'react';
import { Option1 } from './Option1';
import { Option2 } from './Option2';

interface Props {
  validatorCount: number | string;
}

export const MacInstructions = ({ validatorCount }: Props) => {
  return (
    <div style={{ animation: 'fadeIn 1s' }}>
      <Option1 validatorCount={validatorCount} />
      <Option2 validatorCount={validatorCount} os="mac" />
    </div>
  );
};
