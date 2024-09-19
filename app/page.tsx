"use client";
import HomePage from "@/components/HomePage";
// import SendBirdWebview from "@/components/SendBirdWebview";

export default function Home() {
  return (
    <div>
      <HomePage />
    </div>
    // <div
    //   style={{
    //     flex: 1,
    //     alignContent: "center",
    //     background: "fff",
    //     justifyContent: "center",
    //     border: "1px solid #000",
    //   }}
    // >
    //   <SendBirdWebview />
    // </div>
  );
}

// import { useState } from "react";
// import { useRouter } from "next/router";
// import * as styles from "./styles";

// const HomePage = () => {
//   const router = useRouter();
//   const [appId, setAppId] = useState("");
//   const [calleeId, setCalleeId] = useState("");

//   const handleCall = () => {
//     if (appId && calleeId) {
//       // Store the appId and calleeId in session storage to pass to the call page
//       sessionStorage.setItem("sendbird_app_id", appId);
//       sessionStorage.setItem("sendbird_callee_id", calleeId);
//       router.push("/call");
//     } else {
//       alert("Please enter both the Application ID and Callee ID.");
//     }
//   };

//   return (
//     <div className={styles.containerStyle}>
//       <h1 className={styles.titleStyle}>Video Call App</h1>
//       <div className={styles.formStyle}>
//         <input
//           type="text"
//           placeholder="Enter SendBird Application ID"
//           value={appId}
//           onChange={(e) => setAppId(e.target.value)}
//           className={styles.inputStyle}
//         />
//         <input
//           type="text"
//           placeholder="Enter Callee ID"
//           value={calleeId}
//           onChange={(e) => setCalleeId(e.target.value)}
//           className={styles.inputStyle}
//         />
//         <button onClick={handleCall} className={styles.buttonStyle}>
//           Call
//         </button>
//       </div>
//     </div>
//   );
// };

// export default HomePage;
