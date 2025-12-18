import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface CallButtonProps {
  isConnected: boolean;
  onStartCall: () => void;
  onEndCall: () => void;
}

export const CallButton: React.FC<CallButtonProps> = ({
  isConnected,
  onStartCall,
  onEndCall,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isConnected ? styles.endButton : styles.startButton,
      ]}
      onPress={isConnected ? onEndCall : onStartCall}
    >
      <Text style={styles.buttonText}>
        {isConnected ? "End Call" : "🎤 Start Voice Call"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    minWidth: 200,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  startButton: {
    backgroundColor: "#12a594",
  },
  endButton: {
    backgroundColor: "#ef4444",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
