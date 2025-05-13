import { create } from "zustand";

const useStore = create((set) => ({
  cartItems: [],
  addToCart: (produkt) =>
    set((state) => ({ cartItems: [...state.cartItems, produkt] })),
  removeFromCart: (id) =>
    set((state) => {
      const index = state.cartItems.findIndex((item) => item.id === id);
      if (index !== -1) {
        const updatedCart = [...state.cartItems];
        updatedCart.splice(index, 1); // Tar bort EN istället för alla
        return { cartItems: updatedCart };
      }
      return state;
    }),
}));

export default useStore;
