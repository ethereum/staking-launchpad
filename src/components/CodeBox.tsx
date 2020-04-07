import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  background: ${p => p.theme.orange};
  display: flex;
  justify-content: space-between;
  border-radius: ${p => p.theme.borderRadius};
`;
const CopyBtn = styled.span`
  margin-right: 10px;
  font-size: 12px;
  color: ${p => p.theme.blue.medium};
  font-weight: bold;
  :hover {
    cursor: pointer;
  }
`;
const Code = styled.pre`
  margin: 0;
  white-space: normal;
`;

export const CodeBox = ({
  snippet,
  className,
}: {
  snippet: string;
  className?: string;
}) => {
  const [copied, setCopied] = useState(false);
  const copySnippet = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
  };
  return (
    <Container className={className}>
      <Code>{snippet}</Code>
      <CopyBtn onClick={copySnippet}>{copied ? 'Copied' : 'Copy'}</CopyBtn>
    </Container>
  );
};
