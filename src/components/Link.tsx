import React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { FormNext } from 'grommet-icons';

interface LinkProps {
  primary?: boolean | undefined;
  theme?: any;
  className?: string;
  href?: string;
  inline?: boolean;
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
  Pick<LinkProps, 'primary' | 'theme' | 'inline'>
>`
  ${styles};
  color: ${(props: any) =>
    props.primary ? props.theme.blue.medium : 'inherit'};
  display: ${(props: any) => (props.inline ? 'inline' : 'inherit')};
`;
const StyledLink = styled(RouterLink)`
  ${styles};
  color: ${(props: any) =>
    props.primary ? props.theme.blue.medium : 'inherit'};
  display: ${(props: any) => (props.inline ? 'inline' : 'inherit')};
`;
const Arrow = styled(FormNext)`
  transform: translate(0px, 6px);
  stroke: ${(props: any) =>
    props.primary ? props.theme.blue.medium : 'inherit'};
`;

interface LinkProps {
  to: string;
  key?: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
  primary?: boolean | undefined;
  onClick?: (param?: any) => void;
  inline?: boolean;
  withArrow?: boolean;
}

export const Link = (props: LinkProps) => {
  const {
    external,
    children,
    className,
    to,
    primary,
    inline,
    withArrow,
  } = props;
  if (external) {
    return (
      <StyledExternalLink
        className={className}
        href={to}
        primary={primary}
        target="_blank"
        inline={inline}
      >
        {children}
        {withArrow && (
          // @ts-ignore
          <Arrow primary={primary} />
        )}
      </StyledExternalLink>
    );
  }
  return (
    <StyledLink className={className} {...props}>
      {children}
      {withArrow && <Arrow primary={primary} />}
    </StyledLink>
  );
};
