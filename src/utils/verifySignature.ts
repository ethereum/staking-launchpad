import crypto from "crypto";
import { verify } from "@chainsafe/bls";

const bufferHex = (x: string): Buffer => Buffer.from(x, "hex");
const sha256 = (x: Buffer): Buffer =>
  crypto
    .createHash("sha256")
    .update(x)
    .digest();


// Note: usage of this method requires awaiting the initBLS() method from "@chainsafe/bls";
export const verifySignature = (
  pubkey: string,
  signature: string,
  depositDataRoot: string
): boolean => {
  const pubkeyBuffer = bufferHex(pubkey);
  const signatureBuffer = bufferHex(signature);
  const depositDataRootBuffer = bufferHex(depositDataRoot);
  const domain = bufferHex(
    "0300000000000000000000000000000000000000000000000000000000000000"
  );
  const signingRoot = sha256(Buffer.concat([depositDataRootBuffer, domain]));
  return verify(pubkeyBuffer, signingRoot, signatureBuffer);
};
