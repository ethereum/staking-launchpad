import React from 'react';
import styled from 'styled-components';

/**
 * Type Declarations
 */

interface Props {
  dimensions: NBaseLineChart.Dimensions;
  state: NBaseLineChart.State;
  range: number[];
  margin?: NBaseLineChart.Margin;
  color?: string;
  ticks?: number;
  lines?: Boolean;
  axis?: 'x' | 'y';
  format?: Function;
}

/**
 * Styled Components
 */

const StyledBaseLineChartAxis = styled.g``;

const BaseLineChartAxisTick = styled.text`
  font-family: sans-serif;
  font-size: 16px;
  fill: ${props => props.fill || props.theme.black};
  font-weight: 700;
`;

const BaseLineChartAxisLine = styled.line`
  stroke: rgba(210, 210, 210, 0.7);
  stroke-dasharray: 5 5;
`;

/**
 * Main Component
 */

const BaseLineChartAxis: React.FC<Props> = ({
  dimensions,
  state,
  range = [0, 10_050_000],
  ticks = 10,
  axis = 'x',
  lines = false,
  margin = { top: 2, right: 2, bottom: 2, left: 2 },
  color = '#045388',
  format = (value: any) => value,
}) => {
  return !range.length ? null : (
    <StyledBaseLineChartAxis>
      {!state.chart.y || !state.chart.x
        ? null
        : new Array(ticks).fill(0).map((unused, i) => {
            const interval = (+range[1] - +range[0]) * (i / (ticks - 1));
            const dateLabel = `${format(+range[0] + interval)}`;
            const [textAnchor, x, y, lineX1, lineX2, lineY1, lineY2] =
              axis === 'y'
                ? [
                    'right',
                    -margin.left,
                    state!.chart.y!(+range[0] + interval),
                    state!.chart.x!(0) + margin.left,
                    dimensions.width - margin.left - margin.right,
                    0,
                    0,
                  ]
                : [
                    'middle',
                    state!.chart.x!(+range[0] + interval),
                    state!.chart.y!(0) + 20,
                    0,
                    0,
                    -(dimensions.height - margin.top - margin.bottom) * 0.95 +
                      20,
                    -20,
                  ];

            return (
              <g key={i.toString()} transform={`translate(${x}, ${y})`}>
                <BaseLineChartAxisTick
                  y={axis === 'y' ? 5 : 0}
                  fill={axis === 'y' ? color : undefined}
                  {...{ textAnchor }}
                >
                  {dateLabel.toUpperCase()}
                </BaseLineChartAxisTick>
                {!!lines && (
                  <BaseLineChartAxisLine
                    x1={lineX1}
                    x2={lineX2}
                    y1={lineY1}
                    y2={lineY2}
                  />
                )}
              </g>
            );
          })}
    </StyledBaseLineChartAxis>
  );
};

export default BaseLineChartAxis;
