import React from 'react';
import styled from 'styled-components';
import { Heading } from '../../../components/Heading';
import { Text } from '../../../components/Text';

const Container = styled.div`
  max-width: 340px;
  margin: 32px 0px;
`;

const Emoji = styled.span`
  font-size: 80px;
`;

const EmojiBackground = styled.div`
  border-radius: 4px;
  display: flex;
  justify-content: flex-start;
  text-align: center;
  padding: 32px 0px;
  margin-bottom: 16px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 200px;
`;

interface Props {
  emoji?: string;
  emojiAlt?: string;
  title: string;
  content: string;
  children?: any;
}

export const Step = ({
  emoji,
  emojiAlt,
  title,
  content,
  children,
}: Props): JSX.Element => {
  return (
    <Container>
      <EmojiBackground>
        <Emoji>
          <span role="img" aria-label={emojiAlt}>
            {emoji}
          </span>
        </Emoji>
      </EmojiBackground>
      <Body>
        <div>
          <Heading level="4" className="my10">
            {title}
          </Heading>
          <Text>{content}</Text>
        </div>
        {children}
      </Body>
    </Container>
  );
};
