import React from "react";
import { Heading } from "grommet";
import { operatingSystem } from "./index";
import styled from "styled-components";
import MacLogo from "../../static/apple.svg";
import LinuxLogo from "../../static/linux.svg";
import WindowsLogo from "../../static/windows.svg";

const LogoContainerBox = styled.div`
  width: 200px;
  height: 200px;
  border: ${(p: { theme: any; isActive: boolean }) =>
    `2px solid ${p.isActive ? p.theme.blue.medium : p.theme.gray.medium}`};
  border-radius: ${p => p.theme.borderRadius};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  cursor: pointer;
  -webkit-transition: border 500ms ease-out;
  -moz-transition: border 500ms ease-out;
  -o-transition: border 500ms ease-out;
  transition: border 500ms ease-out;
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
  background-color: ${(p: { theme: any; isActive: boolean }) =>
    p.isActive ? p.theme.blue.light : p.theme.gray.light};
  -webkit-transition: background-color 500ms ease-out;
  -moz-transition: background-color 500ms ease-out;
  -o-transition: background-color 500ms ease-out;
  transition: background-color 500ms ease-out;
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
      <LogoBackground isActive={isActive}>
        <img src={osImage} alt={text} />
      </LogoBackground>
      <LogoText level={3} size="small" color="blueDark">
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

export const OperatingSystemButtons = ({
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
        osImage={WindowsLogo}
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
