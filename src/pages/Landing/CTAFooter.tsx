import React from "react";
import styled from "styled-components";
import { Button } from "../../components/Button";
import { Box } from "grommet";

const Container = styled.div`
  background: ${p => p.theme.brand};
`;
const SubContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 0 120px;
  @media only screen and (max-width: 1440px) {
    padding: 0 60px;
  }
`;

export const CTAFooter = (): JSX.Element => {
  return (
    <Container>
      <SubContainer className="py100">
        <Box align="center" pad="large" className="mt30">
          <Button width={400} label="GET STARTED ON DESKTOP" />
        </Box>
      </SubContainer>
    </Container>
  );
};
