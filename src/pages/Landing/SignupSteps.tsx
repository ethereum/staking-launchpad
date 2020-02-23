import React from "react";
import styled from "styled-components";
import { Text } from "../../components/Text";
import { Box, Heading } from "grommet";
import DepositImgUrl from "../../static/depositStep.svg";
import GenerateKeyImgUrl from "../../static/generatekeyStep.svg";
import ResponsibilityImgUrl from "../../static/responsibilityStep.svg";
import { Button } from "../../components/Button";
import ScrollAnimation from "react-animate-on-scroll";

const Container = styled.div`
  box-sizing: border-box;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 0 120px;
  @media only screen and (max-width: 1440px) {
    padding: 0 60px;
  }
`;

const StepsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 30px;

  @media only screen and (max-width: 1380px) {
    justify-content: center;
  }
`;

const Step = ({
  imgUrl,
  title,
  content
}: {
  imgUrl: any;
  title: string;
  content: string;
}) => {
  const Container = styled.div`
    max-width: 340px;
    margin: 20px;
  `;

  const Img = styled.img`
    width: 340px;
  `;

  return (
    <Container>
      <Img src={imgUrl} alt="" />
      <Heading level="4" className="my10">
        {title}
      </Heading>
      <Text>{content}</Text>
    </Container>
  );
};

export const SignupSteps = (): JSX.Element => {
  return (
    <Container className="py100">
      <ScrollAnimation animateIn="fadeIn" animateOnce>
        <Heading level={2} size="medium" color="brand" margin="none">
          Sign up in 3 easy steps
        </Heading>
      </ScrollAnimation>
      <StepsContainer>
        <ScrollAnimation animateIn="fadeInUp" animateOnce>
          <Step
            imgUrl={ResponsibilityImgUrl}
            title="Learn about your responsibilities"
            content="The new eth2 network can only work  successfully if validators understand their responsibilities and risks."
          />
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInUp" animateOnce delay={150}>
          <Step
            imgUrl={GenerateKeyImgUrl}
            title="Generate validator keys offline"
            content="In order to register on the beacon chain, you need to generate a keypair and upload the the public key."
          />
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInUp" animateOnce delay={300}>
          <Step
            imgUrl={DepositImgUrl}
            title="Deposit ETH in exchange for bETH"
            content="After depositing 32 ETH per validator, you receive 32 bETH and become an important part of the network!"
          />
        </ScrollAnimation>
      </StepsContainer>
      <Box align="center" pad="large" className="mt30">
        <Button width={200} label="BECOME A VALIDATOR" />
      </Box>
    </Container>
  );
};
