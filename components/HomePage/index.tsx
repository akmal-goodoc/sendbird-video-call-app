import { useState } from "react";
import { useRouter } from "next/navigation";
import * as styles from "./styles";

const HomePage = () => {
  const router = useRouter();
  const [appId, setAppId] = useState("6C5681E6-22C1-4139-82EB-DFF96E687335");
  const [calleeId, setCalleeId] = useState(
    "sendbird_desk_agent_id_61a041f4-3689-4749-8707-7ae0bf99f8bb"
  );
  const [callerId, setCallerId] = useState("11111");

  const handleCall = () => {
    if (appId && calleeId) {
      // Store the appId and calleeId in session storage to pass to the call page
      sessionStorage.setItem("sendbird_app_id", appId);
      sessionStorage.setItem("sendbird_callee_id", calleeId);
      sessionStorage.setItem("sendbird_caller_id", callerId);
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
        <input
          type="text"
          placeholder="Enter Callee ID"
          value={callerId}
          onChange={(e) => setCallerId(e.target.value)}
          className={styles.inputStyle}
        />
        <button onClick={handleCall} className={styles.buttonStyle}>
          Call
        </button>
      </div>
    </div>
  );
};

export default HomePage;
