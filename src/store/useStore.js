import { create } from "zustand";

const useStore = create((set) => ({
  cartItems: [],
  
  addToCart: (produkt) =>
    set((state) => {
      const index = state.cartItems.findIndex((item) => item.id === produkt.id);
      if (index !== -1) {
        
        const updatedCart = [...state.cartItems];
        updatedCart[index].quantity += 1;
        return { cartItems: updatedCart };
      } else {
        
        return {
          cartItems: [...state.cartItems, { ...produkt, quantity: 1 }],
        };
      }
    }),

  removeFromCart: (id) =>
    set((state) => {
      const index = state.cartItems.findIndex((item) => item.id === id);
      if (index !== -1) {
        const updatedCart = [...state.cartItems];
        if (updatedCart[index].quantity > 1) {
          updatedCart[index].quantity -= 1;
        } else {
          updatedCart.splice(index, 1); 
        }
        return { cartItems: updatedCart };
      }
      return state;
    }),
}));

export default useStore;

