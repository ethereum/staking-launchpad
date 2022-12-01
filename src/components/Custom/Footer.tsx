import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Heading } from '../Heading';
import { routesEnum } from '../../Routes';
import { Link } from '../Link';
import SocialInstagram from '../../static/social-instagram.svg';
import SocialTwitter from '../../static/social-twitter.svg';
import SocialLinkedIn from '../../static/social-linkedin.svg';
import SocialTelegram from '../../static/social-telegram.svg';
import SocialDiscord from '../../static/social-discord.svg';
import SocialReddit from '../../static/social-reddit.svg';
import SocialMedium from '../../static/social-medium.svg';
import SocialGithub from '../../static/social-github.svg';
import LuksoLogo from '../../static/lukso-logo.svg';
import LuksoWhitepaper from '../../static/lukso-whitepaper.png';

const FooterWrapper = styled.div``;

const FooterStyles = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 1fr 2fr auto;
  padding: 4rem;
  background-color: var(--neutral-100);
  @media screen and (max-width: 518px) {
    .extra-links {
      margin-top: 1rem;
    }
  }
`;

const SocialLinks = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: min-content;
  gap: 16px;
  @media screen and (max-width: 1200px) {
    grid-column-start: 1;
    grid-column-end: 3;
    margin-top: 24px;
    grid-template-columns: repeat(9, 1fr);
    grid-auto-columns: revert;
    margin-top: 40px;
  }
  @media screen and (max-width: 650px) {
    grid-column-start: 1;
    grid-column-end: 1;
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Logo = styled.img`
  grid-column-start: 1;
  grid-column-end: 6;
  margin-bottom: 48px;
`;

const Whitepaper = styled(Link)`
  margin-right: 70px;
  margin-bottom: 24px;
`;

const WrapCol = styled.div`
  @media screen and (max-width: 1000px) {
    grid-column-start: 2;
    grid-column-end: 6;
  }

  @media screen and (max-width: 650px) {
    grid-column-start: 1;
    grid-column-end: 6;
    margin: 40px 0;
  }
`;

const FooterBottom = styled.div`
  padding: 27px 80px;
  display: flex;
  justify-content: space-between;
  background-color: var(--neutral-95);
  @media screen and (max-width: 1000px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const Copyrights = styled.div``;

const BottomLinks = styled.div`
  display: flex;
  gap: 32px;
  @media screen and (max-width: 650px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const CustomFooter = () => {
  return (
    <FooterWrapper>
      <FooterStyles>
        <Logo src={LuksoLogo} alt="Lukso Logo" />
        <div className="col">
          <Whitepaper to="/">
            <img src={LuksoWhitepaper} alt="LUKSO Whitepaper" />
          </Whitepaper>
        </div>
        <WrapCol className="col extra-links">
          <Heading level={4}>
            <FormattedMessage defaultMessage="LUKSO" />
          </Heading>
          <Link to="/">
            <FormattedMessage defaultMessage="Jobs" />
          </Link>
          <Link to="/">
            <FormattedMessage defaultMessage="FAQs/Help" />
          </Link>
          <Link to="/">
            <FormattedMessage defaultMessage="Press Kit" />
          </Link>
          <Link to="/">
            <FormattedMessage defaultMessage="Contact Us" />
          </Link>
        </WrapCol>
        <div className="col extra-links">
          <Heading level={4}>
            <FormattedMessage defaultMessage="Staking Launchpad" />
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
        <WrapCol className="col extra-links">
          <Heading level={4}>
            <FormattedMessage defaultMessage="More on staking" />
          </Heading>
          <Link to="https://ethereum.org/en/upgrades/">
            <FormattedMessage defaultMessage="The Ethereum upgrades" />
          </Link>
          <Link to={routesEnum.phishingPage}>
            <FormattedMessage defaultMessage="Avoid phishing" />
          </Link>
          <Link to="https://docs.google.com/spreadsheets/d/15tmPOvOgi3wKxJw7KQJKoUe-uonbYR6HF7u83LR5Mj4/edit#gid=842896204">
            <FormattedMessage defaultMessage="Staking economics" />
          </Link>
          <Link to="https://github.com/runtimeverification/deposit-contract-verification/blob/96434de/deposit-contract-verification.pdf">
            <FormattedMessage defaultMessage="Formal verification report" />
          </Link>
        </WrapCol>
        <SocialLinks className="col extra-links">
          <Link to="/">
            <img src={SocialInstagram} alt="Instagram" />
          </Link>
          <Link to="/">
            <img src={SocialTwitter} alt="Twitter" />
          </Link>
          <Link to="/">
            <img src={SocialLinkedIn} alt="LinkedIn" />
          </Link>
          <Link to="/">
            <img src={SocialTelegram} alt="Telegram" />
          </Link>
          <Link to="/">
            <img src={SocialInstagram} alt="Instagram" />
          </Link>
          <Link to="/">
            <img src={SocialDiscord} alt="Discord" />
          </Link>
          <Link to="/">
            <img src={SocialReddit} alt="Reddit" />
          </Link>
          <Link to="/">
            <img src={SocialMedium} alt="Medium" />
          </Link>
          <Link to="/">
            <img src={SocialGithub} alt="Github" />
          </Link>
        </SocialLinks>
      </FooterStyles>
      <FooterBottom>
        <Copyrights>
          LUKSO Blockchain GmbH © {new Date().getFullYear()}
        </Copyrights>
        <BottomLinks>
          <Link to="/">
            <FormattedMessage defaultMessage="Cookies Settings" />
          </Link>
          <Link to="/">
            <FormattedMessage defaultMessage="Privacy Policy" />
          </Link>
          <Link to="/">
            <FormattedMessage defaultMessage="Terms & Conditions" />
          </Link>
        </BottomLinks>
      </FooterBottom>
    </FooterWrapper>
  );
};
