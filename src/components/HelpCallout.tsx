import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { Link } from './Link';

const RainbowHeader = styled.div`
  background-image: ${p =>
    `linear-gradient(to right, ${p.theme.rainbowLight})`};
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 4px;
  &:before {
    content: '';
    display: block;
    height: 3rem;
    margin-top: -3rem;
    visibility: hidden;
  }
`;

const HelpCallout = () => (
  <RainbowHeader>
    <FormattedMessage
      defaultMessage="If you have questions, EthStaker community is a good place to get help!
        You can find support on {discord} or {reddit}."
      values={{
        discord: (
          <Link primary inline to="https://dsc.gg/ethstaker">
            Discord
          </Link>
        ),
        reddit: (
          <Link primary inline to="https://reddit.com/r/ethstaker">
            Reddit
          </Link>
        ),
      }}
      description="{variables} social media platform links to Discord and Reddit (do not translate names)"
    />
  </RainbowHeader>
);

export default HelpCallout;
