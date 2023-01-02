import { BbsTermwiseSignature2021 } from "@zkp-ld/jsonld-signatures-bbs";

import { InputDocument } from "@/domain/models";

import { overrideDocumentLoader } from "../document-loader";

export const countMessages = async (document: InputDocument) => {
  const proof = {
    "@context": "https://zkp-ld.org/bbs-termwise-2021.jsonld",
    type: "BbsTermwiseSignature2021",
    created: "temp",
    verificationMethod: "did:key:temp",
    proofPurpose: "assertionMethod"
  };
  const documentLoader = overrideDocumentLoader([]);
  const sign = new BbsTermwiseSignature2021({});
  const messages = (
    await sign.createVerifyData({
      proof,
      document: document,
      documentLoader,
      expansionMap: undefined,
      compactProof: true
    })
  ).flatMap((statement) => statement.serialize());
  return messages.length;
};
