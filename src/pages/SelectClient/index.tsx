import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import _shuffle from 'lodash/shuffle';
import { StoreState } from '../../store/reducers';
import { WorkflowPageTemplate } from '../../components/WorkflowPage/WorkflowPageTemplate';
import { routeToCorrectWorkflowStep } from '../../utils/RouteToCorrectWorkflowStep';
import SelectClientSection from './SelectClientSection';
import SelectClientButtons from './SelectClientButtons';
import { PrysmDetails } from '../Clients/Consensus/Prysm';
import { LighthouseDetails } from '../Clients/Consensus/Lighthouse';
import { TekuDetails } from '../Clients/Consensus/Teku';
import { NimbusDetails } from '../Clients/Consensus/Nimbus';
import { LodestarDetails } from '../Clients/Consensus/Lodestar';
import { GethDetails } from '../Clients/Execution/Geth';
import { BesuDetails } from '../Clients/Execution/Besu';
import { NethermindDetails } from '../Clients/Execution/Nethermind';
import { RethDetails } from '../Clients/Execution/Reth';
import { ErigonDetails } from '../Clients/Execution/Erigon';
import PrysmaticCircle from '../../static/prysmatic-labs-circle.png';
import LighthouseCircle from '../../static/lighthouse-circle.png';
import NimbusCircle from '../../static/nimbus-circle.png';
import LodestarCircle from '../../static/lodestar-circle.png';
import TekuCircle from '../../static/pegasys-teku-circle.png';
import GethCircle from '../../static/gethereum-mascot-circle.png';
import BesuCircle from '../../static/hyperledger-besu-circle.png';
import NethermindCircle from '../../static/nethermind-circle.png';
import RethCircle from '../../static/reth-circle.png';
import ErigonCircle from '../../static/erigon-circle.png';

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
  [ClientId.LODESTAR]: <LodestarDetails shortened />,
  [ClientId.GETH]: <GethDetails />,
  [ClientId.BESU]: <BesuDetails />,
  [ClientId.NETHERMIND]: <NethermindDetails />,
  [ClientId.RETH]: <RethDetails />,
  [ClientId.ERIGON]: <ErigonDetails />,
};

export type Client = {
  clientId: ClientId;
  name: string;
  imgUrl: string;
  language?: any;
};

// define and shuffle the clients
const ethClients: {
  [ethClientType: string]: Array<Client>;
} = {
  execution: _shuffle([
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
    {
      clientId: ClientId.RETH,
      name: 'Reth',
      imgUrl: RethCircle,
      language: 'Rust',
    },
    {
      clientId: ClientId.ERIGON,
      name: 'Erigon',
      imgUrl: ErigonCircle,
      language: 'Go',
    },
  ]),
  consensus: _shuffle([
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
    {
      clientId: ClientId.LODESTAR,
      name: 'Lodestar',
      imgUrl: LodestarCircle,
      language: 'TypeScript',
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
  const [ethClientStep, setEthClientStep] = useState<'execution' | 'consensus'>(
    'execution'
  );

  const { formatMessage } = useIntl();

  // filter the options based on the eth version the user is on
  const clientOptions = React.useMemo(() => ethClients[ethClientStep], [
    ethClientStep,
  ]);

  // memoize the chosen client by step
  const selectedClient: ClientId = React.useMemo(
    () =>
      ethClientStep === 'execution'
        ? chosenClients.executionClient
        : chosenClients.consensusClient,
    [ethClientStep, chosenClients]
  );

  const setClientFxn = (clientId: ClientId) => {
    dispatchClientUpdate(clientId, ethClientStep);
  };

  React.useEffect(() => {
    const header = document.getElementsByTagName('header')[0];

    if (header) {
      header.scrollIntoView({ behavior: 'smooth' });
    }
  }, [ethClientStep]);

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
      defaultMessage: `Choose {ethClientType} client`,
      description:
        '{ethClientType} injects "execution" or "consensus" depending on step',
    },
    {
      ethClientType:
        ethClientStep === 'execution'
          ? formatMessage({ defaultMessage: 'execution' })
          : formatMessage({ defaultMessage: 'consensus' }),
    }
  );

  return (
    <WorkflowPageTemplate title={title}>
      <SelectClientSection
        title={formatMessage(
          {
            defaultMessage:
              'Choose your {ethClientType} client and set up a node',
            description:
              '{ethClientType} is either "execution" or "consensus", depending on which step user is on',
          },
          {
            ethClientType:
              ethClientStep === 'execution'
                ? formatMessage({ defaultMessage: 'execution' })
                : formatMessage({ defaultMessage: 'consensus' }),
          }
        )}
        clients={clientOptions}
        currentClient={selectedClient}
        setCurrentClient={setClientFxn}
        clientDetails={clientDetails}
        ethClientStep={ethClientStep}
      />
      <SelectClientButtons
        updateStep={setEthClientStep}
        ethClientStep={ethClientStep}
        handleSubmit={handleSubmit}
        currentClient={selectedClient}
      />
    </WorkflowPageTemplate>
  );
};

const mapStateToProps = ({ workflow, client }: StoreState): StateProps => ({
  workflow,
  chosenClients: client,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatchClientUpdate: (
    clientId: ClientId,
    ethClientType: 'execution' | 'consensus'
  ) => {
    dispatch(updateClient(clientId, ethClientType));
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
