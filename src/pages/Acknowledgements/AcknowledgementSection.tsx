import React from 'react';
import styled from 'styled-components';
import { AcknowledgementIdsEnum } from '../../store/reducers';
import { Button } from '../../components/Button';
import { Text } from '../../components/Text';
import { Heading } from '../../components/Heading';
import { Link } from '../../components/Link';
import { routesEnum } from '../../Routes';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const AcknowledgementText = styled(Text)`
  background: #ffdeb32e;
  border: 1px solid burlywood;
  padding: 30px;
  border-radius: 4px;
`;

export interface AcknowledgementSectionData {
  title: string;
  content: JSX.Element;
  acknowledgementText?: string;
  acknowledgementId: AcknowledgementIdsEnum;
}

interface AcknowledgementSectionProps {
  handleContinueClick: (id: AcknowledgementIdsEnum) => void;
  handleGoBackClick: (id: AcknowledgementIdsEnum) => void;
  handleSubmit: () => void;
  allAgreedTo: boolean;
}

export const AcknowledgementSection = ({
  title,
  content,
  acknowledgementId,
  acknowledgementText,
  handleContinueClick,
  handleGoBackClick,
  handleSubmit,
  allAgreedTo,
}: AcknowledgementSectionProps & AcknowledgementSectionData): JSX.Element => {
  const isIntroSection =
    acknowledgementId === AcknowledgementIdsEnum.introSection;
  const isConfirmationSection =
    acknowledgementId === AcknowledgementIdsEnum.confirmation;

  const renderButtons = () => {
    if (isConfirmationSection) {
      return (
        <div className="flex center p30">
          <Button
            className="mr10"
            onClick={() =>
              handleGoBackClick(AcknowledgementIdsEnum.confirmation)
            }
            width={100}
            label="Back"
          />
          <Link
            to={routesEnum.selectClient}
            onClick={() => {
              handleContinueClick(AcknowledgementIdsEnum.confirmation);
              handleSubmit();
            }}
          >
            <Button
              rainbow
              width={300}
              disabled={!allAgreedTo}
              label="Continue"
            />
          </Link>
        </div>
      );
    }
    return (
      <div className="flex center p30">
        {!isIntroSection && (
          <Button
            width={100}
            onClick={() => handleGoBackClick(acknowledgementId)}
            label="Back"
            className="mr10"
          />
        )}
        <Button
          onClick={() => handleContinueClick(acknowledgementId)}
          rainbow
          label={isIntroSection ? 'Continue' : 'I Accept'}
          width={300}
        />
      </div>
    );
  };

  return (
    <Container>
      <div>
        <Heading level={2} size="medium" color="blueDark" className="mb50">
          {title}
        </Heading>
        {content}
      </div>
      <div className="mt20">
        {!isIntroSection && (
          <AcknowledgementText textAlign="center">
            {acknowledgementText}
          </AcknowledgementText>
        )}
        {renderButtons()}
      </div>
    </Container>
  );
};
