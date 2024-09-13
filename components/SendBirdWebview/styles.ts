import { mq } from '@/styles/mediaquery';
import { css } from '@emotion/css';

export const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  /* width: 100%; */
  /* max-width: 1200px; */
  margin: 0 auto;
`;

export const titleStyle = css`
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
  ${mq.mobile} {
    font-size: 1rem
  }
`;

export const videosStyle = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
  ${mq.mobile} {
    width: 300px;
  }
`;

export const videoContainerStyle = css`
  width: 48%;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 20px;
  }
  ${mq.mobile} {
    width: 300px;
  }
`;

export const videoStyle = css`
  width: 100%;
  height: 240px;
  background-color: #000;
  border-radius: 10px;
`;

export const videoLabelStyle = css`
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 5px;
  border-radius: 5px;
  font-size: 0.875rem;
  text-align: center;
`;

export const buttonsStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
`;

export const inputStyle = css`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const callButtonStyle = css`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export const endButtonStyle = css`
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #e53935;
  }
`;

export const statusMessageStyle = css`
  font-size: 1rem;
  margin: 10px 0;
`;
