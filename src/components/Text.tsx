import styled from "styled-components";
import { Text as T } from "grommet";

export const Text = styled(T)`
  font-family: "Maison Neue", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Helvetica, Arial, sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 300;
  line-height: 36px;
  letter-spacing: normal;
  color: ${p => p.theme.brand};
  margin: 0;
`;
