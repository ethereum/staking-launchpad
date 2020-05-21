import { ScaleLinear, Line } from 'd3';

declare namespace NBaseLineChart {
  export type Props = {
    dataKeys: DataKeys;
    data: Datum[];
    xAxis?: boolean;
    width?: number;
    height?: number;
    domains?: Domains;
    margin?: Margin;
    children: (props: { state: State; actions: Actions }) => any;
    // Event Handlers
    onMouseMove?: (e: ModifiedMouseEvent<SVGSVGElement>) => void;
    onMouseEnter?: (e: ModifiedMouseEvent<SVGSVGElement>) => void;
    onMouseLeave?: (e: ModifiedMouseEvent<SVGSVGElement>) => void;
    onHover?: (e: ModifiedMouseEvent<SVGSVGElement>) => void;
    onClick?: (e: ModifiedMouseEvent<SVGSVGElement>) => void;
    onMouseDown?: (e: ModifiedMouseEvent<SVGSVGElement>) => void;
    onMouseUp?: (e: ModifiedMouseEvent<SVGSVGElement>) => void;
    onResize?: Function;
  };

  type DataKeys = {
    x: string;
    y: string;
  };

  type Dimensions = {
    height: number;
    width: number;
  };

  type Domains = {
    x: number[];
    y: number[];
  };

  type ChartValues = {
    x?: ScaleLinear<number, number>;
    y?: ScaleLinear<number, number>;
    line?: Line<Datum>;
    domains: Domains;
  };

  type Datum = {
    [datakey: string]: number;
  };

  type Mouse = {
    datum: Datum | null;
  };

  type Margin = {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };

  type Action<T> = { type: string; payload: T };
  type Reducer<T> = (state: State, action: Action<T>) => State;
  type ModifiedMouseEvent<T> = MouseEvent & {
    target: EventTarget<T> & {
      getAtribute: (attr: string) => string;
    };
  };

  type Actions = {
    setChart: (chart: ChartValues, cb?: Function) => void;
    setDimensions: (dimensions: Dimensions, cb?: Function) => void;
    setMouse: (mouse: Mouse, cb?: Function) => void;
  };

  type State = {
    dimensions: Dimensions;
    chart: ChartValues;
    mouse: Mouse;
    chartRef?: SVGSVGElements | null;
    margin?: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
  };

  type Handlers = {
    onPointerEnter: (e: MouseEvent<SVGSVGElement, MouseEvent>) => void;
    onPointerMove: (e: MouseEvent<SVGSVGElement, MouseEvent>) => void;
    onPointerLeave: (e: MouseEvent<SVGSVGElement, MouseEvent>) => void;
    onMouseLeave: (e: MouseEvent<SVGSVGElement, MouseEvent>) => void;
  };

  type Helpers = {
    getDimensions: () => NBaseLineChart.Dimensions;
    setDimensions: () => void;
    computeValues: (cb?: Function) => void;
  };
}

export = NBaseLineChart;
export as namespace NBaseLineChart;
