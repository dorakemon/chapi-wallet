import * as WebCredentialHandler from "web-credential-handler";
import * as CredentialHandlerPolyfill from "credential-handler-polyfill";
import { useEffect } from "react";
import { MEDIATOR } from "@/config";

const handleGetEvent = async () => {
  const event = await WebCredentialHandler.receiveCredentialEvent();

  console.log("Wallet processing get() event:", event);

  //Your wallet's code for responding to a request for a Verifiable Credential
};

export const CredentialGet = () => {
  useEffect(() => {
    CredentialHandlerPolyfill.loadOnce(MEDIATOR).then(handleGetEvent);
  });
  return <h2>Credential Get Page</h2>;
};
