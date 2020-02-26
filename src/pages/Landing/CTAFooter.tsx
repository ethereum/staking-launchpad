import React from "react";
import styled from "styled-components";
import { Button } from "../../components/Button";
import { Link } from "../../components/Link";
import { routesEnum } from "../../Routes";

const Container = styled.div`
  background: ${p => p.theme.brand};
`;
const SubContainer = styled.div`
  position: relative;
  max-width: ${p => p.theme.screenSizes.largest};
  width: 100%;
  margin: 0 auto;
  padding: 0 120px;
  @media only screen and (max-width: ${p => p.theme.screenSizes.largest}) {
    padding: 0 60px;
  }
`;

export const CTAFooter = (): JSX.Element => {
  const m = (window as any).mobileCheck();
  return (
    <Container>
      <SubContainer className={m ? "py20" : "py100"}>
        <Link to={routesEnum.AcknowledgementPage}>
          <Button
            className="m-auto"
            fullWidth
            width={m ? undefined : 400}
            label={`GET STARTED ${m ? "ON DESKTOP" : ""}`}
          />
        </Link>
      </SubContainer>
    </Container>
  );
};
