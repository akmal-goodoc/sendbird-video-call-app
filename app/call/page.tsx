"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SendBirdCall, { DirectCall } from "sendbird-calls";

import * as styles from "./style";

const CallPage = () => {
  const router = useRouter();
  const [call, setCall] = useState<DirectCall | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isFrontCamera, setIsFrontCamera] = useState(true);

  useEffect(() => {
    // Get appId and calleeId from session storage
    const appId = sessionStorage.getItem("sendbird_app_id");
    const calleeId = sessionStorage.getItem("sendbird_callee_id");

    if (!appId || !calleeId) {
      alert("Missing Application ID or Callee ID. Returning to home page.");
      router.push("/");
      return;
    }

    // Initialize SendBirdCall
    SendBirdCall.init(appId);

    // Authenticate user (You may want to generate a random user ID or prompt the user)
    const userId = `user_${new Date().getTime()}`;
    authenticateUser(userId)
      .then(() => {
        startCall(calleeId);
      })
      .catch((error) => {
        console.error("Authentication error:", error);
        alert("Authentication failed. Returning to home page.");
        router.push("/");
      });

    // Cleanup on component unmount
    return () => {
      if (call) {
        call.end();
      }
    };
  }, []);

  const authenticateUser = async (userId: string) => {
    const authOption = { userId };
    await SendBirdCall.authenticate(authOption);
    await SendBirdCall.connectWebSocket();
  };

  const startCall = (calleeId: string) => {
    const localVideoView = document.getElementById(
      "local_video_element"
    ) as HTMLVideoElement;
    const remoteVideoView = document.getElementById(
      "remote_video_element"
    ) as HTMLVideoElement;

    const dialParams = {
      userId: calleeId,
      isVideoCall: true,
      callOption: {
        localMediaView: localVideoView,
        remoteMediaView: remoteVideoView,
        audioEnabled: isAudioEnabled,
        videoEnabled: isVideoEnabled,
      },
    };

    const directCall = SendBirdCall.dial(dialParams, (call, error) => {
      if (error) {
        console.error("Dial error:", error);
        alert("Failed to make a call. Returning to home page.");
        router.push("/");
        return;
      }
      setCall(call as DirectCall);
    });

    directCall.onEnded = (call) => {
      console.log("Call ended:", call);
      router.push("/");
    };
  };

  const endCall = () => {
    if (call) {
      call.end();
      router.push("/");
    }
  };

  const toggleAudio = () => {
    if (call) {
      if (isAudioEnabled) {
        call.muteMicrophone();
      } else {
        call.unmuteMicrophone();
      }
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  const toggleVideo = () => {
    if (call) {
      if (isVideoEnabled) {
        call.stopVideo();
      } else {
        call.startVideo();
      }
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  const switchCamera = () => {
    if (call) {
      //   call.switchCamera();

      //switch Camera logic
      setIsFrontCamera(!isFrontCamera);
    }
  };

  return (
    <div className={styles.callContainerStyle}>
      <video
        id="remote_video_element"
        autoPlay
        playsInline
        className={styles.remoteVideoStyle}
      ></video>
      <video
        id="local_video_element"
        autoPlay
        playsInline
        muted
        className={styles.localVideoStyle}
      ></video>
      <div className={styles.controlsContainerStyle}>
        <button onClick={toggleAudio} className={styles.controlButtonStyle}>
          {isAudioEnabled ? "Mute" : "Unmute"}
        </button>
        <button onClick={toggleVideo} className={styles.controlButtonStyle}>
          {isVideoEnabled ? "Stop Video" : "Start Video"}
        </button>
        <button onClick={switchCamera} className={styles.controlButtonStyle}>
          Switch Camera
        </button>
        <button onClick={endCall} className={styles.endButtonStyle}>
          End Call
        </button>
      </div>
    </div>
  );
};

export default CallPage;
