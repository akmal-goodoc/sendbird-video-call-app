"use client";
import SendBirdWebview from "@/components/SendBirdWebview";

export default function Home() {
  return (
    <div
      style={{
        flex: 1,
        alignContent: "center",
        background: "fff",
        justifyContent: "center",
        border: "1px solid #000",
      }}
    >
      <SendBirdWebview />
    </div>
  );
}
