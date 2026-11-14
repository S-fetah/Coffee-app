import { ErrorBoundary } from 'src/components/ErrorBoundary';
import AppNavigator from './src/navigation/AppNavigator';
// import { resetOnboarding } from './src/utils/OnboardingManager';
import Config from 'react-native-config';
function App() {
  return (
    <ErrorBoundary>
      <AppNavigator />
    </ErrorBoundary>
  );
}

export default App;
