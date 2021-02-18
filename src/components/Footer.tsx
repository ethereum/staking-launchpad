import React from 'react';
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
    routesEnum.topUpPage,
  ];

  return (
    <RainbowBackground>
      <FooterStyles>
        <div className="col">
          <Heading level={4}>Ethereum 2 Launchpad</Heading>
          <Link to={routesEnum.acknowledgementPage}>Deposit</Link>
          <Link to={routesEnum.checklistPage}>Checklist</Link>
          <Link to={routesEnum.FaqPage}>FAQ</Link>
          <Link to={routesEnum.termsOfServicePage}>Terms of Service</Link>
        </div>

        {!despotWorkflowRoutes.includes(pathname as routesEnum) && (
          <Link to={routesEnum.acknowledgementPage} className="cta-button">
            <Button
              rainbow
              className="m-auto"
              fullWidth
              width={400}
              label={
                <span>
                  GET
                  <Rhino>
                    <span role="img" aria-label="rhino">
                      🦏
                    </span>
                  </Rhino>{' '}
                  STARTED
                </span>
              }
            />
          </Link>
        )}

        <div className="col extra-links">
          <Heading level={4}>Learn More About Eth 2</Heading>
          <Link external to="https://ethereum.org/en/eth2/">
            The Eth2 Upgrades Intro
          </Link>
          <Link
            external
            to="https://docs.google.com/spreadsheets/d/15tmPOvOgi3wKxJw7KQJKoUe-uonbYR6HF7u83LR5Mj4/edit#gid=842896204"
          >
            Economics
          </Link>
          {/* TODO: add this link when page goes live */}
          {/* <Link external to="http://activate.codefi.network/eth2"> */}
          {/*  Calculator */}
          {/* </Link> */}
          <Link
            external
            to="https://github.com/runtimeverification/deposit-contract-verification/blob/96434de/deposit-contract-verification.pdf"
          >
            Formal Verification Report
          </Link>
        </div>
      </FooterStyles>
    </RainbowBackground>
  );
};
