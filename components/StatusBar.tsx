import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { useNetworkStatus } from "../hooks/useNetworkStatus";

interface StatusBarProps {
  isConnected: boolean;
  isSpeaking: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  isConnected,
  isSpeaking,
}) => {
  const networkStatus = useNetworkStatus();

  const getStatusText = () => {
    if (!networkStatus.hasGoodConnection) {
      return "⚠️ Poor Network Connection";
    }

    if (isConnected) {
      return isSpeaking ? "🎤 Assistant Speaking..." : "👂 Listening...";
    }

    return "✨ Ready to start";
  };

  const getStatusColor = () => {
    if (!networkStatus.hasGoodConnection) {
      return "#ff6b6b";
    }
    if (isConnected) {
      return isSpeaking ? "#12a594" : "#667eea";
    }
    return "#fff";
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <BlurView intensity={80} tint="light" style={styles.blurContainer}>
        <View style={styles.container}>
          <Text style={[styles.text, { color: getStatusColor() }]}>
            {getStatusText()}
          </Text>
          {!networkStatus.hasGoodConnection && (
            <Text style={styles.subText}>
              Please check your internet connection
            </Text>
          )}
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
    borderBottomWidth: 1.5,
    borderBottomColor: "rgba(255, 255, 255, 0.4)",
  },
  container: {
    width: "100%",
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  text: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    letterSpacing: 0.5,
  },
  subText: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
    color: "#ff6b6b",
    marginTop: 4,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
