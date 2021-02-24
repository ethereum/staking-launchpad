import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import _shuffle from 'lodash/shuffle';
import { StoreState } from '../../store/reducers';
import { WorkflowPageTemplate } from '../../components/WorkflowPage/WorkflowPageTemplate';
import { routeToCorrectWorkflowStep } from '../../utils/RouteToCorrectWorkflowStep';
import SelectClientSection from './SelectClientSection';
import SelectClientButtons from './SelectClientButtons';
import { PrysmDetails } from '../Clients/Eth2/Prysm';
import { LighthouseDetails } from '../Clients/Eth2/Lighthouse';
import { TekuDetails } from '../Clients/Eth2/Teku';
import { NimbusDetails } from '../Clients/Eth2/Nimbus';
import { GethDetails } from '../Clients/Eth1/Geth';
import { OpenEthereumDetails } from '../Clients/Eth1/OpenEthereum';
import { BesuDetails } from '../Clients/Eth1/Besu';
import { NethermindDetails } from '../Clients/Eth1/Nethermind';
import PrysmaticCircle from '../../static/prysmatic-labs-circle.png';
import LighthouseCircle from '../../static/lighthouse-circle.png';
import NimbusCircle from '../../static/nimbus-circle.png';
import TekuCircle from '../../static/pegasys-teku-circle.png';
import OpenEthereumCircle from '../../static/parity-circle.png';
import GethCircle from '../../static/gethereum-mascot-circle.png';
import BesuCircle from '../../static/hyperledger-besu-circle.png';
import NethermindCircle from '../../static/nethermind-circle.png';

import {
  DispatchWorkflowUpdateType,
  updateWorkflow,
  WorkflowStep,
} from '../../store/actions/workflowActions';
import {
  DispatchClientUpdate,
  updateClient,
  ClientId,
} from '../../store/actions/clientActions';
import { clientState } from '../../store/reducers/clientReducer';
import { useIntl } from 'react-intl';

// Prop definitions
interface OwnProps {}
interface StateProps {
  workflow: WorkflowStep;
  chosenClients: clientState;
}

interface DispatchProps {
  dispatchWorkflowUpdate: DispatchWorkflowUpdateType;
  dispatchClientUpdate: DispatchClientUpdate;
}
type Props = StateProps & DispatchProps & OwnProps;

const clientDetails = {
  [ClientId.TEKU]: <TekuDetails shortened />,
  [ClientId.LIGHTHOUSE]: <LighthouseDetails shortened />,
  [ClientId.PRYSM]: <PrysmDetails shortened />,
  [ClientId.NIMBUS]: <NimbusDetails shortened />,
  [ClientId.GETH]: <GethDetails />,
  [ClientId.OPEN_ETHEREUM]: <OpenEthereumDetails />,
  [ClientId.BESU]: <BesuDetails />,
  [ClientId.NETHERMIND]: <NethermindDetails />,
};

export type Client = {
  clientId: ClientId;
  name: string;
  imgUrl: string;
  language?: any;
};

// define and shuffle the clients
const ethClients: {
  [ethVersion: number]: Array<Client>;
} = {
  1: _shuffle([
    {
      clientId: ClientId.OPEN_ETHEREUM,
      name: 'OpenEthereum',
      imgUrl: OpenEthereumCircle,
      language: 'Rust',
    },
    {
      clientId: ClientId.GETH,
      name: 'Geth',
      imgUrl: GethCircle,
      language: 'Go',
    },
    {
      clientId: ClientId.BESU,
      name: 'Besu',
      imgUrl: BesuCircle,
      language: 'Java',
    },
    {
      clientId: ClientId.NETHERMIND,
      name: 'Nethermind',
      imgUrl: NethermindCircle,
      language: 'C#, .NET',
    },
  ]),
  2: _shuffle([
    {
      clientId: ClientId.TEKU,
      name: 'Teku',
      imgUrl: TekuCircle,
      language: 'Java',
    },
    {
      clientId: ClientId.LIGHTHOUSE,
      name: 'Lighthouse',
      imgUrl: LighthouseCircle,
      language: 'Rust',
    },
    {
      clientId: ClientId.PRYSM,
      name: 'Prysm',
      imgUrl: PrysmaticCircle,
      language: 'Go',
    },
    {
      clientId: ClientId.NIMBUS,
      name: 'Nimbus',
      imgUrl: NimbusCircle,
      language: 'Nim',
    },
  ]),
};

const _SelectClientPage = ({
  workflow,
  dispatchWorkflowUpdate,
  chosenClients,
  dispatchClientUpdate,
}: Props): JSX.Element => {
  // set the default the eth version to 1 on initial render
  const [ethVersionStep, setEthVersionStep] = useState<1 | 2>(1);

  const { formatMessage } = useIntl();

  // filter the options based on the eth version the user is on
  const clientOptions = React.useMemo(() => ethClients[ethVersionStep], [
    ethVersionStep,
  ]);

  // memoize the chosen client by step
  const selectedClient: ClientId = React.useMemo(
    () =>
      ethVersionStep === 1
        ? chosenClients.eth1Client
        : chosenClients.eth2Client,
    [ethVersionStep, chosenClients]
  );

  const setClientFxn = (clientId: ClientId) => {
    dispatchClientUpdate(clientId, ethVersionStep);
  };

  React.useEffect(() => {
    const header = document.getElementsByTagName('header')[0];

    if (header) {
      header.scrollIntoView({ behavior: 'smooth' });
    }
  }, [ethVersionStep]);

  const handleSubmit = () => {
    if (workflow === WorkflowStep.SELECT_CLIENT) {
      dispatchWorkflowUpdate(WorkflowStep.GENERATE_KEY_PAIRS);
    }
  };

  if (workflow < WorkflowStep.SELECT_CLIENT) {
    return routeToCorrectWorkflowStep(workflow);
  }

  const title = formatMessage(
    {
      defaultMessage: `Choose {ethereum} client`,
      description: '{ethereum} injects Eth1 or Eth2 depending on step',
    },
    {
      ethereum: `Eth${ethVersionStep}`,
    }
  );

  return (
    <WorkflowPageTemplate title={title}>
      <SelectClientSection
        title={formatMessage(
          {
            defaultMessage: `Choose your Eth{ethVersionStep} client and set up a node`,
            description: `{ethVersionStep} is either 1 or 2, depending on which step user is on`,
          },
          { ethVersionStep }
        )}
        clients={clientOptions}
        currentClient={selectedClient}
        setCurrentClient={setClientFxn}
        clientDetails={clientDetails}
        ethVersionStep={ethVersionStep}
      />
      <div className="flex center p30">
        <SelectClientButtons
          updateStep={setEthVersionStep}
          ethVersionStep={ethVersionStep}
          handleSubmit={handleSubmit}
          currentClient={selectedClient}
        />
      </div>
    </WorkflowPageTemplate>
  );
};

const mapStateToProps = ({ workflow, client }: StoreState): StateProps => ({
  workflow,
  chosenClients: client,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatchClientUpdate: (clientId: ClientId, ethVersion: 1 | 2) => {
    dispatch(updateClient(clientId, ethVersion));
  },
  dispatchWorkflowUpdate: (step: WorkflowStep) => {
    dispatch(updateWorkflow(step));
  },
});

export const SelectClientPage = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  StoreState
>(
  mapStateToProps,
  mapDispatchToProps
)(_SelectClientPage);
