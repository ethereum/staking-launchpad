import React from 'react';
import styled from 'styled-components';
import { Heading } from '../../components/Heading';

export const ValidatorClientPageStyles = styled.div`
  section {
    margin-top: 20px;
  }
`;

export const SectionTitle = styled(Heading)`
  margin-top: 30px;
  border-bottom: 1px solid lightgray;
  padding-bottom: 10px;
`;

const StyledImgForHero = styled.img`
  width: 100%;
  object-fit: cover;
  height: 230px;
`;

export const Hero = ({ imgSrc, ...props }: any) => {
  return <StyledImgForHero src={imgSrc} className="mb20" {...props} />;
};
