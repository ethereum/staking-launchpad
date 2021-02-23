import React from 'react';
import styled from 'styled-components';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Heading } from '../Heading';
import { WorkflowProgressBar } from './WorkflowProgressBar';
import { DesktopOnlyModal } from '../DesktopOnlyModal';
import {
  rainbowBGColors,
  rainbowLightColors,
} from '../../styles/styledComponentsTheme';
import { routesEnum } from '../../Routes';
import { WorkflowStep } from '../../store/actions/workflowActions';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

const Content = styled.div`
  width: 100%;
  padding: 64px;
  margin-left: 256px;
`;

const Gutter = styled.div`
  display: flex;
  justify-content: space-between;
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
  const { locale } = useIntl();
  if ((window as any).mobileCheck()) {
    return <DesktopOnlyModal />;
  }

  const { pathname } = history.location;
  const path = pathname.startsWith(`/${locale}`)
    ? pathname.substr(`/${locale}`.length)
    : pathname;
  const calculatedWorkflowStep: WorkflowStep = mapPathnameToWorkflowStep(path);

  return (
    <Background workflowStep={calculatedWorkflowStep}>
      <Helmet>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
      </Helmet>
      <Gutter>
        <WorkflowProgressBar workflow={calculatedWorkflowStep} />
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
