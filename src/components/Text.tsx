import styled from 'styled-components';
import { Text as T } from 'grommet';

export const Text = styled(T)`
  font-family: 'Maison Neue', system-ui, -apple-system, BlinkMacSystemFont,
    'Segoe UI', Helvetica, Arial, sans-serif;
  font-size: ${(p: any) => (p.size ? '' : '24px')}; // default to grommet
  line-height: ${(p: any) => (p.size ? '' : '36px')}; // default to grommet
  font-style: normal;
  font-weight: ${(p: any) =>
    p.weight ? undefined : 300}; // default to grommet
  letter-spacing: normal;
  color: ${(p: any) => (p.color ? p.color : p.theme.blue.dark)};
  margin: 0;
  display: block;
  text-align: ${(p: { center?: boolean }) => p.center && 'center'};
`;
