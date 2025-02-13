import React from 'react';
import { FormattedMessage } from 'react-intl';

import BigNumber from 'bignumber.js';
import { getFeeStatus, getEtherFeeFromQueue, Queue } from '../utils';
import { Alert } from '../../../components/Alert';

type QueueWarningProps = {
  queue: Queue | null;
};

const QueueWarning = ({ queue }: QueueWarningProps) => {
  if (!queue) return null;

  const feeStatus = getFeeStatus(queue.fee);

  if (feeStatus === 'high')
    return (
      <Alert variant="warning" style={{ fontSize: '1rem', padding: '1rem' }}>
        <FormattedMessage
          defaultMessage="Caution, higher than normal volume, min fee is high, consider waiting a few minutes. Current withdrawal processing fee is {fee}."
          values={{ fee: getEtherFeeFromQueue(queue) }}
        />
      </Alert>
    );

  if (feeStatus === 'volatile')
    return (
      <Alert variant="error" style={{ fontSize: '1rem', padding: '1rem' }}>
        <strong style={{ textTransform: 'uppercase' }}>
          <FormattedMessage defaultMessage="Warning! Network traffic significantly elevated." />
        </strong>{' '}
        <FormattedMessage
          defaultMessage="Fee volatility is high during network congestion. Insufficient payments will result in your request failing without refund. Current withdrawal processing fee is {fee}."
          values={{
            fee: (
              <strong>
                {getEtherFeeFromQueue({
                  fee: new BigNumber(1e18),
                  length: new BigNumber(700),
                })}
              </strong>
            ),
          }}
        />
      </Alert>
    );

  return null;
};

export default QueueWarning;
