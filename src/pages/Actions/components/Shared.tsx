import styled from 'styled-components';

export const CopyContainer = styled.button`
  font-family: monospace;
  width: fit-content;
  font-size: 1rem;
  padding: 2px 8px;
  cursor: pointer;
  white-space: nowrap;
  background: rgb(255 255 255 / 50%);
  border: 1px solid ${p => p.theme.blue.dark};
  border-radius: 4px;
  margin-inline-start: 1rem;
  &:hover {
    box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.15);
    background-image: linear-gradient(to right, ${p => p.theme.rainbow});
  }
  &:focus {
    outline-offset: -2px;
  }
`;

export const Section = styled.section`
  background-color: white;
  padding: 1rem;
  border-radius: 4px;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;
