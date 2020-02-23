import React from "react";
import styled from "styled-components";
import { Box } from "grommet";
import { Button } from "../../components/Button";
import { Link } from "../../components/Link";
import { routesEnum } from "../../Routes";

const Container = styled.div`
  background: ${p => p.theme.brand};
`;
const SubContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  max-width: ${p => p.theme.screenSizes.largest};
  width: 100%;
  margin: 0 auto;
  padding: 0 120px;
  @media only screen and (max-width: ${p => p.theme.screenSizes.largest}) {
    padding: 0 60px;
  }
`;

export const CTAFooter = (): JSX.Element => {
  return (
    <Container>
      <SubContainer className="py100">
        <Box align="center" pad="large" className="mt30">
          <Link to={routesEnum.AcknowledgementPage}>
            <Button width={400} label="GET STARTED ON DESKTOP" />
          </Link>
        </Box>
      </SubContainer>
    </Container>
  );
};
