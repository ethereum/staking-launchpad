import React from 'react';
import styled from 'styled-components';
import { FormDown } from 'grommet-icons';
import { useIntl } from 'react-intl';
import { Box, DropButton } from 'grommet';
import { Link } from '../Link';
import { rainbowColors } from '../../styles/styledComponentsTheme';
import { WorkflowStep } from '../../store/actions/workflowActions';
import EthDiamond from '../../static/eth-diamond-plain.svg';
import { Text } from '../Text';
import { Heading } from '../Heading';
import { FormattedMessage } from 'react-intl';
import {
  IS_MAINNET,
  TESTNET_LAUNCHPAD_NAME,
  MAINNET_LAUNCHPAD_URL,
  TESTNET_LAUNCHPAD_URL,
} from '../../utils/envVars';

const Container = styled.div`
  z-index: 0;
`;

const EthLogo = styled.img`
  height: 40px;
  width: 40px;
`;

const StepContainer = styled.div`
  height: 100%;
  width: 256px;
  margin: auto;
  border-right: 1px solid ${p => p.theme.gray.medium};
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
`;

const Step = styled.div`
  width: 100%;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${p => p.theme.gray.medium};
  color: ${(p: {
    disabled: boolean;
    isComplete: boolean;
    active: boolean;
    index: number;
    theme: any;
  }) => {
    if (p.disabled) return p.theme.gray.medium;
    return p.theme.gray.dark;
  }};
  background: ${(p: {
    disabled: boolean;
    isComplete: boolean;
    active: boolean;
    index: number;
    theme: any;
  }) => {
    if (p.active) return rainbowColors[p.index];
    else if (p.disabled) return 'white';
    return p.theme.green.light;
  }};
  font-weight: ${p => (p.active ? 600 : undefined)};
`;

const StepHeader = styled.div`
  background: ${p => p.theme.gray.light};
  display: flex;
  width: 100%;
  padding: 24px;
  font-weight: 500;
  border-bottom: 1px solid ${p => p.theme.gray.medium};
`;

const BarLinkText = styled(Heading)`
  :not(.no-padding) {
    padding: 0 12px;
  }
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-weight: ${(p: { active?: boolean }) => (p.active ? 'bold' : 300)};
`;

const ValidatorDropdown = styled(DropButton)`
  padding: 12px 8px;
  font-weight: 300;
  display: flex;
  align-items: center;
  border: none;
  :hover {
    border: none;
    box-shadow: none;
  }
`;

const DropdownLink = styled(Link)`
  :hover {
    text-decoration: underline;
  }
`;

const Card = styled.div``;

const NetworkText = styled.div`
  padding: 5px 8px;
  border: 1px solid;
  font-weight: 400;
  font-size: 16px;
  text-align: center;
  display: flex;
  justify-content: center;
  width: 100%;
  border-radius: 4px;
  &:hover {
    border-radius: 4px;
    box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.15);
    background-image: ${p => `linear-gradient(to right, ${p.theme.rainbow})`};
    transition: transform 0.1s;
    transform: scale(1.02);
  }
`;

interface Props {
  workflow: WorkflowStep;
}

export const WorkflowProgressBar = ({ workflow }: Props): JSX.Element => {
  const { formatMessage } = useIntl();
  const switchLaunchpadUrl = IS_MAINNET
    ? TESTNET_LAUNCHPAD_URL
    : MAINNET_LAUNCHPAD_URL;

  interface step {
    step: WorkflowStep;
    text: string;
  }

  const steps: step[] = [
    {
      step: WorkflowStep.OVERVIEW,
      text: formatMessage({ defaultMessage: '1. Overview' }),
    },
    {
      step: WorkflowStep.SELECT_CLIENT,
      text: formatMessage({ defaultMessage: '2. Choose client' }),
    },
    {
      step: WorkflowStep.GENERATE_KEY_PAIRS,
      text: formatMessage({ defaultMessage: '3. Generate keys' }),
    },
    {
      step: WorkflowStep.UPLOAD_VALIDATOR_FILE,
      text: formatMessage({ defaultMessage: '4. Upload deposit data' }),
    },
    {
      step: WorkflowStep.CONNECT_WALLET,
      text: formatMessage({ defaultMessage: '5. Connect wallet' }),
    },
    {
      step: WorkflowStep.SUMMARY,
      text: formatMessage({ defaultMessage: '6. Summary' }),
    },
    {
      step: WorkflowStep.TRANSACTION_SIGNING,
      text: formatMessage({ defaultMessage: '7. Transactions' }),
    },
  ];

  return (
    <Container>
      <StepContainer>
        <StepHeader>
          <Link to="/" className="mr30">
            <EthLogo src={EthDiamond} alt="eth-diamond" />
            <div className="flex center ml5">
              <BarLinkText>
                <Text>
                  Eth2 {!IS_MAINNET && `${TESTNET_LAUNCHPAD_NAME}`} Launchpad
                </Text>
              </BarLinkText>
            </div>
          </Link>
        </StepHeader>
        {steps.map(({ step, text }, i) => (
          <div className="flex flex-column" key={text}>
            <Step
              index={i}
              disabled={workflow < step}
              active={workflow === step}
              isComplete={workflow === step}
            >
              <span>{text}</span> <span>✅</span>
            </Step>
          </div>
        ))}
        <div className="flex ml20 mt30">
          <ValidatorDropdown
            className="secondary-link"
            label={
              <NetworkText>
                {IS_MAINNET ? `Mainnet` : `${TESTNET_LAUNCHPAD_NAME}`}
                <FormDown />
              </NetworkText>
            }
            dropAlign={{ top: 'bottom', right: 'right' }}
            dropContent={
              <Card>
                <Box pad="small" className="mt0">
                  {!IS_MAINNET && (
                    <Text className="mb10">
                      <FormattedMessage defaultMessage="This is a test network ⚠️" />
                    </Text>
                  )}
                  <DropdownLink to={switchLaunchpadUrl}>
                    <FormattedMessage
                      defaultMessage="Switch to {network} launchpad"
                      values={{
                        network: `${
                          IS_MAINNET
                            ? `${TESTNET_LAUNCHPAD_NAME} testnet`
                            : `mainnet`
                        }`,
                      }}
                    />
                  </DropdownLink>
                </Box>
              </Card>
            }
          />
        </div>
      </StepContainer>
    </Container>
  );
};
