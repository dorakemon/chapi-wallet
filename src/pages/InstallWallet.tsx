import * as CredentialHandlerPolyfill from "credential-handler-polyfill";
import { useEffect } from "react";
import * as WebCredentialHandler from "web-credential-handler";

import { MEDIATOR } from "@/config";

export const InstallWallet = () => {
  useEffect(() => {
    // navigator.serviceWorker.register("/service-worker.js");
    const installWallet = async () => {
      await CredentialHandlerPolyfill.loadOnce(MEDIATOR);
      console.log("Ready to work with credentials!");
      await WebCredentialHandler.installHandler();
      console.log("Wallet installed.");
    };
    installWallet();
  }, []);

  return <h3>Install Wallet Page</h3>;
};
