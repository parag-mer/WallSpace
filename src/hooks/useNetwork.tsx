import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

export const useNetwork = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const status = !!state.isConnected && !!state.isInternetReachable;
      setIsConnected(status);
    });
    return () => unsubscribe();
  }, []);

  return isConnected;
};
