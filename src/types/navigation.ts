import { CoffeeItem } from '@shared/api/database';

export type RootStackParams = {
  Landing: undefined;
  MainTabs: undefined;
  Details: CoffeeItem; //{ name: string; description: string; price: number; image: any };
};

export type MainTabsParams = {
  Home: undefined;
  Favorites: undefined;
  Explore: undefined;
  Notifications: undefined;
};
