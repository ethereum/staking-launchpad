import React from 'react';
import { Add, DocumentUpload } from 'grommet-icons';
import { colors } from '../../styles/styledComponentsTheme';

export const Svg = ({ children }: { children: any }) => (
  <svg
    className="checkmark"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 52 52"
  >
    {children}
  </svg>
);

export const Circle = ({
  animated,
  dashed,
}: {
  animated?: boolean;
  dashed?: boolean;
}) => (
  <circle
    className={`circle ${
      /* eslint-disable-next-line no-nested-ternary */
      animated ? 'circle-animated' : dashed ? 'circle-dashed' : ''
    }`}
    cx="26"
    cy="26"
    r="25"
    fill="none"
  />
);

export const Check = () => (
  <path
    className="check-animated"
    fill="none"
    d="M14.1 27.2l7.1 7.2 16.7-16.8"
  />
);

export const X = () => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    x="13px"
    y="15px"
    width="50px"
    height="50px"
    viewBox="0 0 50 50"
    enableBackground="new 0 0 50 50"
  >
    <g>
      <line
        className="x-line"
        fill="none"
        stroke={colors.red.light}
        strokeWidth="2"
        strokeMiterlimit="10"
        x1="4"
        y1="20"
        x2="20"
        y2="4"
      />
      <line
        className="x-line delay"
        fill="none"
        stroke={colors.red.light}
        strokeWidth="2"
        strokeMiterlimit="10"
        x1="20"
        y1="20"
        x2="4"
        y2="4"
      />
    </g>
  </svg>
);

export const Plus = () => (
  <Add height="12px" color={colors.blue.light} y="20" />
);

export const FileIcon = () => (
  <DocumentUpload height="20px" y="15px" color="grayMedium" />
);
