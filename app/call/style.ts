import { css } from '@emotion/css';

export const callContainerStyle = css`
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: black;
`;

export const remoteVideoStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const localVideoStyle = css`
  position: absolute;
  width: 120px;
  height: 160px;
  bottom: 100px;
  right: 20px;
  border: 2px solid white;
  object-fit: cover;
`;

export const controlsContainerStyle = css`
  position: absolute;
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const controlButtonStyle = css`
  margin: 0 10px;
  padding: 12px;
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.6);
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;

export const endButtonStyle = css`
  ${controlButtonStyle};
  background-color: red;
  color: white;
`;