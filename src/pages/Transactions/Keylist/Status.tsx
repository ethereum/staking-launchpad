import React from 'react';
import styled from 'styled-components';
import { CustomText } from './index';
import { Dot } from '../../../components/Dot';

export const Status = () => {
  return (
    <div className="flex">
      <Dot success className="mr5" />
      <CustomText>Waiting for wallet confirmation</CustomText>
    </div>
  );
};
