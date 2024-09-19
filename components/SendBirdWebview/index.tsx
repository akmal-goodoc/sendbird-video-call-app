/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as SendBirdCall from "sendbird-calls";
import { DirectCall } from "sendbird-calls";
import * as styles from "./styles";

const SendBirdView = () => {
  const [call, setCall] = useState<DirectCall | null>(null);
  //   const [isCalling, setIsCalling] = useState<boolean>(false);
  const [isCallStarted, setIsCallStarted] = useState<boolean>(false);
  const [calleeId, setCalleeId] = useState<string>("");
  const [appId, setAppId] = useState<string>("");
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [videoEnabled, setVideoEnabled] = useState<boolean>(true);

  const setupCallEventHandlers = (call: DirectCall) => {
    call.onEstablished = () => console.log("Call established");
    call.onConnected = () => {
      console.log("Call connected");
      setIsCallStarted(true);
    };
    call.onEnded = () => {
      console.log("Call ended");
      setIsCallStarted(false);
      setCall(null);
    };
  };

  const makeCall = async () => {
    try {
      await SendBirdCall.init(appId);

      await authenticateUser(
        "123456",
        "41666e42ed03ebab2b7b7c35c0cf5716ae55c41e"
      );

      const localVideo = document.getElementById(
        "local_video"
      ) as HTMLVideoElement;
      const remoteVideo = document.getElementById(
        "remote_video"
      ) as HTMLVideoElement;

      const room = SendBirdCall.dial(
        {
          // roomType: SendBirdCall.RoomType.SMALL_ROOM_FOR_VIDEO,
          userId: calleeId,
          isVideoCall: true,
          callOption: {
            localMediaView: localVideo,
            remoteMediaView: remoteVideo,
            audioEnabled: true,
            videoEnabled: true,
          },
          //   customItems?: CustomItems;
          //   sendBirdChatOptions?: SendBirdChatOptions;
          //   holdActiveCall?: boolean;
          //   webhook?: Webhook;
        },
        () => {}
      );
      setupCallEventHandlers(room);
      // .then((room) => {
      //   const enterParams = {
      //     videoEnabled,
      //     audioEnabled,
      //   };
      //   room
      //     .enter(enterParams)
      //     .then(() => {
      //       setupCallEventHandlers(room);
      //     })
      //     .catch((e) => {
      //       console.log("Error entering room", e);
      //     });
      // })
      // .catch((error) => console.log("Error creating room", error));
    } catch (error) {
      console.error("Error making call", error);
    }
  };

  const endCall = () => {
    if (call) {
      call.end();
      //   setIsCalling(false);
      setIsCallStarted(false);
    }
  };

  const toggleAudio = () => {
    if (call) {
      const newAudioState = !audioEnabled;
      //   call.updateMedia({
      //     audioEnabled: newAudioState,
      //   });
      setAudioEnabled(newAudioState);
    }
  };

  const toggleVideo = () => {
    if (call) {
      const newVideoState = !videoEnabled;
      //   call.updateMedia({
      //     videoEnabled: newVideoState,
      //   });
      setVideoEnabled(newVideoState);
    }
  };

  const switchCamera = () => {
    if (call) {
      //   call.switchCamera();
    }
  };

  return (
    <div css={styles.containerStyle}>
      <h1 css={styles.titleStyle}>Video Call with SendBird</h1>
      <input
        type="text"
        placeholder="Enter SendBird App ID"
        value={appId}
        onChange={(e) => setAppId(e.target.value)}
        css={styles.inputStyle}
      />
      <input
        type="text"
        placeholder="Enter User ID to Call"
        value={calleeId}
        onChange={(e) => setCalleeId(e.target.value)}
        css={styles.inputStyle}
      />
      <div css={styles.videoContainerStyle}>
        {/* Callee's (remote) video */}
        <video
          id="remote_video"
          autoPlay
          playsInline
          css={styles.remoteVideoStyle}
        ></video>
        {/* Caller's (local) video */}
        <video
          id="local_video"
          autoPlay
          playsInline
          css={styles.localVideoStyle}
        ></video>
      </div>

      <div css={styles.controlsContainerStyle}>
        {isCallStarted && (
          <>
            <button css={styles.controlButtonStyle} onClick={toggleAudio}>
              {audioEnabled ? "Mute Audio" : "Unmute Audio"}
            </button>
            <button css={styles.controlButtonStyle} onClick={toggleVideo}>
              {videoEnabled ? "Turn Off Video" : "Turn On Video"}
            </button>
            <button css={styles.endButtonStyle} onClick={endCall}>
              End Call
            </button>
            <button css={styles.switchCameraButtonStyle} onClick={switchCamera}>
              Switch Camera
            </button>
          </>
        )}
      </div>
      <button css={styles.endButtonStyle} onClick={makeCall}>
        Call
      </button>
    </div>
  );
};

// Authentication function for users
const authenticateUser = async (userId: string, accessToken: string) => {
  const authOption = { userId, accessToken };
  try {
    const user = await SendBirdCall.authenticate(authOption);
    await SendBirdCall.connectWebSocket();
    console.log("User authenticated and connected:", user);
  } catch (error) {
    console.error("Error authenticating user:", error);
  }
};

export default SendBirdView;
