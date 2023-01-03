import { Button, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setCookie, _1] = useCookies();

  const { sigRequest, createSignatureRequestHandler } =
    useCreateSignatureRequest();

  useEffect(() => {
    const init = async () => {
      const sigRequest = await createSignatureRequestHandler(
        props.sigRequestInput
      );
      props.setSigRequest({
        commitment: sigRequest.commitment,
        challengeHash: sigRequest.challengeHash,
        proofOfHiddenMessages: sigRequest.proofOfHiddenMessages
      });
      // FIXME: Cookie oftions
      setCookie(props.sigRequestInput.nonce, sigRequest.blindingFactor);
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.sigRequestInput]);

  const retBtnHandler = () => {
    if (!sigRequest) return;
    props.closeHandler();
  };

  return (
    <Grid direction="column" justifyContent="center" container>
      <Grid item>
        <Grid
          direction="row"
          alignItems="start"
          justifyContent="center"
          spacing={3}
          maxWidth="90vw"
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
