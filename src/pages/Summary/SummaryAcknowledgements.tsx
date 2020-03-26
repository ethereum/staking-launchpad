import React, { useEffect, useState } from 'react';
import { CheckBox } from 'grommet';
import { FormNextLink } from 'grommet-icons';
import { AcknowledgementSection } from './AcknowledgementSection';
import { pricePerValidator } from '../../enums';
import { Link } from '../../components/Link';
import { Text } from '../../components/Text';

interface SummaryAcknowledgementsProps {
  setAllChecked: (v: boolean) => void;
}

export const SummaryAcknowledgements = ({
  setAllChecked,
}: SummaryAcknowledgementsProps): JSX.Element => {
  const [losePhrase, setLosePhrase] = useState(true);
  const [earlyAdopt, setEarlyAdopt] = useState(true);
  const [nonReverse, setNonReverse] = useState(true);
  const [noPhish, setNoPhish] = useState(true);

  useEffect(() => {
    setAllChecked(losePhrase && earlyAdopt && nonReverse && noPhish);
  }, [losePhrase, earlyAdopt, nonReverse, noPhish]);

  return (
    <div>
      <AcknowledgementSection title="Please proceed with caution">
        <CheckBox
          onChange={e => setLosePhrase(e.target.checked)}
          checked={losePhrase}
          label={
            <Text>
              I understand that if I lose my mnemonic phrase, I will not be able
              to withdraw my funds
            </Text>
          }
        />
        <span className="mt20">
          <CheckBox
            onChange={e => setEarlyAdopt(e.target.checked)}
            checked={earlyAdopt}
            label={
              <Text> I am aware of the early adopter and slashing risks</Text>
            }
          />
        </span>
        <span className="mt20">
          <CheckBox
            onChange={e => setNonReverse(e.target.checked)}
            checked={nonReverse}
            label={
              <Text> I am aware that this transaction is not reversible</Text>
            }
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
          Learn here how to do it safely <FormNextLink />
        </Link>
        <span className="mt20">
          <CheckBox
            onChange={e => setNoPhish(e.target.checked)}
            checked={noPhish}
            label={
              <Text>
                I know how to check that I am sending my ETH into the correct
                deposit contract and will do so.
              </Text>
            }
          />
        </span>
      </AcknowledgementSection>
    </div>
  );
};
