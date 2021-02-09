import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Heading } from './Heading';
import { routesEnum } from '../Routes';
import { Link } from './Link';

import { Button } from './Button';

const Rhino = styled.span`
  font-size: 20px;
`;

const RainbowBackground = styled.div`
  min-width: 100%;
  overflow: hidden;
  background-image: ${p =>
    `radial-gradient(circle at 100% -80%, ${p.theme.rainbowLight})`};
`;

const FooterStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 4rem;

  @media screen and (max-width: 960px) {
    .cta-button {
      display: none;
    }
  }

  @media screen and (max-width: 518px) {
    .extra-links {
      margin-top: 1rem;
    }
  }
`;

export const Footer = () => {
  const { pathname } = useLocation();
  const despotWorkflowRoutes = [
    routesEnum.acknowledgementPage,
    routesEnum.selectClient,
    routesEnum.generateKeysPage,
    routesEnum.uploadValidatorPage,
    routesEnum.connectWalletPage,
    routesEnum.summaryPage,
    routesEnum.transactionsPage,
    routesEnum.congratulationsPage,
  ];

  return (
    <RainbowBackground>
      <FooterStyles>
        <div className="col">
          <Heading level={4}>
            <FormattedMessage defaultMessage="Eth2 Launchpad" />
          </Heading>
          <Link to={routesEnum.acknowledgementPage}>
            <FormattedMessage defaultMessage="Deposit" />
          </Link>
          <Link to={routesEnum.checklistPage}>
            <FormattedMessage defaultMessage="Checklist" />
          </Link>
          <Link to={routesEnum.FaqPage}>
            <FormattedMessage defaultMessage="FAQ" />
          </Link>
          <Link to={routesEnum.termsOfServicePage}>
            <FormattedMessage defaultMessage="Terms of Service" />
          </Link>
        </div>

        {!despotWorkflowRoutes.includes(pathname as routesEnum) && (
          <Link to={routesEnum.acknowledgementPage} className="cta-button">
            <Button
              rainbow
              className="m-auto"
              fullWidth
              width={400}
              label={
                <FormattedMessage
                  defaultMessage="Become a validator {emoji}"
                  values={{
                    emoji: (
                      <Rhino>
                        <span role="img" aria-label="rhino">
                          🦏
                        </span>
                      </Rhino>
                    ),
                  }}
                />
              }
            />
          </Link>
        )}
        <div className="col extra-links">
          <Heading level={4}>
            <FormattedMessage defaultMessage="More on Eth2" />
          </Heading>
          <Link to="https://ethereum.org/en/eth2/">
            <FormattedMessage defaultMessage="The Eth2 upgrades" />
          </Link>
          <Link to={routesEnum.phishingPage}>
            <FormattedMessage defaultMessage="Avoid Eth2 phishing" />
          </Link>
          <Link to="https://docs.google.com/spreadsheets/d/15tmPOvOgi3wKxJw7KQJKoUe-uonbYR6HF7u83LR5Mj4/edit#gid=842896204">
            <FormattedMessage defaultMessage="Eth2 economics" />
          </Link>
          {/* TODO: add this link when page goes live */}
          {/* <Link to="http://activate.codefi.network/eth2"> */}
          {/*  Calculator */}
          {/* </Link> */}
          <Link to="https://github.com/runtimeverification/deposit-contract-verification/blob/96434de/deposit-contract-verification.pdf">
            <FormattedMessage defaultMessage="Formal verification report" />
          </Link>
        </div>
      </FooterStyles>
    </RainbowBackground>
  );
};
