import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";

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
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <BlurView intensity={80} tint="light" style={styles.blurContainer}>
        <View style={styles.container}>
          <Text style={styles.text}>{getStatusText()}</Text>
        </View>
      </BlurView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "transparent",
  },
  blurContainer: {
    overflow: "hidden",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.3)",
  },
  container: {
    width: "100%",
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
