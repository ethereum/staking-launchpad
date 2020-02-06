import React from "react";
import { Heading } from "grommet";
import { operatingSystem } from "./index";
import styled from "styled-components";
import MacLogo from "../../static/apple.svg";
import LinuxLogo from "../../static/linux.svg";

const LogoContainerBox = styled.div`
  width: 200px;
  height: 200px;
  border: ${(p: { theme: any; isActive: boolean }) =>
    `1px solid ${p.isActive ? p.theme.brand : p.theme.gray20}`};
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  cursor: pointer;
  @media only screen and (max-width: 770px) {
    width: 150px;
    height: 150px;
    margin: 17px;
  }
`;
const LogoText = styled(Heading)`
  margin-bottom: 40px;
  text-align: center;
  @media only screen and (max-width: 770px) {
    display: none;
  }
`;
const LogoBackground = styled.div`
  width: 85px;
  height: 85px;
  margin: 20px auto auto;
  border-radius: 50%;
  background-color: ${p => p.theme.gray10};
  img {
    width: 50px;
    height: 50px;
    margin: 17px;
  }
  @media only screen and (max-width: 770px) {
    height: 100px;
    width: 100px;
    img {
      width: 60px;
      height: 60px;
      margin: 19px;
    }
  }
`;

interface LogoContainerProps {
  osImage: any;
  isActive: boolean;
  onClick: any;
  text: string;
}
const LogoContainer = ({
  osImage,
  isActive,
  onClick,
  text
}: LogoContainerProps) => {
  return (
    <LogoContainerBox onClick={onClick} isActive={isActive}>
      <LogoBackground>
        <img src={osImage} alt={text} />
      </LogoBackground>
      <LogoText level={3} size="small" color="brand">
        {text}
      </LogoText>
    </LogoContainerBox>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;

  @media only screen and (min-width: 980px) {
    padding: 0 80px;
  }

  @media only screen and (min-width: 1200px) {
    padding: 0 115px;
  }
`;

export const OperatingSystems = ({
  chosenOs,
  setChosenOs
}: {
  chosenOs: operatingSystem;
  setChosenOs: (os: operatingSystem) => void;
}) => {
  return (
    <Container className="flex">
      <LogoContainer
        text="Linux"
        onClick={() => setChosenOs(operatingSystem.LINUX)}
        isActive={chosenOs === operatingSystem.LINUX}
        osImage={LinuxLogo}
      />
      <LogoContainer
        text="Windows"
        onClick={() => setChosenOs(operatingSystem.WINDOWS)}
        isActive={chosenOs === operatingSystem.WINDOWS}
        osImage={MacLogo}
      />
      <LogoContainer
        text="Mac"
        onClick={() => setChosenOs(operatingSystem.MAC)}
        isActive={chosenOs === operatingSystem.MAC}
        osImage={MacLogo}
      />
    </Container>
  );
};
