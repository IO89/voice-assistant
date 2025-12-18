import { useState, useEffect, useCallback, useRef } from "react";
import { Alert } from "react-native";
import Vapi from "@vapi-ai/react-native";

interface TranscriptMessage {
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
}

interface UseVapiReturn {
  isConnected: boolean;
  isSpeaking: boolean;
  transcript: TranscriptMessage[];
  startCall: () => Promise<void>;
  endCall: () => void;
}

export const useVapi = (): UseVapiReturn => {
  const [vapi] = useState(() => new Vapi(process.env.EXPO_PUBLIC_VAPI_API_KEY));
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);
  const lastTranscriptRef = useRef<{ role: string; text: string } | null>(null);

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
      Alert.alert("Error", "Failed to start call, please try again later");
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
