import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface StatusBarProps {
  isConnected: boolean;
  isSpeaking: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  isConnected,
  isSpeaking,
}) => {
  const getStatusText = () => {
    if (isConnected) {
      return isSpeaking ? "Assistant Speaking..." : "Listening...";
    }
    return "Ready to start";
  };

  return (
    <SafeAreaView edges={["top"]}>
      <View style={styles.container}>
        <Text style={styles.text}>{getStatusText()}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#333",
  },
});
