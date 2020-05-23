import { bisector } from 'd3';

export const onMouseMove = (
  props: NBaseLineChart.Props,
  state: NBaseLineChart.State,
  actions: NBaseLineChart.Actions
) => (e: NBaseLineChart.ModifiedMouseEvent<SVGSVGElement>) => {
  e.preventDefault();

  const { target } = e;
  if (target!.getAttribute('class') !== 'baselinechart-content-shield') {
    actions.setMouse({ ...state.mouse, datum: null });
    return;
  }

  const { data } = props;
  // Key correlating to the x-axis in each datum
  const { x } = props.dataKeys;
  // We need the x and y offset of the SVG element
  const svgRect = e.target.getBoundingClientRect();
  // This is the mouse's position relative to the SVG element
  const coords = [e.clientX - svgRect.left, e.clientY - svgRect.top];
  // Converts the X coordinate to its corresponding chart value
  const x0 = state.chart.x?.invert(coords[0]);
  // Find the index of the Datum to the right of this value
  const bisectIdx = bisector((d: NBaseLineChart.Datum) => d[x])
    // This will always be the right datum
    .right(props.data, x0);

  const rightDatum = data[bisectIdx];
  const leftDatum = data[bisectIdx - 1];
  let datum;

  if (leftDatum && rightDatum) {
    // Find closest datum
    datum =
      Math.abs(x0! - leftDatum[x]) < Math.abs(x0! - rightDatum[x])
        ? leftDatum
        : rightDatum;
  } else if (leftDatum) {
    datum = leftDatum;
  } else {
    datum = rightDatum;
  }

  actions.setMouse({ ...state.mouse, datum });

  if (props.onMouseMove) {
    props.onMouseMove(e);
  }
};

export const onMouseLeave = (
  props: NBaseLineChart.Props,
  state: NBaseLineChart.State,
  actions: NBaseLineChart.Actions
) => (e: NBaseLineChart.ModifiedMouseEvent<SVGSVGElement>) => {
  e.preventDefault();
  const clientRect = e.target.getBoundingClientRect();
  const outsideChartX =
    e.clientX < clientRect.x || e.clientX > clientRect.x + clientRect.width;
  const outsideChartY =
    e.clientY < clientRect.y || e.clientY > clientRect.y + clientRect.height;
  if (outsideChartX || outsideChartY) {
    actions.setMouse({ ...state.mouse, datum: null });

    if (props.onMouseLeave) {
      props.onMouseLeave(e);
    }
  }
};

export const onTouchStart = (
  props: NBaseLineChart.Props,
  state: NBaseLineChart.State,
  actions: NBaseLineChart.Actions
) => (e: NBaseLineChart.ModifiedMouseEvent<SVGSVGElement>) => {
  e.preventDefault();
  actions.setMouse({ ...state.mouse, datum: null });

  if (props.onMouseMove) {
    props.onMouseMove(e);
  }
};
