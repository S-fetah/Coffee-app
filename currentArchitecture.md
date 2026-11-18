# CoffeeApp — Current Architecture & Navigation Anatomy

## 1. Executive Summary & Application Overview

CoffeeApp is a React Native mobile application designed as an artisanal coffee ordering and delivery platform.
This document maps out the current structure of the application, how navigation is structured, the existing components and data flow, architectural entanglements (technical debt), and clear definitions of core navigation primitives.

---

## 2. Navigation Concepts Explained in Detail

To understand mobile application navigation, it is critical to distinguish between three core building blocks: **Screen**, **Stack Navigator (`Stack.Screen`)**, and **Tab Navigator (`Tab.Screen`)**.

### 2.1 What is a Screen?
A **Screen** is a standard React component that represents an entire page or viewport in your app (e.g., `HomeScreen`, `DetailsScreen`, `CartScreen`).
- It renders the primary content, headers, lists, and forms for that specific view.
- It receives navigation and route props (such as parameters passed from previous views).
- In React Native, a screen typically fills the full window (`flex: 1`) and manages its own layout, safe-area insets, and state.

```tsx
// Example of a basic Screen component
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const ProfileScreen = ({ route, navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>User Profile</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  heading: { fontSize: 24, fontWeight: 'bold' },
});
```

---

### 2.2 What is a Stack Navigator (`Stack.Screen`)?
A **Stack Navigator** models navigation like a physical deck of cards (a LIFO: Last In, First Out stack).
- **Pushing**: When you open a product detail or checkout screen, a new screen is pushed on top of the stack with a sliding transition.
- **Popping (Back)**: When the user taps the back button or swipes from the edge, the top card is popped off to reveal the previous screen beneath it.
- **Deep Hierarchies**: Ideal for linear user flows: `Product Card` &rarr; `Product Details` &rarr; `Cart` &rarr; `Order Confirmation`.
- When a new screen is pushed on the stack, it usually covers the bottom tab bar unless customized.

```tsx
// Example of a Stack Navigator
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export const RootNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    {/* Screen 1: Base of the stack */}
    <Stack.Screen name="Catalog" component={CatalogScreen} />
    {/* Screen 2: Pushed on top of Screen 1 */}
    <Stack.Screen name="Details" component={DetailsScreen} />
    {/* Screen 3: Pushed on top of Screen 2 */}
    <Stack.Screen name="Checkout" component={CheckoutScreen} />
  </Stack.Navigator>
);
```

---

### 2.3 What is a Tab Navigator (`Tab.Screen`)?
A **Tab Navigator** organizes top-level destinations of your application side-by-side, usually anchored at the bottom of the screen.
- **Independent State**: Switching between tabs (e.g. `Home` &rarr; `Favorites` &rarr; `Home`) preserves the scroll position and state of each tab.
- **No Forward/Back History**: Tapping a tab jumps directly to that section rather than stacking on top of history.
- **Parallel Worlds**: Each tab screen represents an independent peer domain of the app.

```tsx
// Example of a Tab Navigator
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export const MainTabs = () => (
  <Tab.Navigator screenOptions={{ tabBarActiveTintColor: '#C67C4E' }}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Favorites" component={FavoritesScreen} />
    <Tab.Screen name="Orders" component={OrdersScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);
```

---

### 2.4 How They Combine (Nested Navigation Architecture)
Production apps combine Stacks and Tabs into a **Nested Navigation Hierarchy**:

```
Root Stack Navigator (AppNavigator)
│
├── [Stack.Screen] "Landing" (Onboarding - shown only on first launch)
│
├── [Stack.Screen] "MainTabs" (Bottom Tab Navigator - Home base)
│    ├── [Tab.Screen] "Home" (HomeScreen + CoffeeList)
│    ├── [Tab.Screen] "Favorites" (FavoritesScreen)
│    ├── [Tab.Screen] "Explore" (ExploreScreen)
│    └── [Tab.Screen] "Notifications" (NotificationScreen)
│
└── [Stack.Screen] "Details" (Pushed over MainTabs, covering the bottom bar)
```

---

## 3. Current Application Layout & Component Tree

### Current File Inventory:
```
src/
├── navigation/
│   ├── AppNavigator.tsx       # Root Stack Navigator (Landing vs MainTabs + Details)
│   └── MainTabNavigator.tsx   # Bottom Tab Navigator (Home, Favorites, Explore, Notifications)
│
├── screens/
│   ├── Landing.tsx            # Onboarding screen with hero image and Get Started CTA
│   ├── HomeScreen.tsx         # Location header, Search bar, Promo banner, and CoffeeList
│   ├── DetailsScreen.tsx      # Stub component with unstyled <Text>
│   ├── ExploreScreen.tsx      # Stub component
│   ├── FavoritesScreen.tsx    # Stub component
│   └── NotificationScreen.tsx # Stub component
│
├── shared/
│   ├── api/
│   │   └── database.ts        # Mock coffee catalog (12 items) with simulated latency and network drop
│   ├── components/
│   │   ├── CoffeeCard.tsx     # Individual coffee product card (image, name, price, + button)
│   │   ├── CoffeeList.tsx     # Category filter horizontal scroll + 2-column FlatList of CoffeeCards
│   │   └── ErrorBoundary.tsx  # Global crash handler fallback screen
│   ├── theme/
│   │   ├── colors.ts          # Color tokens (espresso, darkRoast, frothWhite, etc.)
│   │   ├── typography.ts      # Sora font mappings and text variants (h1, h2, body, etc.)
│   │   └── spacing.ts         # 4/8-pt grid tokens (xs, sm, md, lg, xl)
│   └── utils/
│       ├── OnboardingManager.ts # AsyncStorage persistence for onboarding status
│       └── responsive.ts      # scale, verticalScale, moderateScale layout math
└── types/
    ├── navigation.ts          # Typed route parameter dictionaries
    └── constants.ts           # Fallback images and static assets
```

