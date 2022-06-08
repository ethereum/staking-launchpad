import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Link } from './Link';
import { Alert } from './Alert';

const StyledAlert = styled(Alert)`
  text-align: center;
`;

export const MergeNotification = (): JSX.Element => {
  return (
    <StyledAlert variant="warning" round="none" pad="small">
      <FormattedMessage
        defaultMessage="Attention stakers: The Merge is approaching! Review the {mergeReadinessChecklist} to make sure you're ready."
        values={{
          mergeReadinessChecklist: (
            <Link primary inline to="/merge-readiness">
              <FormattedMessage defaultMessage="Merge readiness checklist" />
            </Link>
          ),
        }}
      />
    </StyledAlert>
  );
};
