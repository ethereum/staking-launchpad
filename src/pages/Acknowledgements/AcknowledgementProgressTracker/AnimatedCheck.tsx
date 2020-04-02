import styled from 'styled-components';

export const AnimatedCheck = styled.div`
  display: ${(p: { show: boolean }) => (p.show ? 'block' : 'none')};
  position: absolute;
  right: -15px;
  top: -15px;

  svg {
    width: 30px;
    display: block;
  }

  .path {
    stroke-dasharray: 1000;
    stroke-dashoffset: 0;

    &.line {
      stroke-dashoffset: 1000;
      -webkit-animation: dash 0.6s 0.15s ease-in-out forwards;
      animation: dash 0.6s 0.15s ease-in-out forwards;
    }
    &.check {
      stroke-dashoffset: -100;
      -webkit-animation: dash-check 0.6s 0.15s ease-in-out forwards;
      animation: dash-check 0.6s 0.15s ease-in-out forwards;
    }
  }
  @-webkit-keyframes dash {
    0% {
      stroke-dashoffset: 1000;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }

  @keyframes dash {
    0% {
      stroke-dashoffset: 1000;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }

  @-webkit-keyframes dash-check {
    0% {
      stroke-dashoffset: -100;
    }
    100% {
      stroke-dashoffset: 900;
    }
  }

  @keyframes dash-check {
    0% {
      stroke-dashoffset: -100;
    }
    100% {
      stroke-dashoffset: 900;
    }
  }
`;
