import { InputDocument } from "./input-document";

/**
 * @description VC Type
 */
export type VCType = InputDocument & {
  proof: {
    "@context": string;
    type: string;
    created: string;
    verificationMethod: string;
    proofPurpose: string;
    proofValue: string;
  };
};
