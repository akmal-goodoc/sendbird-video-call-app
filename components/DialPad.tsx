import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import SendBirdCall, { DirectCall } from "sendbird-calls";

const DialPad: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleCall = async () => {
    const localVideo = document.getElementById(
      "local_video"
    ) as HTMLVideoElement;
    const remoteVideo = document.getElementById(
      "remote_video"
    ) as HTMLVideoElement;
    const dialParams = {
      userId: phoneNumber,
      isVideoCall: false,
      callOption: {
        localMediaView: localVideo,
        remoteMediaView: remoteVideo,
        audioEnabled: true,
        videoEnabled: false,
      },
    };

    try {
      const call: DirectCall = SendBirdCall.dial(dialParams, (call, error) => {
        if (error) {
          console.error("Dial error:", error);
          return;
        }
        // Proceed to in-call screen
      });
    } catch (error) {
      console.error("Call initiation error:", error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <TextField
        label="Phone Number"
        variant="outlined"
        fullWidth
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleCall}
        style={{ marginTop: 20 }}
      >
        Call
      </Button>
    </div>
  );
};

export default DialPad;
