import React from 'react';
import styled from 'styled-components';
import { Heading } from './Heading';
import { Text } from './Text';
import { Button } from './Button';
import Mobile from '../static/mobile.svg';
import Laptop from '../static/laptop.svg';
import { Alert, Checkmark } from 'grommet-icons';
import { Link } from './Link';

const RainbowBackground = styled.div`
  background-image: ${p =>
    `radial-gradient(circle at 100% -80%, ${p.theme.rainbowLight}`});
  min-height: 100vh;
`;
const Container = styled.div`
  padding: 150px 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Image = styled.img`
  width: 70px;
  height: 60px;
`;
const ImageContainer = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: ${p => p.theme.gray.light};
  border: 1px solid ${(p: any) => p.theme.gray.medium};
  padding: 20px;
  border-radius: ${p => p.theme.borderRadius};
  margin: 50px 0;
`;
const ImageBackground = styled.div`
  background-color: ${(p: { mobile?: boolean }) =>
    p.mobile ? (p as any).theme.red.light : (p as any).theme.green.medium};
  padding: 25px;
  border-radius: 50%;
`;
const IconStyles = {
  margin: 'auto',
  marginTop: '10px',
};

export const DesktopOnlyModal = (): JSX.Element => {
  return (
    <RainbowBackground>
      <Container>
        <Heading center>Desktop Only</Heading>
        <Text center>You must be on a desktop device to use this app</Text>
        <ImageContainer>
          <div className="flex flex-column">
            <ImageBackground mobile>
              <Image src={Mobile} alt="" />
            </ImageBackground>
            <Alert size="large" color="redLight" style={IconStyles} />
          </div>
          <div className="flex flex-column">
            <ImageBackground>
              <Image src={Laptop} alt="" />
            </ImageBackground>
            <Checkmark size="large" color="green" style={IconStyles} />
          </div>
        </ImageContainer>
        <Link to="/">
          <Button fullWidth label="close" rainbow />
        </Link>
      </Container>
    </RainbowBackground>
  );
};
