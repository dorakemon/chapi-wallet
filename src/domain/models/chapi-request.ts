import { SignatureRequestInput } from "./signature-request";
import { VCType } from "./vc";

export type StoreEventPayload =
  | { type: "CreateSignatureRequest"; payload: SignatureRequestInput }
  | { type: "StoreBoundCredential"; payload: VCType }
  | { type: "StoreUnboundCredential"; payload: VCType };
