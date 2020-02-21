import React, { useState } from "react";
import styled from "styled-components";
import { Heading } from "grommet";
import { Text } from "../../components/Text";

const Container = styled.div`
  background-color: ${p => p.theme.successLightest};
  height: 630px;
  position: relative;
  padding: 100px 0;
  .container {
    max-width: 100%;
  }
`;

const Content = styled.div`
  box-sizing: border-box;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 0 120px;
  @media only screen and (max-width: 1440px) {
    padding: 0 60px;
  }
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

const amountNeeded = 524288;
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
            {amountNeeded} ETH,
          </GreenBold>
          <GrayBold className="mr10" fontSize={24}>
            16,284 validators,
          </GrayBold>
          to launch its mainnet
        </SubHeader>
        <div>
          <ProgressBar progress={10} />
          <div className="flex space-between mt20">
            <span>
              <GreenBold fontSize={18} className="mr10">
                {amountEth} ETH
              </GreenBold>
              <Text>Current Staking Balance</Text>
            </span>
            <Text>{amountNeeded - amountEth} ETH Launch threshold</Text>
          </div>
        </div>
      </Content>
    </Container>
  );
};
