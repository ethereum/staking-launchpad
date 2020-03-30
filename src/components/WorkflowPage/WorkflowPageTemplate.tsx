import React from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Heading } from 'grommet';
import { WorkflowProgressBar } from './WorkflowProgressBar';
import { AppBar } from '../AppBar';
import { DesktopOnlyModal } from '../DesktopOnlyModal';
import {
  rainbowColors,
  rainbowLightColors,
} from '../../styles/styledComponentsTheme';
import { routesEnum } from '../../Routes';
import { WorkflowProgressStep } from '../../store/actions/workflowProgressActions';

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
  background-image: ${(p: { workflowProgressStep: WorkflowProgressStep }) =>
    `linear-gradient(to bottom right, ${
      rainbowLightColors[p.workflowProgressStep]
    }, ${rainbowColors[p.workflowProgressStep]});`};

  min-height: 100vh;
`;

const mapPathnameToWorkflowProgressStep = (pathname: routesEnum) => {
  const workflowRoutesInOrder = [
    routesEnum.acknowledgementPage,
    routesEnum.generateKeysPage,
    routesEnum.uploadValidatorPage,
    routesEnum.connectWalletPage,
    routesEnum.summaryPage,
    routesEnum.transactionsPage,
  ];
  return workflowRoutesInOrder.indexOf(pathname);
};

interface Props extends RouteComponentProps {
  children?: React.ReactNode;
  title: string;
  history: any;
}

const _WorkflowPageTemplate = ({
  children,
  title,
  history,
}: Props): JSX.Element => {
  if ((window as any).mobileCheck()) {
    return <DesktopOnlyModal />;
  }

  const calculatedWorkflowProgressStep: WorkflowProgressStep = mapPathnameToWorkflowProgressStep(
    history.location.pathname
  );

  return (
    <Background workflowProgressStep={calculatedWorkflowProgressStep}>
      <AppBar />
      <WorkflowProgressBar workflowProgress={calculatedWorkflowProgressStep} />
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

export const WorkflowPageTemplate = withRouter(_WorkflowPageTemplate);
