import { MEDIATOR } from "@/config";
import { useEffect, useRef, useState } from "react";
import * as WebCredentialHandler from "web-credential-handler";
import * as CredentialHandlerPolyfill from "credential-handler-polyfill";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

export const CredentialStore = () => {
  const [credential, setCredential] = useState("{}");
  const [vcType, setVcType] = useState("sample-vc");

  const storeEvent = useRef<any | null>(null);

  useEffect(() => {
    CredentialHandlerPolyfill.loadOnce(MEDIATOR).then(handleStoreEvent);
  }, []);

  const handleStoreEvent = async () => {
    const event = await WebCredentialHandler.receiveCredentialEvent();
    storeEvent.current = event;
    console.log("Store Credential Event:", event.type, event);
    //Your wallet's code for storing a Verifiable Credential

    const vc = event.credential.data.verifiableCredential[0];
    if (vc) {
      setCredential(JSON.stringify(vc, null, 4));
      setVcType(vc.type[vc.length - 1]);
    }
  };

  const downloadVc = () => {
    const link = document.createElement("a");
    link.href = credential;
    link.download = `${vcType}.json`;
  };

  /**
   * @param storeEvent
   * @param {VerifiablePresentation|null} data - Return (to client application)
   *   exactly what was stored, or a `null` if canceled by the user.
   */
  const closeWindow = () => {
    if (storeEvent.current) {
      storeEvent.current.respondWith(
        new Promise((resolve) => {
          return credential
            ? resolve({ dataType: "VerifiablePresentation", data: credential })
            : resolve(null);
        })
      );
    } else {
      console.error("storeevent is nothing");
    }
  };

  return (
    <div>
      <h2>Credential Store Page</h2>
      <SyntaxHighlighter language="json">{credential}</SyntaxHighlighter>
      <button onClick={downloadVc}>Download VC</button>
      <button onClick={closeWindow}>Close Window</button>
    </div>
  );
};
