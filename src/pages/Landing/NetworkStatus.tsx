import React, { useState } from "react";
import styled from "styled-components";
import { Heading, Text } from "grommet";

const Container = styled.div`
  background-color: ${p => p.theme.successLightest};
  height: 630px;
  position: relative;
  padding: 30px;
  .container {
    max-width: 100%;
  }
`;

const Content = styled.div`
  margin: 100px auto;
  padding: 0 15px;
`;

const GreenBold = styled.span`
  color: ${(p: { theme: any; fontSize: number }) => p.theme.success};
  font-size: ${(p: { theme: any; fontSize: number }) => p.fontSize}px;
  font-weight: bold;
`;
const GrayBold = styled.span`
  color: ${(p: { theme: any; fontSize: number }) => p.theme.gray};
  font-size: ${(p: { theme: any; fontSize: number }) => p.fontSize}px;
  font-weight: bold;
`;
const SubHeader = styled(Text)`
  margin-top: 20px;
  display: block;
`;

const ProgressBar = ({ progress }: { progress: number }) => {
  const PBarContainer = styled.div`
    height: 70px;
    display: flex;
    border-radius: ${p => p.theme.borderRadius};
    margin-top: 20px;
  `;
  const PBarComplete = styled.div`
    border-radius: ${p => p.theme.borderRadius} 0 0 ${p => p.theme.borderRadius};
    background-color: ${p => p.theme.success};
    height: 100%;
    width: ${progress}%;
  `;
  const PBarIncomplete = styled.div`
    border-radius: 0 ${p => p.theme.borderRadius} ${p => p.theme.borderRadius} 0;
    background-color: ${p => p.theme.successLight};
    height: 100%;
    width: ${100 - progress}%;
  `;
  return (
    <PBarContainer>
      <PBarComplete />
      <PBarIncomplete />
    </PBarContainer>
  );
};

export const NetworkStatus = () => {
  const [amountEth, setAmountEth] = useState(12000);

  return (
    <Container>
      <Content>
        <Heading level={2} size="medium" color="brand" margin="none">
          Network Status
        </Heading>
        <SubHeader size="x-large">
          <GreenBold className="mr10" fontSize={24}>
            {amountEth} ETH
          </GreenBold>
          in the network and counting
        </SubHeader>
        <SubHeader className="mt20">
          The eth2 network needs to reach at least
          <GreenBold className="mr10 ml10" fontSize={24}>
            524,288 ETH,
          </GreenBold>
          <GrayBold className="mr10" fontSize={24}>
            16,284 validators,
          </GrayBold>
          to launch its mainnet
        </SubHeader>
        <ProgressBar progress={10} />
      </Content>
    </Container>
  );
};
