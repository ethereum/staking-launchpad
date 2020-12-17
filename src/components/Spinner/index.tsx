import React from 'react';
import { Box } from 'grommet';

export const Spinner = ({ className }: { className?: string }) => (
  <Box align="center" justify="center" className={className}>
    <svg
      version="1.1"
      viewBox="0 0 32 32"
      width="45px"
      height="45px"
      // fill="#7D4CDB"
    >
      <defs>
        <linearGradient
          id="rainbow"
          x1="0"
          x2="0"
          y1="0"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF5B99" offset="0%" />
          <stop stopColor="#FF5447" offset="20%" />
          <stop stopColor="#FF7B21" offset="40%" />
          <stop stopColor="#EAFC37" offset="60%" />
          <stop stopColor="#4FCB6B" offset="80%" />
          <stop stopColor="#51F7FE" offset="100%" />
        </linearGradient>
      </defs>
      <path
        opacity=".25"
        d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"
        fill="url(#rainbow)"
      />
      <path
        d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z"
        fill="url(#rainbow)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 16 16"
          to="360 16 16"
          dur="0.8s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  </Box>
);

export default Spinner;
