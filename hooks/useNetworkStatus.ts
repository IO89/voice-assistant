import { useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";

interface NetworkStatus {
  isConnected: boolean | null;
  isInternetReachable: boolean | null;
  type: string;
  hasGoodConnection: boolean;
}

export const useNetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isConnected: null,
    isInternetReachable: null,
    type: "unknown",
    hasGoodConnection: true,
  });

  useEffect(() => {
    NetInfo.fetch().then((state) => {
      setNetworkStatus({
        isConnected: state.isConnected,
        isInternetReachable: state.isInternetReachable,
        type: state.type,
        hasGoodConnection:
          state.isConnected === true && state.isInternetReachable !== false,
      });
    });

    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetworkStatus({
        isConnected: state.isConnected,
        isInternetReachable: state.isInternetReachable,
        type: state.type,
        hasGoodConnection:
          state.isConnected === true && state.isInternetReachable !== false,
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return networkStatus;
};
