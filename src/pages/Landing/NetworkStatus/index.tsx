import React, { useState } from "react";
import styled from "styled-components";
import ScrollAnimation from "react-animate-on-scroll";
import { Heading } from "grommet";
import { Text } from "../../../components/Text";
import { ProgressBar } from "./ProgressBar";

const Container = styled.div`
  background-color: ${p => p.theme.green.light};
  position: relative;
  padding: ${(p: { isMobile: boolean }) => (p.isMobile ? "60px 0" : "150px 0")};
`;
const Content = styled.div`
  max-width: ${p => p.theme.screenSizes.largest};
  width: 100%;
  margin: 0 auto;
  padding: 0 120px;
  @media only screen and (max-width: ${p => p.theme.screenSizes.largest}) {
    padding: ${(p: { isMobile: boolean }) =>
      p.isMobile ? "0 20px" : "0 60px"};
  }
`;
const BoldGreen = styled.span`
  color: ${(p: { theme: any; fontSize: number }) => p.theme.green.dark};
  font-size: ${(p: { theme: any; fontSize: number }) => p.fontSize}px;
  font-weight: bold;
`;
const BoldGray = styled.span`
  color: ${(p: { theme: any; fontSize: number }) => p.theme.gray.medium};
  font-size: ${(p: { theme: any; fontSize: number }) => p.fontSize}px;
  font-weight: bold;
`;

// TODO: Hook up to the contract. Using hard-coded values for now.

const amountNeeded = 524288;
export const NetworkStatus = (): JSX.Element => {
  const m: boolean = (window as any).mobileCheck();
  const [amountEth, setAmountEth] = useState(12000);

  return (
    <Container isMobile={m}>
      <Content isMobile={m}>
        <ScrollAnimation delay={750} animateIn="fadeIn" animateOnce>
          <Heading level={2} size="medium" color="blueDark" margin="none">
            Network Status
          </Heading>
          <Text size="x-large" className="mt20">
            <BoldGreen className="mr10" fontSize={24}>
              {amountEth} ETH
            </BoldGreen>
            in the network and counting
          </Text>
          <Text className="mt20">
            The eth2 network needs to reach at least
            <BoldGreen className="mr10 ml10" fontSize={24}>
              {amountNeeded} ETH,
            </BoldGreen>
            <BoldGray className="mr10" fontSize={24}>
              16,284 validators,
            </BoldGray>
            to launch its mainnet
          </Text>
          <div>
            <ProgressBar progress={10} />
            <div className="flex space-between mt20">
              <span className="flex">
                <BoldGreen fontSize={18} className="mr10">
                  {amountEth} ETH
                </BoldGreen>
                <Text size="small" style={{ marginTop: "2px" }}>
                  Current Staking Balance
                </Text>
              </span>
              <Text size="small">
                {amountNeeded - amountEth} ETH Launch threshold
              </Text>
            </div>
          </div>
        </ScrollAnimation>
      </Content>
    </Container>
  );
};
