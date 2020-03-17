import { Paper, PaperGroup } from '../../components/Paper';
import { CircleAlert } from '../ValidatorSettings/CircleAlert';
import { Heading } from 'grommet';
import React from 'react';

export const AcknowledgementSection = ({
  title,
  children,
}: {
  title: string;
  children: any;
}) => {
  return (
    <PaperGroup className="mt20">
      <Paper error pad="medium">
        <div className="flex">
          <CircleAlert size={25} />
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
