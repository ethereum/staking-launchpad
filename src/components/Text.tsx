import styled from "styled-components";
import { Text as T } from "grommet";

export const Text = styled(T)`
  font-family: "Maison Neue", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Helvetica, Arial, sans-serif;
  font-size: ${(p: any) => (p.size ? "" : "24px")}; // default to grommet sizes
  line-height: ${(p: any) => (p.size ? "" : "36px")};
  font-style: normal;
  font-weight: 300;
  letter-spacing: normal;
  color: ${p => p.theme.blue.dark};
  margin: 0;
  display: block;
`;
