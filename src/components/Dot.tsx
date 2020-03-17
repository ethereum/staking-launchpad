import styled from 'styled-components';

export const Dot = styled.div`
  width: ${(p: any) => p.width || 20}px;
  height: ${(p: any) => p.height || 20}px;
  background: ${(p: { theme: any; success: boolean }) =>
    p.success ? p.theme.green.dark : p.theme.red.medium};
  border: 3px solid
    ${(p: { theme: any; success: boolean }) =>
      p.success ? p.theme.green.medium : p.theme.red.light};
  border-radius: 50%;
`;
