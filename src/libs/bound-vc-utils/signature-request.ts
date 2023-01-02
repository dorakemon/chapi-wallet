import {
  boundedBlsSignatureRequest,
  BoundedBlsSignatureRequestContextRequest,
  BoundedBlsSignatureVerifyContextRequest,
  verifyBoundedBlsSignatureRequest
} from "@zkp-ld/bbs-signatures";
import { Bls12381G2KeyPair } from "@zkp-ld/bls12381-key-pair";

import { SignatureRequest } from "@/domain/models";
import {
  strToUint8arr,
  base64ToUint8Array,
  uint8ArrayToBase64
} from "@/libs/utils";

import { bufferToTypedBytes } from "./utilities";

type SignatureRequetProps = {
  issuerPublicKey: Bls12381G2KeyPair;
  proverSecretKey: Bls12381G2KeyPair;
  messageCount: number;
  nonce: string;
};

/**
 * Create Signature Request
 * @link https://github.com/zkp-ld/bls12381-key-pair/blob/094db05a4258c0b7683d638fe6d603446983ab8b/src/Bls12381G2KeyPair.ts#L77-L97
 *
 * @param props
 * @returns
 */
export const createSignatureRequest = async (
  props: SignatureRequetProps
): Promise<SignatureRequest> => {
  try {
    const request: BoundedBlsSignatureRequestContextRequest = {
      issuerPublicKey: new Uint8Array(props.issuerPublicKey.publicKeyBuffer),
      proverSecretKey: bufferToTypedBytes(
        new Uint8Array(props.proverSecretKey.privateKeyBuffer as Uint8Array)
      ),
      messageCount: props.messageCount,
      nonce: strToUint8arr(props.nonce)
    };
    const { commitment, proofOfHiddenMessages, challengeHash, blindingFactor } =
      await boundedBlsSignatureRequest(request);
    return {
      commitment: uint8ArrayToBase64(commitment),
      proofOfHiddenMessages: uint8ArrayToBase64(proofOfHiddenMessages),
      challengeHash: uint8ArrayToBase64(challengeHash),
      blindingFactor: uint8ArrayToBase64(blindingFactor)
    };
  } catch (e: any) {
    throw new Error(e);
  }
};

export type VerifySignatureRequetProps = {
  commitment: string;
  proofOfHiddenMessages: string;
  challengeHash: string;
  messageCount: number;
  publicKey: Bls12381G2KeyPair;
  nonce: string;
};

/**
 * Verify Signature Request
 * @param props
 * @returns
 */
export const verifySignatureRequest = async (
  props: VerifySignatureRequetProps
) => {
  try {
    const request: BoundedBlsSignatureVerifyContextRequest = {
      commitment: base64ToUint8Array(props.commitment),
      proofOfHiddenMessages: base64ToUint8Array(props.proofOfHiddenMessages),
      challengeHash: base64ToUint8Array(props.challengeHash),
      messageCount: props.messageCount,
      publicKey: new Uint8Array(props.publicKey.publicKeyBuffer),
      nonce: strToUint8arr(props.nonce)
    };
    const { verified, error } = await verifyBoundedBlsSignatureRequest(request);
    if (!verified) console.error(error);
    return verified;
  } catch (e: any) {
    throw new Error(e);
  }
};
