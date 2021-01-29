import React from 'react';
import BaseLineChart from '../../../components/BaseLineChart';
import BaseLineChartAxis from '../../../components/BaseLineChart/scene/BaseLineChartAxis';
import CurrentMarker from './scene/CurrentMarker';
import DataLine from './scene/DataLine';
import DataLineEnd from './scene/DataLineEnd';
import EthMarker from './scene/EthMarker';
import StakingRewardsChartTooltip from './scene/StakingRewardsChartTooltip';
import { TICKER_NAME } from '../../../utils/envVars';

/*
 * Type Decclarations
 */

interface Props {
  data: NBaseLineChart.Datum[];
  dataKeys?: NBaseLineChart.DataKeys;
  margin?: NBaseLineChart.Margin;
  color?: string;
  style?: React.CSSProperties;
  showTooltips?: Boolean;
  current?: NBaseLineChart.Datum;
  height?: number;
  width?: number;
  domains?: {
    x: [number, number];
    y: [number, number];
  };
  xAxis?: {
    range: [number, number];
    ticks: number;
    format: Function;
  };
  yAxis?: {
    range: [number, number];
    ticks: number;
    format: Function;
  };
  innerTooltipContent?: Function;
}

/*
 * Main Component
 */

const StakingRewardsChart: React.FC<Props> = ({
  style = {},
  data = [],
  dataKeys = { x: 'x', y: 'y' },
  margin = { top: 2, right: 2, bottom: 2, left: 40 },
  color = '#C5D1FF',
  showTooltips = false,
  current = { x: 524_288, y: 0.216 },
  xAxis = undefined,
  yAxis = undefined,
  innerTooltipContent = undefined,
  ...props
}) => {
  const { x, y } = dataKeys;
  const _data = [...data];
  const _margin = { ...margin, left: margin.left * 1.5 };
  const tooltipCoords = (
    _state: NBaseLineChart.State,
    _current: NBaseLineChart.Datum
  ): NBaseLineChart.Datum =>
    _state.mouse.datum ? _state.mouse.datum : _current;

  return (
    <>
      <div style={{ width: '100%', position: 'relative', ...style }}>
        <BaseLineChart
          margin={_margin}
          data={_data}
          {...{ ...props, color, dataKeys }}
        >
          {({ state }) => {
            const { dimensions, chart } = state;
            return (
              !!(chart.x && chart.y && chart.line) && (
                <>
                  {/* Render the x-axis if flagged */}
                  {!!xAxis && (
                    <>
                      {/* The x-axis ticks */}
                      <BaseLineChartAxis
                        margin={state.margin}
                        {...{ state, dimensions, dataKeys, ...xAxis }}
                      />
                      {/* The x-axis title */}
                      <text
                        x={dimensions.width / 2 - state.margin!.left}
                        y={chart.y(0) + 50}
                        style={{
                          opacity: 0.5,
                          textAnchor: 'middle',
                          fontWeight: 'bold',
                          fontFamily: 'sans-serif',
                        }}
                      >
                        Total {TICKER_NAME} staked&nbsp;(millions)
                      </text>
                    </>
                  )}

                  {/* Render the y-axis if flagged */}
                  {!!yAxis && (
                    <>
                      {/* The y-axis ticks + lines (optional) */}
                      <BaseLineChartAxis
                        axis="y"
                        lines
                        margin={
                          {
                            ...state.margin,
                            left: margin.left,
                          } as NBaseLineChart.Margin
                        }
                        {...{ state, dimensions, dataKeys, ...yAxis }}
                      />
                      {/* The x-axis title */}
                      <text
                        x={-chart.y(0) / 2}
                        y={-_margin.left}
                        style={{
                          opacity: 0.5,
                          textAnchor: 'middle',
                          fontWeight: 'bold',
                          fontFamily: 'sans-serif',
                          transform: 'rotate(-90deg)',
                        }}
                      >
                        Estimated APR ({TICKER_NAME})
                      </text>
                    </>
                  )}

                  {/* The line representing the data */}
                  <DataLine data={_data} {...{ chart, color }} />

                  {/* The minimum/maximum sides of the curve get a diamond
                      indicator */}
                  <DataLineEnd
                    x={chart.x(data[0][x])}
                    y={chart.y(data[0][y])}
                    {...{ color }}
                  />
                  <DataLineEnd
                    x={chart.x(data[data.length - 1][x])}
                    y={chart.y(data[data.length - 1][y])}
                    {...{ color }}
                  />

                  {/* The larger diamod indicating where "current" staked is on
                      the curve. Only shows when the user is hovering over
                      different parts of the chart
                    */}
                  <CurrentMarker
                    x={chart.x(current[x])}
                    y={chart.y(current[y])}
                  />

                  {/* Render the tooltip */}
                  {showTooltips && (
                    <StakingRewardsChartTooltip
                      x0={chart.x(0)}
                      y0={chart.y(0)}
                      x={chart.x(tooltipCoords(state, current)[x])}
                      y={chart.y(tooltipCoords(state, current)[y])}
                      current={{ x: chart.x(current[x]) }}
                      chart={chart}
                      color={color}
                      datum={{
                        x: tooltipCoords(state, current)[x],
                        y: tooltipCoords(state, current)[y],
                      }}
                      innerTooltip={innerTooltipContent}
                      dimensions={
                        state?.chartRef?.getBoundingClientRect() || {}
                      }
                    />
                  )}

                  {/* The ETH diamong logo will match where the tooltip is */}
                  <EthMarker
                    x={chart.x(tooltipCoords(state, current)[x])}
                    y={chart.y(tooltipCoords(state, current)[y])}
                  />
                </>
              )
            );
          }}
        </BaseLineChart>
      </div>
    </>
  );
};

export default StakingRewardsChart;
