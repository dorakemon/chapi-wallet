/**
 * @description input document type
 */
export type InputDocument = {
  "@context": string[];
  id: string;
  type: string | string[];
  issuer: string;
  issuanceDate: string;
  expirationDate: string;
  credentialSubject: object;
};
