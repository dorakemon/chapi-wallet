import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokaiSublime } from "react-syntax-highlighter/dist/cjs/styles/hljs";

import { SignatureRequest, SignatureRequestInput } from "@/domain/models";

import { useCreateSignatureRequest } from "../hooks/useCreateSignatureRequest";

type Props = {
  sigRequestInput: SignatureRequestInput;
  setSigRequest: (sigRequest: SignatureRequest) => void;
  closeHandler: () => void;
};

export const CreateSignatureRequest: React.FC<Props> = (props) => {
  const sigReqInputJson = JSON.stringify(props.sigRequestInput, null, 2);
  const [sigReqJson, setSigReqJson] = useState("");

  const { sigRequest, createSignatureRequestHandler } =
    useCreateSignatureRequest();

  useEffect(() => {
    const init = async () => {
      const sigRequest = await createSignatureRequestHandler(
        props.sigRequestInput
      );
      setSigReqJson(JSON.stringify(sigRequest, null, 2));
    };
    init();
  }, [createSignatureRequestHandler, props.sigRequestInput]);

  const retBtnHandler = () => {
    if (!sigRequest) return;
    props.setSigRequest(sigRequest);
    props.closeHandler();
  };

  return (
    <Grid
      direction="column"
      justifyContent="center"
      // alignItems="center"
      container
    >
      <Grid item>
        <Grid
          direction="row"
          alignItems="start"
          justifyContent="center"
          spacing={3}
          container
        >
          <Grid sm={6} xs={12} item>
            <Typography variant="subtitle1">
              Credential Store Request Input
            </Typography>
            <SyntaxHighlighter language="json" style={monokaiSublime}>
              {sigReqInputJson}
            </SyntaxHighlighter>
          </Grid>
          <Grid sm={6} xs={12} item>
            <Typography variant="subtitle1">
              Credential Store Request
            </Typography>
            <SyntaxHighlighter language="json" style={monokaiSublime}>
              {sigReqJson}
            </SyntaxHighlighter>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container justifyContent="center">
          <Button variant="contained" onClick={retBtnHandler}>
            Return Commitment
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
