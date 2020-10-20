import React from 'react';
import styled from 'styled-components';
import { Heading } from './Heading';
import { routesEnum } from '../Routes';
import { Link } from './Link';
import { Text } from './Text';

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

  .legal-text {
    max-width: 580px;
    font-size: 12px;
    color: ${({ theme }) => theme.gray};
    padding: 0 1rem;
  }

  @media screen and (max-width: 960px) {
    .legal-text-container {
      order: 3;
      margin-top: 1rem;
      margin-bottom: 1rem;

      .legal-text {
        margin-top: 1rem;
        max-width: 100%;
        padding: 0;
      }
    }
  }

  @media screen and (max-width: 518px) {
    .extra-links {
      margin-top: 1rem;
    }
  }
`;

export const Footer = () => {
  return (
    <RainbowBackground>
      <FooterStyles>
        <div className="col">
          <Heading level={4}>Ethereum 2 Launchpad</Heading>
          <Link to={routesEnum.acknowledgementPage}>Deposit</Link>
          <Link to={routesEnum.selectClient}>Validator Clients</Link>
          <Link to={routesEnum.checklistPage}>Checklist</Link>
          <Link to={routesEnum.FaqPage}>FAQ</Link>
        </div>
        <div className="col legal-text-container">
          <Text className="legal-text">
            A Contribution 'originates' from a designated place, then offering
            equivalent access to copy the source form of the Covered Code with
            other works, to embed the Package constitutes direct or indirect, to
            cause the Package (7) You may use, reproduce, modify, display,
            perform, internally distribute within Your organization, and
            Externally Deploy Your Modifications and Covered Code, or any part
            of the Licensed Product under the provisions set forth in this
            manner by the Ethereum Foundation Licensing Policy.
          </Text>
        </div>
        <div className="col extra-links">
          <Heading level={4}>Learn More About Eth 2</Heading>
          <Link external to="https://ethereum.org/en/eth2/#roadmap">
            Launch Phases
          </Link>
          <Link
            external
            to="https://docs.google.com/spreadsheets/d/15tmPOvOgi3wKxJw7KQJKoUe-uonbYR6HF7u83LR5Mj4/edit#gid=842896204"
          >
            Economics
          </Link>
          <Link external to="http://activate.codefi.network/eth2">
            Calculator
          </Link>
          <Link
            external
            to="https://github.com/runtimeverification/deposit-contract-verification/blob/96434de/deposit-contract-verification.pdf"
          >
            Deposit Verification
          </Link>
        </div>
      </FooterStyles>
    </RainbowBackground>
  );
};
