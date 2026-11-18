import { ImageSourcePropType } from 'react-native';

export interface CoffeeItem {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: ImageSourcePropType | string;
  rating: string;
}

export interface CheckoutDetails {
  id: number;
  METHOD: string;
}

export const coffees: CoffeeItem[] = [
  {
    id: 1,
    name: 'Espresso',
    category: 'Hot Coffee',
    price: 2.5,
    description:
      'A concentrated form of coffee served in small, strong shots. Perfectly rich and bold.',
    image:
      'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80',
    rating: '4.8',
  },
  {
    id: 2,
    name: 'Cappuccino',
    category: 'Hot Coffee',
    price: 3.75,
    description:
      'A perfect balance of espresso, steamed milk, and a deep layer of foam.',
    image:
      'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80',
    rating: '4.7',
  },
  {
    id: 3,
    name: 'Classic Latte',
    category: 'Hot Coffee',
    price: 4.25,
    description:
      'Smooth espresso with steamed milk and a light layer of foam. Topped with beautiful latte art.',
    image:
      'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80',
    rating: '4.9',
  },
  {
    id: 4,
    name: 'Americano',
    category: 'Hot Coffee',
    price: 2.75,
    description:
      'Espresso shots topped with hot water, producing a light layer of crema.',
    image:
      'https://images.unsplash.com/photo-1551030173-122aabc4489c?auto=format&fit=crop&w=600&q=80',
    rating: '4.5',
  },
  {
    id: 5,
    name: 'Latte Macchiato',
    category: 'Hot Coffee',
    price: 4.5,
    description:
      'Steamed milk beautifully layered with a shot of espresso and a foamy top.',
    image:
      'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=600&q=80',
    rating: '4.6',
  },
  {
    id: 6,
    name: 'Cold Brew',
    category: 'Cold Coffee',
    price: 4.0,
    description:
      'Slow-steeped in cool water for 20 hours to create a super-smooth, refreshing coffee experience.',
    image:
      'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
    rating: '4.9',
  },
  {
    id: 7,
    name: 'Mocha',
    category: 'Hot Coffee',
    price: 4.5,
    description:
      'Our rich, full-bodied espresso combined with bittersweet mocha sauce and steamed milk.',
    image:
      'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=600&q=80',
    rating: '4.7',
  },
  {
    id: 8,
    name: 'Flat White',
    category: 'Hot Coffee',
    price: 3.95,
    description:
      'Smooth ristretto shots of espresso get the perfect amount of steamed whole milk.',
    image:
      'https://images.unsplash.com/photo-1589396575653-c09c794ff6a6?auto=format&fit=crop&w=600&q=80',
    rating: '4.8',
  },
  {
    id: 9,
    name: 'Cortado',
    category: 'Hot Coffee',
    price: 4.15,
    description:
      'Equal parts espresso and steamed milk, reducing the acidity for a smooth finish.',
    image:
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80',
    rating: '4.6',
  },
  {
    id: 10,
    name: 'Greek Frappé',
    category: 'Blended',
    price: 5.25,
    description:
      'An iconic iced coffee drink made from instant coffee, water, sugar, and milk, shaken until frothy.',
    image:
      'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80',
    rating: '4.7',
  },
  {
    id: 11,
    name: 'Affogato',
    category: 'Dessert Coffee',
    price: 5.5,
    description:
      'A scoop of creamy vanilla gelato perfectly drowned in a shot of hot espresso.',
    image:
      'https://images.unsplash.com/photo-1592663527359-cf6642f54cff?auto=format&fit=crop&w=600&q=80',
    rating: '4.9',
  },
  {
    id: 12,
    name: 'Irish Coffee',
    category: 'Specialty Coffee',
    price: 6.0,
    description:
      'Hot coffee mixed with Irish whiskey and sugar, beautifully topped with a thick layer of cream.',
    image:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    rating: '4.8',
  },
] as const;

const delay = (ms: number) =>
  new Promise<void>(resolve => setTimeout(resolve, ms));

const endpoints = {
  //get coffes
  GetCoffees: async (
    id: number,
    METHOD: string,
  ): Promise<Error | CoffeeItem[]> => {
    if (METHOD && METHOD !== 'GET') throw new Error('Method not allowed');

    if (Math.random() < 0.05) {
      throw new Error('500 Internal Server Error: Network drop');
    }
    if (id) {
      return coffees.filter(c => c.id === id);
    }
    return coffees;
  },

  addOrder: async ({
    ...details
  }: CheckoutDetails): Promise<Error | number> => {
    const arr: number[] = [];

    if (!details.METHOD || details.METHOD !== 'POST') {
      throw new Error('Method not allowed');
    }

    if (Math.random() < 0.05) {
      throw new Error('500 Internal Server Error: Network drop');
    }

    arr[arr.length] = details.id;

    return details.id;
  },
};
