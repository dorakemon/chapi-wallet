/* eslint-disable @typescript-eslint/no-explicit-any */
import { extendContextLoader } from "jsonld-signatures";

import bbsTermwiseContext from "./contexts/bbs-termwise-2021.json";
import bbsContext from "./contexts/bbs.json";
import boundBbsTermwiseContext from "./contexts/bound-bbs-termwise-2022.json";
import citizenVocab from "./contexts/citizen_vocab.json";
import credentialContext from "./contexts/credential_vocab.json";
import jwsContext from "./contexts/jws.json";
import odrlContext from "./contexts/odrl.json";
import schemaOrg from "./contexts/schemaOrg.json";
import securityV1 from "./contexts/security-v1.json";
import securityV2 from "./contexts/security-v2.json";
import securityV3 from "./contexts/v3_unstable.json";
import vcExampleContext from "./contexts/vc_example_vocab.json";
import exampleDidDoc from "./diddocs/did_example_489398593.json";
import exampleDidKey from "./diddocs/did_example_489398593_test.json";
import exampleDid826Doc from "./diddocs/did_example_82612387612873.json";
import exampleDid826Key from "./diddocs/did_example_82612387612873_test.json";
import exampleDidb34Doc from "./diddocs/did_example_b34ca6cd37bbf23.json";
import exampleDidb34Key from "./diddocs/did_example_b34ca6cd37bbf23_test.json";
import expExampleDidDoc from "./diddocs/exp_diddoc_issuer1.json";
import expExampleDidDoc2 from "./diddocs/exp_diddoc_issuer2.json";
import expExampleDidDoc3 from "./diddocs/exp_diddoc_issuer3.json";
import expExampleDidKey from "./diddocs/exp_didkey_issuer1.json";
import expExampleDidKey2 from "./diddocs/exp_didkey_issuer2.json";
import expExampleDidKey3 from "./diddocs/exp_didkey_issuer3.json";

const _prepareDocs = (obj: any): [string, string][] =>
  Object.entries(obj).map((e: [string, any]) => [
    e[0],
    JSON.stringify(e[1], null, 2)
  ]);

const _builtinDIDDocs = {
  "did:example:issuer1": expExampleDidDoc,
  "did:example:issuer1#bbs-bls-key1": expExampleDidKey,
  "did:example:issuer2": expExampleDidDoc2,
  "did:example:issuer2#bbs-bls-key1": expExampleDidKey2,
  "did:example:issuer3": expExampleDidDoc3,
  "did:example:issuer3#bbs-bls-key1": expExampleDidKey3,
  "did:example:489398593": exampleDidDoc,
  "did:example:489398593#test": exampleDidKey,
  "did:example:82612387612873": exampleDid826Doc,
  "did:example:82612387612873#test": exampleDid826Key,
  "did:example:b34ca6cd37bbf23": exampleDidb34Doc,
  "did:example:b34ca6cd37bbf23#test": exampleDidb34Key
};
export const builtinDIDDocs = new Map(_prepareDocs(_builtinDIDDocs));

export const _builtinContexts = {
  "https://www.w3.org/2018/credentials/v1": credentialContext,
  "https://www.w3.org/2018/credentials/examples/v1": vcExampleContext,
  "https://www.w3.org/ns/odrl.jsonld": odrlContext,
  "https://zkp-ld.org/bbs-termwise-2021.jsonld": bbsTermwiseContext,
  "https://zkp-ld.org/bound-bbs-termwise-2022.jsonld": boundBbsTermwiseContext,
  "https://sako-lab.jp/ssi-iot-demo/context.jsonld": bbsTermwiseContext,
  "https://w3id.org/security/suites/bls12381-2020/v1": bbsContext,
  "https://w3id.org/security/suites/jws-2020/v1": jwsContext,
  "https://w3id.org/security/bbs/v1": bbsContext,
  "https://w3id.org/security/v3-unstable": securityV3,
  "https://w3id.org/security/v2": securityV2,
  "https://w3id.org/security/v1": securityV1,
  "https://w3id.org/citizenship/v1": citizenVocab,
  "https://schema.org": schemaOrg,
  "https://schema.org/": schemaOrg,
  "http://schema.org/": schemaOrg
};
export const builtinContexts = new Map(_prepareDocs(_builtinContexts));

const customDocLoader =
  (documents: Map<string, any>) =>
  (url: string): any => {
    const context = documents.get(url);
    if (context) {
      return {
        contextUrl: null, // this is for a context via a link header
        document: context, // this is the actual document that was loaded
        documentUrl: url // this is the actual context URL after redirects
      };
    }

    throw new Error(
      `Error attempted to load document remotely, please cache '${url}'`
    );
  };

export const customLoader = (documents: Map<string, any>) =>
  extendContextLoader(customDocLoader(documents));
