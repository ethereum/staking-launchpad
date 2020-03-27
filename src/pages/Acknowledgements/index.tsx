import React, { useState } from 'react';
import { connect } from 'react-redux';
import _every from 'lodash/every';
import _pickBy from 'lodash/pickBy';
import _values from 'lodash/values';
import { WorkflowPageTemplate } from '../../components/WorkflowPage/WorkflowPageTemplate';
import {
  AcknowledgementIdsEnum,
  AcknowledgementStateInterface,
  StoreState,
} from '../../store/reducers';
import {
  ProgressStep,
  updateAcknowledgementState,
  updateProgress,
} from '../../store/actions';
import { pageContent, PageContentInterface } from './pageContent';
import { AcknowledgementProgressTracker } from './AcknowledgementProgressTracker';
import { AcknowledgementSection } from './AcknowledgementSection';

interface AcknowledgementPageProps {
  updateAcknowledgementState(
    acknowledgementId: AcknowledgementIdsEnum,
    valuesEnum: boolean
  ): void;
  acknowledgementState: AcknowledgementStateInterface;
  updateProgress: (step: ProgressStep) => void;
  progress: ProgressStep;
}

const _AcknowledgementPage = ({
  updateProgress,
  acknowledgementState,
  updateAcknowledgementState,
  progress,
}: AcknowledgementPageProps) => {
  const [activeAcknowledgementId, setActiveAcknowledgementId] = useState<
    AcknowledgementIdsEnum
  >(
    progress === ProgressStep.OVERVIEW
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

  const handleSubmit = () => {
    if (progress === ProgressStep.OVERVIEW) {
      updateProgress(ProgressStep.GENERATE_KEY_PAIRS);
    }
  };

  const handleContinueClick = (id: AcknowledgementIdsEnum) => {
    updateAcknowledgementState(id, true);
    if (+id + 1 in AcknowledgementIdsEnum) {
      setActiveAcknowledgementId(+id + 1);
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

  return (
    <WorkflowPageTemplate title="Overview">
      <div className="flex">
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
      </div>
    </WorkflowPageTemplate>
  );
};

const mstp = ({ progress, acknowledgementState }: StoreState) => ({
  progress,
  acknowledgementState,
});
const mdtp = (dispatch: any) => ({
  updateAcknowledgementState: (
    acknowledgementId: AcknowledgementIdsEnum,
    value: boolean
  ): void => dispatch(updateAcknowledgementState(acknowledgementId, value)),
  updateProgress: (step: ProgressStep): void => dispatch(updateProgress(step)),
});

export const AcknowledgementPage = connect(mstp, mdtp)(_AcknowledgementPage);
