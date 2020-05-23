import React from 'react';
import styled from 'styled-components';
import { Text } from '../../../../components/Text';

/**
 * Type Declarations
 */

interface Props {
  x: number;
  y: number;
  x0: number;
  y0: number;
  datum: { x: number; y: number };
  chart: NBaseLineChart.ChartValues;
  current: NBaseLineChart.Datum;
  dimensions: ClientRect;
  color?: string;
  innerTooltip?: Function;
}

/*
 * Utils
 */

const calculateTooltipCoordinates = (
  x: number,
  dimensions: ClientRect
): number => {
  const tooltipRight = x + 115;
  const tooltipLeft = x - 80;

  // There are a few reasons why using `window.innerWidth` wouldn't always
  // work to calculate the right page bound. Because of this fact, this
  // should theoretically calculate this number more accurately
  const pageWidth = dimensions.right + dimensions.left;

  // If tooltip expands outside right page bound, set it to right edge
  if (tooltipRight > pageWidth) {
    return pageWidth - 185;
  }

  // Used to position tooltip if outside the left bounds or in the "normal"
  // state
  const gutters = (window.innerWidth - dimensions.width) / 2;

  // If the tooltip is falling off the left side of the page
  if (tooltipLeft < -gutters + 15) {
    return -gutters + 15;
  }

  // If the tooltip is falling off the right side of the page
  if (tooltipRight > pageWidth - 70) {
    return pageWidth - 70 - (tooltipRight - tooltipLeft);
  }

  // If the tooltip is perfect
  return tooltipLeft;
};

/*
 * Styled-Components
 */

const StyledTooltip = styled.div`
  background: rgba(200, 200, 200, 0.8);
  border-radius: 2px;
  text-align: left;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  background: #fff;
  font-family: sans-serif;
  border: 1px solid rgba(61, 102, 255, 0.15);
  border-radius: 4px;
  padding: 12px;
  font-size: 14px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;

const ForeignObject = styled('foreignObject')`
  background: transparent;
  z-index: 999;
  position: absolute;
  overflow: visible;

  & ${StyledTooltip} {
    box-shadow: 0px 2px 10px rgba(33, 33, 33, 0.14);
  }
`;

const CurrentLabel = styled.div<{ isCurrent?: boolean }>`
  width: 100%;
  text-align: center;
  opacity: ${({ isCurrent }) => +(isCurrent || 0)};
  transform: ${({ isCurrent }) => `translate(0, -${+(isCurrent || 0) * 4}px)`};
  transition: 200ms linear;
  font-weight: bold;
  font-family: sans-serif;
`;

/*
 * Sub-Components
 */

interface TooltipLineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke?: string;
  light?: Boolean;
}

const TooltipLine: React.FC<TooltipLineProps> = ({
  x1,
  x2,
  y1,
  y2,
  stroke = '#045388',
  light = false,
}) => (
  <line
    {...{ x1, x2, y1, y2, stroke }}
    strokeWidth={light ? 2 : 4}
    opacity={light ? 0.4 : 1}
    strokeDasharray="7 5"
  />
);

//

interface TooltipLineCircleProps {
  cx: number;
  cy: number;
  color?: string;
}

const TooltipLineCircle: React.FC<TooltipLineCircleProps> = ({
  cx,
  cy,
  color = '#045388',
}) => (
  <>
    <circle
      {...{ cx, cy }}
      fill="white"
      r={4}
      stroke={color}
      strokeWidth={4}
      opacity={0.4}
    />
    <circle {...{ cx, cy }} fill="white" r={3} strokeWidth={4} />
  </>
);

//

interface TooltipFieldProps {
  marginTop?: number | string;
  color?: string;
}

const TooltipField: React.FC<TooltipFieldProps> = ({
  children,
  color = '#3E4348',
  marginTop = '0px',
}) => (
  <Text
    size="14px"
    weight={700}
    color={color}
    style={{ lineHeight: '12px', marginTop }}
  >
    {children}
  </Text>
);

//

interface TooltipValueProps {
  color?: string;
}

const TooltipValue: React.FC<TooltipValueProps> = ({
  children,
  color = '#045388',
}) => (
  <Text size="16px" weight={700} color={color}>
    {children}
  </Text>
);

/*
 * Main Component
 */

const ValidatorEconomicsChartTooltip: React.FC<Props> = ({
  x,
  y,
  x0,
  y0,
  datum,
  current,
  chart,
  dimensions,
  innerTooltip = undefined,
  color = '#045388',
}) => {
  const [x1, setX1] = React.useState(
    calculateTooltipCoordinates(x, dimensions)
  );
  const [loaded, setLoaded] = React.useState(false);
  const foreignObjectRef = React.useRef(null);

  React.useEffect(() => {
    // If the tooltip has already been rendered, then we can set the loaded state.
    // This will determine whether or not the opacity is set to 1 or 0.=
    if (foreignObjectRef.current && !loaded) {
      setLoaded(true);
    }
    // Let's then calculate and set `x1`, which the x coord of the left side
    // of the tooltip
    setX1(calculateTooltipCoordinates(x, dimensions));
    // eslint-disable-next-line
  }, [x]);

  return (
    <>
      <TooltipLine x1={x} x2={x} y1={y} y2={y - 60} stroke={color} />
      <TooltipLine x1={x} x2={x} y1={y} y2={y0 - 7} stroke={color} light />
      <TooltipLine x1={x0 + 7} x2={x} y1={y} y2={y} stroke={color} light />
      <TooltipLineCircle cx={x0} cy={y} {...{ color }} />
      <TooltipLineCircle cx={x} cy={y0} {...{ color }} />
      <ForeignObject
        ref={foreignObjectRef}
        transform={`translate(${x1}, ${y - 160})`}
        opacity={+loaded}
        {...{ x: 0, y: 0, width: 160, height: 90 }}
      >
        <CurrentLabel
          isCurrent={current.x === x && current.x > chart.x!(524_288)}
        >
          <TooltipValue>CURRENT</TooltipValue>
        </CurrentLabel>
        <StyledTooltip>
          {innerTooltip ? (
            innerTooltip(datum)
          ) : (
            <>
              <TooltipField>Staked</TooltipField>
              <TooltipValue>
                {datum.x!.toLocaleString()}
                &nbsp;ETH
              </TooltipValue>
              <TooltipField marginTop="7px">APR</TooltipField>
              <TooltipValue>
                {(Math.round(datum.y * 1000) / 10).toLocaleString()}%
              </TooltipValue>
            </>
          )}
        </StyledTooltip>
      </ForeignObject>
    </>
  );
};

export default ValidatorEconomicsChartTooltip;
