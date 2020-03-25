import React, { useEffect, useState } from 'react';
import { AcknowledgementSection } from './AcknowledgementSection';
import { CheckBox } from 'grommet';
import { pricePerValidator } from '../../enums';
import { Link } from '../../components/Link';
import { Text } from '../../components/Text';

interface SummaryAcknowledgementsProps {
  setAllChecked: (v: boolean) => void;
}

export const SummaryAcknowledgements = ({
  setAllChecked,
}: SummaryAcknowledgementsProps): JSX.Element => {
  const [losePhrase, setLosePhrase] = useState(false);
  const [earlyAdopt, setEarlyAdopt] = useState(false);
  const [nonReverse, setNonReverse] = useState(false);
  const [noPhish, setNoPhish] = useState(false);

  useEffect(() => {
    setAllChecked(losePhrase && earlyAdopt && nonReverse && noPhish);
  }, [losePhrase, earlyAdopt, nonReverse, noPhish]);

  return (
    <div>
      <AcknowledgementSection title="Please proceed with caution">
        <CheckBox
          onChange={e => setLosePhrase(e.target.checked)}
          checked={losePhrase}
          label="I understand that if I lose my mnemonic phrase, I won't be able to withdraw my funds"
        />
        <span className="mt20">
          <CheckBox
            onChange={e => setEarlyAdopt(e.target.checked)}
            checked={earlyAdopt}
            label="I am aware of the early adopter and slashing risks"
          />
        </span>
        <span className="mt20">
          <CheckBox
            onChange={e => setNonReverse(e.target.checked)}
            checked={nonReverse}
            label="I am aware that this transaction is not reversible"
          />
        </span>
      </AcknowledgementSection>
      <AcknowledgementSection title="Please make sure you aren't being phished">
        <Text>
          You are responsible for the transaction. Fraudulent websites might
          lure you into sending the {pricePerValidator} ETH to them, instead of
          the official deposit contract. Please check that the address you are
          sending the transaction to is the correct address.
        </Text>
        <Link to="https://www.google.com" external className="mt10" primary>
          Learn here how to do it safely
        </Link>
        <span className="mt20">
          <CheckBox
            onChange={e => setNoPhish(e.target.checked)}
            checked={noPhish}
            label="I know how to check that I am sending my ETH into the correct deposit contract and will do so."
          />
        </span>
      </AcknowledgementSection>
    </div>
  );
};
