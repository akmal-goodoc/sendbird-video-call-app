/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f7f9fc;
  height: 100vh;
  justify-content: center;
`;

export const titleStyle = css`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const inputStyle = css`
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 80%;
  font-size: 16px;
`;

export const videoContainerStyle = css`
  position: relative;
  width: 100%;
  max-width: 500px;
  height: auto;
  margin: 20px 0;
`;

export const remoteVideoStyle = css`
  width: 100%;
  height: auto;
  background-color: black;
  border-radius: 10px;
`;

export const localVideoStyle = (isFrontCamera: number) => css`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 120px;
  height: 90px;
  background-color: black;
  border-radius: 8px;
  z-index: 10;
  border: 2px solid white;
  transform: ${isFrontCamera === 180
    ? "rotateY(180deg)"
    : "rotateY(360deg)"}; /* add this property for changing the ce */
`;

export const controlsContainerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;

export const controlButtonStyle = css`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export const endButtonStyle = css`
  background-color: red;
  &:hover {
    background-color: darkred;
  }
`;

export const switchCameraButtonStyle = css`
  background-color: #28a745;
  &:hover {
    background-color: #218838;
  }
`;
