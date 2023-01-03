import { SignatureRequestInput } from "./signature-request";
import { VCType } from "./vc";

export type StoreEventPayload =
  | { type: "CreateSignatureRequest"; payload: SignatureRequestInput }
  | { type: "StoreBoundCredential"; payload: { vc: VCType; nonce: string } }
  | { type: "StoreUnboundCredential"; payload: VCType };
