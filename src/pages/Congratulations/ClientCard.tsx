import React from 'react';
import styled from 'styled-components';
import { Text } from '../../components/Text';
import { Link } from '../../components/Link';

const Container = styled.div`
  background-color: white;
  box-shadow: -1px 2px 4px rgba(238, 238, 238, 0.5),
    -1px 2px 2px rgba(222, 222, 222, 0.5);
  max-width: 250px;
  border-radius: 5px;

  .sub-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100% - 125px); // image-height
    padding: 20px;
  }
`;

const HeroImg = styled.img`
  width: 100%;
  max-height: 125px;
  border-radius: 5px 5px 0 0;
`;

interface Props {
  imgUrl: any;
  header: string | React.ReactElement;
  text: string | React.ReactElement;
  className?: string;
  url: string;
  linkText: string;
}

export const ClientCard = ({
  imgUrl,
  header,
  text,
  className,
  url,
  linkText,
}: Props) => {
  return (
    <Link to={url}>
      <Container className={className}>
        <HeroImg src={imgUrl} alt="" />
        <div className="sub-container">
          <div>
            <Text size="large">{header}</Text>
            <Text size="small" className="mt15">
              {text}
            </Text>
          </div>
          <Link className="mt10" to={url}>
            {linkText}
          </Link>
        </div>
      </Container>
    </Link>
  );
};
