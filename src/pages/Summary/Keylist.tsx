import React, { useState } from "react";
import { FakeInput } from "../../components/FakeInput";
import { Text } from "grommet";
import styled from "styled-components";
// @ts-ignore
import ReactShadowScroll from "react-shadow-scroll";

const Container = styled(FakeInput)`
  display: flex;
  justify-content: space-between;
`;
const CopyBtn = styled(Text)`
  color: ${p => p.theme.brand};
  cursor: pointer;
  :hover {
    font-weight: bold;
  }
`;

export const Keylist = ({ coldKeys }: { coldKeys: string[] }) => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const handleClick = (coldKey: string, i: number) => {
    navigator.clipboard.writeText(coldKey);
    setCopiedIdx(i);
  };
  const renderKeys = () =>
    coldKeys.map((coldKey, i) => {
      return (
        <Container className="flex" key={coldKey}>
          <Text>{coldKey}</Text>
          <CopyBtn onClick={() => handleClick(coldKey, i)}>
            {copiedIdx === i ? "Copied" : "Copy"}
          </CopyBtn>
        </Container>
      );
    });

  if (coldKeys.length > 4) {
    return (
      <ReactShadowScroll style={{ height: 200, marginTop: 20 }}>
        {renderKeys()}
      </ReactShadowScroll>
    );
  }
  return <div className="mt20">{renderKeys()}</div>;
};
