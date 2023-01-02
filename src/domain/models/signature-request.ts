/**
 * @description Signature Request generated when create
 * Holder Secret Commitment
 */
export type SignatureRequest = {
  commitment: string;
  proofOfHiddenMessages: string;
  challengeHash: string;
  blindingFactor: string;
};

/**
 * @description Parameters for creating Signature Request
 */
export type SignatureRequestInput = {
  issuerDidKey: string;
  messageCount: number;
  nonce: string;
};
