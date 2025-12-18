import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

interface TranscriptMessage {
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
}

interface TranscriptViewProps {
  transcript: TranscriptMessage[];
  visible: boolean;
}

export const Transcript: React.FC<TranscriptViewProps> = ({
  transcript,
  visible,
}) => {
  if (!visible || transcript.length === 0) {
    return null;
  }

  return (
    <View style={styles.transcriptContainer}>
      <Text style={styles.transcriptTitle}>Conversation:</Text>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={true}>
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
  );
};

const styles = StyleSheet.create({
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
