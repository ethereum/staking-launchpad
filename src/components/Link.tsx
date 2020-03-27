import React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

interface LinkProps {
  primary?: boolean | undefined;
  theme?: any;
  className?: string;
  href?: string;
}

const styles = `
  color:inherit;
  display: inherit;
  text-decoration: none;
  &:hover {
    font-weight: bold;
  };
  &:focus,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  };
 `;

const StyledExternalLink = styled.a<Pick<LinkProps, 'primary' | 'theme'>>`
  ${styles};
  color: ${(props: any) => (props.primary ? props.theme.blue.dark : 'inherit')};
`;
const StyledLink = styled(RouterLink)`
  ${styles};
  color: ${(props: any) => (props.primary ? props.theme.blue.dark : 'inherit')};
`;

interface LinkProps {
  to: string;
  key?: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
  primary?: boolean | undefined;
  onClick?: (param?: any) => void;
}

export const Link = (props: LinkProps) => {
  const { external, children, className, to, primary } = props;
  if (external) {
    return (
      <StyledExternalLink
        className={className}
        href={to}
        primary={primary}
        target="_blank"
      >
        {children}
      </StyledExternalLink>
    );
  }
  return (
    <StyledLink className={className} {...props}>
      {children}
    </StyledLink>
  );
};
