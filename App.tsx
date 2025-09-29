import AppNavigator from './src/navigation/AppNavigator';
import { resetOnboarding } from './src/utils/OnboardingManager';

function App() {
  resetOnboarding();
  return <AppNavigator />;
}

export default App;
