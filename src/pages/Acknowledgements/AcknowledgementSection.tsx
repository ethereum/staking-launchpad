import React from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
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

const AcknowledgementText = styled(Text as any)`
  background: #ffdeb32e;
  border: 1px solid burlywood;
  padding: 30px;
  border-radius: 4px;
`;

const FlexRowGap = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  padding: 30px;
`;

export interface AcknowledgementSectionData {
  title: JSX.Element;
  content: JSX.Element;
  acknowledgementText?: JSX.Element;
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
  const { formatMessage } = useIntl();
  const renderButtons = () => {
    if (isConfirmationSection) {
      return (
        <FlexRowGap>
          <Button
            onClick={() =>
              handleGoBackClick(AcknowledgementIdsEnum.confirmation)
            }
            width={100}
            label={formatMessage({ defaultMessage: 'Back' })}
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
              label={formatMessage({ defaultMessage: 'Continue' })}
            />
          </Link>
        </FlexRowGap>
      );
    }
    return (
      <FlexRowGap>
        {!isIntroSection && (
          <Button
            width={100}
            onClick={() => handleGoBackClick(acknowledgementId)}
            label={formatMessage({ defaultMessage: 'Back' })}
          />
        )}
        <Button
          onClick={() => handleContinueClick(acknowledgementId)}
          rainbow
          label={
            isIntroSection
              ? `${formatMessage({ defaultMessage: 'Continue' })}`
              : `${formatMessage({ defaultMessage: 'I accept' })}`
          }
          width={300}
        />
      </FlexRowGap>
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
