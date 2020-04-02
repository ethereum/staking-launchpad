import React from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/styledComponentsTheme';
import { Check, Circle, FileIcon, Plus, Svg, InvalidFileIcon } from './Icons';

const Container = styled.div`
  .circle {
    stroke-width: 2;
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
    stroke-dasharray: 4;
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
    box-shadow: inset 0px 0px 0px #7ac142;
  }

  .check-animated {
    stroke: ${colors.green.medium};
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
  }

  @keyframes stroke {
    100% {
      stroke-dashoffset: 0;
    }
  }
  
  .x-line {
    stroke-dasharray: 430;
    stroke-dashoffset: 800;
    animation: x 0.1s linear;
    animation-fill-mode: forwards;
    animation-delay: 0.6s;
  }
  
  .x-line.delay {
    animation-delay: 0.7s;
  }

  @keyframes x {
    from {
      stroke-dasharray: 430;
    }
    to {
      stroke-dasharray: 400;
    }
  }
`;

interface Props {
  isDragAccept: any;
  isDragReject: any;
  fileAccepted: any;
  isDragActive: any;
  invalidFile: any;
}

export const FileUploadAnimation = ({
  isDragAccept,
  isDragReject,
  fileAccepted,
  isDragActive,
  invalidFile,
}: Props) => {
  const renderIcon = () => {
    if (isDragAccept) {
      return fileAccepted ? <Check /> : <FileIcon />;
    }
    if (isDragReject || invalidFile)
      return <InvalidFileIcon autoReject={invalidFile} />;
    if (fileAccepted) return <Check />;
    return <Plus />;
  };

  if (fileAccepted) {
    return (
      <Container>
        <Svg>
          <Circle animated />
          <path
            className="check-animated"
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </Svg>
      </Container>
    );
  }

  return (
    <Container>
      <Svg>
        <Circle animated={isDragActive} dashed={!invalidFile} />
        {renderIcon()}
      </Svg>
    </Container>
  );
};
