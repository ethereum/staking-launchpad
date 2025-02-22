import React, { useEffect, useState } from 'react';
import { Box, Text, Button, Layer, Heading } from 'grommet';
import { Alert, StatusWarning } from 'grommet-icons';
import styled from 'styled-components';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const WarningBox = styled(Box)`
  background: ${p => p.theme.colors.status.critical};
  color: white;
  border-radius: 8px;
  padding: 16px;
`;

const ChecklistItem = styled(Box)`
  padding: 12px;
  border-radius: 4px;
  background: ${p => p.theme.colors.background};
  margin-bottom: 8px;
  border: 1px solid ${p => p.theme.colors.border};
`;

interface PhishingCheckItem {
  id: string;
  description: string;
  checked: boolean;
}

const initialChecklist: PhishingCheckItem[] = [
  {
    id: 'url',
    description: 'Verify you are on launchpad.ethereum.org',
    checked: false
  },
  {
    id: 'ssl',
    description: 'Check for the secure HTTPS connection',
    checked: false
  },
  {
    id: 'bookmarks',
    description: 'Use your own bookmarks, not external links',
    checked: false
  },
  {
    id: 'wallet',
    description: 'Confirm your wallet is connected securely',
    checked: false
  }
];

export const PhishingProtection: React.FC = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [checklist, setChecklist] = useState(initialChecklist);
  const [lastCheck, setLastCheck] = useLocalStorage<string>('lastPhishingCheck', '');
  
  useEffect(() => {
    // Check if it's been more than 24 hours since the last check
    const lastCheckDate = new Date(lastCheck).getTime();
    const now = new Date().getTime();
    const hoursSinceLastCheck = (now - lastCheckDate) / (1000 * 60 * 60);

    if (hoursSinceLastCheck >= 24 || !lastCheck) {
      setShowWarning(true);
    }
  }, [lastCheck]);

  useEffect(() => {
    // Verify current URL
    const currentUrl = window.location.href;
    const isSecure = window.location.protocol === 'https:';
    const isOfficialDomain = window.location.hostname === 'launchpad.ethereum.org';

    if (!isSecure || !isOfficialDomain) {
      setShowWarning(true);
    }
  }, []);

  const handleCheck = (id: string) => {
    setChecklist(prev =>
      prev.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleConfirm = () => {
    const allChecked = checklist.every(item => item.checked);
    if (allChecked) {
      setLastCheck(new Date().toISOString());
      setShowWarning(false);
    }
  };

  const handleEmergency = () => {
    // Disconnect wallet and clear local storage
    localStorage.clear();
    window.location.href = 'https://ethereum.org';
  };

  if (!showWarning) return null;

  return (
    <Layer
      position="center"
      modal
      onClickOutside={() => {}}
      onEsc={() => {}}
    >
      <Box pad="medium" gap="medium" width="large">
        <Box direction="row" gap="small" align="center">
          <Alert color="status-critical" />
          <Heading level={2} margin="none">Security Check</Heading>
        </Box>

        <WarningBox>
          <Box direction="row" gap="small" align="center" margin={{ bottom: 'small' }}>
            <StatusWarning />
            <Text weight="bold">Verify Your Security</Text>
          </Box>
          <Text size="small">
            To protect your assets, please verify the following security measures
            before proceeding with any transactions.
          </Text>
        </WarningBox>

        <Box gap="small">
          {checklist.map(item => (
            <ChecklistItem key={item.id} onClick={() => handleCheck(item.id)}>
              <Box direction="row" gap="small" align="center">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleCheck(item.id)}
                />
                <Text size="small">{item.description}</Text>
              </Box>
            </ChecklistItem>
          ))}
        </Box>

        <Box direction="row" gap="medium" justify="between">
          <Button
            label="Emergency Exit"
            color="status-critical"
            onClick={handleEmergency}
          />
          <Button
            label="Confirm & Continue"
            primary
            onClick={handleConfirm}
            disabled={!checklist.every(item => item.checked)}
          />
        </Box>
      </Box>
    </Layer>
  );
};
