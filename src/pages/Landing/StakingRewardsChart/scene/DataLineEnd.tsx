import React from 'react';

interface Props {
  x: number;
  y: number;
  color?: string;
}

const DataLineEnd: React.FC<Props> = ({ x, y, color = '#045388' }) => (
  <g transform={`translate(${x - 9.5}, ${y - 12})`}>
    <path
      d="M15.663 11.1655L11.6424 4.27007L9.91467 5.27749L11.6424 4.27007C10.4863 2.28736 7.62271 2.28432 6.46241 4.26456L2.42219 11.1598C1.82971 12.171 1.88029 13.4345 2.55169 14.3951L6.59201 20.1756C7.78781 21.8864 10.3219 21.8835 11.5137 20.1699L15.5342 14.3896C16.2007 13.4315 16.2509 12.1737 15.663 11.1655Z"
      fill={color}
      stroke={color}
      strokeWidth="4"
    />
  </g>
);

export default DataLineEnd;
