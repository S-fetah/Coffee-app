import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import type { RootStackParams } from '../types/navigation';

import Landing from '../screens/Landing';
import MainTabNavigator from './MainTabNavigator';
import {
  hasSeenOnboarding,
  markOnboardingComplete,
} from '../utils/OnboardingManager';

const Stack = createStackNavigator<RootStackParams>();

const AppNavigator: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] =
    useState<boolean>(false);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async (): Promise<void> => {
    try {
      const completed = await hasSeenOnboarding();
      setHasCompletedOnboarding(completed);
    } catch (error) {
      console.error('Error checking onboarding:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnboardingComplete = async (): Promise<void> => {
    await markOnboardingComplete();
    setHasCompletedOnboarding(true);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#C67C4E" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!hasCompletedOnboarding ? (
          <Stack.Screen name="Landing">
            {() => <Landing onComplete={handleOnboardingComplete} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});

export default AppNavigator;
