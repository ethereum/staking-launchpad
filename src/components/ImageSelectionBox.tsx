import React from 'react';
import styled from 'styled-components';
import { SelectionBox } from './SelectionBox';
import { Heading } from './Heading';

type LogoBackgroundProps = {
  isActive?: boolean;
  fullWidthImg?: boolean;
};

const LogoBackground = styled.div<LogoBackgroundProps>`
  width: 85px;
  height: 85px;
  margin: 20px auto auto;
  border-radius: 50%;
  background-color: ${p =>
    p.isActive ? p.theme.blue.light : p.theme.gray.light};
  -webkit-transition: background-color 500ms ease-out;
  -moz-transition: background-color 500ms ease-out;
  -o-transition: background-color 500ms ease-out;
  transition: background-color 500ms ease-out;
  img {
    width: ${p => (p.fullWidthImg ? '100%' : '50px')};
    height: ${p => (p.fullWidthImg ? '100%' : '50px')};
    margin: ${p => (p.fullWidthImg ? 0 : '17px')};
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

const SelectionText = styled(Heading)`
  text-align: center;
  margin-top: 24px;
  margin-bottom: 24px;
  @media only screen and (max-width: 770px) {
    display: none;
  }
`;

const LanguageTag = styled.div`
  background: ${p => p.theme.blue.light};
  padding: 8px;
  font-size: 14px;
  text-align: center;
`;

interface ImgSelectionBoxProps {
  src: any;
  isActive: boolean;
  onClick: any;
  text: string;
  fullWidthImg?: boolean;
  style?: any;
  language?: any;
}

export const ImageSelectionBox = ({
  src,
  isActive,
  onClick,
  text,
  fullWidthImg,
  style,
  language,
}: ImgSelectionBoxProps) => {
  return (
    <SelectionBox onClick={onClick} isActive={isActive} style={style}>
      <LogoBackground isActive={isActive} fullWidthImg={fullWidthImg}>
        <img src={src} alt={text} />
      </LogoBackground>
      <SelectionText level={3} size="small" color="blueDark">
        {text}
      </SelectionText>
      {language && <LanguageTag>{language}</LanguageTag>}
    </SelectionBox>
  );
};
