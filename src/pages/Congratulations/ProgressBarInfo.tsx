import React from 'react';
import styled from 'styled-components';
import numeral from 'numeral';
import { Text } from '../../components/Text';

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
  const formattedEth = numeral(amountEth).format('0,0');
  const formattedValidators = numeral(amountValidators).format('0,0');

  return (
    <div className="flex">
      <ColorBox color={color} />
      <div>
        <Text weight="bold">{title}</Text>
        <Text size="small">{formattedEth} ETH</Text>
        <Text size="small">({formattedValidators} validators)</Text>
      </div>
    </div>
  );
};
