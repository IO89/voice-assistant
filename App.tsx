import React from "react";
import { View, StyleSheet } from "react-native";
import { useVapi } from "./hooks/useVapi";
import { StatusBar } from "./components/StatusBar";
import { CallButton } from "./components/CallButton";
import { Transcript } from "./components/Transcript";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const App = () => {
  const { isConnected, isSpeaking, transcript, startCall, endCall } = useVapi();

  return (
    <SafeAreaProvider>
      <LinearGradient
        colors={["#667eea", "#764ba2", "#f093fb"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.container}>
          <StatusBar isConnected={isConnected} isSpeaking={isSpeaking} />
          <View style={styles.content}>
            <CallButton
              isConnected={isConnected}
              onStartCall={startCall}
              onEndCall={endCall}
            />
            <Transcript transcript={transcript} visible={!isConnected} />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
