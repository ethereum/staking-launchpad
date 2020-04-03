import React from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/styledComponentsTheme';
import { Check, Circle, FileIcon, Plus, Svg, InvalidFileIcon } from './Icons';

const Container = styled.div`
  .circle {
    stroke-width: 1;
    stroke-miterlimit: 10;
    stroke: ${colors.blue.light};
    fill:none;
  }
  .circle-animated {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
  }
  .circle-dashed {
    stroke-dasharray: 3;
  }
  .checkmark {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    display: block;
    stroke-width: 2;
    stroke: ${colors.green.dark}
    stroke-miterlimit: 10;
    margin: auto;
    box-shadow: inset 0 0 0 #7ac142;
  }
  .check-animated {
    stroke: ${colors.green.medium};
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.4s forwards;
  }
  @keyframes stroke {
    100% {
      stroke-dashoffset: 0;
    }
  }
`;

interface Props {
  isDragAccept: any;
  isDragReject: any;
  fileDropped: any;
  isDragActive: any;
  invalidFile: any;
}

export const FileUploadAnimation = ({
  isDragAccept,
  isDragReject,
  fileDropped,
  isDragActive,
  invalidFile,
}: Props) => {
  const renderIcon = () => {
    if (fileDropped) {
      return <Check />;
    }
    if (isDragAccept) {
      return <FileIcon />;
    }
    if (isDragReject || invalidFile) {
      return <InvalidFileIcon />;
    }
    return <Plus />;
  };

  return (
    <Container>
      <Svg>
        <Circle animated={isDragActive} dashed={!invalidFile && !fileDropped} />
        {renderIcon()}
      </Svg>
    </Container>
  );
};
