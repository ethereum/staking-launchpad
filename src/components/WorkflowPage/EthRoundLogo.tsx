import React from 'react';
import styled from 'styled-components';
import { logoPositions } from './WorkflowProgressBar';
import { rainbowColors } from '../../styles/styledComponentsTheme';

const Container = styled.span`
  position: absolute;
  top: -25px;
  left: ${(p: { position: number }) => logoPositions.large[p.position]}%;
  height: 60px;
  width: 60px;
  z-index: 2;

  @media only screen and (max-width: ${p => p.theme.screenSizes.largest}) {
    left: ${(p: { position: number }) => logoPositions.medium[p.position]}%;
  }
  @media only screen and (max-width: 1024px) {
    left: ${(p: { position: number }) => logoPositions.small[p.position]}%;
  }
`;

export const EthRoundLogo = ({ position }: { position: any }) => {
  return (
    <Container position={position}>
      <svg
        width="56px"
        height="56px"
        viewBox="0 0 56 56"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Group 3</title>
        <desc>Created with Sketch.</desc>
        <g
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="Keys-Offline" transform="translate(-488.000000, -142.000000)">
            <g id="Group-3" transform="translate(488.000000, 142.000000)">
              <circle
                id="Oval"
                stroke="#FFFFFF"
                strokeWidth="4"
                fill={rainbowColors[position]}
                cx="28"
                cy="28"
                r="26"
              />
              <g id="Group-7" transform="translate(18.000000, 11.000000)">
                <polygon
                  id="Fill-1"
                  fill="#FEEB5D"
                  points="10 0 0 17.5587903 10 24"
                />
                <polygon
                  id="Fill-2"
                  fill="#F08A77"
                  points="10 0 10 24 20 17.5587903"
                />
                <polygon
                  id="Fill-3"
                  fill="#1AACD3"
                  points="10 34 10 25.5402877 0 19"
                />
                <polygon
                  id="Fill-4"
                  fill="#6B7ABA"
                  points="10 25.5402877 10 34 20 19"
                />
                <polygon
                  id="Fill-5"
                  fill="#59B46E"
                  points="0 17.6584421 10 24 10 12"
                />
                <polygon
                  id="Fill-6"
                  fill="#A666A6"
                  points="10 24 20 17.6584421 10 12"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </Container>
  );
};
