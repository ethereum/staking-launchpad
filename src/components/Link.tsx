import React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { supportedLanguages } from '../intl';

interface LinkProps {
  primary?: boolean | undefined;
  theme?: any;
  className?: string;
  href?: string;
  inline?: boolean;
  isTextLink?: boolean;
}

const styles = `
  line-height: 33px;
  color:inherit;
  display: inherit;
  text-decoration: none;
  &:hover {
    font-weight: 400;
  };
  &:focus,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  };
 `;

const StyledExternalLink = styled.a<
  Pick<LinkProps, 'primary' | 'theme' | 'inline' | 'isTextLink'>
>`
  ${styles};
  color: ${(props: any) =>
    props.primary ? props.theme.blue.medium : 'inherit'};
  display: ${(props: any) => (props.inline ? 'inline' : 'inherit')};
  &:after {
    display: ${(props: any) => (props.isTextLink ? `inline` : `none`)};
    margin-left: 0.125em;
    margin-right: 0.3em;
    content: '↗';
    transition: all 0.1s ease-in-out;
    font-style: normal;
  }
`;

const StyledHashLink = styled(StyledExternalLink as any)<
  Pick<LinkProps, 'primary' | 'theme' | 'inline' | 'isTextLink'>
>`
  &:after {
    content: none;
  }
`;

const StyledLink = styled(RouterLink)`
  ${styles};
  color: ${(props: any) =>
    props.primary ? props.theme.blue.medium : 'inherit'};
  display: ${(props: any) => (props.inline ? 'inline' : 'inherit')};
`;

interface LinkProps {
  to: string;
  key?: string;
  children: React.ReactNode;
  className?: string;
  primary?: boolean | undefined;
  onClick?: (param?: any) => void;
  isTextLink?: boolean;
  inline?: boolean;
  shouldOpenNewTab?: boolean;
}

const HASH_PATTERN = /^#.*/;
const isHashLink = (to: string) => HASH_PATTERN.test(to);

export const Link = (props: LinkProps) => {
  const {
    children,
    className,
    to,
    primary,
    inline,
    isTextLink = true,
    shouldOpenNewTab = false,
  } = props;
  const { locale } = useIntl();
  const isExternal = to && to.includes('http');
  // Check for ethereum.org root domain links
  const ETHEREUM_DOT_ORG = `https://ethereum.org`;
  const isEthereumDotOrg = to && to.includes(ETHEREUM_DOT_ORG);
  const isHash = isHashLink(to);

  if (isHash) {
    return (
      <StyledHashLink
        className={className}
        href={to}
        primary={primary}
        inline={inline}
        isTextLink={isTextLink}
      >
        {children}
      </StyledHashLink>
    );
  }

  if (isExternal) {
    let href = to;

    if (to === ETHEREUM_DOT_ORG) {
      // Path is to https://ethereum.org homepage; will append locale
      href = `${ETHEREUM_DOT_ORG}/${locale}`;
    } else if (isEthereumDotOrg) {
      // Grab everything after "https://ethereum.org/"
      const slug: string = to.substr(ETHEREUM_DOT_ORG.length + 1);
      // Split path on "/" and check if index 0 matches current locale
      const pathSplit: string[] = slug.split('/');
      if (pathSplit[0] === locale) {
        // Path of link already has matching language path
        href = to;
      } else if (supportedLanguages.includes(pathSplit[0])) {
        // Path of link has a supported language, but does not match locale; swap it
        href = `${ETHEREUM_DOT_ORG}/${locale}/${pathSplit.slice(1).join('/')}`;
      } else {
        // Path of link does not specify a language; will insert locale
        href = `${ETHEREUM_DOT_ORG}/${locale}/${slug}`;
      }
    }

    return (
      <StyledExternalLink
        className={className}
        href={href}
        primary={primary}
        target="_blank"
        inline={inline}
        isTextLink={isTextLink}
      >
        {children}
      </StyledExternalLink>
    );
  }

  // Add language path if not already present
  const firstPath = to.split('/')[1];
  const langPath = supportedLanguages.includes(firstPath)
    ? to
    : `/${locale}${to}`;

  return (
    <StyledLink
      target={shouldOpenNewTab ? '_blank' : '_self'}
      className={className}
      {...props}
      to={langPath}
    >
      {children}
    </StyledLink>
  );
};
