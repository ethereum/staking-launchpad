import React from 'react';
import { FormattedMessage } from 'react-intl';
import { getDefaultMessage } from '../utils/translations';

// Wrapper on <FormattedMessage /> to always fallback to English
// Use this component for any user-facing string
const Translation = (props: { id: string }) => (
  <FormattedMessage
    id={props.id}
    defaultMessage={getDefaultMessage(props.id)}
  />
);

export default Translation;
