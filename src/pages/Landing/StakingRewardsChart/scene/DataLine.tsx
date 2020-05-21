import React from 'react';
import styled from 'styled-components';

/**
 * Type Declarations
 */

interface Props {
  data: NBaseLineChart.Datum[];
  chart: NBaseLineChart.ChartValues;
  color?: string;
}

/*
 * Utils
 */

// Since we need to fill the chart with a solid color underneath the
// line, this function adds points at the bottom left & right of the data
// line's path so that it has a complete area to fill
const calculateLine = (
  data: NBaseLineChart.Datum[],
  chart: NBaseLineChart.ChartValues
): string =>
  !chart || !chart.line || !data || !data.length
    ? ''
    : chart!.line!(data)!
        .replace(/\d+(\.\d+)e-\d+/g, '0')
        .replace(/\.0+\d+/g, '');

/*
 * Styled-Components
 */

const StyledDataLine = styled.path`
  fill: ${props => props.fill || 'transparent'};
  stroke: ${props => props.color || 'transparent'};
  stroke-width: 4;
  opacity: 0;
  animation: 2s LineChart-appear 1 forwards;
  @keyframes LineChart-appear {
    to {
      opacity: 1;
    }
  }
`;

/*
 * Main Component
 */

const DataLine: React.FC<Props> = ({ data, chart, color = '#045388' }) => {
  const d = calculateLine(data, chart);
  return d.match(/NaN|undefined|null/) ? null : (
    <StyledDataLine {...{ d, color }} />
  );
};

export default DataLine;
