import { Button, Chip, Grid, Typography } from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokaiSublime } from "react-syntax-highlighter/dist/cjs/styles/hljs";

import { VCType } from "@/domain/models";
import { useDownloadFile } from "@/hooks";

import { VerifyChipStyle } from "../constants/verify-status";
import { useUnblindBoundVc } from "../hooks/useUnblindBoundVc";
import { useVerifyBoundVc } from "../hooks/useVerifyBoundVc";

type Props = {
  blindBoundVc: VCType;
  onCloseBtnClicked: () => void;
};

export const CreateBoundVc: React.FC<Props> = (props) => {
  const { unblindedVc, unblindVcHandler } = useUnblindBoundVc();
  const { verifyStatus, verifyVcHandler } = useVerifyBoundVc();

  const { downloadFile } = useDownloadFile();

  const downloadHandler = () => {
    downloadFile({
      filename: "VC.json",
      content: JSON.stringify(unblindedVc, null, 2),
      fileType: "text/json"
    });
  };

  const unblindHandler = () => {
    // FIXME: get from cookie
    unblindVcHandler(props.blindBoundVc, "");
  };

  return (
    <Grid justifyContent="center" container direction="column" mt={2}>
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
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="subtitle1">Blind Bound VC</Typography>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={unblindHandler}>
                  Unblind
                </Button>
              </Grid>
            </Grid>
            <SyntaxHighlighter language="json" style={monokaiSublime}>
              {JSON.stringify(props.blindBoundVc, null, 2)}
            </SyntaxHighlighter>
          </Grid>
          <Grid sm={6} xs={12} item>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="subtitle1">Bound VC</Typography>
              </Grid>
              <Grid item>
                <Chip
                  label={VerifyChipStyle[verifyStatus].text}
                  color={VerifyChipStyle[verifyStatus].color}
                  variant={VerifyChipStyle[verifyStatus].variant}
                  onClick={() => verifyVcHandler(unblindedVc!)}
                  sx={{ height: "36.5px" }}
                />
              </Grid>
            </Grid>
            <SyntaxHighlighter language="json" style={monokaiSublime}>
              {unblindedVc ? JSON.stringify(unblindedVc, null, 2) : ""}
            </SyntaxHighlighter>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container justifyContent="center" spacing={3}>
          <Grid item>
            <Button variant="contained" onClick={downloadHandler}>
              Download
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={props.onCloseBtnClicked}>
              Close
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
