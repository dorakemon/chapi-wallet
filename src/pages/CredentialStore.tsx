import { useEffect } from "react";
import * as WebCredentialHandler from "web-credential-handler";
// import * as CredentialHandlerPolyfill from "credential-handler-polyfill";

export const CredentialStore = () => {
  useEffect(() => {
    const handleStoreEvent = async () => {
      const event = await WebCredentialHandler.receiveCredentialEvent();
      console.log("Store Credential Event:", event.type, event);

      //Your wallet's code for storing a Verifiable Credential
    };

    handleStoreEvent();
  });
  return <></>;
};
