import React from 'react';
import styled from 'styled-components';
import { operatingSystem } from './index';
import MacLogo from '../../static/apple.svg';
import LinuxLogo from '../../static/linux.svg';
import WindowsLogo from '../../static/windows.svg';
import { ImageSelectionBox } from '../../components/ImageSelectionBox';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;

  @media only screen and (min-width: 980px) {
    padding: 0 80px;
  }

  @media only screen and (min-width: 1200px) {
    padding: 0 115px;
  }
`;

interface OSButtonProps {
  chosenOs: operatingSystem;
  setChosenOs: (os: operatingSystem) => void;
}

export const OperatingSystemButtons = ({
  chosenOs,
  setChosenOs,
}: OSButtonProps) => {
  return (
    <Container className="flex">
      <ImageSelectionBox
        text="Linux"
        onClick={() => setChosenOs(operatingSystem.LINUX)}
        isActive={chosenOs === operatingSystem.LINUX}
        src={LinuxLogo}
      />
      <ImageSelectionBox
        text="Windows"
        onClick={() => setChosenOs(operatingSystem.WINDOWS)}
        isActive={chosenOs === operatingSystem.WINDOWS}
        src={WindowsLogo}
      />
      <ImageSelectionBox
        text="Mac"
        onClick={() => setChosenOs(operatingSystem.MAC)}
        isActive={chosenOs === operatingSystem.MAC}
        src={MacLogo}
      />
    </Container>
  );
};
