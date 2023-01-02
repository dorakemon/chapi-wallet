import { Buffer } from "buffer";

import type { DidDocument } from "@transmute/did-key-common/dist/types";
import { Bls12381G2KeyPair } from "@zkp-ld/bls12381-key-pair";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.Buffer = Buffer;

export const resolveDidKey: (didkey: string) => Promise<DidDocument> = async (
  didkey
) => {
  /**
   * @description avoid "process is not found" error when import below
   */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.process = { version: { node: "" } };
  const { resolve } = await import("@transmute/did-key-bls12381");
  const { didDocument } = await resolve(didkey, {
    accept: "application/did+json"
  });
  return Promise.resolve(didDocument);
};

/**
 * documentLoaderのためにdidkeyからcontrollerとbase58のpublicKeyを取得する
 * @param didkey
 * @returns
 */
export const getControllerAndPubKeyFromDidKey = async (didkey: string) => {
  let diddoc: DidDocument;
  try {
    diddoc = await resolveDidKey(didkey);
  } catch (e) {
    throw new Error("Failed to resolve didkey");
  }
  const publicKeyJwk = (diddoc.verificationMethod[1] as any).publicKeyJwk;
  const publicKeyBase58 = (
    await Bls12381G2KeyPair.fromJwk({ publicKeyJwk: publicKeyJwk })
  ).publicKey;

  const controller = diddoc.verificationMethod[1].controller;

  return { controller, publicKeyBase58 };
};

/**
 * didkeyからZKP-LDの BLSKeyPairに変換する
 * @param didkey
 * @returns
 */
export const resolveDidkeyToZkpldKeyPair = async (didkey: string) => {
  const diddoc = await resolveDidKey(didkey);
  const publicKeyJwk = (diddoc.verificationMethod[1] as any).publicKeyJwk;
  return await Bls12381G2KeyPair.fromJwk({ publicKeyJwk: publicKeyJwk });
};
