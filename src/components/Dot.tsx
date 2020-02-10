import styled from "styled-components";

export const Dot = styled.div`
  width: ${(p: any) => p.width || 20}px;
  height: ${(p: any) => p.height || 20}px;
  background: ${(p: { theme: any; success: boolean }) =>
    p.success ? p.theme.success : p.theme.error};
  border: 3px solid
    ${(p: { theme: any; success: boolean }) =>
      p.success ? p.theme.successLight : p.theme.errorLight};
  border-radius: 50%;
`;
