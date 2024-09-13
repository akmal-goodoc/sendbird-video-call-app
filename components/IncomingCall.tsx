import React from "react";
import { Button, Typography } from "@mui/material";

interface IncomingCallProps {
  callerId: string;
  acceptCall: () => void;
  declineCall: () => void;
}

const IncomingCall: React.FC<IncomingCallProps> = ({
  callerId,
  acceptCall,
  declineCall,
}) => {
  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <Typography variant="h5">Incoming Call</Typography>
      <Typography variant="subtitle1">{callerId}</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={acceptCall}
        style={{ margin: 10 }}
      >
        Accept
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={declineCall}
        style={{ margin: 10 }}
      >
        Decline
      </Button>
    </div>
  );
};

export default IncomingCall;
