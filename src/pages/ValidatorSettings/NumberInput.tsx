import React from "react";
import styled from "styled-components";
import { CaretDown, CaretUp } from "grommet-icons";

const StyledButton = styled.button`
  height: 25px;
  width: 50px;
  cursor: pointer;
  border: 1px solid #ddd;
  :focus {
    outline: none;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledInput = styled.input`
  width: 100%;
  font-size: 18px;
  line-height: 24px;
  color: #444444;
  padding-left: 10px;
  box-sizing: border-box;
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  appearance: textfield;
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
  border: 1px solid #ddd;
  border-right: none;
  display: inline-flex;
  :focus {
    outline: none;
  }
`;

export const NumberInput = ({
  value,
  setValue
}: {
  value: number;
  setValue: (e: any) => void;
}): JSX.Element => {
  const handleManualInput = (e: any) => {
    const val = e.target.value.replace(/\./g, ""); // remove "." to force integer input
    if (e.target.validity.valid) setValue(val);
    else if (val === "") setValue(val); // allow empty
  };

  const decrement = () => {
    if (value > 0) setValue(+value - 1);
  };

  const increment = () => setValue(+value + 1);

  return (
    <div className="flex">
      <StyledInput
        onChange={handleManualInput}
        value={value}
        type="tel"
        pattern="^-?[0-9]\d*\.?\d*$"
      />
      <ButtonContainer>
        <StyledButton onClick={increment} style={{ borderBottom: "none" }}>
          <CaretUp size="small" />
        </StyledButton>
        <StyledButton className="plus" onClick={decrement}>
          <CaretDown size="small" />
        </StyledButton>
      </ButtonContainer>
    </div>
  );
};
