import React from 'react';
import styled from 'styled-components';
import { Button } from '../../components/Button';
import { Link } from '../../components/Link';
import { routesEnum } from '../../Routes';

const Container = styled.div`
  background-color: ${p => p.theme.blue.dark};
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

const CtaText = ({ mobile }: { mobile?: boolean }) => {
  const Rhino = styled.span`
    font-size: 20px;
  `;
  return (
    <span>
      GET <Rhino>🦏</Rhino> STARTED {mobile ? 'ON DESKTOP' : ''}
    </span>
  );
};

export const CTAFooter = (): JSX.Element => {
  const m: boolean = (window as any).mobileCheck();
  return (
    <Container>
      <SubContainer className={m ? 'py20' : 'py100'}>
        <Link to={routesEnum.acknowledgementPage}>
          <Button
            rainbow
            className="m-auto"
            fullWidth
            width={m ? undefined : 400}
            label={<CtaText mobile={m} />}
          />
        </Link>
      </SubContainer>
    </Container>
  );
};
