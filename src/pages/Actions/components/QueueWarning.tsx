import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Alert } from '../../../components/Alert';
import { Text } from '../../../components/Text';

import { getFeeStatus, getEtherFeeFromQueue, Queue } from '../utils';

type QueueWarningProps = {
  queue: Queue | null;
};

const QueueWarning = ({ queue }: QueueWarningProps) => {
  console.log('Rendering QueueWarning component', queue);
  if (!queue) return null;

  const feeStatus = getFeeStatus(queue.fee);
  console.log('Fee status:', feeStatus);

  if (feeStatus === 'high')
    return (
      <Alert variant="warning" style={{ fontSize: '1rem', padding: '1rem' }}>
        <Text style={{ fontSize: '1rem', lineHeight: '1.75rem' }}>
          <strong>
            <FormattedMessage defaultMessage="Caution - current request queue higher than normal volume" />
          </strong>
        </Text>
        <Text style={{ fontSize: '1rem' }}>
          <FormattedMessage
            defaultMessage="Minimum fee for processing is currently elevated, consider waiting a few minutes. Current withdrawal processing fee is {fee}."
            values={{ fee: getEtherFeeFromQueue(queue) }}
          />
        </Text>
      </Alert>
    );

  if (feeStatus === 'volatile')
    return (
      <Alert variant="error" style={{ padding: '1rem' }}>
        <div>
          <Text
            style={{
              fontSize: '1rem',
              textTransform: 'uppercase',
              lineHeight: '1.75rem',
            }}
          >
            <strong>
              <FormattedMessage defaultMessage="Warning! Network traffic significantly elevated." />
            </strong>
          </Text>
          <Text style={{ fontSize: '1rem' }}>
            <FormattedMessage defaultMessage="Fee volatility is high during network congestion. Insufficient payments will result in your request failing without refund." />
          </Text>
          <Text style={{ fontSize: '1rem' }}>
            <FormattedMessage
              defaultMessage="Current processing fee: {fee}."
              values={{
                fee: <strong>{getEtherFeeFromQueue(queue)}</strong>,
              }}
            />
          </Text>
        </div>
      </Alert>
    );

  return null;
};

export default QueueWarning;
