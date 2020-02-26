import React from "react";
import styled from "styled-components";
import { styledComponentsTheme as theme } from "../styles/styledComponentsTheme";

const Container = styled.div`
  border: 1px solid black;
  padding: 20px;
  margin: 20px;
`;
const Box = ({ color, colorText }: { color: string; colorText: string }) => {
  const Color = styled.div`
    background-color: ${color};
    width: 50px;
    height: 50px;
    border: 1px solid black;
    margin: 20px;
  `;
  return (
    <div className="flex">
      <Color />
      <p>{colorText}</p>
    </div>
  );
};
const Gray = () => {
  return (
    <Container>
      <Box color={theme.gray.lightest} colorText="Gray lightest" />
      <Box color={theme.gray.light} colorText="Gray light" />
      <Box color={theme.gray.medium} colorText="Gray medium" />
      <Box color={theme.gray.dark} colorText="Gray dark" />
    </Container>
  );
};
const Blue = () => {
  return (
    <Container>
      <Box color={theme.blue.light} colorText="Blue light" />
      <Box color={theme.blue.medium} colorText="Blue medium" />
      <Box color={theme.blue.dark} colorText="Blue dark" />
    </Container>
  );
};

export const NotFoundPage = (): JSX.Element => {
  return (
    <div>
      <Gray />
      <Blue />
    </div>
  );
};
