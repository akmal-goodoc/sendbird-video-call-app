import { useState } from "react";
import * as SendBirdCall from "sendbird-calls";
import { DirectCall } from "sendbird-calls";

import * as styles from "./styles";

const SendBirdView = () => {
  const [call, setCall] = useState<DirectCall | null>(null);
  const [isCalling, setIsCalling] = useState<boolean>(false);
  const [isCallStarted, setIsCallStarted] = useState<boolean>(false);
  const [calleeId, setCalleeId] = useState<string>(
    "sendbird_desk_agent_id_61a041f4-3689-4749-8707-7ae0bf99f8bb"
  ); // Field for the user ID of the person to call

  // When the component mounts, initialize SendBird
  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     SendBirdCall.init('6C5681E6-22C1-4139-82EB-DFF96E687335'); // Replace with your SendBird App ID

  //     authenticateUser(
  //       'sendbird_desk_agent_id_61a041f4-3689-4749-8707-7ae0bf99f8bb', // Change user A ID or B ID as per requirement
  //       '778d65ec059b00b28d42228e5e69a084db0d9a8a'
  //     ); // Authenticate the user

  //     setupIncomingCallListener();
  //   }
  // }, []);

  const setupIncomingCallListener = () => {
    // SendBirdCall.init('6C5681E6-22C1-4139-82EB-DFF96E687335'); // Replace with your SendBird App ID

    // authenticateUser(
    //   'sendbird_desk_agent_id_61a041f4-3689-4749-8707-7ae0bf99f8bb', // Change user A ID or B ID as per requirement
    //   '778d65ec059b00b28d42228e5e69a084db0d9a8a'
    // );
    const listenerId = "123456";
    SendBirdCall.addListener(listenerId, {
      onRinging: (incomingCall: DirectCall) => {
        const localVideo = document.getElementById(
          "local_video"
        ) as HTMLVideoElement;
        const remoteVideo = document.getElementById(
          "remote_video"
        ) as HTMLVideoElement;
        const acceptParams = {
          callOption: {
            localMediaView: localVideo,
            remoteMediaView: remoteVideo,
            audioEnabled: true,
            videoEnabled: true,
          },
        };

        incomingCall.accept(acceptParams);
        setCall(incomingCall);
        setIsCallStarted(true);
        setupCallEventHandlers(incomingCall);
      },
    });

    return () => {
      SendBirdCall.removeListener(listenerId);
    };
  };

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
      await SendBirdCall.init("6C5681E6-22C1-4139-82EB-DFF96E687335"); // Replace with your SendBird App ID

      await authenticateUser(
        "123456", // Change user A ID or B ID as per requirement
        "41666e42ed03ebab2b7b7c35c0cf5716ae55c41e"
      );

      await setupIncomingCallListener();
    } catch (e) {
      console.log("ERROR IN CONNECTION >>>>", e);
    }

    const localVideo = document.getElementById(
      "local_video"
    ) as HTMLVideoElement;
    const remoteVideo = document.getElementById(
      "remote_video"
    ) as HTMLVideoElement;

    const callOption = {
      isVideoCall: true,
      callOption: {
        localMediaView: localVideo,
        remoteMediaView: remoteVideo,
        audioEnabled: true,
        videoEnabled: true,
      },
    };

    try {
      const dialParams = {
        userId: calleeId, // ID of the person you are calling
        isVideoCall: true,
        callOption: {
          localMediaView: localVideo,
          remoteMediaView: remoteVideo,
          audioEnabled: true,
          videoEnabled: true,
        },
      };

      const newCall = SendBirdCall.createRoom({
        roomType: SendBirdCall.RoomType.SMALL_ROOM_FOR_VIDEO,
      })
        .then((room) => {
          const enterParams = {
            videoEnabled: true,
            audioEnabled: true,
          };
          console.log("room >>>>>", room);
          room
            .enter(enterParams)
            .then(() => {
              // User has successfully entered room.
            })
            .catch((e) => {
              // Handle error
            });
        })
        .catch((error) => console.log("error while creating a room", error));
      // const newCall = SendBirdCall.createRoom(dialParams, (call, error) => {
      //   if (error) {
      //     console.error('Error making call:', error);
      //   } else {
      //     console.log('Call started:', call);
      //     setupCallEventHandlers(call as SendBirdCall.DirectCall);
      //   }
      // });

      // setCall(newCall);
      setIsCalling(true);
    } catch (error) {
      console.error("Error making call:", error);
    }
  };

  const endCall = () => {
    if (call) {
      call.end();
      setIsCalling(false);
      setIsCallStarted(false);
    }
  };

  return (
    <div className={styles.containerStyle}>
      <h1 className={styles.titleStyle}>Video Call with SendBird</h1>
      <div className={styles.videosStyle}>
        <div className={styles.videoContainerStyle}>
          <video
            id="local_video"
            autoPlay
            playsInline
            className={styles.videoStyle}
          ></video>
          <p className={styles.videoLabelStyle}>Your Video</p>
        </div>
        <div className={styles.videoContainerStyle}>
          <video
            id="remote_video"
            autoPlay
            playsInline
            className={styles.videoStyle}
          ></video>
          <p className={styles.videoLabelStyle}>Remote Video</p>
        </div>
      </div>

      <div className={styles.buttonsStyle}>
        {!isCalling && !isCallStarted && (
          <>
            <input
              type="text"
              placeholder="Enter User ID to Call"
              value={calleeId}
              onChange={(e) => setCalleeId(e.target.value)}
              className={styles.inputStyle}
            />
            <button className={styles.callButtonStyle} onClick={makeCall}>
              Call User
            </button>
          </>
        )}
        {isCalling && !isCallStarted && (
          <p className={styles.statusMessageStyle}>Calling {calleeId}...</p>
        )}
        {isCallStarted && (
          <button className={styles.endButtonStyle} onClick={endCall}>
            End Call
          </button>
        )}
      </div>
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
