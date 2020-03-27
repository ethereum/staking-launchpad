import React from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Heading } from 'grommet';
import { WorkflowProgressBar } from './WorkflowProgressBar';
import { AppBar } from '../AppBar';
import { DesktopOnlyModal } from '../DesktopOnlyModal';
import { ProgressStep } from '../../store/actions';
import {
  rainbowColors,
  rainbowLightColors,
} from '../../styles/styledComponentsTheme';
import { routesEnum } from '../../Routes';

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
  background-image: ${(p: { progressStep: ProgressStep }) =>
    `linear-gradient(to bottom right, ${rainbowLightColors[p.progressStep]}, ${
      rainbowColors[p.progressStep]
    });`};

  min-height: 100vh;
`;

interface WorkflowPageTemplateProps extends RouteComponentProps {
  children?: React.ReactNode;
  title: string;
  history: any;
}

const mapPathnameToProgressStep = (pathname: routesEnum) => {
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

const _WorkflowPageTemplate = ({
  children,
  title,
  history,
}: WorkflowPageTemplateProps): JSX.Element => {
  if ((window as any).mobileCheck()) {
    return <DesktopOnlyModal />;
  }

  const calculatedProgressStep: ProgressStep = mapPathnameToProgressStep(
    history.location.pathname
  );

  return (
    <Background progressStep={calculatedProgressStep}>
      <AppBar />
      <WorkflowProgressBar progress={calculatedProgressStep} />
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
