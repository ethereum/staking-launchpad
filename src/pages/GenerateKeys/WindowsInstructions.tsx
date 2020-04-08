import React from 'react';
// import ScrollAnimation from 'react-animate-on-scroll';
// import { Paper } from '../../components/Paper';
// import { CodeBox } from '../../components/CodeBox';
// import { Heading } from '../../components/Heading';
// import { Text } from '../../components/Text';
// import { TerminalUI } from './TerminalUI';
// import { OperatingSystemButtons } from './OperatingSystemButtons';

interface Props {
  validatorCount: number | string;
}
export const WindowsInstructions = ({ validatorCount }: Props) => {
  // const [animateTerminal, setAnimateTerminal] = useState<boolean>(false);

  return <div style={{ animation: `fadeIn 1s` }}>{validatorCount}</div>;
};
