import React from 'react';
import { Paper, PaperGroup } from '../../components/Paper';
import { Heading } from '../../components/Heading';

interface Props {
  title: string;
  children: any;
}

export const AcknowledgementSection = ({ title, children }: Props) => {
  return (
    <PaperGroup className="mt20">
      <Paper error pad="medium">
        <div className="flex">
          <Heading
            level={3}
            size="small"
            color="error"
            margin="none"
            className="ml10"
          >
            {title}
          </Heading>
        </div>
      </Paper>
      <Paper error className="rm-double-border">
        {children}
      </Paper>
    </PaperGroup>
  );
};
