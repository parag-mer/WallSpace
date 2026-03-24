import NetInfo from '@react-native-community/netinfo';
import { onlineManager } from '@tanstack/react-query';

export const setupReactQueryOnlineManager = () => {
  onlineManager.setEventListener(setOnline => {
    return NetInfo.addEventListener(state => {
      const isOnline = !!state.isConnected && !!state.isInternetReachable;

      setOnline(isOnline);
    });
  });
};
