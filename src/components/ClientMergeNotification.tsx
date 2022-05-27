import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from './Link';
import { Alert } from './Alert';
import { Text } from './Text';

export const ClientMergeNotification = (props: {
  client: string;
  isConsensus?: boolean;
}): JSX.Element => {
  const { client, isConsensus = false } = props;
  return (
    <Alert variant="warning" className="my40">
      <Text>
        <FormattedMessage
          defaultMessage="{client} is a {layerType}."
          values={{
            client,
            layerType: (
              <em>
                {isConsensus ? (
                  <FormattedMessage defaultMessage="consensus client" />
                ) : (
                  <FormattedMessage defaultMessage="execution client" />
                )}
              </em>
            ),
          }}
        />
      </Text>
      <Text className="my10">
        {isConsensus ? (
          <FormattedMessage
            defaultMessage="Merge Readiness: In addition to a consensus client, after the Merge node operators must also run an {alternateClient} to remain active."
            values={{
              alternateClient: (
                <Link primary inline to="/checklist/#el-client">
                  <FormattedMessage defaultMessage="execution client" />
                </Link>
              ),
            }}
          />
        ) : (
          <FormattedMessage
            defaultMessage="Merge Readiness: In addition to an execution client, after the Merge node operators must also run an {alternateClient} to remain active."
            values={{
              alternateClient: (
                <Link primary inline to="/checklist/#cl-client">
                  <FormattedMessage defaultMessage="consensus client" />
                </Link>
              ),
            }}
          />
        )}
      </Text>
      <Link primary inline to="/merge-readiness">
        <FormattedMessage defaultMessage="Merge readiness checklist" />
      </Link>
    </Alert>
  );
};
