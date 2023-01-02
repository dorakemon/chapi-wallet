import { BbsTermwiseSignature2021 } from "@zkp-ld/jsonld-signatures-bbs";
import jsigs from "jsonld-signatures";
import { useState } from "react";

import { VCType } from "@/domain/models";
import {
  didkeyDocuments,
  overrideDocumentLoader
} from "@/libs/document-loader";

import { VerifyStatus } from "../constants/verify-status";

export const useVerifyUnboundVc = () => {
  const [verifyStatus, setVerifyStatus] = useState<VerifyStatus>("unchecked");

  const initializeStatus = () => {
    setVerifyStatus("unchecked");
  };

  const verifyVcHandler = async (vc: VCType) => {
    let status: "valid" | "invalid";
    try {
      const overrideDocument = await didkeyDocuments([vc]);
      const documentLoader = overrideDocumentLoader(overrideDocument);
      const result = await jsigs.verify(vc, {
        suite: new BbsTermwiseSignature2021(),
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
      status = "invalid";
    }
    setVerifyStatus(status);
  };

  return { verifyStatus, verifyVcHandler, initializeStatus };
};
