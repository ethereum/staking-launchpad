import styled from 'styled-components';
import { Heading as H } from 'grommet';

export const Heading = styled(H)`
  font-family: 'Maison Neue', system-ui, -apple-system, BlinkMacSystemFont,
    'Segoe UI', Helvetica, Arial, sans-serif;
  color: ${p => p.theme.blue.dark};
  margin: 0;
  display: block;
  text-align: ${(p: { center?: boolean }) => p.center && 'center'};
  max-width: inherit;
`;
