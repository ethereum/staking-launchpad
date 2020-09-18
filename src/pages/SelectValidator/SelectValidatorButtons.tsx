import React from 'react';
import { LinkProps } from 'react-router-dom';

import { Button } from '../../components/Button';
import { Link } from '../../components/Link';
import { routesEnum } from '../../Routes';

type Props = {
  ethVersionStep: 1 | 2;
  currentValidator: string;
  handleSubmit: LinkProps['onClick'];
  updateStep: (nextStep: 1 | 2) => void;
};

const SelectValidatorButtons = ({
  ethVersionStep,
  currentValidator,
  handleSubmit,
  updateStep,
}: Props) => {
  if (ethVersionStep === 1) {
    return (
      <>
        <Link to={routesEnum.acknowledgementPage}>
          <Button className="mr10" width={100} label="Back" />
        </Link>
        <Button
          width={300}
          rainbow
          disabled={!currentValidator}
          label="Continue"
          onClick={() => updateStep(2)}
        />
      </>
    );
  }

  return (
    <>
      <Button
        className="mr10"
        width={100}
        label="Back"
        onClick={() => updateStep(1)}
      />
      <Link to={routesEnum.generateKeysPage} onClick={handleSubmit}>
        <Button
          width={300}
          rainbow
          disabled={!currentValidator}
          label="Continue"
        />
      </Link>
    </>
  );
};

export default SelectValidatorButtons;
