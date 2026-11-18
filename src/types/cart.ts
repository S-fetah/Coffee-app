import { CoffeeItem } from '@shared/api/database';
import { create } from 'zustand';

export interface CartItem {
  size: 'S' | 'M' | 'L';
  quantity: number;
  coffee: CoffeeItem;
}

type cart = {
  items: CartItem[];
};

type action = {
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<cart & action>()(set => ({
  items: [],

  addItem: newCoffee => {
    set(state => {
      const exists = state.items.find(
        item =>
          newCoffee.coffee.id === item.coffee.id &&
          item.size === newCoffee.size,
      );
      if (exists) {
        return {
          items: state.items.map(item =>
            newCoffee.coffee.id === item.coffee.id &&
            item.size === newCoffee.size
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }
      return { items: [...state.items, newCoffee] };
    });
  },

  removeItem: id => {
    set(state => {
      return {
        items: state.items.filter(item => item.coffee.id !== id),
      };
    });
  },
  clearCart: () => {
    set({
      items: [],
    });
  },
}));
