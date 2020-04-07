import React from 'react';
import { Add, DocumentMissing, DocumentUpload } from 'grommet-icons';
import { colors } from '../../styles/styledComponentsTheme';

export const Svg = ({ children }: { children: any }) => (
  <svg
    className="svg-container"
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

export const InvalidFileIcon = ({
  renderImmediately,
}: {
  renderImmediately?: boolean;
}) => (
  <svg>
    <animate
      attributeType="CSS"
      attributeName="visibility"
      from="hidden"
      to="visible"
      dur={renderImmediately ? '0.1s' : '1.2s'}
    />
    <DocumentMissing height="20px" y="15px" color="redMedium" />
  </svg>
);

export const Plus = () => (
  <Add height="12px" color={colors.blue.light} y="20" />
);

export const FileIcon = () => (
  <svg>
    <animate
      attributeType="CSS"
      attributeName="visibility"
      from="hidden"
      to="visible"
      dur="1.2s"
    />
    <DocumentUpload height="20px" y="15px" color="grayMedium" />
  </svg>
);
