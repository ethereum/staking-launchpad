import React from 'react';
import { Box } from 'grommet';
import { Paper, PaperGroup } from '../../components/Paper';
import { AcknowledgementIdsEnum } from '../../store/reducers';
import { Button } from '../../components/Button';
import { Text } from '../../components/Text';
import { Heading } from '../../components/Heading';
import { Link } from '../../components/Link';
import { routesEnum } from '../../Routes';
import styled from 'styled-components';

const StyledHeading = styled(Heading)`
  background-color: aliceblue;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
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
        <Box
          align="center"
          pad="xsmall"
          className="flex flex-row space-evenly mt20"
        >
          <Button
            onClick={() =>
              handleGoBackClick(AcknowledgementIdsEnum.confirmation)
            }
            width={300}
            label="Back"
          />
          <Link
            to={routesEnum.generateKeysPage}
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
        </Box>
      );
    }
    return (
      <Box
        align="center"
        pad="xsmall"
        className="flex flex-row space-evenly mt20"
      >
        {!isIntroSection && (
          <Button
            onClick={() => handleGoBackClick(acknowledgementId)}
            width={300}
            label="Back"
          />
        )}
        <Button
          onClick={() => handleContinueClick(acknowledgementId)}
          rainbow
          width={300}
          label={isIntroSection ? 'Continue' : 'I Accept'}
        />
      </Box>
    );
  };

  return (
    <div className="flex flex-column space-between">
      <div>
        <StyledHeading level={2} size="medium" color="blueDark">
          {title}
        </StyledHeading>
        <div className="p10">{content}</div>
      </div>
      <div>
        <Text textAlign="center">{acknowledgementText}</Text>
        {renderButtons()}
      </div>
    </div>
  );
};
