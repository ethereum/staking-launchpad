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

// define and shuffle the validators
const ethClients: {
  [ethVersion: number]: Array<{ name: string; imgUrl: string }>;
} = {
  1: _shuffle([
    { name: 'OpenEthereum', imgUrl: ParityCircle },
    { name: 'Geth', imgUrl: GethCircle },
    { name: 'Besu', imgUrl: BesuCircle },
    { name: 'Nethermind', imgUrl: NethermindCircle },
  ]),
  2: _shuffle([
    { name: 'Teku', imgUrl: TekuCircle },
    { name: 'Lighthouse', imgUrl: LighthouseCircle },
    { name: 'Prysm', imgUrl: PrysmaticCircle },
    { name: 'Nimbus', imgUrl: NimbusCircle },
  ]),
};

const _SelectValidatorPage = ({
  workflow,
  dispatchWorkflowUpdate,
}: Props): JSX.Element => {
  // set the default the eth version to 1 on initial render
  const [ethVersionStep, setEthVersionStep] = useState<1 | 2>(1);

  // filter the options based on the eth version the user is on
  const validatorOptions = React.useMemo(() => ethClients[ethVersionStep], [
    ethVersionStep,
  ]);

  // save local state for the selected eth1 and eth2 validators
  const [eth1Validator, setEth1Validator] = useState<string>(
    ethClients[1][0].name
  );
  const [eth2Validator, setEth2Validator] = useState<string>(
    ethClients[2][0].name
  );

  // memoize the chosen validator by step
  const selectedValidator = React.useMemo(
    () => (ethVersionStep === 1 ? eth1Validator : eth2Validator),
    [ethVersionStep, eth1Validator, eth2Validator]
  );

  // memoize the eth versions validator update method
  const setValidatorFxn = React.useMemo(
    () => (ethVersionStep === 1 ? setEth1Validator : setEth2Validator),
    [ethVersionStep]
  );

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
        setCurrentValidator={name => setValidatorFxn(name)}
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
