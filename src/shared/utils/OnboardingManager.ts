import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_KEY: string = 'HAS_SEEN_ONBOARDING';

export const hasSeenOnboarding = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(ONBOARDING_KEY);
    return value === 'true';
  } catch (error) {
    console.error('error checking onboarding status', error);
    return false;
  }
};

export const markOnboardingComplete = async (): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    return true;
  } catch (error) {
    console.error('error marking onboarding complete ', error);
    return false;
  }
};

export const resetOnboarding = async (): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(ONBOARDING_KEY);
    return true;
  } catch (error) {
    console.error('error marking onboarding complete ', error);
    return false;
  }
};
