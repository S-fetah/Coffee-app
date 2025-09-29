import AppNavigator from './src/navigation/AppNavigator';
// import { resetOnboarding } from './src/utils/OnboardingManager';
import Config from 'react-native-config';
function App() {
  console.log(Config.API_KEY);
  // resetOnboarding();
  return <AppNavigator />;
}

export default App;
