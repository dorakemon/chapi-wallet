import { Box, Typography } from "@mui/material";
import * as CredentialHandlerPolyfill from "credential-handler-polyfill";
import { useEffect, useRef, useState } from "react";
import * as WebCredentialHandler from "web-credential-handler";

import { MEDIATOR } from "@/config";
import { SignatureRequest, StoreEventPayload, VCType } from "@/domain/models";
import { CreateBoundVc } from "@/features/bound-vc";
import { CreateSignatureRequest } from "@/features/signature-request";
import { VerifyUnboundVc } from "@/features/unbound-vc";

export const CredentialStore = () => {
  const storeEvent = useRef<any | null>(null);
  const [storeEventPayload, setStoreEventPayload] =
    useState<StoreEventPayload | null>(null);
  const [returnValue, setReturnValue] = useState<
    VCType | SignatureRequest | null
  >(null);

  useEffect(() => {
    CredentialHandlerPolyfill.loadOnce(MEDIATOR).then(handleStoreEvent);
  }, []);

  const handleStoreEvent = async () => {
    const event = await WebCredentialHandler.receiveCredentialEvent();
    storeEvent.current = event;
    const dataType: string = event.credential.dataType;
    console.log("Store Credential Event:", event.type, event);
    if (dataType === "CreateCommitmentRequest") {
      setStoreEventPayload({
        type: "CreateSignatureRequest",
        payload: event.credential.data
      });
    } else if (dataType === "BoundVerifiableCredential") {
      setStoreEventPayload({
        type: "StoreBoundCredential",
        payload: event.credential.data
      });
    } else if (dataType === "VerifiableCredential") {
      setStoreEventPayload({
        type: "StoreUnboundCredential",
        payload: event.credential.data
      });
    } else {
      throw new Error(`${event.type} is not supported`);
    }
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
          if (!storeEventPayload) return resolve(null);
          if (returnValue)
            return resolve({
              dataType: storeEventPayload.type,
              data: returnValue
            });
          return resolve({
            dataType: storeEventPayload.type
          });
        })
      );
    } else {
      console.error("storeevent is nothing");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="start"
      alignItems="center"
      flexDirection="column"
      width="100vw"
      sx={{ mt: 4 }}
    >
      <Typography variant="h4" textAlign="center">
        Store Wallet Page
      </Typography>
      {storeEventPayload &&
      storeEventPayload.type === "CreateSignatureRequest" ? (
        <CreateSignatureRequest
          sigRequestInput={storeEventPayload.payload}
          setSigRequest={(sigRequest: SignatureRequest) =>
            setReturnValue(sigRequest)
          }
          closeHandler={closeWindow}
        />
      ) : null}
      {storeEventPayload &&
      storeEventPayload.type === "StoreBoundCredential" ? (
        <CreateBoundVc
          nonce={storeEventPayload.payload.nonce}
          blindBoundVc={storeEventPayload.payload.vc}
          onCloseBtnClicked={closeWindow}
        />
      ) : null}
      {storeEventPayload &&
      storeEventPayload.type === "StoreUnboundCredential" ? (
        <VerifyUnboundVc
          unboundVc={storeEventPayload.payload}
          onCloseBtnClicked={closeWindow}
        />
      ) : null}
    </Box>
  );
};
