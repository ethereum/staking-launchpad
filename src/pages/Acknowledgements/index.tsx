import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Dispatch } from 'redux';
import _every from 'lodash/every';
import _pickBy from 'lodash/pickBy';
import _values from 'lodash/values';
import {
  AcknowledgementIdsEnum,
  AcknowledgementStateInterface,
  StoreState,
} from '../../store/reducers';
import {
  DispatchWorkflowUpdateType,
  WorkflowStep,
  updateWorkflow,
} from '../../store/actions/workflowActions';
import {
  DispatchAcknowledgementStateUpdateType,
  updateAcknowledgementState,
} from '../../store/actions/acknowledgementActions';
import { pageContent, PageContentInterface } from './pageContent';
import { AcknowledgementProgressTracker } from './AcknowledgementProgressTracker';
import { AcknowledgementSection } from './AcknowledgementSection';
import { WorkflowPageTemplate } from '../../components/WorkflowPage/WorkflowPageTemplate';
import { Paper } from '../../components/Paper';

interface OwnProps {}
interface StateProps {
  acknowledgementState: AcknowledgementStateInterface;
  workflow: WorkflowStep;
}

interface DispatchProps {
  dispatchAcknowledgementStateUpdate: DispatchAcknowledgementStateUpdateType;
  dispatchWorkflowUpdate: DispatchWorkflowUpdateType;
}
type Props = StateProps & DispatchProps & OwnProps;

const _AcknowledgementPage = ({
  acknowledgementState,
  dispatchAcknowledgementStateUpdate,
  workflow,
  dispatchWorkflowUpdate,
}: Props): JSX.Element => {
  const [activeAcknowledgementId, setActiveAcknowledgementId] = useState<
    AcknowledgementIdsEnum
  >(
    workflow === WorkflowStep.OVERVIEW
      ? AcknowledgementIdsEnum.introSection
      : AcknowledgementIdsEnum.confirmation
  );

  const allAgreedTo = _every(
    _values(
      _pickBy(
        acknowledgementState,
        // @ts-ignore
        (val: boolean, id: AcknowledgementIdsEnum) => {
          // eslint-disable-next-line eqeqeq
          return id != AcknowledgementIdsEnum.confirmation;
        }
      )
    )
  );

  const Subtitle = styled.p`
    font-size: 20px;
    margin-bottom: 32px;
  `;

  const handleSubmit = () => {
    if (workflow === WorkflowStep.OVERVIEW) {
      dispatchWorkflowUpdate(WorkflowStep.SELECT_CLIENT);
    }
  };

  const handleContinueClick = (id: AcknowledgementIdsEnum) => {
    dispatchAcknowledgementStateUpdate(id, true);
    if (+id + 1 in AcknowledgementIdsEnum) {
      setTimeout(() => setActiveAcknowledgementId(+id + 1), 200);
    }
  };

  const handleGoBackClick = (id: AcknowledgementIdsEnum) => {
    if (+id - 1 in AcknowledgementIdsEnum) {
      setActiveAcknowledgementId(+id - 1);
    }
  };

  const {
    title,
    content,
    acknowledgementText,
  }: PageContentInterface = pageContent[activeAcknowledgementId];
  const { formatMessage } = useIntl();
  return (
    <WorkflowPageTemplate
      title={formatMessage({ defaultMessage: 'Advisories' })}
    >
      <Subtitle>
        <FormattedMessage defaultMessage="Everything you should understand before becoming a validator." />
      </Subtitle>
      <Paper className="flex flex-row">
        <AcknowledgementProgressTracker
          activeAcknowledgementId={activeAcknowledgementId}
          setActiveAcknowledgementId={setActiveAcknowledgementId}
        />
        <AcknowledgementSection
          handleContinueClick={handleContinueClick}
          handleGoBackClick={handleGoBackClick}
          handleSubmit={handleSubmit}
          allAgreedTo={allAgreedTo}
          title={title}
          content={content}
          acknowledgementId={activeAcknowledgementId}
          acknowledgementText={acknowledgementText}
        />
      </Paper>
    </WorkflowPageTemplate>
  );
};

const mapStateToProps = (state: StoreState): StateProps => ({
  workflow: state.workflow,
  acknowledgementState: state.acknowledgementState,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatchAcknowledgementStateUpdate: (id, value) =>
    dispatch(updateAcknowledgementState(id, value)),
  dispatchWorkflowUpdate: step => dispatch(updateWorkflow(step)),
});

export const AcknowledgementPage = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  StoreState
>(
  mapStateToProps,
  mapDispatchToProps
)(_AcknowledgementPage);
