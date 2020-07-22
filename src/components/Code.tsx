import styled from 'styled-components';
import { Text } from './Text';

export const Code = styled(Text)`
  border: 1px solid #dc8180;
  background-color: ${(p: any) => p.theme.red.lightest};
  display: inline-block;
  border-radius: 4px;
  padding: 0 4px;
  color: #ad2b2a;
  font-size: 14px;
  line-height: 16px;
`;
