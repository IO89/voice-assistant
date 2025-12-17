import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useVapi } from "./hooks/useVapi";

const App = () => {
  const { isConnected, isSpeaking, transcript, startCall, endCall } = useVapi();

  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          {isConnected
            ? isSpeaking
              ? "Assistant Speaking..."
              : "Listening..."
            : "Ready to start"}
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          isConnected ? styles.endButton : styles.startButton,
        ]}
        onPress={isConnected ? endCall : startCall}
      >
        <Text style={styles.buttonText}>
          {isConnected ? "End Call" : "🎤 Start Voice Call"}
        </Text>
      </TouchableOpacity>

      {transcript.length > 0 && (
        <View style={styles.transcriptContainer}>
          <Text style={styles.transcriptTitle}>Conversation:</Text>
          {transcript.map((msg, index) => (
            <Text key={index} style={styles.transcriptText}>
              {msg.role}: {msg.text}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  statusContainer: {
    marginBottom: 30,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#333",
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
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
  transcriptContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "100%",
    maxHeight: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transcriptTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  transcriptText: {
    fontSize: 14,
    marginBottom: 5,
    color: "#666",
  },
});

export default App;
