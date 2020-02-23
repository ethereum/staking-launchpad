import styled from "styled-components";
import { Heading } from "../../../components/Heading";
import { Text } from "../../../components/Text";
import { Link } from "../../../components/Link";
import React from "react";

const Container = styled.div`
  width: 610px;
  background-color: ${p => p.theme.purple};
  margin: 10px auto;
  padding: 10px 20px;
  border-radius: ${p => p.theme.borderRadius};
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
      <Link className="mt20" to={linkUrl}>
        {link}
      </Link>
    </Container>
  );
};
