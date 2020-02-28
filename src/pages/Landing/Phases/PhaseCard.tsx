import React from "react";
import styled from "styled-components";
import { Heading } from "../../../components/Heading";
import { Text } from "../../../components/Text";
import { Link } from "../../../components/Link";

const Container = styled.div`
  background-color: ${p => p.theme.purple.medium};
  margin: 10px auto;
  padding: 10px 20px;
  border-radius: ${p => p.theme.borderRadius};
  width: 100%;
`;

export const PhaseCard = ({
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
  return (
    <Container>
      <Heading level="4" size="large" className="my10">
        {title}
      </Heading>
      <Text>{subTitle}</Text>
      <Link external className="mt20" to={linkUrl}>
        {link}
      </Link>
    </Container>
  );
};
