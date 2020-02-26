import React from "react";
import styled from "styled-components";
import { Heading } from "../../../components/Heading";
import { Text } from "../../../components/Text";

const Container = styled.div`
  max-width: 340px;
  margin: 20px;
`;
const Img = styled.img`
  width: 340px;
`;

export const Step = ({
  imgUrl,
  title,
  content
}: {
  imgUrl: any;
  title: string;
  content: string;
}): JSX.Element => {
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
