import React from 'react';
import styled from 'styled-components';
import { LinkProps } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Button } from '../../components/Button';
import { Link } from '../../components/Link';
import { routesEnum } from '../../Routes';
import { ClientId } from '../../store/actions/clientActions';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  gap: 10px;
  @media (max-width: ${p => p.theme.screenSizes.small}) {
    flex-direction: column;
    padding-inline: 0;
    button,
    a {
      width: 100% !important;
    }
  }
`;

type Props = {
  ethClientStep: 'execution' | 'consensus';
  currentClient: ClientId;
  handleSubmit: LinkProps['onClick'];
  updateStep: (nextStep: 'execution' | 'consensus') => void;
};

const SelectClientButtons = ({
  ethClientStep,
  currentClient,
  handleSubmit,
  updateStep,
}: Props) => {
  const { formatMessage } = useIntl();

  if (ethClientStep === 'execution') {
    return (
      <Container>
        <Link to={routesEnum.acknowledgementPage}>
          <Button
            width={100}
            label={formatMessage({ defaultMessage: 'Back' })}
          />
        </Link>
        <Button
          width={300}
          rainbow
          disabled={!currentClient}
          label={formatMessage({ defaultMessage: 'Continue' })}
          onClick={() => updateStep('consensus')}
        />
      </Container>
    );
  }

  return (
    <Container>
      <Button
        width={100}
        label={formatMessage({ defaultMessage: 'Back' })}
        onClick={() => updateStep('execution')}
      />
      <Link to={routesEnum.generateKeysPage} onClick={handleSubmit}>
        <Button
          width={300}
          rainbow
          disabled={!currentClient}
          label={formatMessage({ defaultMessage: 'Continue' })}
        />
      </Link>
    </Container>
  );
};

export default SelectClientButtons;
