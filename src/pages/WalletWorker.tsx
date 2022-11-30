import * as WebCredentialHandler from "web-credential-handler";
import * as CredentialHandlerPolyfill from "credential-handler-polyfill";

import { useEffect } from "react";
import { MEDIATOR } from "@/config";

export const WalletWorker = () => {
  console.log("hello");
  useEffect(() => {
    const worker = async () => {
      try {
        await CredentialHandlerPolyfill.loadOnce(MEDIATOR);
      } catch (e) {
        console.error("Error in loadOnce:", e);
      }
      WebCredentialHandler.activateHandler({
        async get(event: any) {
          console.log("WCH: Received get() event:", event);
          return { type: "redirect", url: "/get-credential" };
        },
        async store(event: any) {
          console.log("WCH: Received store() event:", event);
          return { type: "redirect", url: "/store-credential" };
        }
      });
    };
    worker();
  });
  return <h3>Wallet Worker Page</h3>;
};
