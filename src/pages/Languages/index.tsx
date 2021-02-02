import React from 'react';
import styled from 'styled-components';
import { Link } from '../../components/Link';
import { PageTemplate } from '../../components/PageTemplate';

const LangContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const LangItem = styled(Link)`
  text-decoration: none;
  margin: 1rem 1rem 1rem 0;
  padding: 1rem;
  width: 240px;
  list-style: none;
  border-radius: 2px;
  border: 1px solid #000000;
  &:hover {
    border-radius: 4px;
    box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.15);
    background-image: ${p => `linear-gradient(to right, ${p.theme.rainbow})`};
    transition: transform 0.1s;
    transform: scale(1.02);
  }
  @media only screen and (max-width: ${p => p.theme.screenSizes.medium}) {
    width: 100%;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const LangTitle = styled.div`
  font-size: 24px;
`;

const Lang = styled.div`
  font-size: 20px;
  margin-top: 1rem;
`;

export const Languages = () => {
  const langs = [
    {
      path: 'https://launchpad.ethereum.org',
      title: 'Chinese (simplified)',
      language: '简体中文',
    },
    {
      path: 'https://launchpad.ethereum.org',
      title: 'Chinese (traditional)',
      language: '繁體中文',
    },
    {
      path: 'https://launchpad.ethereum.org',
      title: 'Czech',
      language: 'čeština',
    },
    {
      path: 'https://launchpad.ethereum.org',
      title: 'English',
      language: 'English',
    },
    {
      path: 'https://launchpad.ethereum.org',
      title: 'Italian',
      language: 'Italiano',
    },
    {
      path: 'https://launchpad.ethereum.org',
      title: 'Korean',
      language: '한국어',
    },
    {
      path: 'https://launchpad.ethereum.org',
      title: 'Spanish',
      language: 'Español',
    },
  ];

  return (
    <PageTemplate title="Choose a language">
      <LangContainer>
        {langs.map((lang, idx) => {
          return (
            <LangItem key={String(idx)} to={lang.path}>
              <ContentContainer>
                <LangTitle>{lang.language}</LangTitle>
                <Lang>{lang.title}</Lang>
              </ContentContainer>
            </LangItem>
          );
        })}
      </LangContainer>
      <p>
        If you'd like to see the launchpad in another language, or if you can
        help translate, get in touch.
      </p>
    </PageTemplate>
  );
};
