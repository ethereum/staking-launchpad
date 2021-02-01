import React from 'react';
import styled from 'styled-components';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Heading } from '../Heading';
import { WorkflowProgressBar } from './WorkflowProgressBar';
import { AppBar } from '../AppBar';
import { DesktopOnlyModal } from '../DesktopOnlyModal';
import {
  rainbowBGColors,
  rainbowLightColors,
} from '../../styles/styledComponentsTheme';
import { routesEnum } from '../../Routes';
import { WorkflowStep } from '../../store/actions/workflowActions';
import { Helmet } from 'react-helmet';

const Content = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 30px 0;
  position: relative;
`;

const Gutter = styled.div`
  padding: 0 48px 5rem;
  display: flex;
  justify-content: center;
`;
const Background = styled.div`
  background-image: ${(p: { workflowStep: WorkflowStep }) =>
    `linear-gradient(to bottom right, ${rainbowLightColors[p.workflowStep]}, ${
      rainbowBGColors[p.workflowStep]
    });`};
  min-height: 100vh;
`;

const mapPathnameToWorkflowStep = (pathname: routesEnum) => {
  const workflowRoutesInOrder = [
    routesEnum.acknowledgementPage,
    routesEnum.selectClient,
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
  description?: string;
  history: any;
}

const _WorkflowPageTemplate = ({
  children,
  title,
  description,
  history,
}: Props): JSX.Element => {
  if ((window as any).mobileCheck()) {
    return <DesktopOnlyModal />;
  }

  const calculatedWorkflowStep: WorkflowStep = mapPathnameToWorkflowStep(
    history.location.pathname
  );

  return (
    <Background workflowStep={calculatedWorkflowStep}>
      <Helmet>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
      </Helmet>
      <AppBar />
      <WorkflowProgressBar workflow={calculatedWorkflowStep} />
      <Gutter>
        <Content>
          <Heading level={2} size="medium" color="blueDark" className="mb20">
            {title}
          </Heading>
          {children}
        </Content>
      </Gutter>
    </Background>
  );
};

export const WorkflowPageTemplate = withRouter(_WorkflowPageTemplate);
