import React from 'react';
import styled from 'styled-components';
import { Text } from '../../components/Text';

const Container = styled.div`
  background-color: white;
  box-shadow: -1px 2px 4px rgba(238, 238, 238, 0.5),
    -1px 2px 2px rgba(222, 222, 222, 0.5);
  max-width: 250px;
  border-radius: 5px;
`;

const HeroImg = styled.img`
  width: 100%;
  border-radius: 5px 5px 0 0;
`;

interface Props {
  imgUrl: any;
  header: string | React.ReactElement;
  text: string | React.ReactElement;
  className?: string;
}

export const ClientCard = ({ imgUrl, header, text, className }: Props) => {
  return (
    <Container className={className}>
      <HeroImg src={imgUrl} alt="" />
      <div className="p20">
        <Text size="large">{header}</Text>
        <Text size="small" className="mt15">
          {text}
        </Text>
      </div>
    </Container>
  );
};
