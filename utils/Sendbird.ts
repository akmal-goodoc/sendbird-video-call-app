import SendBirdCall from 'sendbird-calls';

export const initializeSendBird = () => {
  SendBirdCall.init('6C5681E6-22C1-4139-82EB-DFF96E687335');
};

export const authenticateUser = async (userId: string) => {
    try {
      const authOption = { userId };
      await SendBirdCall.authenticate(authOption);
      await SendBirdCall.connectWebSocket();
      console.log('User authenticated');
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };