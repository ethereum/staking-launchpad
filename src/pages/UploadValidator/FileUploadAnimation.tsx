import React, { useMemo } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/styledComponentsTheme';
import { Check, Circle, FileIcon, Plus, Svg, InvalidFileIcon } from './Icons';

const Container = styled.div`
  .svg-container {
    width: 150px;
    height: 150px;
    margin: auto;
    display: block;
  }
  .circle {
    stroke-width: 1;
    stroke-miterlimit: 10;
    stroke: ${colors.blue.light};
    fill: none;
  }
  .circle-animated {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
  }
  .circle-dashed {
    stroke-dasharray: 3;
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
  isDragAccept: boolean;
  isDragReject: boolean;
  isFileStaged: boolean;
  isDragActive: boolean;
  isFileAccepted: boolean;
}

export const FileUploadAnimation = ({
  isDragAccept,
  isDragReject,
  isFileStaged,
  isDragActive,
  isFileAccepted,
}: Props) => {
  const renderIcon = useMemo(() => {
    if (isFileStaged)
      return isFileAccepted ? <Check /> : <InvalidFileIcon renderImmediately />;
    if (isDragAccept) return <FileIcon />;
    if (isDragReject || isFileAccepted) return <InvalidFileIcon />;
    return <Plus />;
  }, [isFileStaged, isFileAccepted, isDragReject, isDragAccept]);

  return (
    <Container>
      <Svg>
        <Circle
          animated={isDragActive && !isFileStaged}
          dashed={!isFileAccepted && !isFileStaged}
        />
        {renderIcon}
      </Svg>
    </Container>
  );
};
