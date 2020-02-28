import React from "react";
import styled from "styled-components";
import { Heading } from "grommet";
import { WorkflowProgressBar } from "./WorkflowProgressBar";
import { AppBar } from "../AppBar";
import { DesktopOnlyModal } from "../DesktopOnlyModal";

interface WorkflowPageTemplateProps {
  children: React.ReactNode;
  title: string;
  backgroundColor?: string;
}

const Content = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 30px 0;
`;

const Gutter = styled.div`
  padding: 0 48px;
  display: flex;
  justify-content: center;
`;
const Background = styled.div`
  background-color: ${(p: { backgroundColor: string }) => p.backgroundColor};
`;

export const WorkflowPageTemplate = ({
  children,
  title,
  backgroundColor = "lightgray"
}: WorkflowPageTemplateProps): JSX.Element => {
  if ((window as any).mobileCheck()) {
    return <DesktopOnlyModal />;
  }
  return (
    <Background backgroundColor={backgroundColor}>
      <AppBar />
      <WorkflowProgressBar />
      <Gutter>
        <Content>
          <Heading level={2} size="medium" color="blueDark" className="mb40">
            {title}
          </Heading>
          {children}
        </Content>
      </Gutter>
    </Background>
  );
};
