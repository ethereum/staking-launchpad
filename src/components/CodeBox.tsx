import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid #ddd;
  padding: 18px 30px;
  width: 100%;
  background: ${p => p.theme.info};
  display: flex;
  justify-content: space-between;
`;
const CopyBtn = styled.span`
  color: ${p => p.theme.secondary};
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
  className
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
      <CopyBtn onClick={copySnippet}>{copied ? "Copied" : "Copy"}</CopyBtn>
    </Container>
  );
};
