import React from 'react';
import { Paper, PaperGroup } from '../../components/Paper';
import { CheckBox, Heading } from 'grommet';
import { acknowledgementId } from '../../store/reducers';
import styled from 'styled-components';
import { rainbowMutedColors } from '../../styles/styledComponentsTheme';

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
  active: boolean;
}

export const ShadowOverlay = styled.div`
  pointer-events: none;
  background-color: ${rainbowMutedColors[0]};
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: ${p => p.theme.borderRadius};
  display: ${(p: { active: boolean }) => (p.active ? 'none' : 'block')};
`;

export const AcknowledgementSection = ({
  title,
  content,
  acknowledgement,
  handleCheckboxClick,
  agreedTo,
  active,
}: AcknowledgementSectionProps & AcknowledgementSectionData): JSX.Element => {
  const onCheckboxClick = (event: any) =>
    handleCheckboxClick(acknowledgement.id, event.target.checked);

  return (
    <div className="relative">
      <ShadowOverlay active={active} />
      <PaperGroup className="my10">
        <Paper>
          <Heading level={3} size="small" color="blueDark">
            {title}
          </Heading>
          {content}
        </Paper>
        {acknowledgement && (
          <Paper className="rm-double-border">
            <CheckBox
              id={acknowledgement.id.toString()}
              onChange={onCheckboxClick}
              checked={agreedTo}
              label={acknowledgement.text}
            />
          </Paper>
        )}
      </PaperGroup>
    </div>
  );
};
