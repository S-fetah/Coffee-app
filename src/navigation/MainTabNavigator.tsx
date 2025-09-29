import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MainTabsParams } from '../types/navigation';

import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ExploreScreen from '../screens/ExploreScreen';
import NotificationScreen from '../screens/NotificationScreen';
import { House, Heart, Handbag, Bell } from 'lucide-react-native';

const Tab = createBottomTabNavigator<MainTabsParams>();

const MainTabNavigator: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          height: 50 + insets.bottom, // add safe area for Android/iOS
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#C67C4E',
        tabBarInactiveTintColor: '#666',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case 'Home':
              return <House size={size} color={color} />;
            case 'Favorites':
              return <Heart size={size} color={color} />;
            case 'Explore':
              return <Handbag size={size} color={color} />;
            case 'Notifications':
              return <Bell size={size} color={color} />;
            default:
              return null;
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{}} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Notifications" component={NotificationScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
