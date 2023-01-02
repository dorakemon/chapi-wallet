/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getControllerAndPubKeyFromDidKey } from "../didkey-utils";

import {
  builtinContexts,
  builtinDIDDocs,
  customLoader
} from "./customDocumentLoader";

export const overrideDocumentLoader = (overrideDocs: [string, any][]) => {
  const didDocs = builtinDIDDocs;
  const contexts = builtinContexts;
  const didDocsValidated = new Map(
    [...builtinDIDDocs.keys()].map((k) => [k, true])
  );
  const contextsValidated = new Map(
    [...builtinContexts.keys()].map((k) => [k, true])
  );

  const validatedDIDDocs = [...didDocs.entries()].filter(([k, _]) =>
    didDocsValidated.get(k)
  );
  const parsedValidatedDIDDocs: [string, any][] = validatedDIDDocs.map(
    ([id, value]) => [id, JSON.parse(value)]
  );
  const validatedContexts = [...contexts.entries()].filter(([k, _]) =>
    contextsValidated.get(k)
  );
  const parsedValidatedContexts: [string, any][] = validatedContexts.map(
    ([id, value]) => [id, JSON.parse(value)]
  );

  // NOTE: overrideDocsで既存のcontextやdidのドキュメントを上書きする
  const validatedDocs = new Map([
    ...parsedValidatedDIDDocs,
    ...parsedValidatedContexts,
    ...overrideDocs
  ]);
  return customLoader(validatedDocs);
};

/**
 * 複数VCからVCに記述されたdidkeyのdiddocを生成する
 * @param credentials
 * @returns
 */
export const didkeyDocuments = async (credentials: any[]) => {
  const overrideDocument: [string, any][] = [];

  try {
    for (const credential of credentials) {
      const didkey = credential.proof.verificationMethod;
      // NOTE: DIDDocのDIDコントローラのDIDDocも登録する必要がある
      // NOTE: contorollerを一時的に設定する
      const { controller, publicKeyBase58 } =
        await getControllerAndPubKeyFromDidKey(didkey);
      overrideDocument.push([
        didkey,
        {
          "@context": "https://w3id.org/security/v2",
          id: didkey,
          type: "Bls12381G2Key2020",
          controller: controller,
          publicKeyBase58
        }
      ]);
      overrideDocument.push([
        controller,
        {
          "@context": "https://w3id.org/security/v2",
          id: controller,
          assertionMethod: [didkey]
        }
      ]);
    }
  } catch (e: any) {
    throw new Error(e);
  }

  return overrideDocument;
};
