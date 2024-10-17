import { WebView } from 'react-native-webview';
import { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import Constants from 'expo-constants';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      setTimeout(() => setIsAppReady(true), 1000);
    })();
  }, []);

  if (!isAppReady || hasPermission === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading app...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return <Text style={styles.container}>No access to camera</Text>;
  }

  return (
    <WebView
      style={styles.container}
      source={{ uri: 'http://192.168.1.3:3000' }}
      allowsInlineMediaPlayback={true}
      mediaPlaybackRequiresUserAction={false}
      javaScriptEnabled={true}
      domStorageEnabled={true}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
