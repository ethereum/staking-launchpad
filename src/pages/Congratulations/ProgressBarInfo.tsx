import React from 'react';
import styled from 'styled-components';
import { Text } from '../../components/Text';
import { numberWithCommas } from '../../utils/numberWithCommas';
import { TICKER_NAME } from '../../utils/envVars';

const ColorBox = styled.div`
  height: 20px;
  width: 20px;
  background-color: ${(p: any) => p.color};
  border-radius: ${p => p.theme.borderRadius};
  margin: 10px;
`;

interface Props {
  title: string;
  color: string;
  amountEth: number;
  amountValidators: number;
}

export const ProgressBarInfo = ({
  title,
  color,
  amountEth,
  amountValidators,
}: Props) => {
  const formattedEth = numberWithCommas(amountEth.toFixed(1));
  const formattedValidators = numberWithCommas(amountValidators.toFixed(0));

  return (
    <div className="flex">
      <ColorBox color={color} />
      <div>
        <Text weight="bold">{title}</Text>
        <Text size="small">
          {formattedEth} {TICKER_NAME}
        </Text>
        <Text size="small">({formattedValidators} validators)</Text>
      </div>
    </div>
  );
};
