import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useVapi } from "./hooks/useVapi";
import { StatusBar } from "./components/StatusBar";

const App = () => {
  const { isConnected, isSpeaking, transcript, startCall, endCall } = useVapi();

  return (
    <View style={styles.container}>
      <StatusBar isConnected={isConnected} isSpeaking={isSpeaking} />

      <View style={styles.content}>
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

        {transcript.length > 0 && !isConnected && (
          <View style={styles.transcriptContainer}>
            <Text style={styles.transcriptTitle}>Conversation:</Text>
            <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={true}
            >
              {transcript.map((msg, index) => (
                <View
                  key={index}
                  style={[
                    styles.messageContainer,
                    msg.role === "user"
                      ? styles.userMessage
                      : styles.assistantMessage,
                  ]}
                >
                  <Text style={styles.roleText}>
                    {msg.role === "user" ? "You" : "Assistant"}
                  </Text>
                  <Text style={styles.messageText}>{msg.text}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
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
  transcriptContainer: {
    marginTop: 30,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "100%",
    maxHeight: "60%",
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
  scrollView: {
    flex: 1,
  },
  messageContainer: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
  },
  userMessage: {
    backgroundColor: "#e3f2fd",
    alignSelf: "flex-end",
    maxWidth: "80%",
  },
  assistantMessage: {
    backgroundColor: "#f5f5f5",
    alignSelf: "flex-start",
    maxWidth: "80%",
  },
  roleText: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
    color: "#666",
  },
  messageText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
});

export default App;
