import React from 'react';
import styled from 'styled-components';
import { FormDown, FormUp } from 'grommet-icons';

const StyledButton = styled.button`
  height: 25px;
  width: 50px;
  cursor: pointer;
  border: 1px solid #ddd;
  :focus {
    outline: none;
  }
  :hover {
    background-color: ${(p: any) => p.theme.gray.lightest};
  }
`;

const StyledInputContainer = styled.div`
  flex: 1;
  position: relative;
`;

const MaxButton = styled.button`
  position: absolute;
  inset: 4px 4px 4px auto;
  cursor: pointer;
  padding: 0.375rem 0.75rem;
  border: 1px solid #ddd;
  color: #666;
  border-radius: 4px;
  text-transform: uppercase;
  :focus {
    outline: none;
  }
  :hover {
    background-color: ${(p: any) => p.theme.gray.lighter};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  button:nth-child(1) {
    border-radius: ${(p: any) => `0 ${p.theme.borderRadius} 0 0`};
  }
  button:nth-child(2) {
    border-radius: ${(p: any) => `0 0 ${p.theme.borderRadius} 0`};
  }
`;

const StyledInput = styled.input`
  height: 50px;
  width: 100%;
  font-size: 18px;
  line-height: 24px;
  color: #444444;
  padding-inline-start: 10px;
  box-sizing: border-box;
  background-color: ${(p: any) => p.theme.gray.lightest};
  border-radius: ${(p: any) =>
    `${p.theme.borderRadius} 0 0 ${p.theme.borderRadius}`};
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  appearance: textfield;
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
  border: 1px solid #ddd;
  border-inline-end: none;
  display: inline-flex;
  :focus {
    outline: none;
  }
`;

interface Props {
  value: number;
  setValue: (e: number) => void;
  allowDecimals?: boolean;
  maxValue?: number;
  minValue?: number;
  id?: string;
}

export const NumberInput = ({
  value,
  setValue,
  allowDecimals,
  maxValue,
  minValue = 0,
  id,
}: Props): JSX.Element => {
  const handleManualInput = (e: any) => {
    const val = e.target.value;
    if (allowDecimals) {
      setValue(val);
    } else {
      // remove "." to force integer input;
      setValue(val.replace(/\./g, ''));
    }
  };

  const decrement = () => {
    if (value > 0) {
      setValue(Math.max(minValue, +value - 1));
    }
  };

  const increment = () => {
    const newValue = value + 1;
    setValue(maxValue !== undefined ? Math.min(newValue, maxValue) : newValue);
  };

  const setToMax = () => {
    if (maxValue === undefined) return;
    setValue(maxValue);
  };

  return (
    <div className="flex">
      <StyledInputContainer>
        <StyledInput
          id={id}
          onChange={handleManualInput}
          value={value}
          type="number"
        />
        {maxValue !== undefined && (
          <MaxButton onClick={setToMax}>max</MaxButton>
        )}
      </StyledInputContainer>
      <ButtonContainer>
        <StyledButton onClick={increment} style={{ borderBottom: 'none' }}>
          <FormUp size="medium" />
        </StyledButton>
        <StyledButton className="plus" onClick={decrement}>
          <FormDown size="medium" />
        </StyledButton>
      </ButtonContainer>
    </div>
  );
};
