import React, { FC } from 'react';
import styled, { StyledProps } from 'styled-components';
import { Text } from './Text';

const CodeContainer = styled(Text)`
  border: 1px solid #dc8180;
  background-color: ${(p: any) => p.theme.red.lightest};
  display: inline-block;
  border-radius: 4px;
  padding: 0 4px;
  direction: inherit;
`;

const CodeText = styled(Text)`
  color: #ad2b2a;
  font-size: 14px;
  line-height: 16px;
  direction: ltr; /* Hard-coded LTR for English code snippet text */
`;

interface CodeProps extends StyledProps<any> {
  className?: string;
}
export const Code: FC<CodeProps> = ({ children, className }) => (
  <CodeContainer className={className}>
    <CodeText>{children}</CodeText>
  </CodeContainer>
);
