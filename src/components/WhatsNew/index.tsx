import React, { useState, useEffect } from 'react';
import { Box, Button, Heading, Layer, Text } from 'grommet';
import { Close, Update } from 'grommet-icons';
import styled from 'styled-components';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const UpdateBadge = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  background: ${p => p.theme.colors.brand};
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const FeatureCard = styled(Box)`
  background: ${p => p.theme.colors.background};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid ${p => p.theme.colors.border};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

interface Update {
  id: string;
  title: string;
  description: string;
  date: string;
  category: 'feature' | 'improvement' | 'security';
  link?: string;
}

const updates: Update[] = [
  {
    id: '2025-02-1',
    title: 'Enhanced Network Status Monitoring',
    description: 'Real-time network status indicator with detailed metrics including latency and block information.',
    date: '2025-02-22',
    category: 'feature'
  },
  {
    id: '2025-02-2',
    title: 'Improved Key Generation Progress',
    description: 'Visual progress indicator for key generation with estimated time remaining.',
    date: '2025-02-22',
    category: 'improvement'
  },
  {
    id: '2025-02-3',
    title: 'Enhanced Security Features',
    description: 'Additional phishing protection and hardware wallet connection monitoring.',
    date: '2025-02-22',
    category: 'security',
    link: '/phishing'
  },
  {
    id: '2025-02-4',
    title: 'Offline Support',
    description: 'Better offline support with service worker implementation for improved caching.',
    date: '2025-02-22',
    category: 'feature'
  },
  {
    id: '2025-02-5',
    title: 'Accessibility Improvements',
    description: 'Enhanced keyboard navigation and screen reader compatibility.',
    date: '2025-02-22',
    category: 'improvement'
  }
];

export const WhatsNew: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [lastViewedUpdate, setLastViewedUpdate] = useLocalStorage<string>('lastViewedUpdate', '');
  const [hasNewUpdates, setHasNewUpdates] = useState(false);

  useEffect(() => {
    const latestUpdate = updates[0]?.id;
    setHasNewUpdates(latestUpdate !== lastViewedUpdate);
  }, [lastViewedUpdate]);

  const handleOpenModal = () => {
    setShowModal(true);
    setLastViewedUpdate(updates[0]?.id);
    setHasNewUpdates(false);
  };

  const getCategoryColor = (category: Update['category']) => {
    switch (category) {
      case 'feature':
        return 'status-ok';
      case 'improvement':
        return 'status-warning';
      case 'security':
        return 'status-critical';
      default:
        return 'brand';
    }
  };

  return (
    <>
      <Box position="relative" alignSelf="center">
        <Button
          icon={<Update />}
          onClick={handleOpenModal}
          tip="What's New"
        />
        {hasNewUpdates && <UpdateBadge>!</UpdateBadge>}
      </Box>

      {showModal && (
        <Layer
          onEsc={() => setShowModal(false)}
          onClickOutside={() => setShowModal(false)}
          position="center"
          modal
        >
          <Box pad="medium" gap="small" width="large">
            <Box direction="row" justify="between" align="center">
              <Heading level={2} margin="none">
                What's New
              </Heading>
              <Button
                icon={<Close />}
                onClick={() => setShowModal(false)}
                plain
              />
            </Box>

            <Box overflow={{ vertical: 'auto' }} height={{ max: 'large' }}>
              {updates.map(update => (
                <FeatureCard key={update.id}>
                  <Box direction="row" justify="between" align="center">
                    <Text weight="bold">{update.title}</Text>
                    <Text size="small" color="text-weak">{update.date}</Text>
                  </Box>
                  <Text margin={{ vertical: 'small' }}>{update.description}</Text>
                  <Box direction="row" justify="between" align="center">
                    <Text
                      size="small"
                      color={getCategoryColor(update.category)}
                      weight="bold"
                    >
                      {update.category.charAt(0).toUpperCase() + update.category.slice(1)}
                    </Text>
                    {update.link && (
                      <Button
                        label="Learn More"
                        href={update.link}
                        size="small"
                      />
                    )}
                  </Box>
                </FeatureCard>
              ))}
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
};
