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
import ParityCircle from '../../static/parity-circle.png';
import GethCircle from '../../static/gethereum-mascot-circle.png';
import BesuCircle from '../../static/hyperledger-besu-circle.png';
import NethermindCircle from '../../static/nethermind-circle.png';

import {
  DispatchWorkflowUpdateType,
  updateWorkflow,
  WorkflowStep,
} from '../../store/actions/workflowActions';
import {
  DispatchValidatorUpdate,
  updateValidator,
  ValidatorId,
} from '../../store/actions/validatorActions';
import { validatorState } from '../../store/reducers/validatorReducer';

// Prop definitions
interface OwnProps {}
interface StateProps {
  workflow: WorkflowStep;
  chosenValidators: validatorState;
}

interface DispatchProps {
  dispatchWorkflowUpdate: DispatchWorkflowUpdateType;
  dispatchValidatorUpdate: DispatchValidatorUpdate;
}
type Props = StateProps & DispatchProps & OwnProps;

const clientDetails: { [client: string]: React.ReactElement } = {
  Teku: <TekuDetails />,
  Lighthouse: <LighthouseDetails />,
  Prysm: <PrysmDetails />,
  Nimbus: <NimbusDetails />,
};

export type Client = {
  validatorId: ValidatorId;
  name: string;
  imgUrl: string;
};

// define and shuffle the validators
const ethClients: {
  [ethVersion: number]: Array<Client>;
} = {
  1: _shuffle([
    {
      validatorId: ValidatorId.PARITY,
      name: 'OpenEthereum',
      imgUrl: ParityCircle,
    },
    { validatorId: ValidatorId.GETH, name: 'Geth', imgUrl: GethCircle },
    { validatorId: ValidatorId.BESU, name: 'Besu', imgUrl: BesuCircle },
    {
      validatorId: ValidatorId.NETHERMIND,
      name: 'Nethermind',
      imgUrl: NethermindCircle,
    },
  ]),
  2: _shuffle([
    { validatorId: ValidatorId.TEKU, name: 'Teku', imgUrl: TekuCircle },
    {
      validatorId: ValidatorId.LIGHTHOUSE,
      name: 'Lighthouse',
      imgUrl: LighthouseCircle,
    },
    {
      validatorId: ValidatorId.PRYSM,
      name: 'Prysm',
      imgUrl: PrysmaticCircle,
    },
    { validatorId: ValidatorId.PARITY, name: 'Nimbus', imgUrl: NimbusCircle },
  ]),
};

const _SelectValidatorPage = ({
  workflow,
  dispatchWorkflowUpdate,
  chosenValidators,
  dispatchValidatorUpdate,
}: Props): JSX.Element => {
  // set the default the eth version to 1 on initial render
  const [ethVersionStep, setEthVersionStep] = useState<1 | 2>(1);

  // filter the options based on the eth version the user is on
  const validatorOptions = React.useMemo(() => ethClients[ethVersionStep], [
    ethVersionStep,
  ]);

  // memoize the chosen validator by step
  const selectedValidator: ValidatorId = React.useMemo(
    () =>
      ethVersionStep === 1
        ? chosenValidators.eth1Validator
        : chosenValidators.eth2Validator,
    [ethVersionStep, chosenValidators]
  );

  const setValidatorFxn = (validatorId: ValidatorId) => {
    dispatchValidatorUpdate(validatorId, ethVersionStep);
  };

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
        clients={validatorOptions}
        currentValidator={selectedValidator}
        setCurrentValidator={setValidatorFxn}
        clientDetails={clientDetails}
      />
      <div className="flex center p30">
        <SelectValidatorButtons
          updateStep={setEthVersionStep}
          ethVersionStep={ethVersionStep}
          handleSubmit={handleSubmit}
          currentValidator={selectedValidator}
        />
      </div>
    </WorkflowPageTemplate>
  );
};

const mapStateToProps = ({ workflow, validator }: StoreState): StateProps => ({
  workflow,
  chosenValidators: validator,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatchValidatorUpdate: (validatorId: ValidatorId, ethVersion: 1 | 2) => {
    dispatch(updateValidator(validatorId, ethVersion));
  },
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
