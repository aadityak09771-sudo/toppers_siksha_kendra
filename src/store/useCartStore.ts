import { create } from 'zustand';

export interface CartItem {
  id: string;
  title: string;
  price: string | number;
  originalPrice?: string | number;
  image: string;
  category: string;
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  addToCart: (item) => set((state) => {
    if (state.cartItems.find(i => i.id === item.id)) return state;
    return { cartItems: [...state.cartItems, item] };
  }),
  removeFromCart: (id) => set((state) => ({ cartItems: state.cartItems.filter(i => i.id !== id) })),
  clearCart: () => set({ cartItems: [] }),
}));