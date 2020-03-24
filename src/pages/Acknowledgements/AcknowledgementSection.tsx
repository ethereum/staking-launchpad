import React from 'react';
import { Box } from 'grommet';
import { Paper, PaperGroup } from '../../components/Paper';
import { AcknowledgementIdsEnum } from '../../store/reducers';
import { Button } from '../../components/Button';
import { Text } from '../../components/Text';
import { Heading } from '../../components/Heading';

export interface AcknowledgementSectionData {
  title: string;
  content: JSX.Element;
  acknowledgement: {
    id: AcknowledgementIdsEnum;
    text?: string;
  };
}

interface AcknowledgementSectionProps {
  handleContinueClick(id: AcknowledgementIdsEnum): void;
  handleGoBackClick(id: AcknowledgementIdsEnum): void;
}

export const AcknowledgementSection = ({
  title,
  content,
  acknowledgement,
  handleContinueClick,
  handleGoBackClick,
}: AcknowledgementSectionProps & AcknowledgementSectionData): JSX.Element => {
  const isIntroSection =
    acknowledgement.id === AcknowledgementIdsEnum.introSection;
  return (
    <PaperGroup>
      <Paper>
        <Heading level={3} size="small" color="blueDark">
          {title}
        </Heading>
        {content}
      </Paper>
      <Paper className="rm-double-border">
        <Text>{acknowledgement.text}</Text>
        <Box
          align="center"
          pad="xsmall"
          className="flex flex-row space-evenly mt20"
        >
          {!isIntroSection && (
            <Button
              onClick={() => handleGoBackClick(acknowledgement.id)}
              width={300}
              label="Back"
            />
          )}
          <Button
            onClick={() => handleContinueClick(acknowledgement.id)}
            rainbow
            width={300}
            label={isIntroSection ? 'Continue' : 'I Accept'}
          />
        </Box>
      </Paper>
    </PaperGroup>
  );
};
