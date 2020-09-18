import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import _shuffle from 'lodash/shuffle';
import { StoreState } from '../../store/reducers';
import { WorkflowPageTemplate } from '../../components/WorkflowPage/WorkflowPageTemplate';
import { routeToCorrectWorkflowStep } from '../../utils/RouteToCorrectWorkflowStep';
import SelectValidatorSection from './SelectValidatorSection';
import SelectValidatorButtons from './SelectValidatorButtons';
import { PrysmDetails } from '../ValidatorClients/Prysm';
import { LighthouseDetails } from '../ValidatorClients/Lighthouse';
import { TekuDetails } from '../ValidatorClients/Teku';
import { NimbusDetails } from '../ValidatorClients/Nimbus';
import PrysmaticCircle from '../../static/prysmatic-labs-circle.png';
import LighthouseCircle from '../../static/lighthouse-circle.png';
import NimbusCircle from '../../static/nimbus-circle.png';
import TekuCircle from '../../static/pegasys-teku-circle.png';

import {
  DispatchWorkflowUpdateType,
  WorkflowStep,
  updateWorkflow,
} from '../../store/actions/workflowActions';

// Prop definitions
interface OwnProps {}
interface StateProps {
  workflow: WorkflowStep;
}

interface DispatchProps {
  dispatchWorkflowUpdate: DispatchWorkflowUpdateType;
}
type Props = StateProps & DispatchProps & OwnProps;

const clientDetails: { [client: string]: React.ReactElement } = {
  Teku: <TekuDetails />,
  Lighthouse: <LighthouseDetails />,
  Prysm: <PrysmDetails />,
  Nimbus: <NimbusDetails />,
};

const ethClients: {
  [ethVersion: number]: Array<{ name: string; imgUrl: string }>;
} = {
  1: [
    { name: 'Teku', imgUrl: TekuCircle },
    { name: 'Lighthouse', imgUrl: LighthouseCircle },
    { name: 'Prysm', imgUrl: PrysmaticCircle },
    { name: 'Nimbus', imgUrl: NimbusCircle },
  ],
  2: [
    { name: 'Teku', imgUrl: TekuCircle },
    { name: 'Lighthouse', imgUrl: LighthouseCircle },
    { name: 'Prysm', imgUrl: PrysmaticCircle },
    { name: 'Nimbus', imgUrl: NimbusCircle },
  ],
};

const _SelectValidatorPage = ({
  workflow,
  dispatchWorkflowUpdate,
}: Props): JSX.Element => {
  const [ethVersionStep, setEthVersionStep] = useState<1 | 2>(1);

  const shuffledValidators = React.useMemo(() => {
    return _shuffle(ethClients[ethVersionStep]);
  }, [ethVersionStep]);

  const [eth1Validator, setEth1Validator] = useState<string>(
    shuffledValidators[0].name
  );
  const [eth2Validator, setEth2Validator] = useState<string>(
    shuffledValidators[0].name
  );
  const currentValidators = [eth1Validator, eth2Validator];
  const setValidatorFxns = [setEth1Validator, setEth2Validator];

  React.useEffect(() => {
    const header = document.getElementsByTagName('header')[0];

    if (header) {
      header.scrollIntoView({ behavior: 'smooth' });
    }
  }, [ethVersionStep]);

  const handleSubmit = () => {
    if (workflow === WorkflowStep.SELECT_VALIDATOR) {
      dispatchWorkflowUpdate(WorkflowStep.TRANSACTION_SIGNING);
    }
  };

  if (workflow < WorkflowStep.SELECT_VALIDATOR)
    return routeToCorrectWorkflowStep(workflow);

  return (
    <WorkflowPageTemplate title="Validator">
      <SelectValidatorSection
        title={`Choose your Eth ${ethVersionStep} validator and set up a node`}
        clients={shuffledValidators}
        currentValidator={currentValidators[ethVersionStep]}
        setCurrentValidator={setValidatorFxns[ethVersionStep]}
        clientDetails={clientDetails}
      />
      <div className="flex center p30">
        <SelectValidatorButtons
          updateStep={setEthVersionStep}
          ethVersionStep={ethVersionStep}
          handleSubmit={handleSubmit}
          currentValidator={currentValidators[ethVersionStep]}
        />
      </div>
    </WorkflowPageTemplate>
  );
};

const mapStateToProps = ({ workflow }: StoreState): StateProps => ({
  workflow,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatchWorkflowUpdate: (step: WorkflowStep) => {
    dispatch(updateWorkflow(step));
  },
});

export const SelectValidatorPage = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  StoreState
>(
  mapStateToProps,
  mapDispatchToProps
)(_SelectValidatorPage);
