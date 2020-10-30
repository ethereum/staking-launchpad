import React from 'react';
import styled from 'styled-components';
import { AppBar } from '../../components/AppBar';
// import { Link } from '../../components/Link';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';

const TermsOfServiceStyles = styled.div`
  .tos-text {
    margin: 10px 0;
  }

  .tos-text.last-updated-text {
    margin-top: 3rem;
  }

  .tos-text.section-title {
    margin-top: 1.5rem;
  }
`;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-bottom: 3rem; // adds space for footer
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;

  /* mobile landscape*/
  @media (min-width: 576px) {
    max-width: 540px;
  }

  /* portrait tablet */
  @media (min-width: 768px) {
    max-width: 720px;
  }

  /* landscape tablet */
  @media (min-width: 992px) {
    max-width: 960px;
  }

  /* laptop & desktop */
  @media (min-width: 1360px) {
    max-width: 1280px;
  }
`;

export const TermsOfService = () => {
  return (
    <div>
      <AppBar />
      <Container>
        <TermsOfServiceStyles>
          <Text
            size="12px"
            color="grayDark"
            className="tos-text last-updated-text"
          >
            Page last updated: October 30, 2020
          </Text>
          <Heading level={2}>Terms of Use</Heading>
          <Text className="section-title tos-text" weight={500}>
            PLEASE READ THESE TERMS OF USE BEFORE USING THE WEBSITE.
          </Text>
          <section>
            <Text className="tos-text">
              Acceptance of the Terms of Use These terms of use are entered into
              by and between you and the Ethereum Foundation ("Foundation", "we"
              or "us"). The following terms and conditions, together with any
              documents they expressly incorporate by reference (collectively,
              these "Terms of Use"), govern your access to and use of
              ethereum.org, including any content, functionality and services
              offered on or through ethereum.org, ethereum.foundation,
              devcon.org, and blog.ethereum.org (together, the "Website").
            </Text>
            <Text className="tos-text">
              Please read the Terms of Use carefully before you start to use the
              Websites. By using the Websites or by clicking to accept or agree
              to the Terms of Use when this option is made available to you, you
              accept and agree to be bound and abide by these Terms of Use in
              addition to
              <ul>
                <li>
                  our Privacy Policy, incorporated herein by reference; and
                </li>
                <li> our Cookie Policy, incorporated herein by reference.</li>
              </ul>
            </Text>
            <Text className="tos-text">
              If you do not to agree to these Terms of Use or the Privacy
              Policy, you must not access or use the Websites.
            </Text>
            <Text className="section-title tos-text" weight={500}>
              Who May Use the Websites
            </Text>

            <Text className="tos-text">
              This Websites is offered and available to users who are 13 years
              of age or older. The Websites is not intended for children under
              13 years of age. By using this Website, you represent and warrant
              that you (i) are 13 years of age or older, (ii) are not barred to
              use the Websites under any applicable law, and (iii) are using the
              Websites only for your own personal use. If you do not meet these
              requirements, you must not access or use the Websites.
            </Text>
          </section>
          <section>
            <Text className="tos-text">
              Acceptance of the Terms of Use These terms of use are entered into
              by and between you and the Ethereum Foundation ("Foundation", "we"
              or "us"). The following terms and conditions, together with any
              documents they expressly incorporate by reference (collectively,
              these "Terms of Use"), govern your access to and use of
              ethereum.org, including any content, functionality and services
              offered on or through ethereum.org, ethereum.foundation,
              devcon.org, and blog.ethereum.org (together, the "Website").
            </Text>
            <Text className="tos-text">
              Please read the Terms of Use carefully before you start to use the
              Websites. By using the Websites or by clicking to accept or agree
              to the Terms of Use when this option is made available to you, you
              accept and agree to be bound and abide by these Terms of Use in
              addition to
              <ul>
                <li>
                  our Privacy Policy, incorporated herein by reference; and
                </li>
                <li> our Cookie Policy, incorporated herein by reference.</li>
              </ul>
            </Text>
            <Text className="tos-text">
              If you do not to agree to these Terms of Use or the Privacy
              Policy, you must not access or use the Websites.
            </Text>
            <Text className="section-title tos-text" weight={500}>
              Who May Use the Websites
            </Text>

            <Text className="tos-text">
              This Websites is offered and available to users who are 13 years
              of age or older. The Websites is not intended for children under
              13 years of age. By using this Website, you represent and warrant
              that you (i) are 13 years of age or older, (ii) are not barred to
              use the Websites under any applicable law, and (iii) are using the
              Websites only for your own personal use. If you do not meet these
              requirements, you must not access or use the Websites.
            </Text>
          </section>
          <section>
            <Text className="tos-text">
              Acceptance of the Terms of Use These terms of use are entered into
              by and between you and the Ethereum Foundation ("Foundation", "we"
              or "us"). The following terms and conditions, together with any
              documents they expressly incorporate by reference (collectively,
              these "Terms of Use"), govern your access to and use of
              ethereum.org, including any content, functionality and services
              offered on or through ethereum.org, ethereum.foundation,
              devcon.org, and blog.ethereum.org (together, the "Website").
            </Text>
            <Text className="tos-text">
              Please read the Terms of Use carefully before you start to use the
              Websites. By using the Websites or by clicking to accept or agree
              to the Terms of Use when this option is made available to you, you
              accept and agree to be bound and abide by these Terms of Use in
              addition to
              <ul>
                <li>
                  our Privacy Policy, incorporated herein by reference; and
                </li>
                <li> our Cookie Policy, incorporated herein by reference.</li>
              </ul>
            </Text>
            <Text className="tos-text">
              If you do not to agree to these Terms of Use or the Privacy
              Policy, you must not access or use the Websites.
            </Text>
            <Text className="section-title tos-text" weight={500}>
              Who May Use the Websites
            </Text>

            <Text className="tos-text">
              This Websites is offered and available to users who are 13 years
              of age or older. The Websites is not intended for children under
              13 years of age. By using this Website, you represent and warrant
              that you (i) are 13 years of age or older, (ii) are not barred to
              use the Websites under any applicable law, and (iii) are using the
              Websites only for your own personal use. If you do not meet these
              requirements, you must not access or use the Websites.
            </Text>
          </section>
        </TermsOfServiceStyles>
      </Container>
    </div>
  );
};
