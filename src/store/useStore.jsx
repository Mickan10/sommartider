import { create } from "zustand";

const useStore = create((set) => ({
  cartItems: [],
  addToCart: (produkt) =>
    set((state) => ({ cartItems: [...state.cartItems, produkt] })),
  removeFromCart: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),
}));

export default useStore;
