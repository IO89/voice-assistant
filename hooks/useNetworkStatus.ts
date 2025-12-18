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
    // Initial fetch
    NetInfo.fetch().then((state) => {
      setNetworkStatus({
        isConnected: state.isConnected,
        isInternetReachable: state.isInternetReachable,
        type: state.type,
        hasGoodConnection:
          state.isConnected === true && state.isInternetReachable !== false,
      });
    });

    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log("Network state:", state);
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
