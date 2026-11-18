import { ErrorBoundary } from './src/shared/components/ErrorBoundary';
import AppNavigator from './src/navigation/AppNavigator';
import { resetOnboarding } from './src/shared/utils/OnboardingManager';
import Config from 'react-native-config';
function App() {
  resetOnboarding();
  return (
    <ErrorBoundary>
      <AppNavigator />
    </ErrorBoundary>
  );
}

export default App;
