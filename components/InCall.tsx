import React from "react";
import { Button, Typography } from "@mui/material";

interface InCallProps {
  calleeId: string;
  endCall: () => void;
}

const InCall: React.FC<InCallProps> = ({ calleeId, endCall }) => {
  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <Typography variant="h5">In Call with {calleeId}</Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={endCall}
        style={{ marginTop: 20 }}
      >
        End Call
      </Button>
    </div>
  );
};

export default InCall;
