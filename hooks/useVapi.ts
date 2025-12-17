import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";
import Vapi from "@vapi-ai/react-native";

interface TranscriptMessage {
  role: string;
  text: string;
}

interface VapiHookInterface {
  isConnected: boolean;
  isSpeaking: boolean;
  transcript: TranscriptMessage[];
  startCall: () => Promise<void>;
  endCall: () => void;
}

export const useVapi = (): VapiHookInterface => {
  const [vapi] = useState(() => new Vapi(process.env.EXPO_PUBLIC_VAPI_API_KEY));
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);

  useEffect(() => {
    vapi.on("call-start", () => {
      setIsConnected(true);
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
      console.log(message);
    });

    vapi.on("error", (error) => {
      console.error(error);
      Alert.alert("Error", error.message);
    });

    return () => {
      vapi.stop();
    };
  }, [vapi]);

  const startCall = useCallback(async () => {
    try {
      await vapi.start(process.env.EXPO_PUBLIC_VAPI_ASSISTANT_ID);
    } catch (error) {
      Alert.alert("Error", "Failed to start call");
      console.error("Call start error:", error);
    }
  }, [vapi]);

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
