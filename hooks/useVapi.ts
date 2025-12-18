import { useState, useEffect, useCallback, useRef } from "react";
import { Alert } from "react-native";
import Vapi from "@vapi-ai/react-native";
import { useMicrophonePermission } from "./useRequestPermissions";

interface TranscriptMessage {
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
}

interface UseVapi {
  isConnected: boolean;
  isSpeaking: boolean;
  transcript: TranscriptMessage[];
  startCall: () => Promise<void>;
  endCall: () => void;
}

export const useVapi = (): UseVapi => {
  const [vapi] = useState(() => new Vapi(process.env.EXPO_PUBLIC_VAPI_API_KEY));
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);
  const lastTranscriptRef = useRef<{ role: string; text: string } | null>(null);

  const { permissionStatus, requestPermission, checkPermission, openSettings } =
    useMicrophonePermission();

  const showPermissionAlert = useCallback(
    (isBlocked: boolean) => {
      Alert.alert(
        "Microphone Permission Required",
        isBlocked
          ? "Microphone permission is permanently blocked. Please enable it in your device settings to make voice calls."
          : "Microphone access is required to make voice calls. Please grant permission to continue.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: isBlocked ? "Open Settings" : "Grant Permission",
            onPress: async () => {
              if (isBlocked) {
                openSettings();
              } else {
                await requestPermission();
              }
            },
          },
        ],
      );
    },
    [openSettings, requestPermission],
  );

  useEffect(() => {
    vapi.on("call-start", () => {
      setIsConnected(true);
      setTranscript([]);
      lastTranscriptRef.current = null;
    });

    vapi.on("call-end", () => {
      setIsConnected(false);
      setIsSpeaking(false);
    });

    vapi.on("speech-start", () => {
      setIsSpeaking(true);
    });

    vapi.on("speech-end", () => {
      setIsSpeaking(false);
    });

    vapi.on("message", (message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const isDuplicate =
          lastTranscriptRef.current?.role === message.role &&
          lastTranscriptRef.current?.text === message.transcript;

        if (!isDuplicate) {
          lastTranscriptRef.current = {
            role: message.role,
            text: message.transcript,
          };

          setTranscript((prev) => [
            ...prev,
            {
              role: message.role,
              text: message.transcript,
              timestamp: new Date(),
            },
          ]);
        }
      }
    });

    vapi.on("error", (error) => {
      console.error("Vapi error:", error);

      if (error.code === "PERMISSION_DENIED") {
        showPermissionAlert(permissionStatus === "blocked");
      } else if (error.code === "NETWORK_ERROR") {
        Alert.alert("Network Error", "Please check your internet connection");
      } else {
        Alert.alert("Error", error.message || "An unexpected error occurred");
      }
    });

    return () => {
      vapi.stop();
    };
  }, [vapi, permissionStatus, showPermissionAlert]);

  const startCall = useCallback(async () => {
    try {
      const hasPermission = await checkPermission();

      if (!hasPermission) {
        const granted = await requestPermission();

        if (!granted) {
          showPermissionAlert(permissionStatus === "blocked");
          return;
        }
      }

      await vapi.start(process.env.EXPO_PUBLIC_VAPI_ASSISTANT_ID);
    } catch (error) {
      console.error("Call start error:", error);
      Alert.alert("Error", "Failed to start call. Please try again.");
    }
  }, [
    vapi,
    checkPermission,
    requestPermission,
    permissionStatus,
    showPermissionAlert,
  ]);

  const endCall = useCallback(() => {
    vapi.stop();
  }, [vapi]);

  return {
    isConnected,
    isSpeaking,
    transcript,
    startCall,
    endCall,
  };
};
