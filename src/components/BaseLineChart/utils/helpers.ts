import { scaleLinear, line } from 'd3';

// This function will retrieve the `BoundingClientRect` of the
// `svg` element's parent element
export const getDimensions = (
  props: NBaseLineChart.Props,
  state: NBaseLineChart.State
): NBaseLineChart.Dimensions => {
  if (state.chartRef) {
    const parentNode: HTMLElement | null = state.chartRef?.parentNode;
    const boundingRect = parentNode?.getBoundingClientRect() || {
      width: 0,
      height: 0,
    };
    const dimensions = {
      width: props.width || boundingRect.width + 10,
      height: props.height || boundingRect.height,
    };
    return dimensions;
  }
  return state.dimensions;
};

// This function sets the `dimension` state of the component
// so that we can calculate the correct placement for both the
// chart elements themselves, as well as resizing the chart
// to dynamically fit
export const setDimensions = (
  props: NBaseLineChart.Props,
  state: NBaseLineChart.State,
  actions: NBaseLineChart.Actions
): void => {
  const { x, y } = props.dataKeys;
  const d = getDimensions(props, state);
  const { width, height } = state.dimensions;
  if (d && (d.width !== width || d.height !== height)) {
    actions.setDimensions(d);
    actions.setMouse({ datum: { [x]: 0, [y]: 0 } });
    actions.setMouse({ datum: null });
    if (props.onResize) {
      props.onResize(d);
    }
  }
};

// This function generates the necessary utililty functions
// that will be used to map our chart's values to the `svg`s
// vector space
export const computeValues = (
  props: NBaseLineChart.Props,
  state: NBaseLineChart.State,
  actions: NBaseLineChart.Actions,
  cb?: Function
): void => {
  const { data, dataKeys, margin, domains } = props;
  const d = getDimensions(props, state);
  if (d) {
    const height = d.height - margin!.bottom - margin!.top;
    const width = d.width - margin!.right - margin!.left;

    // Create different arrays for all x and y values
    const [xData, yData] = data.reduce(
      (out: any[], datum: NBaseLineChart.Datum) => {
        const x = datum[dataKeys.x];
        const y = datum[dataKeys.y] || 0;
        return [
          [...out[0], x],
          [...out[1], y],
        ];
      },
      // First index will be [[], []]
      [[], []]
    );

    // Keep track of the min & max values for each axes
    const _domains = {
      x: domains?.x || [Math.min(...xData), Math.max(...xData)],
      y: domains?.y || [Math.min(...yData), Math.max(...yData)],
    };

    // Our X mapping
    const x = scaleLinear()
      .domain(_domains.x)
      .range([0, width]);
    // Our Y mapping
    const y = scaleLinear()
      .domain(_domains.y)
      .range([height - 80, 0]);
    // Our line function
    const _line = line<NBaseLineChart.Datum>()
      .x((datum: NBaseLineChart.Datum) => x(datum[dataKeys.x]))
      .y((datum: NBaseLineChart.Datum) => y(datum[dataKeys.y]));

    actions.setChart({ x, y, line: _line, domains: _domains }, cb);
  }
};
