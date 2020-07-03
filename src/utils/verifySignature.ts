import { verify } from '@chainsafe/bls';
import { DepositKeyInterface } from '../store/reducers';
import { DOMAIN_DEPOSIT, EMPTY_ROOT, GENESIS_FORK_VERSION } from './envVars';
import { bufferHex, ForkData, SigningData } from './SSZ';

const computeForkDataRoot = (
  currentVersion: Uint8Array,
  genesisValidatorsRoot: Uint8Array
): Uint8Array => {
  const forkData: ForkData = {
    currentVersion: currentVersion as Uint8Array,
    genesisValidatorsRoot,
  };
  return ForkData.hashTreeRoot(forkData);
};

const computeDomain = (
  domainType: Buffer,
  forkVersion: Buffer | string = GENESIS_FORK_VERSION,
  genesisValidatorsRoot: Buffer = EMPTY_ROOT
): Uint8Array => {
  const forkDataRoot = computeForkDataRoot(
    forkVersion as Uint8Array,
    genesisValidatorsRoot
  );
  const domain = new Uint8Array(32);
  domain.set(domainType);
  domain.set(forkDataRoot.subarray(0, 28), 4);
  return domain;
};

const computeSigningRoot = (
  sszObjectRoot: Uint8Array,
  domain: Uint8Array
): Uint8Array => {
  const signingData: SigningData = {
    objectRoot: sszObjectRoot,
    domain,
  };
  return SigningData.hashTreeRoot(signingData);
};

// Note: usage of this method requires awaiting the initBLS() method from "@chainsafe/bls";
export const verifySignature = (depositDatum: DepositKeyInterface): boolean => {
  const pubkeyBuffer = bufferHex(depositDatum.pubkey);
  const signatureBuffer = bufferHex(depositDatum.signature);
  const depositMessageBuffer = bufferHex(depositDatum.deposit_message_root);
  const forkVersion = bufferHex(depositDatum.fork_version);
  const domain = computeDomain(DOMAIN_DEPOSIT, forkVersion);
  const signingRoot = computeSigningRoot(depositMessageBuffer, domain);
  return verify(pubkeyBuffer, signingRoot, signatureBuffer);
};
