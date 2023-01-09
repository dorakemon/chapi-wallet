import { Button, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
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

  const { sigRequest, createSignatureRequestHandler } =
    useCreateSignatureRequest();

  useEffect(() => {
    const init = async () => {
      const _sigRequest = await createSignatureRequestHandler(
        props.sigRequestInput
      );
      props.setSigRequest({
        commitment: _sigRequest.commitment,
        challengeHash: _sigRequest.challengeHash,
        proofOfHiddenMessages: _sigRequest.proofOfHiddenMessages
      });
      localStorage.setItem(
        props.sigRequestInput.nonce,
        _sigRequest.blindingFactor
      );
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.sigRequestInput]);

  const retBtnHandler = () => {
    if (!sigRequest) return;
    localStorage.setItem(
      props.sigRequestInput.nonce,
      sigRequest.blindingFactor
    );
    props.closeHandler();
  };

  return (
    <Grid direction="column" justifyContent="center" mt={2} mb={2} container>
      <Grid item>
        <Grid
          direction="row"
          alignItems="start"
          justifyContent="center"
          spacing={3}
          maxWidth="90vw"
          container
        >
          <Grid md={6} sm={12} item>
            <Typography variant="subtitle1">
              Credential Store Request Input
            </Typography>
            <SyntaxHighlighter language="json" style={monokaiSublime}>
              {sigReqInputJson}
            </SyntaxHighlighter>
          </Grid>
          <Grid md={6} sm={12} item>
            <Typography variant="subtitle1">
              Credential Store Request
            </Typography>
            <SyntaxHighlighter language="json" style={monokaiSublime}>
              {sigRequest ? JSON.stringify(sigRequest, null, 2) : ""}
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
