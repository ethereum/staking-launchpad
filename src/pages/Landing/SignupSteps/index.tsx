import React from 'react';
import styled from 'styled-components';
import ScrollAnimation from 'react-animate-on-scroll';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button } from '../../../components/Button';
import { Heading } from '../../../components/Heading';
import { routesEnum } from '../../../Routes';
import { Link } from '../../../components/Link';
import { Step } from './Step';
import { IS_MAINNET, TESTNET_LAUNCHPAD_URL } from '../../../utils/envVars';

const Container = styled.div`
  box-sizing: border-box;
  max-width: ${p => p.theme.screenSizes.largest};
  width: 100%;
  margin: 0 auto;
  padding: 0 120px;
  @media only screen and (max-width: ${p => p.theme.screenSizes.largest}) {
    padding: 0 60px;
  }
`;
const StepsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 30px;
  @media only screen and (max-width: 1380px) {
    justify-content: center;
  }
`;

const Subtitle = styled.p`
  font-size: 20px;
  margin-bottom: 32px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const SignupSteps = (): JSX.Element => {
  const m: boolean = (window as any).mobileCheck();
  const { formatMessage } = useIntl();
  return (
    <Container className="py100">
      <ScrollAnimation animateIn="fadeIn" animateOnce>
        <Heading level={2} size="medium" color="blueDark" margin="none">
          <FormattedMessage defaultMessage="Become a validator" />
        </Heading>
        <Subtitle>
          <FormattedMessage
            defaultMessage="Becoming a validator is a big responsibility with important
          preparation steps. Only start the deposit process when you're ready."
          />
        </Subtitle>
      </ScrollAnimation>
      <StepsContainer>
        <ScrollAnimation animateIn="fadeInUp" animateOnce>
          <Step
            emoji="📚"
            emojiAlt={formatMessage({ defaultMessage: 'books' })}
            title={formatMessage({
              defaultMessage: '1. Learn about your responsibilities',
            })}
            content={formatMessage({
              defaultMessage:
                'The Ethereum upgrades will only be successful if validators understand the risks and responsibilities.',
            })}
          >
            <Link to={routesEnum.FaqPage} primary>
              <FormattedMessage defaultMessage="Validators FAQ" />
            </Link>
          </Step>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInUp" animateOnce delay={300}>
          <Step
            emoji="🔧"
            emojiAlt={formatMessage({ defaultMessage: 'wrench' })}
            title={formatMessage({ defaultMessage: '2. Prep nodes' })}
            content={formatMessage({
              defaultMessage:
                "You'll need to run an execution client (formerly 'Eth1') as well as a consensus client (formerly 'Eth2') to become a validator. Take a look at the checklist to prepare yourself and your equipment.",
            })}
          >
            <Link to={routesEnum.checklistPage} primary>
              <FormattedMessage defaultMessage="Hardware checklist" />
            </Link>
          </Step>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInUp" animateOnce delay={150}>
          <Step
            emoji="🥋"
            emojiAlt={formatMessage({
              defaultMessage: 'martial arts uniform',
            })}
            title={formatMessage({
              defaultMessage: '3. Practice on a testnet',
            })}
            content={formatMessage({
              defaultMessage:
                'We strongly recommend you go through the entire process on a testnet first to get comfortable before risking real ETH.',
            })}
          >
            {IS_MAINNET ? (
              <Link primary to={TESTNET_LAUNCHPAD_URL}>
                <FormattedMessage defaultMessage="Try the testnet" />
              </Link>
            ) : (
              <FormattedMessage defaultMessage="You're on the testnet" />
            )}
          </Step>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInUp" animateOnce delay={300}>
          <Step
            emoji="🎣"
            emojiAlt={formatMessage({
              defaultMessage: 'fishing rod',
            })}
            title={formatMessage({ defaultMessage: '4. Avoid phishing' })}
            content={formatMessage({
              defaultMessage:
                "Make sure you're aware of how to avoid phishing attacks. We've prepared a list of things to look out for.",
            })}
          >
            <Link to={routesEnum.phishingPage} primary>
              <FormattedMessage defaultMessage="Phishing guide" />
            </Link>
          </Step>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInUp" animateOnce delay={150}>
          <Step
            emoji="💰"
            emojiAlt={formatMessage({ defaultMessage: 'money bag' })}
            title={formatMessage({ defaultMessage: '5. Time to deposit' })}
            content={formatMessage({
              defaultMessage:
                "Once you're comfortable, you'll go through generating your keys and depositing your ETH.",
            })}
          >
            <Link to={routesEnum.acknowledgementPage} primary>
              <FormattedMessage defaultMessage="Start deposit process" />
            </Link>
          </Step>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInUp" animateOnce delay={300}>
          <Step
            emoji="🕰"
            emojiAlt={formatMessage({ defaultMessage: 'clock' })}
            title={formatMessage({
              defaultMessage: '6. Wait to become active',
            })}
            content={formatMessage({
              defaultMessage:
                "Once set up, your validator won't become active straight away. Use this time to complete the checklist and get some extra practice on a testnet.",
            })}
          >
            <Link to={routesEnum.checklistPage} primary>
              <FormattedMessage defaultMessage="Complete checklist" />
            </Link>
          </Step>
        </ScrollAnimation>
      </StepsContainer>
      <ScrollAnimation animateIn="fadeIn" animateOnce delay={450}>
        <ButtonContainer className="pt100">
          <Link to={routesEnum.acknowledgementPage}>
            <Button
              rainbow
              className="m-auto"
              fullWidth
              width={m ? undefined : 400}
              label={formatMessage({
                defaultMessage: 'Become a validator',
              })}
            />
          </Link>
        </ButtonContainer>
      </ScrollAnimation>
    </Container>
  );
};
