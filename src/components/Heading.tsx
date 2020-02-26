import styled from "styled-components";
import { Heading as H } from "grommet";

export const Heading = styled(H)`
  font-family: "Maison Neue", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Helvetica, Arial, sans-serif;
  color: ${p => p.theme.brand};
  margin: 0;
  display: block;
`;
