import React from 'react';
import styled from 'styled-components';
import { Heading } from './Heading';

const LogoContainerBox = styled.div`
  width: 200px;
  height: 200px;
  border: ${(p: { theme: any; isActive: boolean }) =>
    `2px solid ${p.isActive ? p.theme.blue.light : p.theme.gray.medium}`};
  box-shadow: ${(p: { theme: any; isActive: boolean }) =>
    p.isActive && `0 0 10px rgba(0, 0, 0, 0.5)`};
  border-radius: ${p => p.theme.borderRadius};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  cursor: pointer;
  -webkit-transition: border 500ms ease-out, box-shadow 500ms ease-out;
  -moz-transition: border 500ms ease-out, box-shadow 500ms ease-out;
  -o-transition: border 500ms ease-out, box-shadow 500ms ease-out;
  transition: border 500ms ease-out, box-shadow 500ms ease-out;
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
  background-color: ${(p: {
    theme: any;
    isActive: boolean;
    fullWidthImg?: boolean;
  }) => (p.isActive ? p.theme.blue.light : p.theme.gray.light)};
  -webkit-transition: background-color 500ms ease-out;
  -moz-transition: background-color 500ms ease-out;
  -o-transition: background-color 500ms ease-out;
  transition: background-color 500ms ease-out;
  img {
    width: ${(p: { fullWidthImg?: boolean }) =>
      p.fullWidthImg ? '100%' : '50px'};
    height: ${(p: { fullWidthImg?: boolean }) =>
      p.fullWidthImg ? '100%' : '50px'};
    margin: ${(p: { fullWidthImg?: boolean }) => (p.fullWidthImg ? 0 : '17px')};
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

interface ImgSelectionBoxProps {
  src: any;
  isActive: boolean;
  onClick: any;
  text: string;
  fullWidthImg?: boolean;
}

export const ImageSelectionBox = ({
  src,
  isActive,
  onClick,
  text,
  fullWidthImg,
}: ImgSelectionBoxProps) => {
  return (
    <LogoContainerBox onClick={onClick} isActive={isActive}>
      <LogoBackground isActive={isActive} fullWidthImg={fullWidthImg}>
        <img src={src} alt={text} />
      </LogoBackground>
      <LogoText level={3} size="small" color="blueDark">
        {text}
      </LogoText>
    </LogoContainerBox>
  );
};
