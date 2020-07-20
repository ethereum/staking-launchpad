import React from 'react';
import styled from 'styled-components';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AppBar } from './AppBar';
import { Heading } from './Heading';

const Content = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 30px 0;
  position: relative;
`;

const Gutter = styled.div`
  padding: 0 48px;
  display: flex;
  justify-content: center;
`;

const RainbowBackground = styled.div`
  background-image: ${p =>
    `radial-gradient(circle at 100% -80%, ${p.theme.rainbowLight})`};
  min-height: 100vh;
`;

interface Props extends RouteComponentProps {
  children?: React.ReactNode;
  title: string;
  history: any;
}

const _PageTemplate = ({ children, title }: Props): JSX.Element => {
  return (
    <RainbowBackground>
      <AppBar />
      <Gutter>
        <Content>
          <Heading level={2} size="medium" color="blueDark" className="mb40">
            {title}
          </Heading>
          {children}
        </Content>
      </Gutter>
    </RainbowBackground>
  );
};

export const PageTemplate = withRouter(_PageTemplate);
