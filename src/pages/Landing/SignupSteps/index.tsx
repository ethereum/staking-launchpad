import React from "react";
import styled from "styled-components";
import ScrollAnimation from "react-animate-on-scroll";
import DepositImgUrl from "../../../static/deposit-eth-step.svg";
import GenerateKeyImgUrl from "../../../static/generate-key-step.svg";
import ResponsibilityImgUrl from "../../../static/responsibility-step.svg";
import { Button } from "../../../components/Button";
import { Heading } from "../../../components/Heading";
import { routesEnum } from "../../../Routes";
import { Link } from "../../../components/Link";
import { Step } from "./Step";
import { pricePerValidator } from "../../../enums";

const Container = styled.div`
  box-sizing: border-box;
  max-width: ${p => p.theme.screenSizes.largest};
  width: 100%;
  margin: 0 auto;
  padding: 0 120px;
  @media only screen and (max-width: ${p => p.theme.screenSizes.largest}) {
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

export const SignupSteps = (): JSX.Element => {
  const m: boolean = (window as any).mobileCheck();
  return (
    <Container className="py100">
      <ScrollAnimation animateIn="fadeIn" animateOnce>
        <Heading level={2} size="medium" color="blueDark" margin="none">
          sign up in 3 easy steps
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
            content={`After depositing ${pricePerValidator} ETH per validator, you receive ${pricePerValidator} bETH and become an important part of the network!`}
          />
        </ScrollAnimation>
      </StepsContainer>
      <ScrollAnimation animateIn="fadeIn" animateOnce delay={450}>
        <Link to={routesEnum.AcknowledgementPage} className="pt100">
          <Button
            rainbow
            className="m-auto"
            fullWidth
            width={m ? undefined : 400}
            label="BECOME A VALIDATOR"
          />
        </Link>
      </ScrollAnimation>
    </Container>
  );
};
