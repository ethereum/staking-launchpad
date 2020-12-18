import React from 'react';
import styled from 'styled-components';
import { Checkmark, Close } from 'grommet-icons';
import Spinner from '../../../components/Spinner';
import { Text } from '../../../components/Text';
import { stepStatus } from '../types';

const Container = styled.div`
  justify-content: space-around;
  flex-direction: column;
`;

const CircleDiv = styled.div`
  height: 45px;
  width: 45px;
  border: 6px solid
    ${p => {
      // @ts-ignore
      if (p.status === 'error') return p.theme.red.light;
      // @ts-ignore
      if (p.status === 'complete') return p.theme.green.light;
      return p.theme.gray.light;
    }};
  border-radius: 50%;
  position: relative;
  .step {
    position: absolute;
    top: 6px;
    left: 12px;
  }
`;

const LoadingCircleDiv = styled.div`
  position: relative;
  .step {
    position: absolute;
    top: 12px;
    left: 18px;
  }
`;

const Circle = ({
  step,
  loading,
  status,
}: {
  step: any;
  loading?: boolean;
  status?: string;
}) => {
  if (loading) {
    return (
      <LoadingCircleDiv>
        <Spinner align="start" />
        <span className="step">{step}</span>
      </LoadingCircleDiv>
    );
  }

  return (
    // @ts-ignore
    <CircleDiv status={status}>
      <span className="step">{step}</span>
    </CircleDiv>
  );
};

const CloseIcon = styled(p => <Close {...p} />)`
  position: absolute;
  left: -7px;
  top: -1px;
`;
const CheckIcon = styled(p => <Checkmark {...p} />)`
  position: absolute;
  left: -7px;
  top: -1px;
`;

const ProgressCircle = ({
  status,
  step,
}: {
  status: stepStatus;
  step: number;
}) => {
  if (status === 'loading') {
    return <Circle loading step={step} />;
  }
  if (status === 'staged') {
    return <Circle step={step} />;
  }
  if (status === 'complete') {
    return <Circle status="complete" step={<CheckIcon color="greenDark" />} />;
  }
  if (status === 'error') {
    return <Circle status="error" step={<CloseIcon color="redLight" />} />;
  }
  return <Circle step={step} />;
};

interface TransactionProgressProps {
  signTxStatus: stepStatus;
  confirmOnChainStatus: stepStatus;
}

const TransactionProgress: React.FC<TransactionProgressProps> = ({
  signTxStatus,
  confirmOnChainStatus,
}) => {
  return (
    <Container>
      <div className="flex">
        <ProgressCircle step={1} status={signTxStatus} />
        <Text className="mt10 ml15">Sign transaction with your wallet</Text>
      </div>
      <div className="mt30 flex">
        <ProgressCircle step={2} status={confirmOnChainStatus} />
        <Text className="mt10 ml15">Confirm on-chain</Text>
      </div>
    </Container>
  );
};

export default TransactionProgress;
