import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Landing from './src/pages/Landing';

function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Landing />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
