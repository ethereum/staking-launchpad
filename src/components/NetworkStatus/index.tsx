import React, { useEffect, useState } from 'react';
import { Box, Text, Meter } from 'grommet';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { formatEther } from '@ethersproject/units';
import styled from 'styled-components';

const StatusContainer = styled(Box)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: ${p => p.theme.colors.background};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  z-index: 1000;
`;

const StatusIndicator = styled.div<{ status: 'good' | 'warning' | 'error' }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${p => 
    p.status === 'good' ? p.theme.colors.green :
    p.status === 'warning' ? p.theme.colors.yellow :
    p.theme.colors.red
  };
  margin-right: 8px;
`;

export const NetworkStatus: React.FC = () => {
  const { library, chainId } = useWeb3React<Web3Provider>();
  const [blockNumber, setBlockNumber] = useState<number>(0);
  const [depositBalance, setDepositBalance] = useState<string>('0');
  const [networkStatus, setNetworkStatus] = useState<'good' | 'warning' | 'error'>('good');
  const [latency, setLatency] = useState<number>(0);

  useEffect(() => {
    if (!library) return;

    const updateBlockNumber = async () => {
      try {
        const start = Date.now();
        const number = await library.getBlockNumber();
        const end = Date.now();
        
        setLatency(end - start);
        setBlockNumber(number);
        
        // Update network status based on latency
        if (end - start < 1000) {
          setNetworkStatus('good');
        } else if (end - start < 3000) {
          setNetworkStatus('warning');
        } else {
          setNetworkStatus('error');
        }
      } catch (error) {
        console.error('Failed to get block number:', error);
        setNetworkStatus('error');
      }
    };

    const getDepositBalance = async () => {
      try {
        const balance = await library.getBalance('0x00000000219ab540356cBB839Cbe05303d7705Fa');
        setDepositBalance(formatEther(balance));
      } catch (error) {
        console.error('Failed to get deposit contract balance:', error);
      }
    };

    library.on('block', updateBlockNumber);
    updateBlockNumber();
    getDepositBalance();

    return () => {
      library.off('block', updateBlockNumber);
    };
  }, [library]);

  if (!library) return null;

  return (
    <StatusContainer>
      <Box gap="small">
        <Box direction="row" align="center">
          <StatusIndicator status={networkStatus} />
          <Text size="small">Network Status</Text>
        </Box>
        
        <Box gap="xsmall">
          <Text size="xsmall">Block: #{blockNumber}</Text>
          <Text size="xsmall">Latency: {latency}ms</Text>
          <Text size="xsmall">Chain ID: {chainId}</Text>
          <Text size="xsmall">Deposit Contract: {parseFloat(depositBalance).toFixed(2)} ETH</Text>
        </Box>

        <Box align="center">
          <Meter
            type="bar"
            size="small"
            thickness="small"
            values={[{
              value: Math.min(latency / 30, 100),
              color: networkStatus === 'good' ? 'status-ok' :
                     networkStatus === 'warning' ? 'status-warning' :
                     'status-critical'
            }]}
          />
        </Box>
      </Box>
    </StatusContainer>
  );
};
