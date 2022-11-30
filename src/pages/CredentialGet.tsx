import * as WebCredentialHandler from "web-credential-handler";
// import * as CredentialHandlerPolyfill from "credential-handler-polyfill";
import { useEffect } from "react";

export const CredentialGet = () => {
  useEffect(() => {
    const handleGetEvent = async () => {
      const event = await WebCredentialHandler.receiveCredentialEvent();

      console.log("Wallet processing get() event:", event);

      //Your wallet's code for responding to a request for a Verifiable Credential
    };
    handleGetEvent();
  });
  return <></>;
};
