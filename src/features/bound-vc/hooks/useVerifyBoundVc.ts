import {
  Bls12381G2KeyPair,
  BoundBbsTermwiseSignature2022
} from "@zkp-ld/jsonld-signatures-bbs";
import jsigs from "jsonld-signatures";
import { useState } from "react";

import { VCType } from "@/domain/models";
import { bufferToTypedBytes } from "@/libs/bound-vc-utils/utilities";
import {
  didkeyDocuments,
  overrideDocumentLoader
} from "@/libs/document-loader";

import { HolderKeyObj } from "../../../../test/fixtures";
import { VerifyStatus } from "../constants/verify-status";

export const useVerifyBoundVc = () => {
  const [verifyStatus, setVerifyStatus] = useState<VerifyStatus>("unchecked");

  const initializeStatus = () => {
    setVerifyStatus("unchecked");
  };

  const verifyVcHandler = async (vc: VCType) => {
    let status: "valid" | "invalid";
    try {
      const overrideDocument = await didkeyDocuments([vc]);
      const documentLoader = overrideDocumentLoader(overrideDocument);

      const proverSecretKey = await Bls12381G2KeyPair.fromJwk({
        publicKeyJwk: HolderKeyObj.public,
        privateKeyJwk: HolderKeyObj.private
      });
      const result = await jsigs.verify(vc, {
        suite: new BoundBbsTermwiseSignature2022({
          holderSecretKey: bufferToTypedBytes(
            new Uint8Array(proverSecretKey.privateKeyBuffer as Uint8Array)
          )
        }),
        purpose: new jsigs.purposes.AssertionProofPurpose(),
        documentLoader,
        expansionMap: false,
        compactProof: true
      });
      if (result.verified === true) {
        status = "valid";
      } else {
        status = "invalid";
      }
    } catch (e) {
      console.error(e);
      status = "invalid";
    }
    setVerifyStatus(status);
  };

  return { verifyStatus, verifyVcHandler, initializeStatus };
};
