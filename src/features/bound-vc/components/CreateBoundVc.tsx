import { Button, Grid, Typography } from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokaiSublime } from "react-syntax-highlighter/dist/cjs/styles/hljs";

import { VCType } from "@/domain/models";
import { useDownloadFile } from "@/hooks";

import { useUnblindBoundVc } from "../hooks/useUnblindBoundVc";
import { useVerifyBoundVc } from "../hooks/useVerifyBoundVc";

type Props = {
  blindBoundVc: VCType;
  onCloseBtnClicked: () => void;
};

const content = JSON.stringify(
  { asdf: "asdfsadfasdfasdkfjaslfdjaslkalsdfaslkdfj;aslkfj;laskjf;lsakdjf;lk" },
  null,
  2
);

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

  return (
    <Grid justifyContent="center" container direction="column" mt={2}>
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
              {content}
            </SyntaxHighlighter>
          </Grid>
          <Grid sm={6} xs={12} item>
            <Typography variant="subtitle1">
              Credential Store Request
            </Typography>
            <SyntaxHighlighter language="json" style={monokaiSublime}>
              {content}
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
