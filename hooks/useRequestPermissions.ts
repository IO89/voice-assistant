import { useState, useCallback, useEffect } from "react";
import { Platform, PermissionsAndroid, Alert, Linking } from "react-native";

export type PermissionStatus =
  | "granted"
  | "denied"
  | "blocked"
  | "undetermined";

interface UseMicrophonePermissionReturn {
  permissionStatus: PermissionStatus;
  requestPermission: () => Promise<boolean>;
  checkPermission: () => Promise<boolean>;
  openSettings: () => void;
}

export const useMicrophonePermission = (): UseMicrophonePermissionReturn => {
  const [permissionStatus, setPermissionStatus] =
    useState<PermissionStatus>("undetermined");

  const openSettings = useCallback(() => {
    Linking.openSettings();
  }, []);

  const checkPermission = useCallback(async (): Promise<boolean> => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        );

        if (granted) {
          setPermissionStatus("granted");
          return true;
        } else {
          setPermissionStatus("undetermined");
          return false;
        }
      } catch (err) {
        console.warn("Permission check error:", err);
        setPermissionStatus("undetermined");
        return false;
      }
    }

    // iOS permissions are handled automatically
    setPermissionStatus("granted");
    return true;
  }, []);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: "Microphone Permission",
            message: "This app needs access to your microphone for voice calls",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setPermissionStatus("granted");
          return true;
        } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          setPermissionStatus("blocked");
          return false;
        } else {
          setPermissionStatus("denied");
          return false;
        }
      } catch (err) {
        console.warn("Permission request error:", err);
        setPermissionStatus("denied");
        return false;
      }
    }

    // iOS permissions are handled automatically when audio is accessed
    setPermissionStatus("granted");
    return true;
  }, []);

  // Check permission on mount
  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  return {
    permissionStatus,
    requestPermission,
    checkPermission,
    openSettings,
  };
};
