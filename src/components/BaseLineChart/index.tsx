import React from 'react';

import * as _handlers from './utils/handlers';
import * as _actions from './utils/actions';
import * as _helpers from './utils/helpers';

/**
 * Main Component
 */

const BaseLineChart: React.FC<NBaseLineChart.Props> = props => {
  const { height, width, data, margin, children } = props;
  const chartRef = React.useRef<SVGSVGElement>(null);
  const [needsRefresh, setNeedsRefresh] = React.useState<boolean>(false);
  const [isLoaded, setLoaded] = React.useState<boolean>(false);
  const [mouse, setMouseState] = React.useState<NBaseLineChart.Mouse>({
    datum: null,
  });
  const [dimensions, setDimensionsState] = React.useState<
    NBaseLineChart.Dimensions
  >({ height: 0, width: 0 });
  const [chart, setChartState] = React.useState<NBaseLineChart.ChartValues>({
    x: undefined,
    y: undefined,
    line: undefined,
    domains: { x: [0, 0], y: [0, 0] },
  });

  //
  // State to pass to render props

  const state: NBaseLineChart.State = {
    dimensions,
    mouse,
    chart,
    chartRef: chartRef.current,
  };

  //
  // Actions to pass to render props

  const actions: NBaseLineChart.Actions = {
    setChart: (_chart, cb) => _actions.setChart(setChartState)(_chart, cb),
    setDimensions: (_dimensions, cb) =>
      _actions.setDimensions(setDimensionsState)(_dimensions, cb),
    setMouse: (_mouse, cb) => _actions.setMouse(setMouseState)(_mouse, cb),
  };

  //
  // Events handlers to pass to the svg

  const handlers: NBaseLineChart.Handlers = {
    onPointerEnter: _handlers.onMouseMove(props, state, actions),
    onPointerMove: _handlers.onMouseMove(props, state, actions),
    onPointerLeave: _handlers.onMouseLeave(props, state, actions),
    onMouseLeave: _handlers.onMouseLeave(props, state, actions),
  };

  //
  // Helper functions to set a myriad of chart values on update

  const helpers: NBaseLineChart.Helpers = {
    getDimensions: () => _helpers.getDimensions(props, state),
    setDimensions: () => _helpers.setDimensions(props, state, actions),
    computeValues: (cb?: Function) =>
      _helpers.computeValues(props, state, actions, cb),
  };

  //
  // Effect hooks

  // This will act as our "componentDidMount" since the next effect hook needs
  // to happen *after* the chart has rendered
  React.useEffect(() => {
    setLoaded(true);
  }, []);

  // We'll set a window listener to keep track of the dimensions of the chart's
  // container
  React.useEffect(() => {
    if (isLoaded) {
      helpers.setDimensions();
      window.addEventListener('resize', helpers.setDimensions);
    }
    return () => {
      window.removeEventListener('resize', helpers.setDimensions);
    };
    // eslint-disable-next-line
  }, [isLoaded]);

  // Similar to the first effect ^^^, this keeps track if there is a pending
  // update to the chart
  React.useEffect(() => {
    if (!needsRefresh) {
      setNeedsRefresh(true);
    }
    // eslint-disable-next-line
  }, [
    height,
    width,
    data.length,
    state.dimensions.height,
    state.dimensions.width,
    chart.domains.x,
    chart.domains.y,
    state.mouse.datum,
  ]);

  // We will recompute the mapping for `line`, `x`, `y` based off fresh
  // information + dimensions
  React.useEffect(() => {
    if (isLoaded && needsRefresh) {
      helpers.computeValues(helpers.setDimensions);
      setNeedsRefresh(false);
    }
    // eslint-disable-next-line
  }, [needsRefresh]);

  // We need to standardize the dimensions, so this constant will
  // allways have the most current values to pass to the render props
  const d: NBaseLineChart.Dimensions = {
    width: width || state.dimensions.width,
    height: height || state.dimensions.height,
  };

  return (
    <svg
      ref={chartRef}
      viewBox={`0 0 ${d.width} ${d.height}`}
      width={d.width}
      height={d.height}
      style={{ minWidth: '100%', overflow: 'visible' }}
      {...handlers}
    >
      <g transform={`translate(${margin!.left},${margin!.top})`}>
        {children({
          state: { ...state, dimensions: d, margin },
          actions,
        })}
        {/* This rect is created to handle unintended tooltip behavior
         * on the graph because the svg element is larger than the
         * graph and path
         */}
        <rect
          className="baselinechart-content-shield"
          width={state.dimensions.width}
          height={state.dimensions.height + 10}
          fill="transparent"
          transform="translate(0, -5)"
        />
      </g>
    </svg>
  );
};

BaseLineChart.defaultProps = {
  dataKeys: { x: 'x', y: 'y' },
  data: [],
  margin: { top: 2, right: 2, bottom: 2, left: 2 },
  width: undefined,
  height: undefined,
  xAxis: false,
  domains: undefined,
  onMouseLeave: () => undefined,
  onMouseMove: () => undefined,
  onResize: () => undefined,
  children: () => null,
};

export default BaseLineChart;
