import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Alert } from '../../../components/Alert';
import { Text } from '../../../components/Text';

import { getFeeStatus, getEtherFeeFromQueue, Queue } from '../utils';

type QueueWarningProps = {
  queue: Queue | null;
};

const QueueWarning = ({ queue }: QueueWarningProps) => {
  if (!queue) return null;

  const feeStatus = getFeeStatus(queue.fee);

  if (feeStatus === 'high')
    return (
      <Alert variant="warning" style={{ fontSize: '1rem', padding: '1rem' }}>
        <Text
          style={{ fontSize: '1rem', lineHeight: '1.75rem' }}
          className="text-bold"
        >
          <FormattedMessage defaultMessage="Caution - current request queue higher than normal volume" />
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
            className="text-bold"
          >
            <FormattedMessage defaultMessage="Warning! Network traffic significantly elevated." />
          </Text>
          <Text style={{ fontSize: '1rem' }}>
            <FormattedMessage defaultMessage="Fee volatility is high during network congestion. Insufficient payments will result in your request failing without refund." />
          </Text>
          <Text style={{ fontSize: '1rem' }}>
            <FormattedMessage
              defaultMessage="Current processing fee: {fee}."
              values={{
                fee: (
                  <strong className="text-bold">
                    {getEtherFeeFromQueue(queue)}
                  </strong>
                ),
              }}
            />
          </Text>
        </div>
      </Alert>
    );

  return null;
};

export default QueueWarning;
