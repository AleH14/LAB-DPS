
import { StyleSheet, View } from 'react-native';
import SolarSystem from './components/SistemaSolar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';


export default function App() {
  return (
    <SafeAreaProvider>
    <StatusBar style="auto" />
    <View style={styles.container}>
      <SolarSystem />


    </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { 

    flex: 1,


  },
});
