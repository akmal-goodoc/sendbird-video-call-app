import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as styles from "./styles";
import * as SendBirdCall from "sendbird-calls";

const HomePage = () => {
  const router = useRouter();
  const [appId, setAppId] = useState("6C5681E6-22C1-4139-82EB-DFF96E687335");
  const [calleeId, setCalleeId] = useState("");

  useEffect(() => {
    // Initialize SendBirdCall
    SendBirdCall.init(appId);

    // Authenticate user (You may want to generate a random user ID or prompt the user)
    const userId = `123456`;
    authenticateUser(userId);

    SendBirdCall.addListener("call-status-listener", {
      onRinging: (call) => {
        call.accept({
          callOption: {
            localMediaView: document.getElementById(
              "local_video"
            ) as HTMLVideoElement,
            remoteMediaView: document.getElementById(
              "remote_video"
            ) as HTMLVideoElement,
            audioEnabled: true,
            videoEnabled: true,
          },
          holdActiveCall: false,
        });
      },
      //   onVideoInputDeviceChanged: (call) => {},
    });

    // Cleanup on component unmount
    return () => {
      SendBirdCall.removeListener("call-status-listener");
    };
  }, []);

  const handleCall = () => {
    if (appId && calleeId) {
      // Store the appId and calleeId in session storage to pass to the call page
      sessionStorage.setItem("sendbird_app_id", appId);
      sessionStorage.setItem("sendbird_callee_id", calleeId);
      router.push("/call");
    } else {
      alert("Please enter both the Application ID and Callee ID.");
    }
  };

  return (
    <div className={styles.containerStyle}>
      <h1 className={styles.titleStyle}>Video Call App</h1>
      <div className={styles.formStyle}>
        <input
          type="text"
          placeholder="Enter SendBird Application ID"
          value={appId}
          onChange={(e) => setAppId(e.target.value)}
          className={styles.inputStyle}
        />
        <input
          type="text"
          placeholder="Enter Callee ID"
          value={calleeId}
          onChange={(e) => setCalleeId(e.target.value)}
          className={styles.inputStyle}
        />
        <button onClick={handleCall} className={styles.buttonStyle}>
          Call
        </button>
      </div>
    </div>
  );
};

// Authentication function for users
const authenticateUser = async (userId: string) => {
  const authOption = { userId };
  try {
    const user = await SendBirdCall.authenticate(authOption);
    await SendBirdCall.connectWebSocket();
    console.log("User authenticated and connected:", user);
  } catch (error) {
    console.error("Error authenticating user:", error);
  }
};

export default HomePage;
