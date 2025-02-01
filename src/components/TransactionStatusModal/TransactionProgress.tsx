import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Checkmark, Close } from 'grommet-icons';
import Spinner from '../Spinner';
import { Text } from '../Text';
import { stepStatus } from './types';

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
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
  inset-inline-start: -7px;
  top: -1px;
`;
const CheckIcon = styled(p => <Checkmark {...p} />)`
  position: absolute;
  inset-inline-start: -7px;
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

export const TransactionProgress: React.FC<TransactionProgressProps> = ({
  signTxStatus,
  confirmOnChainStatus,
}) => {
  return (
    <div>
      <Item>
        <ProgressCircle step={1} status={signTxStatus} />
        <Text>
          <FormattedMessage defaultMessage="Sign transaction with your wallet" />
        </Text>
      </Item>
      <Item>
        <ProgressCircle step={2} status={confirmOnChainStatus} />
        <Text>
          <FormattedMessage defaultMessage="Confirm on-chain" />
        </Text>
      </Item>
    </div>
  );
};
