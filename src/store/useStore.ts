import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, CustomerInfo, Order, User, AuthState } from '../types';

interface StoreState extends AuthState {
  orders: Order[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  placeOrder: (customerInfo: CustomerInfo) => void;
  clearCart: () => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => void;
}

// Simulated user database
const users: Record<string, { password: string; user: User }> = {};

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      user: null,
      cart: [],
      orders: [],
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.product.id === product.id);
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { product, quantity: 1 }] };
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.product.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        })),
      placeOrder: (customerInfo) =>
        set((state) => {
          const newOrder: Order = {
            customerInfo,
            items: [...state.cart],
            total: state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
            date: new Date().toISOString(),
          };
          return {
            orders: [...state.orders, newOrder],
            cart: [],
          };
        }),
      clearCart: () => set({ cart: [] }),
      login: async (email: string, password: string) => {
        const userRecord = users[email];
        if (!userRecord || userRecord.password !== password) {
          throw new Error('Invalid email or password');
        }
        set({ user: userRecord.user });
      },
      signup: async (email: string, password: string, firstName: string, lastName: string) => {
        if (users[email]) {
          throw new Error('Email already exists');
        }
        const newUser: User = {
          id: Date.now().toString(),
          email,
          firstName,
          lastName,
        };
        users[email] = { password, user: newUser };
        set({ user: newUser });
      },
      logout: () => set({ user: null, cart: [] }),
    }),
    {
      name: 'tech-store-storage',
      partialize: (state) => ({
        user: state.user,
        cart: state.cart,
      }),
    }
  )
);