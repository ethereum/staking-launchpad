import React from 'react';
import { Paper, PaperGroup } from '../../components/Paper';
import { CheckBox } from 'grommet';
import { Text } from '../../components/Text';
import { Heading } from '../../components/Heading';
import { acknowledgementId } from '../../store/reducers';

export interface AcknowledgementSectionData {
  id: acknowledgementId;
  title: string;
  content: JSX.Element;
  acknowledgement: {
    id: acknowledgementId;
    text: string;
  };
}
export interface AcknowledgementSectionProps {
  handleCheckboxClick(id: acknowledgementId, checked: boolean): void;
  agreedTo: boolean;
}

export const AcknowledgementSection = ({
  title,
  content,
  acknowledgement,
  handleCheckboxClick,
  agreedTo,
}: AcknowledgementSectionProps & AcknowledgementSectionData): JSX.Element => {
  const onCheckboxClick = (event: any) =>
    handleCheckboxClick(acknowledgement.id, event.target.checked);

  return (
    <PaperGroup className="my10" id={acknowledgement.id}>
      <Paper>
        <Heading level={3} size="small" color="blueDark">
          {title}
        </Heading>
        {content}
      </Paper>
      {acknowledgement && (
        <Paper className="rm-double-border">
          <CheckBox
            onChange={onCheckboxClick}
            checked={agreedTo}
            label={<Text>{acknowledgement.text}</Text>}
          />
        </Paper>
      )}
    </PaperGroup>
  );
};
