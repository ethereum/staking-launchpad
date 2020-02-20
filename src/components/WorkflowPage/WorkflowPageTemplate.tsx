import React from "react";
import styled from "styled-components";
import { WorkflowProgressBar } from "./WorkflowProgressBar";
import { Heading } from "grommet";

interface WorkflowPageTemplateProps {
  children: React.ReactNode;
  title: string;
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

export const WorkflowPageTemplate = ({
  children,
  title
}: WorkflowPageTemplateProps): JSX.Element => {
  return (
    <div>
      <WorkflowProgressBar />
      <Gutter>
        <Content>
          <Heading level={2} size="medium" color="brand" className="mb40">
            {title}
          </Heading>
          {children}
        </Content>
      </Gutter>
    </div>
  );
};
