import React from "react";
import { View, StyleSheet } from "react-native";
import { useVapi } from "./hooks/useVapi";
import { StatusBar } from "./components/StatusBar";
import { CallButton } from "./components/CallButton";
import { Transcript } from "./components/Transcript";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
  const { isConnected, isSpeaking, transcript, startCall, endCall } = useVapi();

  return (
    <SafeAreaProvider>
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
    </SafeAreaProvider>
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
});

export default App;