---

## 4. Current Architectural Entanglements (What Needs Correction)

### 🚨 Entanglement 1: The Card Press vs. Plus Button Dilemma
- **Current State**: In `CoffeeCard.tsx`, the outer `<TouchableOpacity style={styles.cardContainer}>` does **not** have an `onPress` prop. Only the tiny nested `<TouchableOpacity style={styles.btnStyle}>` (the plus icon) has `onPress`.
- **The Issue**: When a user taps anywhere on the coffee card (image, title, container), nothing happens. Users instinctively tap the card to see the product details. The `+` button in e-commerce represents "Quick Add to Cart", while the card body represents "View Details".
- **The Solution**: 
  - Attach `onPress` to the outer card container to navigate to `Details`.
  - Dedicate the inner `+` button to cart addition (or an `onAddToCart` prop).

---

### 🚨 Entanglement 2: Props Parameter Type Mismatch in `CoffeeList` & `CoffeeCard`
- **Current State**:
  In `CoffeeList.tsx`:
  ```tsx
  onPress: (name: string, image: any, description: string, price: number) => void;
  ...
  <CoffeeCard
    ...
    onPress={() => onPress(item.name, item.image, item.category, item.price)}
  />
  ```
- **The Issue**: `item.category` is being passed into the parameter slot named `description`! When `DetailsScreen` opens, the description shows `'Hot Coffee'` instead of the actual description text.
- **The Solution**: Pass the entire `CoffeeItem` object (`onPress={(item) => ...}`) rather than unpacking 4 individual positional arguments. This prevents argument misalignment.

---

### 🚨 Entanglement 3: Nested Navigation Invocation from `HomeScreen`
- **Current State**: In `HomeScreen.tsx`:
  ```tsx
  type navigationProps = StackNavigationProp<RootStackParams>;
  const navigation = useNavigation<navigationProps>();
  ...
  navigation.navigate('Details', { ... });
  ```
- **The Issue**: `HomeScreen` is nested inside `MainTabNavigator`, which is inside `AppNavigator`. In strict TypeScript with React Navigation v6/v7, `useNavigation` returns the Tab navigator prop by default. While React Navigation often bubbles up, in nested setups it is best practice to use `CompositeNavigationProp` or access the root stack via `navigation.getParent<StackNavigationProp<RootStackParams>>()?.navigate(...)`.

---

### 🚨 Entanglement 4: `DetailsScreen.tsx` is an Unstyled Stub
- **Current State**:
  ```tsx
  const DetailsScreen = () => <View><Text>DetailsScreen</Text></View>;
  ```
- **The Issue**: Because `AppNavigator` has `screenOptions={{ headerShown: false }}`, the screen has no default header. An unstyled `<View>` has no `flex: 1` and no background, rendering the text at (0, 0) behind the Android status bar. Even if navigation succeeds, it appears as an empty or broken screen.
- **The Solution**: Wrap `DetailsScreen` with `SafeAreaView`, `flex: 1`, background color, back button, and extract `route.params`.

---

### 🚨 Entanglement 5: Monolithic `HomeScreen.tsx` Mixing Data & UI
- **Current State**: `HomeScreen.tsx` handles:
  - Reverse geolocation network fetches (`fetch('api.geoapify.com...')`)
  - Location state and Android permissions logic
  - Top view, search input, promo hero graphics
  - Navigation routing to `Details`
- **The Target Architecture**: Per the Roadmap (Feature-Sliced Architecture):
  - Move location fetching into a custom hook: `useUserLocation()`
  - Move Search and Promo into separate feature components: `SearchHeader.tsx`, `PromoBanner.tsx`
  - Move Catalog feed into `features/catalog/`

---

## 5. Architectural Corrective Roadmap for Next Steps

| Priority | Task | Why It Matters |
| :---: | :--- | :--- |
| **P0** | Fix Card vs Button Press in `CoffeeCard.tsx` | Allows users to tap the card to navigate to Details |
| **P0** | Pass Full `CoffeeItem` to `Details` | Fixes passing `category` instead of `description` |
| **P1** | Flesh out `DetailsScreen.tsx` | Renders hero image, size selector (S, M, L), price, and back button |
| **P1** | Add Safe Area & Back Button on `Details` | Prevents rendering under status bar and provides navigation back to Home |
| **P2** | Introduce Zustand Cart Store (`useCartStore`) | Wire the `+` button to actually add items to the cart |
