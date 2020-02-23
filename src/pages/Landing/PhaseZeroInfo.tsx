import React from "react";
import styled from "styled-components";
import { Text } from "../../components/Text";
import { Box } from "grommet";
import { Button } from "../../components/Button";
import { Link } from "../../components/Link";
import { Heading } from "../../components/Heading";
import ScrollAnimation from "react-animate-on-scroll";

const Container = styled.div`
  background-color: ${p => p.theme.lightPurple};
`;
const SubContainer = styled.div`
  box-sizing: border-box;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 0 120px;
  @media only screen and (max-width: 1440px) {
    padding: 0 60px;
  }
`;

const PhasesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  //justify-content: space-between;
  //margin-top: 30px;
`;
const TextContainer = styled.div`
  max-width: 440px;
  padding: 0 20px;
`;

const PhaseCard = ({
  title,
  subTitle,
  link,
  linkUrl
}: {
  title: string;
  subTitle: string;
  link: string;
  linkUrl: string;
}) => {
  const Container = styled.div`
    width: 610px;
    background-color: ${p => p.theme.purple};
    margin: 10px auto;
    padding: 10px 20px;
    border-radius: ${p => p.theme.borderRadius};
  `;

  return (
    <Container>
      <Heading level="4" size="large" className="my10">
        {title}
      </Heading>
      <Text>{subTitle}</Text>
      <Link className="mt20" to={linkUrl}>
        {link}
      </Link>
    </Container>
  );
};

const ResponsiveContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 1150px) {
    flex-direction: column;
  }
`;

interface phase {
  title: string;
  subTitle: string;
  linkUrl: string;
  link: string;
}

const phases: phase[] = [
  {
    title: "Duration",
    subTitle:
      "The duration for the deployment of the individual phases depends on many factors.",
    linkUrl: "/somePage",
    link: "Phase 0, 1, 2 and 3 duration →"
  },
  {
    title: "Tokens",
    subTitle: "eth2 will have a new token - bETH.",
    linkUrl: "/somePage",
    link: "About bETH →"
  },
  {
    title: "Available Clients",
    subTitle:
      "We put together a curated list of available clients for running a validator.",
    linkUrl: "/somePage",
    link: "See list of clients →"
  },
  {
    title: "Economics",
    subTitle: "All economic details are publicly accessible and transparent.",
    linkUrl: "/somePage",
    link: "Validator Economics →"
  },
  {
    title: "Code Audit",
    subTitle:
      "Any code audits are written up into a report, you can read it here.",
    linkUrl: "/somePage",
    link: "Read the full audit report →"
  },
  {
    title: "Testnet info",
    subTitle:
      "We put together a list of resources on anything related to the testnet.",
    linkUrl: "/somePage",
    link: "Testnet Details →"
  },
  {
    title: "Resources",
    subTitle: "See our full list of curated resources and information.",
    linkUrl: "/somePage",
    link: "Further Resources →"
  }
];

export const PhaseZeroInfo = (): JSX.Element => {
  return (
    <Container>
      <SubContainer className="py100">
        <ResponsiveContainer>
          <TextContainer>
            <ScrollAnimation animateIn="fadeIn" animateOnce>
              <Heading margin="none" className="mt20">
                What is eth2 phase 0?
              </Heading>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeInUp" animateOnce>
              <Text>
                Transitioning from proof-of-work to proof-of-stake, eth2 will be
                launched in 4 phases.
              </Text>
            </ScrollAnimation>
          </TextContainer>
          <PhasesContainer>
            {phases.map((phase: phase, index) => (
              <PhaseCard
                title={phase.title}
                link={phase.link}
                linkUrl={phase.linkUrl}
                subTitle={phase.subTitle}
              />
            ))}
          </PhasesContainer>
        </ResponsiveContainer>
      </SubContainer>
    </Container>
  );
};
